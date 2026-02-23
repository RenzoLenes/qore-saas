'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MapPin, Clock, LogIn, LogOut, Loader2, CheckCircle2, XCircle, Navigation, AlertTriangle } from 'lucide-react';
import type { WorkerStatus } from '@/lib/queries/worker';
import type { GpsMetadata, CheckInMode } from '@/lib/types';

const QRScanner = dynamic(() => import('@/components/worker/QRScanner'), { ssr: false });
const LocationMap = dynamic(() => import('@/components/maps/LocationMap'), { ssr: false });

interface WorkerPanelProps {
  data: WorkerStatus;
}

const MODE_LABELS = {
  gps_only: 'Solo GPS',
  static_qr: 'QR Estático + GPS',
  dynamic_qr: 'QR Dinámico + GPS',
} as const;

function resolveMode(
  worker: WorkerPanelProps['data']['worker'],
  type: 'entry' | 'exit',
): CheckInMode {
  const field = type === 'entry' ? 'entry_mode' : 'exit_mode';
  const tenantField = type === 'entry' ? 'default_entry_mode' : 'default_exit_mode';
  return worker[field]
    ?? worker.location?.[field]
    ?? (worker.tenant as Record<string, string> | undefined)?.[tenantField] as CheckInMode
    ?? 'dynamic_qr';
}

