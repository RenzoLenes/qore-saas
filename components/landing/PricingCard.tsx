import { Check, ArrowRight } from 'lucide-react';
import { PLAN_FEATURES, ENTERPRISE_FEATURES } from '@/lib/landing-content';

export function PlanCard() {
  return (
    <article
      className="h-full flex flex-col rounded-3xl bg-[#000d2a] border-2 border-[#2dd4ff] p-9 text-white"
      style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2), 0 20px 48px rgba(0,13,42,0.16)' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold mb-1">Plan QORE</h3>
          <p className="text-xs text-slate-400">Todo el producto, una sola suscripción por sede</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-[#2dd4ff] px-2.5 py-1">
          <span className="text-[10px] font-bold tracking-[0.15em] text-[#000d2a] font-mono">3 MESES</span>
        </span>
      </div>

      <div className="flex items-end gap-1.5 mb-2">
        <span className="text-[56px] font-extrabold tracking-tight leading-none">S/ 39.90</span>
        <span className="text-sm font-medium text-slate-400 pb-2">/mes · primeros 3 meses</span>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-mono text-slate-500 line-through">S/ 69</span>
        <span className="text-[11px] font-mono font-semibold text-[#2dd4ff]">Luego S/ 69 x sede · sin contrato anual</span>
      </div>

      <div className="h-px bg-white/10 mb-6" />

      <ul className="flex flex-col gap-3 mb-7 flex-1">
        {PLAN_FEATURES.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
            <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2dd4ff] font-bold text-sm text-[#000d2a] hover:brightness-110 transition-all"
        style={{ boxShadow: '0 4px 16px rgba(45,212,255,0.4)' }}
      >
        Reservar mi lugar
        <ArrowRight className="h-4 w-4" />
      </a>
      <p className="mt-4 text-[11px] font-mono text-slate-400 text-center">
        Cancela cuando quieras · Sin permanencia
      </p>
    </article>
  );
}

export function EnterpriseCard() {
  return (
    <article className="h-full flex flex-col rounded-3xl bg-white border border-slate-200 p-9 shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_12px_32px_rgba(0,0,0,0.08)]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Empresa</h3>
        <p className="text-xs text-slate-500">Para operaciones con 200+ colaboradores</p>
      </div>

      <div className="mb-2">
        <span className="text-[52px] italic font-serif text-slate-900 leading-none">Hablemos</span>
      </div>
      <p className="text-[13px] text-slate-500 mb-6">Precio custom según sedes y volumen</p>

      <div className="h-px bg-slate-100 mb-6" />

      <ul className="flex flex-col gap-3 mb-7 flex-1">
        {ENTERPRISE_FEATURES.map((feat) => (
          <li
            key={feat.text}
            className={`flex items-center gap-2.5 text-sm ${feat.strong ? 'font-semibold text-slate-700' : 'text-slate-600'}`}
          >
            <Check className="h-4 w-4 text-[#0891b2] flex-shrink-0" />
            {feat.text}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-900 font-semibold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
      >
        Agendar llamada
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}
