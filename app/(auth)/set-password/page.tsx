'use client';

import { useActionState, useState } from 'react';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import { setPassword } from './actions';

export default function SetPasswordPage() {
  const [state, formAction, pending] = useActionState(setPassword, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.png" alt="QORE" width={160} height={44} className="h-11 w-auto mb-4" />
        <h1 className="text-2xl font-extrabold tracking-tight">Crea tu contraseña</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Establece una contraseña para acceder a QORE</p>
      </div>

      <form action={formAction} className="rounded-2xl border border-border bg-surface-raised p-8 space-y-5">
        {state?.error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
            Nueva contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              minLength={6}
              placeholder="Minimo 6 caracteres"
              className="w-full h-11 pl-10 pr-11 rounded-lg border border-border bg-background text-foreground placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1.5">
            Confirmar contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              required
              minLength={6}
              placeholder="Repite tu contraseña"
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all text-sm"
            />
          </div>
        </div>

        <Button type="submit" loading={pending} className="w-full h-11">
          {pending ? 'Guardando...' : 'Crear contraseña'}
        </Button>
      </form>
    </div>
  );
}
