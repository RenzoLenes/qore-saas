'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { PlanCard, EnterpriseCard } from './PricingCard';

const EASE = [0.22, 1, 0.36, 1] as const;

const headerVariant = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const gridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const cardVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const hdr = shouldReduce ? headerVariantReduced : headerVariant;
  const crd = shouldReduce ? cardVariantReduced : cardVariant;

  return (
    <section id="pricing" className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={hdr}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891b2]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 font-mono">PRECIOS</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Simple, <span className="italic font-serif font-bold text-[#000d2a]">sin</span> permanencia
          </h2>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            Precio especial para los primeros usuarios del acceso anticipado. Sin contratos anuales, cancelas cuando quieras.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <motion.div
            variants={crd}
            whileHover={shouldReduce ? {} : { y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <PlanCard />
          </motion.div>
          <motion.div
            variants={crd}
            whileHover={shouldReduce ? {} : { y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <EnterpriseCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
