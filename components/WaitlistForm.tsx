'use client';

import { useState } from 'react';
import { Mail, Building2, Users, Briefcase, Check } from 'lucide-react';
import type { WaitlistFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '200+', label: 'Más de 200 empleados' },
];

const INDUSTRIES = [
  { value: 'Construcción', label: 'Construcción' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Servicios', label: 'Servicios' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Oficina/Administrativo', label: 'Oficina/Administrativo' },
  { value: 'Otro', label: 'Otro' },
];

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
          <Button
            variant="ghost"
            onClick={() => setStatus('idle')}
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Enviar otra solicitud
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface-raised p-8">
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email Corporativo <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                id="email"
                icon={Mail}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@empresa.com"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-foreground mb-1.5">
                Nombre de la Empresa <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                id="company_name"
                icon={Building2}
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Nombre de tu empresa"
              />
            </div>

            {/* Two-column row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Tamaño de Empresa <span className="text-red-500">*</span>
                </label>
                <Select
                  icon={Users}
                  options={COMPANY_SIZES}
                  value={formData.company_size || ''}
                  onChange={(val) => setFormData({ ...formData, company_size: val as WaitlistFormData['company_size'] })}
                  placeholder="Selecciona"
                  name="company_size"
                  required
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Rubro <span className="text-[var(--text-muted)] font-normal">(opcional)</span>
                </label>
                <Select
                  icon={Briefcase}
                  options={INDUSTRIES}
                  value={formData.industry || ''}
                  onChange={(val) => setFormData({ ...formData, industry: val as WaitlistFormData['industry'] })}
                  placeholder="Selecciona"
                />
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
            <Button
              type="submit"
              loading={status === 'submitting'}
              className="w-full h-11"
            >
              {status === 'submitting' ? 'Enviando...' : 'Solicitar Demo Gratuita'}
            </Button>

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
