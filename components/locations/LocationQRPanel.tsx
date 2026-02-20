'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download, Printer, RefreshCw, Copy, Check, Clock, MapPin, ShieldCheck, ScanLine } from 'lucide-react';
import Button from '@/components/ui/Button';
import { regenerateQR, getActiveQR } from '@/lib/actions/qr';
import type { CheckInMode, QRType } from '@/lib/types';

interface QRData {
  token: string;
  expires_at: string | null;
  qr_type: QRType;
}

interface LocationQRPanelProps {
  locationId: string;
  locationName: string;
  locationAddress: string;
  effectiveEntryMode: CheckInMode;
  initialQR: QRData | null;
}

const QR_BASE_URL = 'https://app.qore.io/scan';

export default function LocationQRPanel({
  locationId,
  locationName,
  locationAddress,
  effectiveEntryMode,
  initialQR,
}: LocationQRPanelProps) {
  const [qrData, setQrData] = useState<QRData | null>(initialQR);
  const [countdown, setCountdown] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const qrType: QRType = effectiveEntryMode === 'static_qr' ? 'static' : 'dynamic';
  const qrUrl = qrData ? `${QR_BASE_URL}/${qrData.token}` : '';

  // Auto-fetch QR if none provided
  useEffect(() => {
    if (effectiveEntryMode === 'gps_only' || initialQR) return;
    (async () => {
      const result = await getActiveQR(locationId, qrType);
      if ('token' in result) {
        setQrData({ token: result.token, expires_at: result.expires_at, qr_type: result.qr_type });
      }
    })();
  }, [locationId, qrType, effectiveEntryMode, initialQR]);

  // Countdown timer + auto-regenerate for dynamic QR
  const handleRegenerate = useCallback(async () => {
    setRegenerating(true);
    const result = await regenerateQR(locationId, qrType);
    if (result && 'token' in result) {
      setQrData({ token: result.token, expires_at: result.expires_at ?? null, qr_type: result.qr_type ?? qrType });
    }
    setRegenerating(false);
  }, [locationId, qrType]);

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
        // Auto-regenerate
        handleRegenerate();
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setCountdown(`${mins}:${secs.toString().padStart(2, '0')}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [qrData?.expires_at, handleRegenerate]);

  const handleDownload = () => {
    if (!canvasRef.current || !qrData) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `QR-${locationName}.png`;
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
        <head><title>QR — ${locationName}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:system-ui,sans-serif;">
          <h2 style="margin-bottom:8px;">${locationName}</h2>
          <p style="color:#666;margin-bottom:24px;font-size:14px;">${locationAddress}</p>
          <img src="${url}" style="width:300px;height:300px;" />
          <p style="color:#999;margin-top:16px;font-size:12px;">Escanea para registrar asistencia · QORE</p>
        </body>
      </html>
    `);
    win.document.close();
    win.onload = () => { win.print(); };
  };

  const handleCopy = () => {
    if (qrUrl) navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // GPS only — no QR needed
  if (effectiveEntryMode === 'gps_only') {
    return (
      <div className="rounded-xl border border-border bg-surface-raised p-6 flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand mb-3">
          <MapPin className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold mb-1">Solo GPS</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[200px]">
          Esta sede usa solo GPS para registrar asistencia. No necesita código QR.
        </p>
      </div>
    );
  }

  const ModeIcon = effectiveEntryMode === 'static_qr' ? ScanLine : ShieldCheck;

  return (
    <div className="rounded-xl border border-border bg-surface-raised p-6 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <ModeIcon className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-semibold">
          QR {effectiveEntryMode === 'static_qr' ? 'Estático' : 'Dinámico'}
        </h3>
      </div>

      {/* QR Code */}
      <div className="relative rounded-xl bg-white p-3 mb-3">
        {qrData && !regenerating ? (
          <>
            <QRCodeSVG
              value={qrUrl}
              size={180}
              level="M"
              bgColor="#ffffff"
              fgColor="#0f172a"
              marginSize={2}
            />
            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 border-2 border-surface-raised flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">&#10003;</span>
            </div>
          </>
        ) : (
          <div className="w-[180px] h-[180px] flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-brand animate-spin" />
          </div>
        )}
      </div>

      {/* Countdown for dynamic */}
      {qrType === 'dynamic' && countdown && countdown !== 'Expirado' && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span>Expira en {countdown}</span>
        </div>
      )}

      {/* Info text */}
      <p className="text-[11px] text-[var(--text-muted)] mb-4">
        {qrType === 'static' ? 'Código permanente' : 'Rota automáticamente cada 5 min'}
      </p>

      {/* Action buttons */}
      <div className="w-full space-y-2">
        <Button
          onClick={handleRegenerate}
          loading={regenerating}
          size="sm"
          className="w-full"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${regenerating ? 'animate-spin' : ''}`} />
          {regenerating ? 'Regenerando...' : 'Regenerar QR'}
        </Button>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" onClick={handleDownload} disabled={!qrData} className="!text-[11px] !px-1.5">
            <Download className="h-3 w-3" />
            PNG
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePrint} disabled={!qrData} className="!text-[11px] !px-1.5">
            <Printer className="h-3 w-3" />
            Imprimir
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!qrData} className="!text-[11px] !px-1.5">
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Listo' : 'URL'}
          </Button>
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
