'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/landing-content';


const navAnim = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
};

const navAnimReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function Nav() {
  const shouldReduce = useReducedMotion();
  const anim = shouldReduce ? navAnimReduced : navAnim;

  return (
    <motion.nav
      variants={anim}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <div
        className="flex h-14 w-full max-w-6xl items-center rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/60 px-6"
        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)' }}
      >
        <Link href="/"><Image src="/logo.png" alt="QORE" width={160} height={40} className="h-8 w-auto" /></Link>

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

        <div className="flex items-center ml-auto md:ml-0">
          <a
            href="#waitlist"
            className="flex h-9 items-center rounded-full px-5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(180deg, #1a3a5c 0%, #000d2a 100%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.3), 0 2px 8px rgba(0,13,42,0.25)',
            }}
          >
            Solicitar Demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
