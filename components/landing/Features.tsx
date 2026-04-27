'use client';

import { useRef, useEffect } from 'react';
import { QrCode, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { BENTO_SIDE_CARDS } from '@/lib/landing-content';

const EASE = [0.22, 1, 0.36, 1] as const;

const headerVariant = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const mainCardVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: EASE } },
};

const mainCardVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const sideGridVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const sideCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const sideCardVariantReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// Constantes a nivel de módulo (rendering-hoist-jsx)
const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function QRTimerRing() {
  const shouldReduce = useReducedMotion();
  const progress = useMotionValue(0);
  const strokeDashoffset = useTransform(progress, [0, 1], [RING_CIRCUMFERENCE, 0]);

  useEffect(() => {
    if (shouldReduce) return;
    const controls = animate(progress, 1, {
      duration: 15,
      ease: 'linear',
      repeat: Infinity,
    });
    return controls.stop;
  }, [shouldReduce, progress]);

  if (shouldReduce) {
    return (
      <div
        className="h-24 w-24 rounded-2xl bg-white flex items-center justify-center p-3"
        style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2)' }}
      >
        <QrCode className="h-16 w-16 text-[#000d2a]" />
      </div>
    );
  }

  return (
    <div className="relative h-24 w-24 flex items-center justify-center">
      {/* -rotate-90 hace que el arco arranque desde las 12 */}
      <svg
        width="96"
        height="96"
        className="absolute inset-0 -rotate-90 pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx="48"
          cy="48"
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(45,212,255,0.15)"
          strokeWidth="2.5"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={RING_RADIUS}
          fill="none"
          stroke="#2dd4ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div
        className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center p-2"
        style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2)' }}
      >
        <QrCode className="h-14 w-14 text-[#000d2a]" />
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const hdr = shouldReduce ? headerVariantReduced : headerVariant;
  const main = shouldReduce ? mainCardVariantReduced : mainCardVariant;
  const side = shouldReduce ? sideCardVariantReduced : sideCardVariant;

  return (
    <section id="features" className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={hdr}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891b2]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-600 font-mono">PRODUCTO</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Todo lo que tu <span className="italic font-serif font-bold text-[#000d2a]">operación</span> necesita
          </h2>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            Capacidades construidas para equipos de RRHH y operaciones con múltiples sedes — no para usuarios de una sola oficina.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <motion.article
            variants={main}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover={shouldReduce ? {} : { y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:col-span-2 rounded-2xl bg-[#000d2a] border border-slate-800 overflow-hidden flex flex-col cursor-default"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,13,42,0.16)' }}
          >
            <div className="flex-1 flex items-center justify-center gap-6 p-10 min-h-[240px]">
              <QRTimerRing />
              <div className="flex flex-col items-center gap-3">
                <ArrowRight className="h-6 w-6 text-[#2dd4ff]" />
                <span className="text-3xl italic font-serif text-[#2dd4ff]">+</span>
                <ArrowLeft className="h-6 w-6 text-[#2dd4ff]" />
              </div>
              <div
                className="h-24 w-24 rounded-2xl bg-white flex items-center justify-center"
                style={{ boxShadow: '0 8px 32px rgba(45,212,255,0.2)' }}
              >
                <div className="h-14 w-14 rounded-full bg-[#2dd4ff]/10 border-2 border-[#2dd4ff] flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-[#0891b2]" />
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">QR dinámico + GPS, siempre juntos</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cada 15 segundos el QR se regenera — imposible de compartir o fotografiar. Al escanear, el GPS valida que el colaborador esté dentro del radio configurado. Dos capas, cero fraude.
              </p>
            </div>
          </motion.article>

          <motion.div
            variants={sideGridVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-4"
          >
            {BENTO_SIDE_CARDS.map(({ icon: Icon, title, desc }) => (
              <motion.article
                key={title}
                variants={side}
                whileHover={shouldReduce ? {} : { y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)] cursor-default"
              >
                <div className="h-10 w-10 rounded-xl bg-[#2dd4ff]/10 border border-[#2dd4ff]/20 flex items-center justify-center">
                  <Icon className="h-[18px] w-[18px] text-[#0891b2]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
                <p className="text-sm text-slate-500 leading-snug">{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