export default function WorkerPanel({ data }: WorkerPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { worker, isCheckedIn, lastRecord, recentRecords, timezone } = data;
  const location = worker.location;

  const entryMode = resolveMode(worker, 'entry');
  const exitMode = resolveMode(worker, 'exit');

  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [workerCoords, setWorkerCoords] = useState<{ lat: number; lng: number; accuracy: number | null } | null>(null);

  const actionType = isCheckedIn ? 'check_out' : 'check_in';
  const effectiveMode = actionType === 'check_in' ? entryMode : exitMode;
  const needsQR = effectiveMode === 'static_qr' || effectiveMode === 'dynamic_qr';

  const submitCheckIn = useCallback(async (lat: number, lng: number, qrToken?: string, metadata?: GpsMetadata) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: actionType,
          lat,
          lng,
          ...(qrToken ? { qr_token: qrToken } : {}),
          ...(metadata ? { gps_metadata: metadata } : {}),
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        setResult({ success: false, message: body.error ?? 'Error desconocido' });
      } else {
        setResult({ success: true, message: body.message });
        router.refresh();
      }
    } catch {
      setResult({ success: false, message: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  }, [actionType, router]);

  const getGPSAndSubmit = useCallback((qrToken?: string) => {
    setLoading(true);
    setGpsError(null);
    setResult(null);
    setWorkerCoords(null);

    if (!navigator.geolocation) {
      setGpsError('Tu navegador no soporta GPS');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy, altitude, altitudeAccuracy, speed, heading } = position.coords;

        setWorkerCoords({ lat: latitude, lng: longitude, accuracy });

        const metadata: GpsMetadata = {
          accuracy: accuracy ?? null,
          altitude: altitude ?? null,
          altitudeAccuracy: altitudeAccuracy ?? null,
          speed: speed ?? null,
          heading: heading ?? null,
        };

        submitCheckIn(latitude, longitude, qrToken, metadata);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError('Permiso de ubicación denegado. Actívalo en la configuración de tu navegador.');
            break;
          case error.POSITION_UNAVAILABLE:
            setGpsError('No se pudo obtener tu ubicación. Intenta de nuevo.');
            break;
          case error.TIMEOUT:
            setGpsError('La solicitud de ubicación tardó demasiado. Intenta de nuevo.');
            break;
          default:
            setGpsError('Error al obtener ubicación.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }, [submitCheckIn]);

  const handleAction = useCallback(() => {
    if (needsQR) {
      setScanning(true);
    } else {
      getGPSAndSubmit();
    }
  }, [needsQR, getGPSAndSubmit]);

  const handleQRScan = useCallback((token: string) => {
    setScanning(false);
    getGPSAndSubmit(token);
  }, [getGPSAndSubmit]);

  // Auto-submit if qr_token is in URL (from /scan/[token] redirect)
  useEffect(() => {
    const qrToken = searchParams.get('qr_token');
    if (qrToken && !isCheckedIn) {
      getGPSAndSubmit(qrToken);
      // Clean URL
      router.replace('/worker');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkedInTime = isCheckedIn && lastRecord
    ? new Date(lastRecord.timestamp).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', timeZone: timezone })
    : null;

  return (
    <div className="space-y-4">
      {/* Worker info */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <h2 className="text-lg font-bold">{worker.name}</h2>
        <p className="text-sm text-[var(--text-muted)]">{worker.position}</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--text-secondary)]">
          <MapPin className="h-3.5 w-3.5" />
          <span>{location?.name ?? 'Sin sede asignada'}</span>
          <span className="text-[var(--text-muted)]">&middot;</span>
          <span>{MODE_LABELS[entryMode]}</span>
        </div>
      </div>

      {/* Status */}
      <div className={`rounded-xl border p-4 text-center ${
        isCheckedIn
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-border bg-surface-raised'
      }`}>
        {isCheckedIn ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-500">En turno desde las {checkedInTime}</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-[var(--text-muted)]">Fuera de turno</span>
        )}
      </div>

      {/* Action button */}
      <button
        onClick={handleAction}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-3 h-16 rounded-xl font-bold text-lg shadow-lg transition-all disabled:opacity-50 ${
          isCheckedIn
            ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600'
            : 'bg-brand text-slate-900 shadow-brand/20 hover:bg-brand-dark'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Procesando...
          </>
        ) : isCheckedIn ? (
          <>
            <LogOut className="h-5 w-5" />
            Marcar Salida
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            Marcar Entrada
          </>
        )}
      </button>

      {/* QR hint */}
      {needsQR && !loading && !result && (
        <p className="text-xs text-center text-[var(--text-muted)]">
          {effectiveMode === 'static_qr'
            ? 'Se abrirá la cámara para escanear el QR de la sede'
            : 'Se abrirá la cámara para escanear el QR rotativo de la sede'}
        </p>
      )}

      {/* Results */}
      {result && (
        <div className={`rounded-xl border p-4 flex items-center gap-3 ${
          result.success
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-red-500/30 bg-red-500/5'
        }`}>
          {result.success ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          )}
          <span className={`text-sm font-medium ${result.success ? 'text-emerald-500' : 'text-red-500'}`}>
            {result.message}
          </span>
        </div>
      )}

      {gpsError && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex items-center gap-3">
          <Navigation className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <span className="text-sm text-amber-500">{gpsError}</span>
        </div>
      )}

      {/* Mini-map with worker position + location */}
      {workerCoords && (
        <div className="space-y-2">
          <LocationMap
            markers={[
              { id: 'worker', lat: workerCoords.lat, lng: workerCoords.lng, name: 'Tu posición', color: '#10b981' },
              ...(location ? [{ id: 'location', lat: location.lat, lng: location.lng, name: location.name, gps_radius: location.gps_radius, color: '#2dd4ff' }] : []),
            ]}
            center={{ lat: workerCoords.lat, lng: workerCoords.lng }}
            zoom={16}
            interactive={false}
            className="h-48"
          />
          {workerCoords.accuracy !== null && workerCoords.accuracy > 100 && (
            <div className="flex items-center gap-2 text-xs text-amber-500">
              <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Precisión GPS baja ({Math.round(workerCoords.accuracy)}m). Intenta desde un lugar abierto.</span>
            </div>
          )}
        </div>
      )}

      {/* Recent records */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <h3 className="text-sm font-semibold mb-3">Últimos registros</h3>
        {recentRecords.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] text-center py-4">Sin registros aún</p>
        ) : (
          <div className="space-y-2">
            {recentRecords.map((record) => {
              const isCheckIn = record.type === 'check_in';
              return (
                <div key={record.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-2 w-2 rounded-full ${isCheckIn ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-sm font-medium">{isCheckIn ? 'Entrada' : 'Salida'}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {new Date(record.timestamp).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', timeZone: timezone })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">{new Date(record.timestamp).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', timeZone: timezone })}</p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase">{record.method}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR Scanner modal */}
      {scanning && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setScanning(false)}
        />
      )}
    </div>
  );
}
