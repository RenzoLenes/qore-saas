import {
  QrCode,
  MapPin,
  Clock,
  BarChart3,
  Shield,
  Building2,
  CheckCircle,
  Rocket,
  ArrowRight,
  Zap,
  Users,
  FileText,
  ChevronDown,
  Globe,
  Lock,
  Smartphone,
  Check,
  Minus,
  Star,
  Linkedin,
  Mail,
  Phone,
  Signal,
  Wifi,
  Battery,
} from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Navigation ─────────────────────────────────── */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-8 w-auto" />

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors">Producto</a>
            <a href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors">Cómo Funciona</a>
            <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors">Precios</a>
            <a href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex h-9 items-center px-4 text-sm font-medium text-[var(--text-secondary)] hover:text-foreground transition-colors"
            >
              Iniciar Sesión
            </Link>
            <a
              href="#waitlist"
              className="flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-slate-900 hover:bg-brand-dark transition-colors"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 dark:opacity-20" />

        {/* Radial Glow */}
        <div className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-brand/8 blur-[120px]" />
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 max-w-2xl">
              {/* Badge */}
              <div className="animate-fade-in inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-medium text-brand">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand"></span>
                </span>
                Acceso Anticipado — Plazas Limitadas
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Control de asistencia{' '}
                <span className="text-gradient-brand">que realmente funciona</span>
              </h1>

              {/* Sub */}
              <p className="animate-fade-in-up delay-200 text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
                Validación en tiempo real con QR y GPS. Elimina el fraude de asistencia,
                automatiza reportes y simplifica la nómina.
              </p>

              {/* CTAs */}
              <div className="animate-fade-in-up delay-300 flex flex-wrap gap-4 pt-2">
                <a
                  href="#waitlist"
                  className="group flex h-12 items-center rounded-xl bg-brand px-7 text-base font-semibold text-slate-900 shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:bg-brand-dark transition-all duration-200"
                >
                  <Rocket className="mr-2.5 h-4.5 w-4.5" />
                  Solicitar Demo Gratis
                  <ArrowRight className="ml-2 h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="flex h-12 items-center rounded-xl border border-border bg-surface-raised px-7 text-base font-semibold text-foreground hover:bg-surface transition-all"
                >
                  Cómo Funciona
                </a>
              </div>

              {/* Social Proof Mini */}
              <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 text-sm text-[var(--text-muted)]">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
                    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                  ].map((src, i) => (
                    <img
                      key={i}
                      alt=""
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
                      src={`${src}?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>Confiado por +50 empresas</span>
                </div>
              </div>
            </div>

            {/* Right Content — Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Floating Badge - Location */}
              <div className="absolute top-20 left-0 lg:left-10 z-20 animate-float">
                <div className="flex items-center gap-2.5 rounded-xl bg-surface-raised p-3 shadow-xl border border-border backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-xs">
                    <span className="block text-[var(--text-muted)] font-medium">Ubicación</span>
                    <span className="font-bold">Validada</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Time */}
              <div className="absolute bottom-40 right-0 z-20 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2.5 rounded-xl bg-surface-raised p-3 shadow-xl border border-border backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-xs">
                    <span className="block text-[var(--text-muted)] font-medium">Registro</span>
                    <span className="font-bold">Tiempo Real</span>
                  </div>
                </div>
              </div>

              {/* Phone Container */}
              <div className="animate-blur-in delay-300 relative z-10 mx-auto border-gray-900 dark:border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl shadow-black/20 dark:shadow-black/50 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                {/* Phone Screen */}
                <div className="relative flex-1 bg-slate-800 overflow-hidden w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                  {/* Top Bar */}
                  <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center text-white z-20 text-xs">
                    <span className="font-medium">9:41</span>
                    <div className="flex gap-1">
                      <Signal className="h-4 w-4" />
                      <Wifi className="h-4 w-4" />
                      <Battery className="h-4 w-4" />
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="absolute top-12 left-0 right-0 flex justify-center z-20">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-white" />
                      <span className="text-white text-xs font-semibold">Sede Central — Lima</span>
                    </div>
                  </div>

                  {/* Scanner UI */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(45,212,255,0.3),0_0_60px_rgba(45,212,255,0.1)]">
                      {/* Outer glow border */}
                      <div className="absolute inset-0 rounded-2xl border border-brand/40" />
                      <div className="absolute inset-[3px] rounded-xl border border-brand/20 bg-white/5 backdrop-blur-sm" />

                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-brand rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-brand rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-brand rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-brand rounded-br-xl" />

                      {/* QR dot pattern */}
                      <div className="absolute inset-0 p-5 flex items-center justify-center">
                        <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-[3px] opacity-80">
                          {[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0].map((filled, i) => (
                            <div key={i} className={`rounded-[2px] ${filled ? 'bg-brand' : 'bg-transparent'}`} />
                          ))}
                        </div>
                      </div>

                      {/* Scan line — wider glow */}
                      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_20px_8px_rgba(45,212,255,0.6)] animate-scan" />
                    </div>

                    <div className="mt-6 flex items-center gap-2 bg-emerald-500/90 text-white px-3.5 py-2 rounded-full shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-bold tracking-wide">UBICACIÓN VALIDADA</span>
                    </div>
                  </div>

                  {/* Bottom Sheet — Success state */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-raised/90 backdrop-blur-xl rounded-t-2xl p-5 z-30">
                    <div className="w-10 h-1 bg-slate-300/50 rounded-full mx-auto mb-4" />
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          alt="Employee"
                          className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Carlos Mendoza</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-300">Desarrollador Senior</p>
                      </div>
                      <div className="bg-emerald-500/10 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                    </div>
                    <div className="mt-3 border-t border-slate-200/50 dark:border-slate-700/50 pt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Entrada registrada</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">08:59 AM</span>
                    </div>
                  </div>
                </div>

                {/* Home Bar */}
                <div className="bg-gray-900 h-6 w-full flex items-center justify-center">
                  <div className="w-1/3 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-[400px] w-[400px] rounded-full bg-brand/8 blur-[80px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof — Logos ────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-[var(--text-muted)] mb-10 uppercase tracking-wider">
            Empresas que confían en QORE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-50">
            {[
              'Constructora Pacífico',
              'Grupo Logístico SAC',
              'RetailMax Perú',
              'MineraVerde',
              'TechServices Co.',
              'AgroIndustrial Lima',
            ].map((company) => (
              <div
                key={company}
                className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] tracking-tight"
              >
                <Building2 className="h-5 w-5" />
                <span className="whitespace-nowrap">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metrics Bar ────────────────────────────────── */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '99.8%', label: 'Uptime garantizado', icon: Zap },
              { value: '<2s', label: 'Tiempo de registro', icon: Clock },
              { value: '50+', label: 'Empresas activas', icon: Building2 },
              { value: '100K+', label: 'Registros mensuales', icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <stat.icon className="h-5 w-5 text-brand mb-1" />
                <p className="text-3xl font-extrabold tracking-tight lg:text-4xl">{stat.value}</p>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────── */}
      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">Producto</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Todo lo que necesitas para gestionar asistencia
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              Una plataforma integral diseñada para operaciones de campo y oficina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: QrCode,
                title: 'Escaneo QR Dinámico',
                desc: 'Códigos QR que se regeneran automáticamente. Registro en segundos desde cualquier smartphone.',
                color: 'text-cyan-400 bg-cyan-400/10',
              },
              {
                icon: MapPin,
                title: 'Validación GPS',
                desc: 'Geolocalización precisa para garantizar presencia física. Geofencing configurable por sede.',
                color: 'text-emerald-400 bg-emerald-400/10',
              },
              {
                icon: BarChart3,
                title: 'Reportes en Tiempo Real',
                desc: 'Dashboard con métricas al instante. Exporta reportes en Excel, PDF y CSV.',
                color: 'text-violet-400 bg-violet-400/10',
              },
              {
                icon: Shield,
                title: 'Anti-Fraude',
                desc: 'Detección automática de anomalías. Alertas cuando un registro no cumple las reglas configuradas.',
                color: 'text-amber-400 bg-amber-400/10',
              },
              {
                icon: Globe,
                title: 'Multi-Sede',
                desc: 'Gestiona múltiples ubicaciones desde un solo panel. Ideal para operaciones distribuidas.',
                color: 'text-blue-400 bg-blue-400/10',
              },
              {
                icon: Lock,
                title: 'Seguridad y Permisos',
                desc: 'Acceso protegido por roles, datos aislados por empresa y conexiones encriptadas. Solo tu equipo autorizado ve tu información.',
                color: 'text-rose-400 bg-rose-400/10',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-surface-raised p-7 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.color} mb-5`}>
                  <feature.icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ───────────────────────────────── */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-surface border-y border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">Proceso</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Operativo en minutos, no en semanas
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Tres pasos para transformar cómo gestionas la asistencia de tu equipo.
            </p>
          </div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical connector line — desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-brand/30 to-border -translate-x-1/2" />

            {/* Step 1 — Image Left, Text Right */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-20 lg:pb-28">
              {/* Connector dot */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm shadow-lg shadow-brand/30 ring-4 ring-surface">
                01
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="rounded-2xl border border-border bg-surface-raised overflow-hidden shadow-lg">
                  {/* Mini browser bar */}
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-background">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <div className="flex-1 mx-3">
                      <div className="mx-auto max-w-[200px] h-5 rounded bg-border/50 flex items-center justify-center">
                        <span className="text-[9px] text-[var(--text-muted)] font-mono">app.qore.io/sedes</span>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold">Configuración de Sede</span>
                      <span className="text-[10px] font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full">Nueva</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-lg border border-border p-3 bg-background">
                        <Building2 className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[11px] text-[var(--text-muted)]">Nombre de sede</div>
                          <div className="text-xs font-medium">Oficina Central — Lima</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-3 bg-background">
                        <MapPin className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[11px] text-[var(--text-muted)]">Radio GPS</div>
                          <div className="text-xs font-medium">150 metros</div>
                        </div>
                        <div className="h-6 w-14 rounded-full bg-brand flex items-center justify-end px-0.5">
                          <div className="h-5 w-5 rounded-full bg-white shadow-sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-3 bg-background">
                        <Clock className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[11px] text-[var(--text-muted)]">Horario laboral</div>
                          <div className="text-xs font-medium">Lun-Vie · 08:00 — 18:00</div>
                        </div>
                      </div>
                      <div className="rounded-xl border-2 border-dashed border-brand/30 bg-brand/5 p-4 flex flex-col items-center gap-2">
                        <QrCode className="h-8 w-8 text-brand" />
                        <span className="text-[10px] font-semibold text-brand">QR generado automáticamente</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand/5 blur-xl" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4 lg:pl-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm">01</div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Configura tus sedes en minutos
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Define cada ubicación de tu empresa, establece el radio GPS para validación de presencia y configura los horarios laborales. El sistema genera códigos QR únicos automáticamente.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {['Geofencing configurable por sede', 'QR dinámico con renovación automática', 'Horarios flexibles por día'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check className="h-4 w-4 text-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 2 — Text Left, Image Right */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-20 lg:pb-28">
              {/* Connector dot */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm shadow-lg shadow-brand/30 ring-4 ring-surface">
                02
              </div>

              {/* Text — appears first on mobile, second on desktop */}
              <div className="flex flex-col gap-4 lg:pr-8 order-2 lg:order-1">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm">02</div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Tu equipo escanea desde su celular
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Los colaboradores abren la app QORE y escanean el código QR de la sede. El sistema valida automáticamente su ubicación GPS en tiempo real. Sin hardware adicional, sin filas, sin contacto.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {['Registro en menos de 2 segundos', 'Sin hardware adicional', 'Compatible con iOS y Android'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check className="h-4 w-4 text-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual — Phone scanning */}
              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="relative border-gray-900 dark:border-gray-800 bg-gray-900 border-[10px] rounded-[2rem] h-[420px] w-[210px] shadow-xl flex flex-col overflow-hidden">
                  <div className="relative flex-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

                    {/* Status bar */}
                    <div className="absolute top-0 w-full px-4 py-2.5 flex justify-between items-center text-white z-20 text-[10px]">
                      <span className="font-medium">9:41</span>
                      <div className="flex gap-0.5">
                        <Signal className="h-3 w-3" />
                        <Wifi className="h-3 w-3" />
                        <Battery className="h-3 w-3" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="absolute top-8 left-0 right-0 flex justify-center z-20">
                      <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-white" />
                        <span className="text-white text-[9px] font-semibold">Sede Central</span>
                      </div>
                    </div>

                    {/* Scanner */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <div className="relative w-32 h-32 border-2 border-brand/50 rounded-lg bg-white/5 overflow-hidden shadow-[0_0_15px_rgba(45,212,255,0.4)]">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-[3px] border-l-[3px] border-brand rounded-tl" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-[3px] border-r-[3px] border-brand rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[3px] border-l-[3px] border-brand rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[3px] border-r-[3px] border-brand rounded-br" />
                        <div className="w-full h-full p-4 flex items-center justify-center">
                          <QrCode className="w-full h-full text-brand opacity-80" strokeWidth={1.5} />
                        </div>
                        <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_10px_rgba(45,212,255,1)] animate-scan" />
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 bg-emerald-500/90 text-white px-2.5 py-1 rounded-full shadow-lg">
                        <CheckCircle className="h-3 w-3" />
                        <span className="text-[9px] font-bold tracking-wide">GPS VALIDADO</span>
                      </div>
                    </div>

                    {/* Bottom card */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-t-xl p-3 z-30">
                      <div className="flex items-center gap-3">
                        <img alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-700" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-slate-800 dark:text-white truncate">Carlos Mendoza</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">Entrada · 08:59 AM</p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900 h-4 w-full flex items-center justify-center">
                    <div className="w-1/3 h-0.5 bg-gray-700 rounded-full" />
                  </div>
                </div>

                {/* Floating badges around phone */}
                <div className="absolute -left-2 top-16 animate-float">
                  <div className="flex items-center gap-2 rounded-lg bg-surface-raised px-3 py-2 shadow-lg border border-border text-[11px]">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold">GPS ✓</span>
                  </div>
                </div>
                <div className="absolute -right-2 bottom-28 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2 rounded-lg bg-surface-raised px-3 py-2 shadow-lg border border-border text-[11px]">
                    <QrCode className="h-3 w-3 text-brand" />
                    <span className="font-semibold">QR leído</span>
                  </div>
                </div>

                <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand/5 blur-xl" />
              </div>
            </div>

            {/* Step 3 — Image Left, Text Right */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Connector dot */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm shadow-lg shadow-brand/30 ring-4 ring-surface">
                03
              </div>

              {/* Visual — Dashboard */}
              <div className="relative">
                <div className="rounded-2xl border border-border bg-surface-raised overflow-hidden shadow-lg">
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-background">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <div className="flex-1 mx-3">
                      <div className="mx-auto max-w-[200px] h-5 rounded bg-border/50 flex items-center justify-center">
                        <span className="text-[9px] text-[var(--text-muted)] font-mono">app.qore.io/dashboard</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    {/* Metric cards */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Presentes', value: '94.2%', color: 'text-emerald-500' },
                        { label: 'Registros', value: '1,847', color: 'text-brand' },
                        { label: 'Alertas', value: '3', color: 'text-amber-500' },
                      ].map((m) => (
                        <div key={m.label} className="rounded-lg border border-border bg-background p-3 text-center">
                          <p className={`text-lg font-extrabold ${m.color}`}>{m.value}</p>
                          <p className="text-[9px] text-[var(--text-muted)] mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Chart */}
                    <div className="rounded-lg border border-border bg-background p-3 mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-semibold">Asistencia Semanal</span>
                        <span className="text-[9px] text-[var(--text-muted)]">Últimos 7 días</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-20">
                        {[72, 88, 93, 65, 96, 91, 94].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                            <div className="w-full rounded-sm bg-brand/60" style={{ height: `${h}%` }} />
                            <span className="text-[7px] text-[var(--text-muted)]">{['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Activity */}
                    <div className="rounded-lg border border-border bg-background p-3">
                      <span className="text-[10px] font-semibold block mb-2">Actividad en vivo</span>
                      {[
                        { name: 'M. Torres', time: '08:59', ok: true },
                        { name: 'L. García', time: '09:02', ok: true },
                        { name: 'P. Ruiz', time: '09:05', ok: false },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5 border-t border-border/50 first:border-0">
                          <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${a.ok ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                          <span className="text-[10px] font-medium flex-1">{a.name}</span>
                          <span className="text-[9px] text-[var(--text-muted)]">{a.ok ? 'Entrada' : 'Alerta GPS'}</span>
                          <span className="text-[9px] text-[var(--text-muted)] font-mono">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-brand/5 blur-xl" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4 lg:pl-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-slate-900 font-extrabold text-sm">03</div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Datos y reportes al instante
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Visualiza la asistencia de toda tu operación en un dashboard en tiempo real. Recibe alertas automáticas ante anomalías y exporta reportes en el formato que necesites.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {['Dashboard en tiempo real por sede', 'Exportación a Excel, PDF y CSV', 'Alertas automáticas anti-fraude'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check className="h-4 w-4 text-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">Precios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Simple, transparente, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Todos los planes incluyen soporte técnico y actualizaciones. Sin contratos a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-border bg-surface-raised p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">Starter</h3>
                <p className="text-sm text-[var(--text-muted)]">Para equipos pequeños</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight">$49</span>
                <span className="text-[var(--text-muted)] ml-1">/mes</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">Hasta 30 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {[
                  '1 sede',
                  'Registro con QR + GPS',
                  'Dashboard de asistencia',
                  'Reportes en Excel',
                  'Gestión de trabajadores',
                  'Soporte por email',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="h-4 w-4 text-brand flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="flex h-11 items-center justify-center rounded-xl border border-border font-semibold text-sm hover:bg-surface transition-colors"
              >
                Comenzar Prueba
              </a>
            </div>

            {/* Professional — Highlighted */}
            <div className="relative flex flex-col rounded-2xl border-2 border-brand bg-surface-raised p-8 shadow-lg shadow-brand/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-bold text-slate-900">
                  Más Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">Professional</h3>
                <p className="text-sm text-[var(--text-muted)]">Para empresas en crecimiento</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight">$99</span>
                <span className="text-[var(--text-muted)] ml-1">/mes</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">Hasta 80 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {[
                  'Hasta 3 sedes',
                  'Todo de Starter +',
                  'Radio GPS configurable por sede',
                  'Módulo de nómina',
                  'Reportes avanzados (Excel, CSV, PDF)',
                  'Mapa de sedes en tiempo real',
                  'Soporte prioritario',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="h-4 w-4 text-brand flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="flex h-11 items-center justify-center rounded-xl bg-brand font-semibold text-sm text-slate-900 hover:bg-brand-dark transition-colors"
              >
                Solicitar Demo
              </a>
            </div>

            {/* Business */}
            <div className="flex flex-col rounded-2xl border border-border bg-surface-raised p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">Business</h3>
                <p className="text-sm text-[var(--text-muted)]">Para operaciones grandes</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold tracking-tight">$149</span>
                <span className="text-[var(--text-muted)] ml-1">/mes</span>
                <p className="text-xs text-[var(--text-muted)] mt-1">Hasta 200 empleados</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {[
                  'Sedes ilimitadas',
                  'Todo de Professional +',
                  'Roles y permisos por sede',
                  'Multi-administrador',
                  'Exportación automatizada',
                  'Alertas por email',
                  'Soporte dedicado',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <Check className="h-4 w-4 text-brand flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="flex h-11 items-center justify-center rounded-xl border border-border font-semibold text-sm hover:bg-surface transition-colors"
              >
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">Testimonios</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: 'QORE eliminó por completo el fraude de asistencia en nuestras obras. Los reportes automáticos nos ahorran 15 horas semanales de trabajo administrativo.',
                name: 'Carlos Mendoza',
                role: 'Gerente de Operaciones',
                company: 'Constructora Pacífico',
              },
              {
                quote: 'La implementación fue increíblemente rápida. En menos de un día teníamos todas nuestras sedes configuradas y el equipo usando la app sin problemas.',
                name: 'Lucía Fernández',
                role: 'Directora de RRHH',
                company: 'Grupo Logístico SAC',
              },
              {
                quote: 'La validación GPS nos da tranquilidad total. Sabemos exactamente quién está en cada tienda y a qué hora. Es un game-changer para retail.',
                name: 'Andrés Villarreal',
                role: 'COO',
                company: 'RetailMax Perú',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-border bg-surface-raised p-7"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand text-sm font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {[
              {
                q: '¿Necesito hardware especial para usar QORE?',
                a: 'No. QORE funciona 100% con smartphones. Solo necesitas un dispositivo para mostrar el QR en cada sede (puede ser una tablet, monitor o incluso un celular viejo). Los empleados escanean con su propio teléfono.',
              },
              {
                q: '¿Qué tan precisa es la validación GPS?',
                a: 'La precisión depende del dispositivo, pero típicamente es de 5-15 metros. Puedes configurar el radio de validación por sede (geofencing) para adaptarlo a tus necesidades.',
              },
              {
                q: '¿Qué necesitan mis empleados para registrar asistencia?',
                a: 'Solo un smartphone con cámara y conexión a internet. No se requiere instalar ninguna app adicional ni hardware especial.',
              },
              {
                q: '¿Puedo exportar los datos de asistencia?',
                a: 'Sí. Puedes exportar reportes de asistencia y nómina en múltiples formatos: Excel, CSV y PDF. Descarga los datos que necesites cuando los necesites.',
              },
              {
                q: '¿Cuánto toma la implementación?',
                a: 'La configuración inicial es muy rápida. En todos los planes puedes crear tus sedes, registrar empleados y empezar a operar en menos de 30 minutos. Para el plan Business, nuestro equipo te acompaña en el proceso.',
              },
              {
                q: '¿Mis datos están seguros?',
                a: 'Sí. Tu información está alojada en infraestructura cloud con conexiones encriptadas y acceso protegido por roles. Solo tú y tu equipo autorizado pueden ver los datos de tu empresa.',
              },
            ].map((faq, i) => (
              <details key={i} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold [&::-webkit-details-marker]:hidden list-none">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-[var(--text-muted)] flex-shrink-0 ml-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Waitlist ──────────────────────────────── */}
      <section id="waitlist" className="relative py-24 lg:py-32 bg-surface border-t border-border overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-brand/6 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">
              Empieza Hoy
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Solicita tu demo personalizada
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Completa el formulario y nuestro equipo te contactará en menos de 48 horas
              para una demostración sin compromiso.
            </p>
          </div>

          <WaitlistForm />

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-2xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Demo Gratuita', desc: 'Sin compromiso ni tarjeta' },
              { icon: Clock, title: 'Respuesta en 24-48h', desc: 'Nuestro equipo te contacta' },
              { icon: Shield, title: 'Datos Protegidos', desc: 'Encriptación end-to-end' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-2">
                <item.icon className="h-5 w-5 text-brand" />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image src="/logo.png" alt="QORE" width={120} height={32} className="h-8 w-auto" />
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                La plataforma de control de asistencia con QR y GPS para empresas modernas.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/qoreapp/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-[var(--text-muted)] hover:text-brand hover:border-brand/30 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Producto */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Producto</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Características', href: '#features' },
                  { label: 'Cómo Funciona', href: '#how-it-works' },
                  { label: 'Precios', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-[var(--text-muted)] hover:text-foreground transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Política de Privacidad', href: '/privacidad' },
                  { label: 'Términos de Servicio', href: '/terminos' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[var(--text-muted)] hover:text-foreground transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Contacto</h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="mailto:contacto@qore.io" className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                    contacto@qore.io
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-border gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} QORE Systems. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
                Términos
              </Link>
              <a href="mailto:contacto@qore.io" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
                contacto@qore.io
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
