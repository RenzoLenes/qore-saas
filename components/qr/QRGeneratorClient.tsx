'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download, Printer, RefreshCw, Copy, Check, Clock, Lock, Zap, Building2 } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { regenerateQR, getActiveQR, getLocationActiveQR } from '@/lib/actions/qr';
import type { Location, QRType } from '@/lib/types';

interface QRData {
  token: string;
  expires_at: string | null;
  qr_type: QRType;
}

interface QRGeneratorClientProps {
  locations: Location[];
  initialQR: QRData | null;
}

const QR_SIZES = { sm: 128, md: 192, lg: 256 } as const;
const QR_BASE_URL = 'https://app.qore.io/scan';

export default function QRGeneratorClient({ locations, initialQR }: QRGeneratorClientProps) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]?.id ?? '');
  const [qrType, setQrType] = useState<QRType>(initialQR?.qr_type ?? 'dynamic');
  const [qrSize, setQrSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState<QRData | null>(initialQR);
  const [countdown, setCountdown] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const location = locations.find((l) => l.id === selectedLocation);
  const qrUrl = qrData ? `${QR_BASE_URL}/${qrData.token}` : '';

  // Countdown timer
  useEffect(() => {
    if (!qrData?.expires_at) {
      setCountdown('');
      return;
    }

    const expiresAt = qrData.expires_at;
    const update = () => {
      const remaining = new Date(expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        setCountdown('Expirado');
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setCountdown(`${mins}:${secs.toString().padStart(2, '0')}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [qrData?.expires_at]);

  // Fetch QR when type changes explicitly
  const fetchQR = useCallback(async (locationId: string, type: QRType) => {
    setLoading(true);
    const result = await getActiveQR(locationId, type);
    if ('token' in result) {
      setQrData({ token: result.token, expires_at: result.expires_at, qr_type: result.qr_type });
    } else {
      setQrData(null);
    }
    setLoading(false);
  }, []);

  // When location changes, load whatever QR exists for that location
  const handleLocationChange = async (locationId: string) => {
    setSelectedLocation(locationId);
    setLoading(true);

    const existing = await getLocationActiveQR(locationId);
    if (existing) {
      setQrType(existing.qr_type);
      setQrData(existing);
    } else {
      // No active QR — create dynamic by default
      setQrType('dynamic');
      const result = await getActiveQR(locationId, 'dynamic');
      if ('token' in result) {
        setQrData({ token: result.token, expires_at: result.expires_at, qr_type: result.qr_type });
      } else {
        setQrData(null);
      }
    }

    setLoading(false);
  };

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    fetchQR(selectedLocation, type);
  };

  const handleRegenerate = async () => {
    if (!selectedLocation) return;
    setRegenerating(true);
    const result = await regenerateQR(selectedLocation, qrType);
    if (result && 'token' in result) {
      setQrData({ token: result.token, expires_at: result.expires_at ?? null, qr_type: result.qr_type ?? qrType });
    }
    setRegenerating(false);
  };

  const handleDownload = () => {
    if (!canvasRef.current || !qrData) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `QR-${location?.name ?? 'qore'}.png`;
    a.href = url;
    a.click();
  };

  const handlePrint = () => {
    if (!canvasRef.current || !qrData) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head><title>QR — ${location?.name ?? 'QORE'}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:system-ui,sans-serif;">
          <h2 style="margin-bottom:8px;">${location?.name ?? ''}</h2>
          <p style="color:#666;margin-bottom:24px;font-size:14px;">${location?.address ?? ''}</p>
          <img src="${url}" style="width:300px;height:300px;" />
          <p style="color:#999;margin-top:16px;font-size:12px;">Escanea para registrar asistencia · QORE</p>
        </body>
      </html>
    `);
    win.document.close();
    win.onload = () => { win.print(); };
  };

  const handleCopy = () => {
    if (qrUrl) {
      navigator.clipboard.writeText(qrUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLoading = regenerating || loading;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Generador QR' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Generador de QR Avanzado</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Genera y gestiona códigos QR para tus sedes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-border bg-surface-raised p-6 space-y-5">
            <h3 className="text-sm font-semibold">Configuración</h3>

            <Select
              label="Sede"
              icon={Building2}
              options={locations.map((l) => ({ value: l.id, label: l.name }))}
              value={selectedLocation}
              onChange={handleLocationChange}
              placeholder="Selecciona una sede"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tipo de QR</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleTypeChange('dynamic')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-colors ${
                    qrType === 'dynamic'
                      ? 'bg-brand/10 border-brand/30 text-brand'
                      : 'border-border text-[var(--text-secondary)] hover:bg-surface'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">Dinámico</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Rota cada 5 min</span>
                </button>
                <button
                  onClick={() => handleTypeChange('static')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-colors ${
                    qrType === 'static'
                      ? 'bg-brand/10 border-brand/30 text-brand'
                      : 'border-border text-[var(--text-secondary)] hover:bg-surface'
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">Estático</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Permanente</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tamaño</label>
              <div className="flex gap-2">
                {([['sm', 'Pequeño'], ['md', 'Mediano'], ['lg', 'Grande']] as const).map(([size, label]) => (
                  <button
                    key={size}
                    onClick={() => setQrSize(size)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      qrSize === size
                        ? 'bg-brand/10 border-brand/30 text-brand'
                        : 'border-border text-[var(--text-secondary)] hover:bg-surface'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                onClick={handleRegenerate}
                loading={regenerating}
                disabled={isLoading}
                className="w-full"
              >
                <RefreshCw className={`h-4 w-4 ${regenerating ? 'animate-spin' : ''}`} />
                {regenerating ? 'Regenerando...' : qrType === 'static' ? 'Generar nuevo QR Estático' : 'Regenerar QR'}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" onClick={handleDownload} disabled={!qrData}>
                  <Download className="h-4 w-4" /> Descargar
                </Button>
                <Button variant="secondary" onClick={handlePrint} disabled={!qrData}>
                  <Printer className="h-4 w-4" /> Imprimir
                </Button>
              </div>
            </div>
          </div>

          {location && (
            <div className="rounded-xl border border-border bg-surface-raised p-5">
              <h3 className="text-sm font-semibold mb-3">Información de la Sede</h3>
              <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                <p><span className="text-[var(--text-muted)]">Nombre:</span> {location.name}</p>
                <p><span className="text-[var(--text-muted)]">Dirección:</span> {location.address}</p>
                <p><span className="text-[var(--text-muted)]">Radio GPS:</span> {location.gps_radius}m</p>
                <p><span className="text-[var(--text-muted)]">Horario:</span> {location.schedule}</p>
              </div>
            </div>
          )}
        </div>

        {/* QR Preview */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface-raised p-8 flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-6">Vista Previa del QR</h3>

            <div className="relative rounded-2xl bg-white p-4 shadow-sm transition-all duration-300">
              {qrData && !isLoading ? (
                <QRCodeSVG
                  value={qrUrl}
                  size={QR_SIZES[qrSize]}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  marginSize={2}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-50 rounded-lg"
                  style={{ width: QR_SIZES[qrSize], height: QR_SIZES[qrSize] }}
                >
                  {isLoading ? (
                    <RefreshCw className="h-8 w-8 text-brand animate-spin" />
                  ) : (
                    <p className="text-sm text-gray-400">Sin QR activo</p>
                  )}
                </div>
              )}
            </div>

            {/* Countdown — only for dynamic */}
            {qrData && qrType === 'dynamic' && countdown && (
              <div className={`flex items-center gap-1.5 mt-4 text-xs font-medium ${countdown === 'Expirado' ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
                <Clock className="h-3.5 w-3.5" />
                <span>{countdown === 'Expirado' ? 'QR expirado — regenera uno nuevo' : `Expira en ${countdown}`}</span>
              </div>
            )}

            <p className="text-xs text-[var(--text-muted)] mt-3">
              {location?.name ?? 'Selecciona una sede'} — {qrType === 'static' ? 'Código QR estático · Permanente' : 'Código QR dinámico · 5 min'}
            </p>

            {qrData && (
              <div className="mt-6 w-full">
                <label className="text-xs text-[var(--text-muted)] mb-1 block">URL del QR</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-9 px-3 rounded-lg border border-border bg-background flex items-center">
                    <span className="text-xs font-mono text-[var(--text-secondary)] truncate">
                      {qrUrl}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="!w-9 !px-0 flex-shrink-0">
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden canvas for download/print */}
      {qrData && (
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas
            value={qrUrl}
            size={512}
            level="M"
            bgColor="#ffffff"
            fgColor="#0f172a"
            marginSize={2}
          />
        </div>
      )}
    </div>
  );
}
