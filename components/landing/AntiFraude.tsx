'use client';

import { useRef } from 'react';
import { ShieldCheck, QrCode, MapPin, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ANTI_FRAUD } from '@/lib/landing-content';

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

export default function AntiFraude() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  const hdr = shouldReduce ? headerVariantReduced : headerVariant;
  const crd = shouldReduce ? cardVariantReduced : cardVariant;

  return (
    <section id="anti-fraude" className="bg-[#000d2a] py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={hdr}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-5">
            <ShieldCheck className="h-3 w-3 text-[#2dd4ff]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#2dd4ff] font-mono">ANTI-FRAUDE</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            Tres capas que <span className="italic font-serif font-bold text-[#2dd4ff]">imposibilitan</span> el fraude
          </h2>
          <p className="mt-5 text-base text-slate-400 leading-relaxed">
            QR que rota, GPS que valida, y un sistema que detecta intentos anómalos. Cada capa actúa por separado — juntas, hacen el fraude técnicamente impracticable.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {ANTI_FRAUD.map((item) => (
            <motion.article
              key={item.num}
              variants={crd}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-8"
            >
              <span className="text-[36px] italic font-serif text-[#2dd4ff] leading-none">{item.num}</span>

              <div className="h-20 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center gap-3">
                {item.visual === 'qr' ? (
                  <>
                    <QrCode className="h-10 w-10 text-white/30" />
                    {/* Animate wrapper div, not SVG directly (rendering-animate-svg-wrapper) */}
                    <motion.div
                      animate={shouldReduce ? {} : { x: [-2, 2, -2] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="h-4 w-4 text-[#2dd4ff]" />
                    </motion.div>
                    <QrCode className="h-10 w-10 text-[#2dd4ff]" />
                  </>
                ) : null}

                {item.visual === 'pin' ? (
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={shouldReduce ? {} : { scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute h-14 w-14 rounded-full bg-[#2dd4ff]/20"
                    />
                    <div className="h-8 w-8 rounded-full bg-[#2dd4ff] ring-[6px] ring-[#2dd4ff]/20 flex items-center justify-center">
                      <MapPin className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                ) : null}

                {item.visual === 'alert' ? (
                  <>
                    <motion.div
                      animate={shouldReduce ? {} : { opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-11 w-11 rounded-lg bg-red-500/10 border border-red-500 flex items-center justify-center flex-shrink-0"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </motion.div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-mono text-slate-400">EMP-00184 · Dispositivo no registrado</span>
                      <span className="text-[10px] font-mono text-slate-400">03:14 AM · Fuera de horario</span>
                    </div>
                  </>
                ) : null}
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">{item.desc}</p>
              <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-[#2dd4ff]/10 px-2.5 py-1">
                <span className="text-[10px] font-mono font-medium text-[#2dd4ff]">{item.tech}</span>
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
