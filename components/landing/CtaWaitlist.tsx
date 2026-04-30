'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import WaitlistForm from '@/components/WaitlistForm';
import { CTA_TRUST } from '@/lib/landing-content';

const EASE = [0.22, 1, 0.36, 1] as const;

const headerVariant = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const trustGridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const trustItemVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const trustItemVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function CtaWaitlist() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const hdr = shouldReduce ? headerVariantReduced : headerVariant;
  const trust = shouldReduce ? trustItemVariantReduced : trustItemVariant;

  return (
    <section id="waitlist" className="relative bg-[#000d2a] border-y border-[#2dd4ff]/20 py-28 lg:py-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#2dd4ff]/10 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={hdr}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4ff]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#2dd4ff] font-mono">ACCESO ANTICIPADO</span>
          </span>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Sé de los <span className="italic font-serif font-bold text-[#2dd4ff]">primeros</span>
          </h2>
          <p className="mt-5 text-base text-slate-400 leading-relaxed">
            Reserva tu lugar y te avisamos cuando lancemos. Los primeros usuarios entran con precio especial y onboarding 1-a-1.
          </p>
        </motion.div>

        <WaitlistForm />

        <motion.div
          variants={trustGridVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap items-center justify-center gap-10 mt-10"
        >
          {CTA_TRUST.map(({ icon: Icon, text }) => (
            <motion.div key={text} variants={trust} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#2dd4ff]" />
              <span className="text-[13px] font-medium text-slate-300">{text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
