import {
  QrCode,
  MapPin,
  Clock,
  BarChart3,
  Shield,
  Building2,
  CheckCircle,
  ArrowRight,
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
  ChevronRight,
  TrendingUp,
  Calendar,
  Download,
  CalendarCheck,
  UserX,
  LogOut,
} from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'QORE — Control de Asistencia Inteligente | Variante B',
};

export default function LandingV2() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* ─── Navigation — Transparent ─────────────────────── */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-7 w-auto dark:invert" />

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Producto</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Proceso</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Precios</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex h-9 items-center px-4 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Iniciar Sesion
            </Link>
            <a
              href="#waitlist"
              className="flex h-9 items-center rounded-lg border border-[#2dd4ff] bg-[#2dd4ff]/10 px-5 text-sm font-semibold text-[#0891b2] hover:bg-[#2dd4ff] hover:text-[#000d2a] transition-colors"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero — Atmospheric sky bg + Dashboard below ── */}
      <section className="relative pt-28 pb-0 lg:pt-36 lg:pb-0">
        {/* Cloud sky background — brightened & desaturated + cyan tint */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[1.1] saturate-[0.5]"
          style={{ backgroundImage: 'url(/hero-clouds.webp)' }}
        />
        <div className="absolute inset-0 bg-[#2dd4ff]/15" />

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-white via-white/90 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Center text — clean hierarchy like Sun Velly */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.15] text-slate-900">
              El SaaS de Asistencia
              <br />
              con QR + GPS para tu Empresa
            </h1>

            <p className="animate-fade-in-up delay-200 mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg">
              Elimina el fraude, automatiza reportes y simplifica la nomina.
            </p>

            <div className="animate-fade-in-up delay-300 mt-7">
              <a
                href="#waitlist"
                className="inline-flex h-11 items-center rounded-lg bg-[#2dd4ff] px-7 text-sm font-semibold text-white shadow-md shadow-[#2dd4ff]/20 hover:bg-[#1ab8e0] hover:shadow-[#2dd4ff]/30 transition-all"
              >
                Solicitar Demo Gratis
              </a>
            </div>
          </div>

          {/* ─── Dashboard Mockup — real design, cut off at bottom ────── */}
          <div className="animate-blur-in delay-300 mt-14 mx-auto max-w-5xl relative">
            <div className="relative max-h-[520px] overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}>
            <div className="rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden flex">
              {/* Sidebar — matches real Sidebar.tsx (light theme) */}
              <div className="hidden md:flex flex-col w-52 bg-white border-r border-slate-200 flex-shrink-0">
                {/* Logo */}
                <div className="flex items-center justify-center px-4 h-12 border-b border-slate-200">
                  <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-7 w-auto" />
                </div>

                {/* Nav — real 5 items */}
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
                          : 'text-slate-400'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Bottom — logout */}
                <div className="mt-auto border-t border-slate-200 p-3">
                  <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] font-medium text-slate-400">
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesion
                  </div>
                </div>
              </div>

              {/* Main area */}
              <div className="flex-1 flex flex-col bg-[#f8fafc]">
                {/* Topbar — matches real Topbar.tsx */}
                <div className="flex items-center justify-between px-5 h-12 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-700">Empresa Demo SAC</span>
                  </div>
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

                {/* Content */}
                <div className="flex-1 p-5">
                  {/* Page header */}
                  <div className="mb-5">
                    <h2 className="text-sm font-extrabold text-slate-800">Dashboard</h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Resumen general de asistencia</p>
                  </div>

                  {/* Stat cards — real 4 metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: 'Asistencias Hoy', value: '47', sub: '94%', icon: CalendarCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { label: 'Ausentes Hoy', value: '3', sub: '2 con permiso', icon: UserX, color: 'text-amber-500', bg: 'bg-amber-50' },
                      { label: 'Sedes Activas', value: '4/5', sub: '80% operativas', icon: MapPin, color: 'text-violet-500', bg: 'bg-violet-50' },
                      { label: 'Puntualidad', value: '91%', sub: '+3.2%', icon: Clock, color: 'text-[#2dd4ff]', bg: 'bg-cyan-50' },
                    ].map((m) => (
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

                  {/* Chart + Activity — 2/3 + 1/3 like real layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Weekly Chart — col-span-2 */}
                    <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-semibold text-slate-700">Asistencia Semanal</span>
                        <div className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold">
                          <TrendingUp className="h-3 w-3" />
                          +5.4%
                        </div>
                      </div>
                      <div className="flex items-end gap-2 h-28">
                        {[
                          { h: 72, d: 'Lun', v: 36 },
                          { h: 88, d: 'Mar', v: 44 },
                          { h: 93, d: 'Mie', v: 47 },
                          { h: 65, d: 'Jue', v: 33 },
                          { h: 96, d: 'Vie', v: 48 },
                          { h: 42, d: 'Sab', v: 21 },
                          { h: 80, d: 'Hoy', v: 40 },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[7px] text-slate-400 font-medium">{bar.v}</span>
                            <div className="w-full rounded-md bg-[#2dd4ff]/15 relative overflow-hidden">
                              <div className="w-full rounded-md bg-[#2dd4ff]" style={{ height: `${bar.h}px` }} />
                            </div>
                            <span className="text-[8px] text-slate-400 font-medium">{bar.d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity Feed — col-span-1 */}
                    <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-semibold text-slate-700">Ultimas Asistencias</span>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      </div>
                      <div className="flex flex-col">
                        {[
                          { name: 'M. Torres', location: 'Sede Central', time: '08:59', status: 'Puntual' },
                          { name: 'L. Garcia', location: 'Sede Norte', time: '09:02', status: 'Puntual' },
                          { name: 'P. Ruiz', location: 'Sede Central', time: '09:15', status: 'Tardanza' },
                          { name: 'A. Lopez', location: 'Sede Sur', time: '09:07', status: 'Puntual' },
                        ].map((a, i) => (
                          <div key={i} className="flex items-center gap-2 py-2 border-t border-slate-100 first:border-0">
                            <div className="h-6 w-6 rounded-full bg-[#000d2a] flex items-center justify-center text-[8px] font-bold text-[#2dd4ff]">
                              {a.name.split(' ').map(n => n[0]).join('')}
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

            </div>{/* close fade mask wrapper */}
          </div>
        </div>
      </section>

      {/* ─── Logos ────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 mb-8 uppercase tracking-widest">
            Empresas que confian en QORE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {['Constructora Pacifico', 'Grupo Logistico SAC', 'RetailMax Peru', 'MineraVerde', 'TechServices Co.', 'AgroIndustrial Lima'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-sm font-bold text-slate-300">
                <Building2 className="h-4 w-4" />
                <span className="whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metrics ──────────────────────────────────────── */}
      <section className="py-16 bg-[#000d2a]">
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
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4 block">Producto</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 mb-6">
                Todo lo que necesitas para gestionar asistencia
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Una plataforma integral disenada para operaciones de campo y oficina.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: QrCode, title: 'Escaneo QR', desc: 'Codigos QR que se regeneran. Registro en segundos.', color: 'text-cyan-500 bg-cyan-50' },
                  { icon: MapPin, title: 'Validacion GPS', desc: 'Presencia fisica verificada. Radio configurable.', color: 'text-emerald-500 bg-emerald-50' },
                  { icon: BarChart3, title: 'Reportes', desc: 'Dashboard en tiempo real. Excel, PDF, CSV.', color: 'text-violet-500 bg-violet-50' },
                  { icon: Shield, title: 'Anti-Fraude', desc: 'Deteccion automatica de anomalias y alertas.', color: 'text-amber-500 bg-amber-50' },
                  { icon: Globe, title: 'Multi-Sede', desc: 'Gestiona todas tus ubicaciones desde un panel.', color: 'text-blue-500 bg-blue-50' },
                  { icon: Lock, title: 'Seguridad', desc: 'Roles, datos aislados, conexiones encriptadas.', color: 'text-rose-500 bg-rose-50' },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.color} flex-shrink-0`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-0.5">{f.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="relative flex justify-center">
              <div className="relative border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[540px] w-[270px] shadow-2xl shadow-black/10 flex flex-col overflow-hidden">
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001338] to-[#000d2a]" />

                  {/* Status bar */}
                  <div className="absolute top-0 w-full px-5 py-3 flex justify-between items-center text-white z-20 text-[10px]">
                    <span className="font-medium">9:41</span>
                    <div className="flex gap-0.5 opacity-60">
                      <div className="w-4 h-2 rounded-sm bg-white" />
                      <div className="w-4 h-2 rounded-sm bg-white/50" />
                      <div className="w-5 h-2 rounded-sm border border-white/50 flex items-center justify-end pr-0.5"><div className="w-2.5 h-1 rounded-sm bg-emerald-400" /></div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="absolute top-10 left-0 right-0 px-5 z-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-white/50">Buenos dias</p>
                        <p className="text-xs font-bold text-white">Carlos M.</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-[#2dd4ff]/20 flex items-center justify-center">
                        <Bell className="h-3.5 w-3.5 text-[#2dd4ff]" />
                      </div>
                    </div>
                  </div>

                  {/* Sede card */}
                  <div className="absolute top-24 left-4 right-4 z-20">
                    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-3">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="h-7 w-7 rounded-lg bg-[#2dd4ff]/10 flex items-center justify-center">
                          <Building2 className="h-3.5 w-3.5 text-[#2dd4ff]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white">Sede Central</p>
                          <p className="text-[8px] text-white/50">Lima, Peru</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                          <div className="h-1 w-1 rounded-full bg-emerald-400" />
                          <span className="text-[8px] text-emerald-400 font-medium">En rango</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Scanner area */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 mt-10">
                    <div className="relative w-36 h-36 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border-2 border-[#2dd4ff]/30 rounded-2xl" />
                      <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#2dd4ff] rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#2dd4ff] rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#2dd4ff] rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#2dd4ff] rounded-br-xl" />

                      <div className="absolute inset-0 p-4 flex items-center justify-center">
                        <QrCode className="w-full h-full text-[#2dd4ff] opacity-70" strokeWidth={1.2} />
                      </div>

                      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2dd4ff] to-transparent shadow-[0_0_15px_rgba(45,212,255,0.8)] animate-scan" />
                    </div>

                    <p className="mt-4 text-[10px] text-white/50 font-medium">Escanea el codigo QR de tu sede</p>
                  </div>

                  {/* Bottom sheet */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-30">
                    <div className="w-8 h-0.5 bg-slate-200 rounded-full mx-auto mb-3" />
                    <div className="flex items-center gap-3 mb-3">
                      <img alt="" className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" />
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-800">Carlos Mendoza</p>
                        <p className="text-[9px] text-slate-400">Desarrollador Senior</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="text-[10px] font-semibold text-emerald-600">Entrada registrada</span>
                      <span className="text-[10px] font-bold text-slate-500 font-mono">08:59 AM</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 h-5 w-full flex items-center justify-center">
                  <div className="w-1/3 h-0.5 bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-[350px] w-[350px] rounded-full bg-[#2dd4ff]/6 blur-[80px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it Works ─────────────────────────────────── */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Proceso</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Operativo en minutos, no en semanas
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Tres pasos para transformar como gestionas la asistencia de tu equipo.
            </p>
          </div>

          {/* Horizontal steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-slate-200 via-[#2dd4ff]/30 to-slate-200" />

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
                  {/* Circle number */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-[#2dd4ff] text-[#000d2a] font-extrabold text-sm shadow-lg shadow-[#2dd4ff]/10 mb-6">
                    {item.step}
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2dd4ff]/10 mb-4">
                    <item.icon className="h-5 w-5 text-[#0891b2]" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 max-w-xs">{item.desc}</p>

                  <ul className="flex flex-col gap-1.5 items-center">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-sm text-slate-500">
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
      <section id="pricing" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Precios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Simple, transparente, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Todos los planes incluyen soporte tecnico y actualizaciones. Sin contratos a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Starter</h3>
                <p className="text-sm text-slate-400">Para equipos pequenos</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">$49</span>
                <span className="text-slate-400 ml-1">/mes</span>
                <p className="text-xs text-slate-400 mt-1">Hasta 30 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['1 sede', 'Registro con QR + GPS', 'Dashboard de asistencia', 'Reportes en Excel', 'Gestion de trabajadores', 'Soporte por email'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-500">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Comenzar Prueba
              </a>
            </div>

            {/* Professional */}
            <div className="relative flex flex-col rounded-2xl bg-[#000d2a] p-8 shadow-xl text-white">
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
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-lg bg-[#2dd4ff] font-semibold text-sm text-[#000d2a] hover:bg-[#1ab8e0] transition-colors">
                Solicitar Demo
              </a>
            </div>

            {/* Business */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Business</h3>
                <p className="text-sm text-slate-400">Para operaciones grandes</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">$149</span>
                <span className="text-slate-400 ml-1">/mes</span>
                <p className="text-xs text-slate-400 mt-1">Hasta 200 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['Sedes ilimitadas', 'Todo de Professional +', 'Roles y permisos por sede', 'Multi-administrador', 'Exportacion automatizada', 'Alertas por email', 'Soporte dedicado'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-500">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">Testimonios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: 'QORE elimino por completo el fraude de asistencia en nuestras obras. Los reportes automaticos nos ahorran 15 horas semanales.', name: 'Carlos Mendoza', role: 'Gerente de Operaciones', company: 'Constructora Pacifico' },
              { quote: 'La implementacion fue increiblemente rapida. En menos de un dia teniamos todas nuestras sedes configuradas y el equipo usando la app.', name: 'Lucia Fernandez', role: 'Directora de RRHH', company: 'Grupo Logistico SAC' },
              { quote: 'La validacion GPS nos da tranquilidad total. Sabemos exactamente quien esta en cada tienda y a que hora.', name: 'Andres Villarreal', role: 'COO', company: 'RetailMax Peru' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-[#000d2a] flex items-center justify-center text-[#2dd4ff] text-sm font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2dd4ff] uppercase mb-4">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { q: '¿Necesito hardware especial para usar QORE?', a: 'No. QORE funciona 100% con smartphones. Solo necesitas un dispositivo para mostrar el QR en cada sede. Los empleados escanean con su propio telefono.' },
              { q: '¿Que tan precisa es la validacion GPS?', a: 'Tipicamente 5-15 metros. Puedes configurar el radio de validacion por sede para adaptarlo a tus necesidades.' },
              { q: '¿Que necesitan mis empleados para registrar asistencia?', a: 'Solo un smartphone con camara y conexion a internet. No se requiere instalar ninguna app adicional ni hardware especial.' },
              { q: '¿Puedo exportar los datos de asistencia?', a: 'Si. Puedes exportar reportes en multiples formatos: Excel, CSV y PDF.' },
              { q: '¿Cuanto toma la implementacion?', a: 'En todos los planes puedes crear tus sedes, registrar empleados y empezar a operar en menos de 30 minutos. Para Business, nuestro equipo te acompana.' },
              { q: '¿Mis datos estan seguros?', a: 'Si. Infraestructura cloud con conexiones encriptadas y acceso protegido por roles. Solo tu equipo autorizado puede ver tus datos.' },
            ].map((faq, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-slate-800 [&::-webkit-details-marker]:hidden list-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-slate-300 flex-shrink-0 ml-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed pr-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Waitlist ────────────────────────────────── */}
      <section id="waitlist" className="relative py-24 lg:py-32 bg-[#000d2a] overflow-hidden">
        {/* Glow */}
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
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-7 w-auto dark:invert" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                La plataforma de control de asistencia con QR y GPS para empresas modernas.
              </p>
              <a href="https://www.linkedin.com/company/qoreapp/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-[#0891b2] hover:border-[#2dd4ff]/30 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Producto</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Caracteristicas', href: '#features' },
                  { label: 'Como Funciona', href: '#how-it-works' },
                  { label: 'Precios', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-slate-400 hover:text-slate-700 transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Politica de Privacidad', href: '/privacidad' },
                  { label: 'Terminos de Servicio', href: '/terminos' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-slate-700 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Contacto</h4>
              <a href="mailto:contacto@qore.io" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors">
                <Mail className="h-4 w-4" />
                contacto@qore.io
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-slate-100 gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} QORE Systems. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Privacidad</Link>
              <Link href="/terminos" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Terminos</Link>
              <a href="mailto:contacto@qore.io" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">contacto@qore.io</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
