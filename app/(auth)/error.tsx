'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function AuthError({
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
    <div className="w-full max-w-sm text-center">
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.png" alt="QORE" width={160} height={44} className="h-11 w-auto mb-4" />
        <h1 className="text-2xl font-extrabold tracking-tight">Algo salió mal</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Ocurrió un error inesperado. Intenta de nuevo.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-surface-raised p-8 space-y-4">
        <Button onClick={reset} className="w-full h-11">Intentar de nuevo</Button>
        <Link href="/login" className="block text-sm text-brand hover:underline">
          Ir al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
