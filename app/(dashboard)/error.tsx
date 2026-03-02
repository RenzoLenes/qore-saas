'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DashboardError({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-bold mb-2">Error en el Dashboard</h2>
      <p className="text-sm text-[var(--text-muted)] max-w-md mb-6">
        Ocurrió un error al cargar esta página. Intenta de nuevo o contacta a soporte si el problema persiste.
      </p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  );
}
