'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Link from 'next/link';

export default function MarketingError({
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-extrabold text-brand mb-4">Oops</div>
        <h1 className="text-xl font-bold mb-2">Algo salió mal</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Ocurrió un error inesperado. Intenta de nuevo.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-slate-900 hover:bg-brand-dark transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium hover:bg-surface transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
