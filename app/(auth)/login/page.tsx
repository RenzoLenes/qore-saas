'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { QrCode, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { login } from './actions';

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand mb-4">
          <QrCode className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Bienvenido a QORE</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Ingresa a tu cuenta para continuar</p>
      </div>

      {/* Form */}
      <form action={formAction} className="rounded-2xl border border-border bg-surface-raised p-8 space-y-5">
        {state?.error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        <Input
          label="Email"
          icon={Mail}
          type="email"
          id="email"
          name="email"
          required
          placeholder="tu@empresa.com"
        />

        {/* Password — custom layout for toggle button */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-11 rounded-lg border border-border bg-background text-foreground placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" type="button" className="!px-0 !h-auto text-xs text-brand hover:underline">
            ¿Olvidaste tu contraseña?
          </Button>
        </div>

        <Button type="submit" loading={pending} className="w-full h-11">
          {pending ? 'Ingresando...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <p className="text-center text-xs text-[var(--text-muted)] mt-6">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="text-brand hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
