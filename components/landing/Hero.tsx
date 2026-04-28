'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  QrCode,
  Play,
  LayoutDashboard,
  MapPin,
  Users,
  FileSpreadsheet,
  Settings,
  LogOut,
  Search,
  Bell,
  CalendarCheck,
  UserX,
  Clock,
  TrendingUp,
  Check,
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: MapPin, label: 'Sedes', active: false },
  { icon: Users, label: 'Trabajadores', active: false },
  { icon: FileSpreadsheet, label: 'Planillas', active: false },
  { icon: Settings, label: 'Configuracion', active: false },
];

const METRICS = [
  { label: 'Asistencias Hoy', value: '47', sub: '94%', icon: CalendarCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Ausentes Hoy', value: '3', sub: '2 con permiso', icon: UserX, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Sedes Activas', value: '4/5', sub: '80% operativas', icon: MapPin, color: 'text-violet-500', bg: 'bg-violet-50' },
  { label: 'Puntualidad', value: '91%', sub: '+3.2%', icon: Clock, color: 'text-[#2dd4ff]', bg: 'bg-cyan-50' },
];

const WEEK_BARS = [
  { h: 72, d: 'Lun', v: 36 },
  { h: 88, d: 'Mar', v: 44 },
  { h: 93, d: 'Mié', v: 47 },
  { h: 65, d: 'Jue', v: 33 },
  { h: 96, d: 'Vie', v: 48 },
  { h: 42, d: 'Sáb', v: 21 },
  { h: 80, d: 'Hoy', v: 40 },
];

const RECENT = [
  { name: 'M. Torres', location: 'Sede Central', time: '08:59', status: 'Puntual' },
  { name: 'L. García', location: 'Sede Norte', time: '09:02', status: 'Puntual' },
  { name: 'P. Ruiz', location: 'Sede Central', time: '09:15', status: 'Tardanza' },
  { name: 'A. López', location: 'Sede Sur', time: '09:07', status: 'Puntual' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const textItem = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 12 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.55, ease: EASE } },
};

const textItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const dashEntrance = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay: 0.42, ease: EASE } },
};

const dashEntranceReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
};

