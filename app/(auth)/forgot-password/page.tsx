'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { forgotPassword } from './actions';

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, null);

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.png" alt="QORE" width={160} height={44} className="h-11 w-auto mb-4" />
        <h1 className="text-2xl font-extrabold tracking-tight">Recuperar contraseña</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Te enviaremos un enlace para restablecer tu contraseña
        </p>
      </div>

      <form action={formAction} className="rounded-2xl border border-border bg-surface-raised p-8 space-y-5">
        {state?.error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        {state?.success ? (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-500">
            Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada y spam.
          </div>
        ) : (
          <>
            <Input
              label="Email"
              icon={Mail}
              type="email"
              id="email"
              name="email"
              required
              placeholder="tu@empresa.com"
            />

            <Button type="submit" loading={pending} className="w-full h-11">
              {pending ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </Button>
          </>
        )}
      </form>

      <p className="text-center text-xs text-[var(--text-muted)] mt-6">
        <Link href="/login" className="inline-flex items-center gap-1 text-brand hover:underline">
          <ArrowLeft className="h-3 w-3" />
          Volver al inicio de sesión
        </Link>
      </p>
    </div>
  );
}
