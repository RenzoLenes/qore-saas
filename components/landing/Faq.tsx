import { FAQS } from '@/lib/landing-content';
import FaqItem from './FaqItem';

export default function Faq() {
  return (
    <section id="faq" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891b2]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 font-mono">PREGUNTAS FRECUENTES</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Lo que suelen <span className="italic font-serif font-bold text-[#000d2a]">preguntarnos</span>
          </h2>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            Si tienes otra duda, escríbenos en el formulario de abajo — respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)]">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} isLast={i === FAQS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
