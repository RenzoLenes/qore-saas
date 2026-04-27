'use client';

import { useState } from 'react';
import { Minus } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type Props = {
  q: string;
  a: string;
  isLast: boolean;
};

export default function FaqItem({ q, a, isLast }: Props) {
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div className={`px-8 py-6 ${isLast ? '' : 'border-b border-slate-100'}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900 text-left"
      >
        {q}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <Minus className="h-4 w-4 text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="mt-3 pb-1 text-sm text-slate-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
