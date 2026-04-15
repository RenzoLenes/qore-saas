import {
  QrCode,
  MapPin,
  Clock,
  BarChart3,
  Shield,
  Building2,
  CheckCircle,
  Globe,
  Lock,
  Check,
  Star,
  Linkedin,
  Mail,
  ChevronDown,
  Users,
  FileSpreadsheet,
  Zap,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  TrendingUp,
  CalendarCheck,
  UserX,
  LogOut,
  ArrowRight,
  Play,
} from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'QORE — Control de Asistencia Inteligente | Variante D',
};

export default function LandingV4() {
  return (
    <div className="min-h-screen bg-[#000d2a] text-white overflow-hidden">
      {/* ─── Navigation ────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between">
          {/* Logo */}
          <Image src="/logo.png" alt="QORE" width={160} height={40} className="h-8 w-auto" />

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {[
              { label: 'Inicio', href: '#' },
              { label: 'Producto', href: '#features' },
              { label: 'Proceso', href: '#how-it-works' },
              { label: 'Precios', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#2dd4ff] transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#waitlist"
            className="flex h-10 items-center rounded-full px-5 text-sm font-semibold text-[#000d2a] hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #2dd4ff 0%, #a5f3fc 50%, #2dd4ff 100%)',
              boxShadow: '0 0 15px rgba(45,212,255,0.25)',
            }}
          >
            Solicitar Demo
          </a>
        </div>
      </nav>

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0">
        {/* Stars — scattered dots */}
        <div className="absolute inset-x-16 top-[180px] bottom-0 pointer-events-none overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
          {[
            // Zona del hero (y: 0-35% = zona del texto)
            // Bordes izquierda/derecha
            { x: 3, y: 5, s: 1.5, o: 0.5 }, { x: 8, y: 15, s: 1, o: 0.3 }, { x: 12, y: 28, s: 1.5, o: 0.4 },
            { x: 88, y: 8, s: 1, o: 0.4 }, { x: 93, y: 18, s: 1.5, o: 0.5 }, { x: 96, y: 30, s: 1, o: 0.3 },
            { x: 5, y: 22, s: 1, o: 0.35 }, { x: 95, y: 12, s: 2, o: 0.55 },
            // Centro denso — alrededor del título
            { x: 25, y: 3, s: 1.5, o: 0.5 }, { x: 32, y: 8, s: 2, o: 0.7 }, { x: 38, y: 2, s: 1, o: 0.4 },
            { x: 44, y: 6, s: 1.5, o: 0.55 }, { x: 50, y: 3, s: 2, o: 0.75 }, { x: 56, y: 7, s: 1, o: 0.45 },
            { x: 62, y: 2, s: 1.5, o: 0.6 }, { x: 68, y: 5, s: 2, o: 0.65 }, { x: 75, y: 8, s: 1, o: 0.4 },
            { x: 28, y: 14, s: 1, o: 0.35 }, { x: 35, y: 17, s: 2, o: 0.6 }, { x: 42, y: 12, s: 1, o: 0.4 },
            { x: 48, y: 16, s: 1.5, o: 0.5 }, { x: 54, y: 13, s: 2, o: 0.55 }, { x: 60, y: 18, s: 1, o: 0.35 },
            { x: 66, y: 14, s: 1.5, o: 0.5 }, { x: 72, y: 17, s: 1, o: 0.3 },
            { x: 30, y: 23, s: 1.5, o: 0.45 }, { x: 37, y: 26, s: 1, o: 0.3 }, { x: 43, y: 22, s: 2, o: 0.5 },
            { x: 50, y: 28, s: 1, o: 0.35 }, { x: 57, y: 24, s: 1.5, o: 0.45 }, { x: 63, y: 27, s: 1, o: 0.3 },
            { x: 70, y: 23, s: 2, o: 0.5 },
            { x: 33, y: 32, s: 1, o: 0.3 }, { x: 40, y: 34, s: 1.5, o: 0.35 }, { x: 47, y: 31, s: 1, o: 0.25 },
            { x: 53, y: 35, s: 1.5, o: 0.3 }, { x: 60, y: 33, s: 1, o: 0.25 }, { x: 67, y: 30, s: 1.5, o: 0.35 },
            // Medio-lateral
            { x: 18, y: 10, s: 1, o: 0.35 }, { x: 22, y: 20, s: 1.5, o: 0.4 }, { x: 78, y: 15, s: 1, o: 0.4 },
            { x: 82, y: 25, s: 1.5, o: 0.45 }, { x: 15, y: 32, s: 1, o: 0.25 }, { x: 85, y: 30, s: 1, o: 0.3 },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.s}px`, height: `${star.s}px`, opacity: star.o }}
            />
          ))}
        </div>

        {/* Top edge glow — light falling from above */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[2px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, #2dd4ff 30%, #2dd4ff 70%, transparent 100%)' }} />
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2dd4ff]/30 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45,212,255,0.15) 0%, rgba(45,212,255,0.05) 40%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-[#2dd4ff]/20 bg-[#2dd4ff]/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4ff] animate-pulse" />
              <span className="text-xs font-medium text-[#2dd4ff]">Bienvenido a QORE</span>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              Optimiza el Control
              <br />
              <span className="text-slate-300">de Asistencia</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Registra asistencia con QR y GPS, analiza metricas clave y toma decisiones basadas en datos — todo en un dashboard intuitivo.
            </p>

            {/* Double CTA */}
            <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/30 pb-0.5 hover:border-[#2dd4ff] hover:text-[#2dd4ff] transition-colors"
              >
                Explorar Producto
              </a>
              <a
                href="#waitlist"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-[#000d2a] hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #2dd4ff 0%, #a5f3fc 50%, #2dd4ff 100%)',
                  boxShadow: '0 0 20px rgba(45,212,255,0.3), 0 4px 12px rgba(45,212,255,0.2)',
                }}
              >
                Prueba Gratis
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ─── Dashboard Mockup (Dark themed) ───────────── */}
          <div className="animate-blur-in delay-300 mt-16 mx-auto max-w-5xl relative">
            {/* Glow behind dashboard */}
            <div className="absolute -inset-4 bg-[#2dd4ff]/5 blur-[40px] rounded-3xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(45,212,255,0.1), 0 0 40px rgba(45,212,255,0.05), 0 25px 60px rgba(0,0,0,0.4)' }}>
              <div className="relative max-h-[680px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}>
                <div className="flex bg-[#0a1628]">
                  {/* Sidebar — dark */}
                  <div className="hidden md:flex flex-col w-52 bg-[#0a1628] border-r border-white/5 flex-shrink-0">
                    <div className="flex items-center gap-2 px-4 h-12 border-b border-white/5">
                      <div className="h-6 w-6 rounded-md bg-[#2dd4ff] flex items-center justify-center">
                        <Image src="/logo-icon.png" alt="Q" width={14} height={14} className="h-3.5 w-auto" />
                      </div>
                      <span className="text-xs font-bold text-white">QORE</span>
                    </div>
                    <div className="flex flex-col gap-0.5 p-3">
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: MapPin, label: 'Sedes', active: false },
                        { icon: Users, label: 'Trabajadores', active: false },
                        { icon: FileSpreadsheet, label: 'Planillas', active: false },
                        { icon: Settings, label: 'Configuracion', active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium ${
                            item.active
                              ? 'bg-[#2dd4ff]/10 text-[#2dd4ff]'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </div>
                      ))}
                    </div>
                    {/* Bottom sidebar items */}
                    <div className="mt-auto border-t border-white/5 p-3 space-y-0.5">
                      <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium text-slate-500">
                        <Bell className="h-4 w-4" />
                        Notificaciones
                        <span className="ml-auto h-4 w-4 rounded-full bg-[#2dd4ff] text-[8px] font-bold text-[#000d2a] flex items-center justify-center">3</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium text-slate-500">
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesion
                      </div>
                    </div>
                  </div>

                  {/* Main area */}
                  <div className="flex-1 flex flex-col bg-[#0f1d32]">
                    {/* Topbar */}
                    <div className="flex items-center justify-between px-5 h-12 border-b border-white/5 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-white">Dashboard</span>
                        <span className="text-[10px] text-slate-500">Reporte de hoy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 border border-white/5 rounded-lg px-2.5 py-1.5">
                          <span>Ene 01 - Ene 31</span>
                          <ChevronDown className="h-3 w-3" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5">
                          <Search className="h-3 w-3 text-slate-500" />
                          <span className="text-[10px] text-slate-500">Buscar...</span>
                        </div>
                        <div className="h-7 w-7 rounded-full bg-[#2dd4ff]/10 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-[#2dd4ff]">CM</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      {/* Stat cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                        {[
                          { label: 'Asistencias Hoy', value: '47', sub: '94%', trend: '+12%', icon: CalendarCheck },
                          { label: 'Ausentes Hoy', value: '3', sub: '2 con permiso', trend: '-5%', icon: UserX },
                          { label: 'Sedes Activas', value: '4/5', sub: '80% operativas', trend: '', icon: MapPin },
                          { label: 'Puntualidad', value: '91%', sub: '+3.2%', trend: '+8%', icon: Clock },
                        ].map((m) => (
                          <div key={m.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] text-slate-500">{m.label}</span>
                              <span className="text-[8px] text-slate-600">•••</span>
                            </div>
                            <div className="flex items-end gap-2">
                              <p className="text-xl font-bold text-white">{m.value}</p>
                              {m.trend && (
                                <span className="text-[9px] text-emerald-400 font-medium mb-0.5">{m.trend}</span>
                              )}
                            </div>
                            <p className="text-[9px] text-slate-500 mt-1">{m.sub}</p>
                          </div>
                        ))}
                      </div>

                      {/* Chart + Activity */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        {/* Chart */}
                        <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-[11px] font-semibold text-white">Asistencia Semanal</h3>
                            <div className="flex items-center gap-3 text-[9px] text-slate-500">
                              <div className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4ff]" />
                                Asistencias
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4ff]/30" />
                                Ausencias
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-[9px] text-slate-500">Estadisticas</span>
                            <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                              <TrendingUp className="h-3 w-3" />
                              +5.4%
                            </div>
                          </div>
                          {/* Bar chart */}
                          <div className="flex items-end gap-2.5 h-32">
                            {[
                              { h1: 60, h2: 20, d: 'Lun' },
                              { h1: 80, h2: 15, d: 'Mar' },
                              { h1: 70, h2: 25, d: 'Mie' },
                              { h1: 90, h2: 10, d: 'Jue' },
                              { h1: 100, h2: 8, d: 'Vie' },
                              { h1: 40, h2: 30, d: 'Sab' },
                              { h1: 75, h2: 18, d: 'Dom' },
                            ].map((bar, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full flex flex-col gap-0.5">
                                  <div className="w-full rounded-t-md bg-[#2dd4ff]/20" style={{ height: `${bar.h2}px` }} />
                                  <div className="w-full rounded-b-md bg-[#2dd4ff]" style={{ height: `${bar.h1}px` }} />
                                </div>
                                <span className="text-[8px] text-slate-500 font-medium">{bar.d}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Top sedes */}
                        <div className="lg:col-span-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[11px] font-semibold text-white">Top Sedes</h3>
                          </div>
                          <div className="flex flex-col gap-3">
                            {[
                              { name: 'Sede Central', count: '26,331', pct: 76, color: 'bg-[#2dd4ff]' },
                              { name: 'Sede Norte', count: '13,492', pct: 58, color: 'bg-emerald-400' },
                              { name: 'Sede Sur', count: '11,843', pct: 45, color: 'bg-violet-400' },
                              { name: 'Sede Este', count: '10,225', pct: 38, color: 'bg-amber-400' },
                            ].map((s, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`h-2 w-2 rounded-full ${s.color}`} />
                                      <span className="text-[10px] font-medium text-slate-300">{s.name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-white">{s.count}</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 w-8 text-right">{s.pct}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to section below */}
        <div className="h-32" />
      </section>

      {/* ─── Logos ────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-slate-400 mb-6">
              Interesados
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
              Confiado por 300+ empresas
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-40">
            {['Constructora Pacifico', 'Grupo Logistico SAC', 'RetailMax Peru', 'MineraVerde', 'TechServices Co.', 'AgroIndustrial Lima'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <Building2 className="h-4 w-4" />
                <span className="whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metrics ──────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '99.8%', label: 'Uptime garantizado', icon: Zap },
              { value: '<2s', label: 'Tiempo de registro', icon: Clock },
              { value: '50+', label: 'Empresas activas', icon: Building2 },
              { value: '100K+', label: 'Registros mensuales', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <stat.icon className="h-5 w-5 text-[#2dd4ff] mb-1" />
                <p className="text-3xl font-extrabold tracking-tight lg:text-4xl text-white">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Producto</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Todo lo que necesitas para gestionar asistencia
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Una plataforma integral disenada para operaciones de campo y oficina.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: QrCode, title: 'Escaneo QR', desc: 'Codigos QR que se regeneran automaticamente. Registro de asistencia en segundos.' },
              { icon: MapPin, title: 'Validacion GPS', desc: 'Presencia fisica verificada con radio configurable por sede.' },
              { icon: BarChart3, title: 'Reportes', desc: 'Dashboard en tiempo real. Exporta en Excel, PDF y CSV.' },
              { icon: Shield, title: 'Anti-Fraude', desc: 'Deteccion automatica de anomalias y sistema de alertas.' },
              { icon: Globe, title: 'Multi-Sede', desc: 'Gestiona todas tus ubicaciones desde un solo panel central.' },
              { icon: Lock, title: 'Seguridad', desc: 'Roles y permisos granulares, datos aislados por tenant.' },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-start rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-[#2dd4ff]/15 transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2dd4ff]/10 mb-4">
                  <f.icon className="h-5 w-5 text-[#2dd4ff]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ─────────────────────────────────── */}
      <section id="how-it-works" className="py-24 lg:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2dd4ff]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Proceso</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Operativo en minutos, no en semanas
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Tres pasos para transformar como gestionas la asistencia de tu equipo.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#2dd4ff]/20 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  step: '01',
                  icon: Building2,
                  title: 'Configura tus sedes',
                  desc: 'Define ubicaciones, radio GPS y horarios. QR generado automaticamente.',
                  features: ['Radio GPS configurable', 'QR dinamico', 'Horarios flexibles'],
                },
                {
                  step: '02',
                  icon: QrCode,
                  title: 'Tu equipo escanea',
                  desc: 'Escanean el QR y el sistema valida ubicacion GPS automaticamente.',
                  features: ['Registro en <2 segundos', 'Sin hardware adicional', 'iOS y Android'],
                },
                {
                  step: '03',
                  icon: BarChart3,
                  title: 'Datos al instante',
                  desc: 'Dashboard en tiempo real, alertas automaticas y exportacion de reportes.',
                  features: ['Dashboard en vivo', 'Excel, PDF, CSV', 'Alertas automaticas'],
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#2dd4ff]/30 bg-[#000d2a] text-[#2dd4ff] font-extrabold text-sm shadow-lg shadow-[#2dd4ff]/10 mb-6">
                    {item.step}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2dd4ff]/10 mb-4">
                    <item.icon className="h-5 w-5 text-[#2dd4ff]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">{item.desc}</p>
                  <ul className="flex flex-col gap-1.5 items-center">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Check className="h-3.5 w-3.5 text-[#2dd4ff]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Precios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Simple, transparente, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Todos los planes incluyen soporte tecnico y actualizaciones. Sin contratos a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 transition-colors">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Starter</h3>
                <p className="text-sm text-slate-500">Para equipos pequenos</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight text-white">$49</span>
                <span className="text-slate-500 ml-1">/mes</span>
                <p className="text-xs text-slate-500 mt-1">Hasta 30 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['1 sede', 'Registro con QR + GPS', 'Dashboard de asistencia', 'Reportes en Excel', 'Gestion de trabajadores', 'Soporte por email'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-xl border border-white/10 font-semibold text-sm text-white hover:bg-white/5 transition-colors">
                Comenzar Prueba
              </a>
            </div>

            {/* Professional */}
            <div className="relative flex flex-col rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(180deg, rgba(45,212,255,0.08) 0%, rgba(45,212,255,0.02) 100%)', border: '1px solid rgba(45,212,255,0.2)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-[#2dd4ff] px-3.5 py-1 text-xs font-bold text-[#000d2a]">
                  Mas Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">Professional</h3>
                <p className="text-sm text-slate-400">Para empresas en crecimiento</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight">$99</span>
                <span className="text-slate-400 ml-1">/mes</span>
                <p className="text-xs text-slate-400 mt-1">Hasta 80 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['Hasta 3 sedes', 'Todo de Starter +', 'Radio GPS configurable por sede', 'Modulo de nomina', 'Reportes avanzados (Excel, CSV, PDF)', 'Mapa de sedes en tiempo real', 'Soporte prioritario'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-xl bg-[#2dd4ff] font-semibold text-sm text-[#000d2a] hover:bg-[#1ab8e0] transition-colors shadow-lg shadow-[#2dd4ff]/20">
                Solicitar Demo
              </a>
            </div>

            {/* Business */}
            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/10 transition-colors">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Business</h3>
                <p className="text-sm text-slate-500">Para operaciones grandes</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight text-white">$149</span>
                <span className="text-slate-500 ml-1">/mes</span>
                <p className="text-xs text-slate-500 mt-1">Hasta 200 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['Sedes ilimitadas', 'Todo de Professional +', 'Roles y permisos por sede', 'Multi-administrador', 'Exportacion automatizada', 'Alertas por email', 'Soporte dedicado'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-xl border border-white/10 font-semibold text-sm text-white hover:bg-white/5 transition-colors">
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Testimonios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: 'QORE elimino por completo el fraude de asistencia en nuestras obras. Los reportes automaticos nos ahorran 15 horas semanales.', name: 'Carlos Mendoza', role: 'Gerente de Operaciones', company: 'Constructora Pacifico' },
              { quote: 'La implementacion fue increiblemente rapida. En menos de un dia teniamos todas nuestras sedes configuradas y el equipo usando la app.', name: 'Lucia Fernandez', role: 'Directora de RRHH', company: 'Grupo Logistico SAC' },
              { quote: 'La validacion GPS nos da tranquilidad total. Sabemos exactamente quien esta en cada tienda y a que hora.', name: 'Andres Villarreal', role: 'COO', company: 'RetailMax Peru' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-7">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="h-10 w-10 rounded-full bg-[#2dd4ff]/10 flex items-center justify-center text-[#2dd4ff] text-sm font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            {[
              { q: '¿Necesito hardware especial para usar QORE?', a: 'No. QORE funciona 100% con smartphones. Solo necesitas un dispositivo para mostrar el QR en cada sede. Los empleados escanean con su propio telefono.' },
              { q: '¿Que tan precisa es la validacion GPS?', a: 'Tipicamente 5-15 metros. Puedes configurar el radio de validacion por sede para adaptarlo a tus necesidades.' },
              { q: '¿Que necesitan mis empleados para registrar asistencia?', a: 'Solo un smartphone con camara y conexion a internet. No se requiere instalar ninguna app adicional ni hardware especial.' },
              { q: '¿Puedo exportar los datos de asistencia?', a: 'Si. Puedes exportar reportes en multiples formatos: Excel, CSV y PDF.' },
              { q: '¿Cuanto toma la implementacion?', a: 'En todos los planes puedes crear tus sedes, registrar empleados y empezar a operar en menos de 30 minutos. Para Business, nuestro equipo te acompana.' },
              { q: '¿Mis datos estan seguros?', a: 'Si. Infraestructura cloud con conexiones encriptadas y acceso protegido por roles. Solo tu equipo autorizado puede ver tus datos.' },
            ].map((faq, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-white [&::-webkit-details-marker]:hidden list-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0 ml-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed pr-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Waitlist ────────────────────────────────── */}
      <section id="waitlist" className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#2dd4ff]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">
              Empieza Hoy
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Solicita tu demo personalizada
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Completa el formulario y nuestro equipo te contactara en menos de 48 horas para una demostracion sin compromiso.
            </p>
          </div>

          <WaitlistForm />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-2xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Demo Gratuita', desc: 'Sin compromiso ni tarjeta' },
              { icon: Clock, title: 'Respuesta en 24-48h', desc: 'Nuestro equipo te contacta' },
              { icon: Shield, title: 'Datos Protegidos', desc: 'Conexiones encriptadas' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2">
                <item.icon className="h-5 w-5 text-[#2dd4ff]" />
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg bg-[#2dd4ff] flex items-center justify-center">
                  <Image src="/logo-icon.png" alt="Q" width={16} height={16} className="h-4 w-auto" />
                </div>
                <span className="text-sm font-bold text-white">QORE</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                La plataforma de control de asistencia con QR y GPS para empresas modernas.
              </p>
              <a href="https://www.linkedin.com/company/qoreapp/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-500 hover:text-[#2dd4ff] hover:border-[#2dd4ff]/30 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Producto</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Caracteristicas', href: '#features' },
                  { label: 'Como Funciona', href: '#how-it-works' },
                  { label: 'Precios', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-slate-500 hover:text-white transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Politica de Privacidad', href: '/privacidad' },
                  { label: 'Terminos de Servicio', href: '/terminos' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-500 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contacto</h4>
              <a href="mailto:contacto@qore.io" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                contacto@qore.io
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-white/5 gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} QORE Systems. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="text-xs text-slate-500 hover:text-white transition-colors">Privacidad</Link>
              <Link href="/terminos" className="text-xs text-slate-500 hover:text-white transition-colors">Terminos</Link>
              <a href="mailto:contacto@qore.io" className="text-xs text-slate-500 hover:text-white transition-colors">contacto@qore.io</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
