'use client';

import { useRef } from 'react';
import { MapPin, QrCode, ArrowRight, Check, TrendingUp } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { HowStepVisual } from '@/lib/landing-content';

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  num: string;
  title: string;
  desc: string;
  visual: HowStepVisual;
};

export default function HowStep({ num, title, desc, visual }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduce = useReducedMotion();

  return (
    <article ref={ref} className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="h-[220px] flex items-center justify-center p-6 border-b border-slate-200">

        {visual === 'map' ? (
          <div className="flex flex-col items-center gap-3 w-full bg-[#2dd4ff]/10 rounded-xl py-8">
            <div className="relative flex items-center justify-center">
              {/* Radar GPS — anillo pulsante que se expande y desvanece */}
              <motion.div
                animate={shouldReduce ? {} : { scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute h-16 w-16 rounded-full bg-[#2dd4ff]/40"
              />
              <div
                className="relative h-16 w-16 rounded-full bg-[#2dd4ff] flex items-center justify-center ring-8 ring-[#2dd4ff]/20"
                style={{ boxShadow: '0 4px 16px rgba(45,212,255,0.4)' }}
              >
                <MapPin className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-2 w-2 rounded-full border border-[#0891b2]" />
              <span className="text-[11px] font-mono font-medium text-slate-700">Radio GPS · 50 m</span>
            </div>
          </div>
        ) : null}

        {visual === 'scan' ? (
          <div className="flex items-center gap-4 w-full bg-[#000d2a] rounded-xl p-8 justify-center">
            <div
              className="h-20 w-20 rounded-xl bg-white flex items-center justify-center"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              <QrCode className="h-14 w-14 text-[#000d2a]" />
            </div>
            {/* Flecha oscilante — wrapper div, no SVG directo (rendering-animate-svg-wrapper) */}
            <motion.div
              animate={shouldReduce ? {} : { x: [-2, 2, -2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-4 w-4 text-[#2dd4ff]" />
            </motion.div>
            <div className="flex flex-col items-center gap-2">
              {/* Check circle con spring de entrada al entrar en viewport */}
              <motion.div
                initial={shouldReduce ? {} : { scale: 0 }}
                animate={isInView ? { scale: 1 } : (shouldReduce ? {} : { scale: 0 })}
                transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.2 }}
                className="h-12 w-12 rounded-full bg-[#2dd4ff] flex items-center justify-center"
                style={{ boxShadow: '0 4px 16px rgba(45,212,255,0.5)' }}
              >
                <Check className="h-6 w-6 text-[#000d2a]" strokeWidth={3} />
              </motion.div>
              <span className="text-[9px] font-mono font-medium text-[#2dd4ff] bg-white/10 px-2 py-0.5 rounded-full">
                08:47 · Validado
              </span>
            </div>
          </div>
        ) : null}

        {visual === 'chart' ? (
          <div className="w-full bg-slate-900 rounded-xl p-4 flex justify-center">
            <div
              className="w-[280px] rounded-xl bg-white p-3.5 flex flex-col gap-2.5"
              style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700">Asistencia Hoy</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5">
                  <TrendingUp className="h-2.5 w-2.5 text-emerald-600" />
                  <span className="text-[9px] font-semibold text-emerald-600">+8%</span>
                </span>
              </div>
              {/* Barras que crecen desde el bottom al entrar en viewport */}
              <div className="flex items-end gap-1 h-16 overflow-hidden">
                {[36, 50, 58, 44, 62, 56, 64].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-[3px] bg-[#2dd4ff]"
                    style={{ height: `${h}px`, originY: 1 }}
                    initial={shouldReduce ? {} : { scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : (shouldReduce ? {} : { scaleY: 0 })}
                    transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.05 * i, ease: EASE }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 font-medium">1,147 registros</span>
                <span className="text-[9px] font-mono text-slate-400">tiempo real</span>
              </div>
            </div>
          </div>
        ) : null}

      </div>
      <div className="p-7 flex flex-col gap-3 flex-1">
        <span className="text-[32px] italic font-serif text-[#0891b2] leading-none">{num}</span>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </article>
  );
}
