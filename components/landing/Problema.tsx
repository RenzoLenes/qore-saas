'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { PROBLEM_CARDS } from '@/lib/landing-content';
import ProblemCard from './ProblemCard';

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const cardVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Problema() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const hdr = shouldReduce ? headerVariantReduced : headerVariant;
  const crd = shouldReduce ? cardVariantReduced : cardVariant;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={hdr}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 font-mono">EL PROBLEMA</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Lo que estás <span className="italic font-serif font-bold text-[#000d2a]">usando</span> ya no funciona
          </h2>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            Tres métodos que la mayoría de empresas en Perú siguen usando para controlar asistencia — y por qué les están costando tiempo, dinero y confiabilidad.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {PROBLEM_CARDS.map((card) => (
            <motion.div
              key={card.method}
              variants={crd}
              whileHover={shouldReduce ? {} : { y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ProblemCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
