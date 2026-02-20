'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (token: string) => void;
  onClose: () => void;
}

const QR_URL_PATTERN = /\/scan\/([a-f0-9]+)$/;
const SCANNER_ID = 'qr-reader';

function stopAndClear(scanner: Html5Qrcode) {
  try {
    const state = scanner.getState();
    if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
      scanner.stop().then(() => {
        try { scanner.clear(); } catch {}
      }).catch(() => {});
    } else {
      try { scanner.clear(); } catch {}
    }
  } catch {}
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent double-init from React Strict Mode — ref persists across simulated remounts
    if (scannerRef.current) return;

    const scanner = new Html5Qrcode(SCANNER_ID);
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        const match = decodedText.match(QR_URL_PATTERN);
        const token = match?.[1] ?? (/^[a-f0-9]{32,}$/.test(decodedText) ? decodedText : null);
        if (token) {
          stopAndClear(scanner);
          scannerRef.current = null;
          onScanRef.current(token);
        }
      },
      () => {}, // ignore scan failures
    ).catch((err) => {
      console.error('QR scanner start error:', err);
      setError('No se pudo acceder a la cámara. Verifica los permisos.');
    });

    return () => {
      // In Strict Mode this runs on simulated unmount — getState() will be NOT_STARTED
      // so stopAndClear skips stop() and just clears DOM. Scanner ref stays so remount skips init.
      // On real unmount, getState() is SCANNING so it properly stops the camera.
      stopAndClear(scanner);
      scannerRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white">
            <Camera className="h-5 w-5" />
            <span className="text-sm font-semibold">Escanea el código QR</span>
          </div>
          <button
            onClick={() => {
              if (scannerRef.current) {
                stopAndClear(scannerRef.current);
                scannerRef.current = null;
              }
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scanner viewport */}
        <div className="rounded-xl overflow-hidden bg-black">
          <div id={SCANNER_ID} className="w-full" />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Help text */}
        <p className="text-xs text-white/50 text-center mt-4">
          Apunta la cámara al código QR de tu sede
        </p>
      </div>
    </div>
  );
}