const notifVariant = {
  hidden: { opacity: 0, x: 16, scale: 0.94 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (shouldReduce) return;
    const t = setTimeout(() => setShowNotif(true), 2600);
    return () => clearTimeout(t);
  }, [shouldReduce]);

  return (
    <section className="relative pt-28 pb-24 lg:pt-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(45,212,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,212,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#2dd4ff]/20 blur-[120px] rounded-full pointer-events-none" />
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[60px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          variants={textContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={shouldReduce ? textItemReduced : textItem}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm mb-8"
          >
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2dd4ff]">
              <QrCode className="h-3 w-3" /> QR + GPS
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500">Sin hardware adicional</span>
          </motion.div>

          <motion.h1
            variants={shouldReduce ? textItemReduced : textItem}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900"
          >
            Control de Asistencia
            <br />
            Inteligente para{' '}
            <span className="italic font-serif font-bold text-[#000d2a]">tu Empresa</span>
          </motion.h1>

          <motion.p
            variants={shouldReduce ? textItemReduced : textItem}
            className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl"
          >
            Gestiona asistencia con QR y GPS en tiempo real. Elimina el fraude, automatiza reportes y simplifica la nómina — sin complicaciones.
          </motion.p>

          <motion.div
            variants={shouldReduce ? textItemReduced : textItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#waitlist"
              className="inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(180deg, #1a3a5c 0%, #000d2a 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.3), 0 4px 12px rgba(0,13,42,0.3)',
              }}
            >
              Solicitar Demo
              <span className="ml-2 text-white/50">— es gratis</span>
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Play className="h-4 w-4 fill-slate-500 text-slate-500" />
              Ver Producto
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard: entrada + float infinito anidados */}
        <motion.div
          variants={shouldReduce ? dashEntranceReduced : dashEntrance}
          initial="hidden"
          animate="visible"
          className="mt-16 mx-auto max-w-5xl"
        >
          <motion.div
            animate={shouldReduce ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="relative rounded-3xl ring-4 ring-[#2dd4ff]/10"
            style={{
              boxShadow:
                '0 4px 6px rgba(45,212,255,0.06), 0 10px 30px rgba(45,212,255,0.08), 0 25px 60px rgba(0,13,42,0.12), 0 40px 80px rgba(0,13,42,0.08)',
            }}
          >
            {/* overflow-hidden + mask — la notificación va fuera para no ser clipada */}
            <div
              className="relative max-h-[680px] overflow-hidden rounded-3xl"
              style={{
                maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
              }}
            >
              <div className="flex">
                <div className="hidden md:flex flex-col w-52 bg-white border-r border-slate-200 flex-shrink-0">
                  <div className="flex items-center justify-center px-4 h-12 border-b border-slate-200">
                    <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-7 w-auto" />
                  </div>
                  <div className="flex flex-col gap-0.5 p-3">
                    {SIDEBAR_ITEMS.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium ${
                          item.active ? 'bg-[#2dd4ff]/10 text-[#2dd4ff]' : 'text-slate-400'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto border-t border-slate-200 p-3">
                    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium text-slate-400">
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesion
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#f8fafc]">
                  <div className="flex items-center justify-end px-5 h-12 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5">
                        <Search className="h-3 w-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400">Buscar...</span>
                      </div>
                      <div className="relative">
                        <Bell className="h-4 w-4 text-slate-400" />
                        <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#2dd4ff]" />
                      </div>
                      <div className="h-7 w-7 rounded-full bg-[#2dd4ff]/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[#2dd4ff]">CM</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-5">
                    <div className="mb-5">
                      <h2 className="text-sm font-extrabold text-slate-800">Dashboard</h2>
                      <p className="text-[10px] text-slate-400 mt-0.5">Resumen general de asistencia</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                      {METRICS.map((m) => (
                        <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`h-7 w-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                              <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
                            </div>
                            <span className="text-[9px] text-slate-400">{m.label}</span>
                          </div>
                          <p className="text-lg font-extrabold text-slate-800">{m.value}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">{m.sub}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                      <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-semibold text-slate-700">Asistencia Semanal</span>
                          <div className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold">
                            <TrendingUp className="h-3 w-3" />
                            +5.4%
                          </div>
                        </div>
                        <div className="flex items-end gap-2 h-28">
                          {WEEK_BARS.map((bar, i) => (
                            <div key={bar.d} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[7px] text-slate-400 font-medium">{bar.v}</span>
                              <div className="w-full rounded-md bg-[#2dd4ff]/15 relative overflow-hidden">
                                <motion.div
                                  className="w-full rounded-md bg-[#2dd4ff]"
                                  style={{ height: `${bar.h}px`, originY: 1 }}
                                  initial={{ scaleY: shouldReduce ? 1 : 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: shouldReduce ? 0 : 1.0 + i * 0.07,
                                    ease: EASE,
                                  }}
                                />
                              </div>
                              <span className="text-[8px] text-slate-400 font-medium">{bar.d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] font-semibold text-slate-700">Últimas Asistencias</span>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                        </div>
                        <div className="flex flex-col">
                          {RECENT.map((a) => (
                            <div key={a.name} className="flex items-center gap-2 py-2 border-t border-slate-100 first:border-0">
                              <div className="h-6 w-6 rounded-full bg-[#000d2a] flex items-center justify-center text-[8px] font-bold text-[#2dd4ff]">
                                {a.name.split(' ').map((n) => n[0]).join('')}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-semibold text-slate-700 truncate">{a.name}</p>
                                <p className="text-[8px] text-slate-400">{a.location}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-slate-500 font-mono block">{a.time}</span>
                                <span className={`text-[8px] font-medium ${a.status === 'Puntual' ? 'text-emerald-500' : 'text-amber-500'}`}>{a.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Toast de check-in — fuera del overflow-hidden para no ser clipado por la máscara */}
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  variants={notifVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 12, scale: 0.95, transition: { duration: 0.2 } }}
                  className="absolute top-[22%] right-4 z-20 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-800 leading-tight">M. Torres marcó asistencia</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">08:47 · Sede Central</p>
                  </div>
                  <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
