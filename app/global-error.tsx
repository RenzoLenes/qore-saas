'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen bg-[#000d2a] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl font-extrabold text-[#2dd4ff] mb-4">500</div>
          <h1 className="text-xl font-bold text-white mb-2">Algo salió mal</h1>
          <p className="text-sm text-gray-400 mb-6">
            Ocurrió un error inesperado. Nuestro equipo ha sido notificado.
          </p>
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#2dd4ff] px-6 text-sm font-semibold text-slate-900 hover:bg-[#2dd4ff]/90 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
