import type { GpsMetadata } from '@/lib/types';

/**
 * Calculates the distance in meters between two lat/lng points
 * using the Haversine formula.
 */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Creates a GeoJSON polygon approximating a circle.
 * Pure trigonometric calculation — no external dependencies.
 */
export function createCircleGeoJSON(
  lat: number,
  lng: number,
  radiusMeters: number,
  points = 64,
): GeoJSON.Feature<GeoJSON.Polygon> {
  const coords: [number, number][] = [];
  const earthRadius = 6371000; // meters

  for (let i = 0; i <= points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const dLat = (radiusMeters * Math.cos(angle)) / earthRadius;
    const dLng =
      (radiusMeters * Math.sin(angle)) /
      (earthRadius * Math.cos((lat * Math.PI) / 180));

    coords.push([
      lng + (dLng * 180) / Math.PI,
      lat + (dLat * 180) / Math.PI,
    ]);
  }

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [coords],
    },
  };
}

/**
 * Calculates travel speed in km/h between two GPS points with timestamps.
 * Returns null if time difference is too small (< 60s) to be meaningful.
 */
export function calculateTravelSpeed(
  lat1: number, lng1: number, ts1: string | Date,
  lat2: number, lng2: number, ts2: string | Date,
): number | null {
  const t1 = new Date(ts1).getTime();
  const t2 = new Date(ts2).getTime();
  const diffSeconds = Math.abs(t2 - t1) / 1000;

  if (diffSeconds < 60) return null;

  const distanceMeters = haversineDistance(lat1, lng1, lat2, lng2);
  return (distanceMeters / 1000) / (diffSeconds / 3600); // km/h
}

/**
 * Analyzes GPS data for spoofing indicators.
 * Returns flags but does NOT block check-in — admins review later.
 */
export function analyzeGpsSpoofing(
  metadata: GpsMetadata | undefined | null,
  previousRecord: { lat: number; lng: number; timestamp: string } | null,
  currentLat: number,
  currentLng: number,
  currentTs: string | Date,
): { suspicious: boolean; flags: string[] } {
  const flags: string[] = [];

  if (metadata) {
    // Mock GPS apps often report perfect accuracy (< 1m)
    if (metadata.accuracy !== null && metadata.accuracy < 1) {
      flags.push('accuracy_too_precise');
    }

    // GPS signal too poor to be reliable (> 200m)
    if (metadata.accuracy !== null && metadata.accuracy > 200) {
      flags.push('accuracy_too_poor');
    }

    // Mock apps report precise accuracy but lack sensor data.
    // WiFi/IP positioning legitimately has null sensors — only flag
    // when accuracy is suspiciously good (< 5m) combined with no sensors.
    if (
      metadata.accuracy !== null && metadata.accuracy < 5 &&
      metadata.altitude === null &&
      metadata.speed === null &&
      metadata.heading === null
    ) {
      flags.push('null_sensors');
    }
  }

  // Check impossible travel speed against previous record
  if (previousRecord && previousRecord.lat && previousRecord.lng) {
    const speed = calculateTravelSpeed(
      previousRecord.lat, previousRecord.lng, previousRecord.timestamp,
      currentLat, currentLng, currentTs,
    );

    if (speed !== null && speed > 200) {
      flags.push('impossible_travel');
    }
  }

  return { suspicious: flags.length > 0, flags };
}
