'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/landing-content';

const EASE = [0.22, 1, 0.36, 1] as const;

const navAnim = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.1 } },
};

const navAnimReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const sheetVariant = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE, staggerChildren: 0.04, delayChildren: 0.06 } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: EASE } },
};

const sheetItem = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function Nav() {
  const shouldReduce = useReducedMotion();
  const anim = shouldReduce ? navAnimReduced : navAnim;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [open]);

  return (
    <motion.nav
      variants={anim}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <div className="relative w-full max-w-6xl">
        <div
          className="flex h-14 w-full items-center rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/60 px-4 sm:px-6"
          style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)' }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.png" alt="QORE" width={160} height={40} className="h-7 sm:h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-2 mx-auto">
            {NAV_LINKS.map((item, i) => (
              <span key={item.label} className="flex items-center gap-2">
                <a href={item.href} className="text-sm text-[#000d2a] hover:text-[#2dd4ff] transition-colors">
                  {item.label}
                </a>
                {i < NAV_LINKS.length - 1 ? <span className="text-slate-300 text-[8px]">●</span> : null}
              </span>
            ))}
          </div>

          <a
            href="/#waitlist"
            className="hidden md:flex h-9 items-center rounded-full px-5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] ml-0"
            style={{
              background: 'linear-gradient(180deg, #1a3a5c 0%, #000d2a 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,13,42,0.25)',
            }}
          >
            Solicitar Demo
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="md:hidden ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-[#000d2a] hover:bg-slate-50 active:scale-95 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE }}
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15, ease: EASE }}
                >
                  <Menu className="h-4 w-4" strokeWidth={2.25} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="sheet"
              variants={sheetVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-[68px] left-0 right-0 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/60 p-3 origin-top"
              style={{ boxShadow: '0 12px 32px rgba(0,13,42,0.08), 0 24px 60px rgba(0,13,42,0.08)' }}
            >
              <div className="flex flex-col">
                {NAV_LINKS.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    variants={sheetItem}
                    className="flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#000d2a] rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-300 font-mono tracking-wider">
                      ↗
                    </span>
                  </motion.a>
                ))}

                <motion.div variants={sheetItem} className="mt-2 px-1 pb-1">
                  <a
                    href="/#waitlist"
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(180deg, #1a3a5c 0%, #000d2a 100%)',
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,13,42,0.25)',
                    }}
                  >
                    Solicitar Demo
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 -z-10 bg-[#000d2a]/20 backdrop-blur-sm cursor-default"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
