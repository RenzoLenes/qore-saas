'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al enviar la solicitud');
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error al enviar la solicitud. Por favor intenta nuevamente.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-3">
        <div
          className="flex items-center gap-3 rounded-full bg-white px-6 py-3"
          style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2), 0 20px 60px rgba(0,0,0,0.16)' }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2dd4ff]">
            <Check className="h-4 w-4 text-[#000d2a]" strokeWidth={3} />
          </span>
          <span className="text-sm font-semibold text-[#000d2a]">Listo — te avisamos cuando lancemos</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 h-14 rounded-full bg-white pl-5 pr-1.5 py-1.5"
        style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2), 0 20px 60px rgba(0,0,0,0.16)' }}
      >
        <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@empresa.com"
          disabled={status === 'submitting'}
          className="flex-1 min-w-0 bg-transparent text-[15px] text-slate-700 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
          style={{
            background: 'linear-gradient(180deg, #1a3a5c 0%, #000d2a 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.3)',
          }}
        >
          {status === 'submitting' ? 'Enviando...' : 'Reservar mi lugar'}
          {status !== 'submitting' && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-3 text-center text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
