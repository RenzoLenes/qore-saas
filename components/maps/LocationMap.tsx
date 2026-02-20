'use client';

import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Source, Layer, NavigationControl, Popup } from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';
import { createCircleGeoJSON } from '@/lib/geo';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const BRAND_COLOR = '#00d4ff';
const DEFAULT_CENTER = { lat: -12.0464, lng: -77.0428 }; // Lima
const DEFAULT_ZOOM = 13;

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  name: string;
  gps_radius?: number;
  color?: string;
}

interface LocationMapProps {
  markers?: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  interactive?: boolean;
  onClick?: (lat: number, lng: number) => void;
  showRadius?: boolean;
  className?: string;
}

const radiusFillStyle: FillLayerSpecification = {
  id: 'radius-fill',
  type: 'fill',
  source: 'radius',
  paint: {
    'fill-color': BRAND_COLOR,
    'fill-opacity': 0.1,
  },
};

const radiusLineStyle: LineLayerSpecification = {
  id: 'radius-line',
  type: 'line',
  source: 'radius',
  paint: {
    'line-color': BRAND_COLOR,
    'line-width': 1.5,
    'line-opacity': 0.5,
    'line-dasharray': [3, 2],
  },
};

export default function LocationMap({
  markers = [],
  center,
  zoom,
  interactive = true,
  onClick,
  showRadius = true,
  className = '',
}: LocationMapProps) {
  const [popupInfo, setPopupInfo] = useState<MapMarker | null>(null);

  const mapCenter = center ?? (markers.length > 0
    ? {
        lat: markers.reduce((sum, m) => sum + m.lat, 0) / markers.length,
        lng: markers.reduce((sum, m) => sum + m.lng, 0) / markers.length,
      }
    : DEFAULT_CENTER);

  const initialViewState = useMemo(() => ({
    latitude: mapCenter.lat,
    longitude: mapCenter.lng,
    zoom: zoom ?? (markers.length > 1 ? 11 : DEFAULT_ZOOM),
  }), [mapCenter.lat, mapCenter.lng, zoom, markers.length]);

  const handleClick = useCallback(
    (e: MapLayerMouseEvent) => {
      if (onClick) {
        onClick(e.lngLat.lat, e.lngLat.lng);
      }
    },
    [onClick],
  );

  // Merge all radius circles into a single GeoJSON FeatureCollection
  const radiusGeoJSON = useMemo(() => {
    const features = markers
      .filter((m) => showRadius && m.gps_radius && m.gps_radius > 0)
      .map((m) => createCircleGeoJSON(m.lat, m.lng, m.gps_radius!));

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [markers, showRadius]);

  return (
    <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
      <Map
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
        interactive={interactive}
        cursor={onClick ? 'crosshair' : undefined}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Radius circles */}
        {radiusGeoJSON.features.length > 0 && (
          <Source id="radius" type="geojson" data={radiusGeoJSON}>
            <Layer {...radiusFillStyle} />
            <Layer {...radiusLineStyle} />
          </Source>
        )}

        {/* Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.lat}
            longitude={marker.lng}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(marker);
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-6 w-6 rounded-full animate-ping" style={{ backgroundColor: `${marker.color ?? BRAND_COLOR}33` }} />
              <span className="relative h-3 w-3 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: marker.color ?? BRAND_COLOR }} />
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {popupInfo && (
          <Popup
            latitude={popupInfo.lat}
            longitude={popupInfo.lng}
            anchor="bottom"
            offset={12}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            className="[&_.maplibregl-popup-content]:!bg-[var(--surface-raised)] [&_.maplibregl-popup-content]:!text-foreground [&_.maplibregl-popup-content]:!rounded-lg [&_.maplibregl-popup-content]:!border [&_.maplibregl-popup-content]:!border-border [&_.maplibregl-popup-content]:!px-3 [&_.maplibregl-popup-content]:!py-2 [&_.maplibregl-popup-content]:!shadow-xl [&_.maplibregl-popup-tip]:!border-t-[var(--surface-raised)] [&_.maplibregl-popup-close-button]:!text-[var(--text-muted)] [&_.maplibregl-popup-close-button]:hover:!text-foreground"
          >
            <p className="text-xs font-semibold">{popupInfo.name}</p>
            {popupInfo.gps_radius && (
              <p className="text-[10px] text-[var(--text-muted)]">Radio: {popupInfo.gps_radius}m</p>
            )}
          </Popup>
        )}
      </Map>
    </div>
  );
}
