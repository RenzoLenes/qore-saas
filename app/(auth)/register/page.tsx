'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { register } from './actions';

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo.png" alt="QORE" width={160} height={44} className="h-11 w-auto mb-4" />
        <h1 className="text-2xl font-extrabold tracking-tight">Crea tu cuenta</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Registra tu empresa en QORE</p>
      </div>

      {/* Form */}
      <form action={formAction} className="rounded-2xl border border-border bg-surface-raised p-8 space-y-5">
        {state?.error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        <Input
          label="Nombre Completo"
          icon={User}
          type="text"
          id="full_name"
          name="full_name"
          required
          placeholder="Ej: Carlos Méndez"
        />

        <Input
          label="Nombre de la Empresa"
          icon={Building2}
          type="text"
          id="company_name"
          name="company_name"
          required
          placeholder="Ej: Constructora ACME"
        />

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
              minLength={6}
              placeholder="Mínimo 6 caracteres"
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

        <Button type="submit" loading={pending} className="w-full h-11">
          {pending ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>

      <p className="text-center text-xs text-[var(--text-muted)] mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-brand hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}
