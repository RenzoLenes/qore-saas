'use client';

import { useState } from 'react';
import { Mail, Building2, Users, Briefcase, Check } from 'lucide-react';
import type { WaitlistFormData } from '@/lib/validations';

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '200+', label: 'Más de 200 empleados' },
] as const;

const INDUSTRIES = [
  { value: 'Construcción', label: 'Construcción' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Servicios', label: 'Servicios' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Oficina/Administrativo', label: 'Oficina/Administrativo' },
  { value: 'Otro', label: 'Otro' },
] as const;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [formData, setFormData] = useState<Partial<WaitlistFormData>>({
    email: '',
    company_name: '',
    company_size: undefined,
    industry: undefined,
    contact_consent: false,
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar la solicitud');
      }

      setStatus('success');

      setFormData({
        email: '',
        company_name: '',
        company_size: undefined,
        industry: undefined,
        contact_consent: false,
      });

    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error al enviar la solicitud. Por favor intenta nuevamente.'
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {status === 'success' ? (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Check className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
            ¡Solicitud Recibida!
          </h3>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm mb-6">
            Te contactaremos en las próximas 24-48 horas para agendar tu demo personalizada.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            Enviar otra solicitud
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface-raised p-8">
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email Corporativo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@empresa.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all text-sm"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-foreground mb-1.5">
                Nombre de la Empresa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  id="company_name"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Nombre de tu empresa"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all text-sm"
                />
              </div>
            </div>

            {/* Two-column row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company Size */}
              <div>
                <label htmlFor="company_size" className="block text-sm font-medium text-foreground mb-1.5">
                  Tamaño de Empresa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <select
                    id="company_size"
                    required
                    value={formData.company_size || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      company_size: e.target.value as WaitlistFormData['company_size']
                    })}
                    className="w-full h-11 pl-10 pr-8 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Selecciona</option>
                    {COMPANY_SIZES.map((size) => (
                      <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-1.5">
                  Rubro <span className="text-[var(--text-muted)] font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
                  <select
                    id="industry"
                    value={formData.industry || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      industry: e.target.value as WaitlistFormData['industry']
                    })}
                    className="w-full h-11 pl-10 pr-8 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Selecciona</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry.value} value={industry.value}>{industry.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="contact_consent"
                required
                checked={formData.contact_consent}
                onChange={(e) => setFormData({ ...formData, contact_consent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border text-brand focus:ring-brand focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="contact_consent" className="text-xs text-[var(--text-secondary)] cursor-pointer leading-relaxed">
                Acepto ser contactado por el equipo de QORE para validación y demostración
                del producto. <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 p-3">
                <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full h-11 rounded-lg bg-brand text-slate-900 font-semibold text-sm shadow-lg shadow-brand/20 hover:bg-brand-dark disabled:bg-border disabled:text-[var(--text-muted)] disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200"
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Solicitar Demo Gratuita'
              )}
            </button>

            <p className="text-[11px] text-center text-[var(--text-muted)]">
              Al enviar, aceptas nuestros{' '}
              <a href="/terminos" className="text-brand hover:underline">Términos</a>
              {' '}y{' '}
              <a href="/privacidad" className="text-brand hover:underline">Política de Privacidad</a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
