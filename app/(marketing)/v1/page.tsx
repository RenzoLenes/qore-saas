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
  Smartphone,
  ScanLine,
  CircleDot,
  Zap,
} from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'QORE — Control de Asistencia Inteligente | Variante A',
};

export default function LandingV1() {
  return (
    <div className="min-h-screen bg-[#fafbff] text-slate-900 overflow-hidden">
      {/* ─── Navigation — Pill style ─────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div className="flex h-14 w-full max-w-4xl items-center justify-between rounded-full bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-lg shadow-slate-200/30 px-2 pl-5">
          <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-6 w-auto dark:invert" />

          <div className="hidden md:flex items-center gap-7">
            <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Producto</a>
            <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Proceso</a>
            <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Precios</a>
            <a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <a
            href="#waitlist"
            className="flex h-10 items-center rounded-full bg-[#000d2a] px-5 text-sm font-semibold text-white hover:bg-[#001a4d] transition-colors"
          >
            Solicitar Demo
          </a>
        </div>
      </nav>

      {/* ─── Hero — Centered with floating cards at viewport edges ─── */}
      <section className="relative pt-28 pb-32 lg:pt-40 lg:pb-48">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-[#fafbff] to-white" />

        {/* Grid with perspective depth effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          {/* Radial fade so grid fades from center out */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, #f0f7ff 70%, white 100%)',
          }} />
        </div>

        {/* Center content */}
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col items-center text-center">

            {/* Headline */}
            <h1 className="animate-fade-in-up text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Registra, Valida,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Controla</span>
                <span className="absolute inset-0 bg-[#2dd4ff]/15 -skew-x-2 rounded-md" />
              </span>
              {' '}tu Asistencia
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl">
              Validacion en tiempo real con QR y GPS. Elimina el fraude de asistencia, automatiza reportes y simplifica la nomina.
            </p>

            {/* CTA */}
            <div className="animate-fade-in-up delay-300 mt-10">
              <a
                href="#waitlist"
                className="group inline-flex h-13 items-center rounded-full bg-[#000d2a] px-8 text-base font-semibold text-white shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:bg-[#001a4d] transition-all duration-300"
              >
                Solicitar Demo Gratis
                <ArrowRight className="ml-2.5 h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in-up delay-500 mt-10 flex items-center gap-3 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
                  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                ].map((src, i) => (
                  <img key={i} alt="" className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src={`${src}?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`} />
                ))}
              </div>
              <span className="text-slate-400">Confiado por <strong className="text-slate-600">+50 empresas</strong></span>
            </div>
          </div>
        </div>

        {/* ─── Floating Cards — positioned to viewport edges ─── */}

        {/* Card: QR Scan — top left corner */}
        <div className="hidden lg:block absolute top-32 xl:top-36 left-6 xl:left-[5%] 2xl:left-[10%] animate-float z-0">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 w-52">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2dd4ff]/10">
                <QrCode className="h-4.5 w-4.5 text-[#0891b2]" />
              </div>
              <span className="text-xs font-bold text-slate-700">Escaneo QR</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 bg-slate-100 rounded-full w-full" />
              <div className="h-2 bg-slate-100 rounded-full w-3/4" />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-600">Validado</span>
            </div>
            {/* Small pill below card */}
            <div className="mt-3 inline-flex items-center gap-1.5 bg-slate-50 rounded-full px-2.5 py-1 border border-slate-100">
              <Clock className="h-3 w-3 text-[#0891b2]" />
              <span className="text-[10px] font-bold text-slate-500">&lt;2s registro</span>
            </div>
          </div>
        </div>

        {/* Card: GPS Badge — top right corner */}
        <div className="hidden lg:block absolute top-28 xl:top-32 right-6 xl:right-[5%] 2xl:right-[10%] animate-float z-0" style={{ animationDelay: '1s' }}>
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 w-48">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <MapPin className="h-4.5 w-4.5 text-emerald-500" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Ubicacion</span>
                <span className="text-xs font-bold text-slate-700">Validada</span>
              </div>
            </div>
            <div className="h-16 rounded-lg bg-slate-50 flex items-center justify-center">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-[#2dd4ff]/10 flex items-center justify-center">
                  <CircleDot className="h-4 w-4 text-[#0891b2]" />
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#2dd4ff]/30 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card: Attendance notification — bottom left */}
        <div className="hidden lg:block absolute bottom-24 xl:bottom-28 left-6 xl:left-[5%] 2xl:left-[10%] animate-float z-0" style={{ animationDelay: '2s' }}>
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 w-56">
            <div className="flex items-center gap-3">
              <img
                alt=""
                className="h-10 w-10 rounded-full object-cover"
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">Carlos Mendoza</p>
                <p className="text-[10px] text-slate-400">Desarrollador Senior</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[10px] font-semibold text-emerald-600">Entrada registrada</span>
              <span className="text-[10px] font-bold text-slate-500 font-mono">08:59 AM</span>
            </div>
          </div>
        </div>

        {/* Card: Live metrics — bottom right */}
        <div className="hidden lg:block absolute bottom-20 xl:bottom-24 right-6 xl:right-[5%] 2xl:right-[10%] animate-float z-0" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 w-44">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hoy</span>
            <div className="mt-2 flex items-end gap-1 h-14">
              {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-[#2dd4ff]/60" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-extrabold text-slate-800">94.2%</span>
              <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Presentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Logos ────────────────────────────────────────── */}
      <section className="py-14 border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 mb-8 uppercase tracking-widest">
            Empresas que confian en QORE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {['Constructora Pacifico', 'Grupo Logistico SAC', 'RetailMax Peru', 'MineraVerde', 'TechServices Co.', 'AgroIndustrial Lima'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-sm font-bold text-slate-300 tracking-tight">
                <Building2 className="h-4 w-4" />
                <span className="whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metrics ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '99.8%', label: 'Uptime garantizado', icon: Zap },
              { value: '<2s', label: 'Tiempo de registro', icon: Clock },
              { value: '50+', label: 'Empresas activas', icon: Building2 },
              { value: '100K+', label: 'Registros mensuales', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2 p-6 rounded-2xl bg-slate-50/80">
                <stat.icon className="h-5 w-5 text-[#0891b2] mb-1" />
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32 bg-[#fafbff]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">Producto</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Todo lo que necesitas para gestionar asistencia
            </h2>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Una plataforma integral disenada para operaciones de campo y oficina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: QrCode, title: 'Escaneo QR Dinamico', desc: 'Codigos QR que se regeneran automaticamente. Registro en segundos desde cualquier smartphone.', accent: 'bg-cyan-50 text-cyan-600' },
              { icon: MapPin, title: 'Validacion GPS', desc: 'Geolocalizacion precisa para garantizar presencia fisica. Radio GPS configurable por sede.', accent: 'bg-emerald-50 text-emerald-600' },
              { icon: BarChart3, title: 'Reportes en Tiempo Real', desc: 'Dashboard con metricas al instante. Exporta reportes en Excel, PDF y CSV.', accent: 'bg-violet-50 text-violet-600' },
              { icon: Shield, title: 'Anti-Fraude', desc: 'Deteccion automatica de anomalias. Alertas cuando un registro no cumple las reglas configuradas.', accent: 'bg-amber-50 text-amber-600' },
              { icon: Globe, title: 'Multi-Sede', desc: 'Gestiona multiples ubicaciones desde un solo panel. Ideal para operaciones distribuidas.', accent: 'bg-blue-50 text-blue-600' },
              { icon: Lock, title: 'Seguridad y Permisos', desc: 'Acceso protegido por roles, datos aislados por empresa y conexiones encriptadas.', accent: 'bg-rose-50 text-rose-600' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-100 bg-white p-7 hover:border-[#2dd4ff]/30 hover:shadow-xl hover:shadow-[#2dd4ff]/5 transition-all duration-300"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.accent} mb-5`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ─────────────────────────────────── */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">Proceso</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Operativo en minutos, no en semanas
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Tres pasos para transformar como gestionas la asistencia de tu equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Building2,
                title: 'Configura tus sedes',
                desc: 'Define cada ubicacion, establece el radio GPS y configura los horarios laborales. El sistema genera codigos QR unicos automaticamente.',
                features: ['Radio GPS configurable', 'QR dinamico automatico', 'Horarios flexibles'],
              },
              {
                step: '02',
                icon: Smartphone,
                title: 'Tu equipo escanea',
                desc: 'Los colaboradores escanean el codigo QR de la sede. El sistema valida automaticamente su ubicacion GPS en tiempo real.',
                features: ['Registro en <2 segundos', 'Sin hardware adicional', 'iOS y Android'],
              },
              {
                step: '03',
                icon: BarChart3,
                title: 'Datos al instante',
                desc: 'Visualiza la asistencia en un dashboard en tiempo real. Recibe alertas y exporta reportes en el formato que necesites.',
                features: ['Dashboard en tiempo real', 'Excel, PDF y CSV', 'Alertas automaticas'],
              },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#000d2a] text-white text-sm font-extrabold">
                      {item.step}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2dd4ff]/10">
                      <item.icon className="h-5 w-5 text-[#0891b2]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-800 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{item.desc}</p>

                  <ul className="flex flex-col gap-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                        <Check className="h-3.5 w-3.5 text-[#2dd4ff] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32 bg-[#fafbff]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">Precios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Simple, transparente, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Todos los planes incluyen soporte tecnico y actualizaciones. Sin contratos a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8">
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
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-full border border-slate-200 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Comenzar Prueba
              </a>
            </div>

            {/* Professional */}
            <div className="relative flex flex-col rounded-2xl border-2 border-[#2dd4ff] bg-white p-8 shadow-xl shadow-[#2dd4ff]/8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-[#000d2a] px-3.5 py-1 text-xs font-bold text-white">
                  Mas Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Professional</h3>
                <p className="text-sm text-slate-400">Para empresas en crecimiento</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">$99</span>
                <span className="text-slate-400 ml-1">/mes</span>
                <p className="text-xs text-slate-400 mt-1">Hasta 80 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {['Hasta 3 sedes', 'Todo de Starter +', 'Radio GPS configurable por sede', 'Modulo de nomina', 'Reportes avanzados (Excel, CSV, PDF)', 'Mapa de sedes en tiempo real', 'Soporte prioritario'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-500">
                    <Check className="h-4 w-4 text-[#2dd4ff] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-full bg-[#000d2a] font-semibold text-sm text-white hover:bg-[#001a4d] transition-colors">
                Solicitar Demo
              </a>
            </div>

            {/* Business */}
            <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8">
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
              <a href="#waitlist" className="flex h-11 items-center justify-center rounded-full border border-slate-200 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">Testimonios</span>
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
              <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-7">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-[#2dd4ff]/10 flex items-center justify-center text-[#0891b2] text-sm font-bold">
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
      <section id="faq" className="py-24 lg:py-32 bg-[#fafbff]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { q: '¿Necesito hardware especial para usar QORE?', a: 'No. QORE funciona 100% con smartphones. Solo necesitas un dispositivo para mostrar el QR en cada sede (puede ser una tablet, monitor o incluso un celular viejo). Los empleados escanean con su propio telefono.' },
              { q: '¿Que tan precisa es la validacion GPS?', a: 'La precision depende del dispositivo, pero tipicamente es de 5-15 metros. Puedes configurar el radio de validacion por sede para adaptarlo a tus necesidades.' },
              { q: '¿Que necesitan mis empleados para registrar asistencia?', a: 'Solo un smartphone con camara y conexion a internet. No se requiere instalar ninguna app adicional ni hardware especial.' },
              { q: '¿Puedo exportar los datos de asistencia?', a: 'Si. Puedes exportar reportes de asistencia y nomina en multiples formatos: Excel, CSV y PDF.' },
              { q: '¿Cuanto toma la implementacion?', a: 'La configuracion inicial es muy rapida. En todos los planes puedes crear tus sedes, registrar empleados y empezar a operar en menos de 30 minutos. Para el plan Business, nuestro equipo te acompana en el proceso.' },
              { q: '¿Mis datos estan seguros?', a: 'Si. Tu informacion esta alojada en infraestructura cloud con conexiones encriptadas y acceso protegido por roles. Solo tu y tu equipo autorizado pueden ver los datos de tu empresa.' },
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
      <section id="waitlist" className="relative py-24 lg:py-32 bg-white overflow-hidden">
        {/* Soft glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#2dd4ff]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#0891b2] uppercase mb-4">
              Empieza Hoy
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-slate-900">
              Solicita tu demo personalizada
            </h2>
            <p className="mt-4 text-lg text-slate-500">
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
                <item.icon className="h-5 w-5 text-[#0891b2]" />
                <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-7 w-auto dark:invert" />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                La plataforma de control de asistencia con QR y GPS para empresas modernas.
              </p>
              <a href="https://www.linkedin.com/company/qoreapp/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-[#0891b2] hover:border-[#2dd4ff]/30 transition-colors">
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
