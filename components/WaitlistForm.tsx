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

      // Reset form after success
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
        <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
            ¡Solicitud Recibida!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Hemos recibido tu solicitud. Te contactaremos en las próximas 24-48 horas
            para agendar una demo personalizada.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
          >
            Enviar otra solicitud
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
            >
              Email Corporativo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@empresa.com"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Company Name Field */}
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
            >
              Nombre de la Empresa <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="company_name"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Nombre de tu empresa"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Company Size Field */}
          <div>
            <label
              htmlFor="company_size"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
            >
              Tamaño de Empresa <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                id="company_size"
                required
                value={formData.company_size || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  company_size: e.target.value as WaitlistFormData['company_size']
                })}
                className="w-full h-12 pl-12 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Selecciona el tamaño</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Industry Field (Optional) */}
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
            >
              Rubro <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                id="industry"
                value={formData.industry || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  industry: e.target.value as WaitlistFormData['industry']
                })}
                className="w-full h-12 pl-12 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Selecciona un rubro</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="contact_consent"
              required
              checked={formData.contact_consent}
              onChange={(e) => setFormData({ ...formData, contact_consent: e.target.checked })}
              className="mt-1 h-5 w-5 rounded border-slate-300 text-[#00d4ff] focus:ring-[#00d4ff] focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="contact_consent"
              className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              Acepto ser contactado por el equipo de QORE para validación y demostración
              del producto. <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
              <p className="text-sm text-red-800 dark:text-red-200">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-12 rounded-xl bg-[#00d4ff] text-slate-900 font-bold text-base shadow-lg shadow-[#00d4ff]/25 hover:bg-[#00a3cc] disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {status === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Solicitar Demo Gratuita'
            )}
          </button>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Al enviar este formulario, aceptas nuestros{' '}
            <a href="#" className="text-[#00d4ff] hover:underline">
              Términos de Servicio
            </a>
            {' '}y{' '}
            <a href="#" className="text-[#00d4ff] hover:underline">
              Política de Privacidad
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
