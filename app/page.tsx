import { QrCode, MapPin, Clock, BarChart3, Wifi, Battery, Signal, Building2, CheckCircle, Rocket, PlayCircle, Linkedin, Twitter } from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f8f8] dark:bg-[#0f2023] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f2023]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4ff]/20 text-[#00d4ff]">
              <QrCode className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">QORE</h2>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-[#00d4ff] dark:text-slate-300 dark:hover:text-[#00d4ff] transition-colors">Características</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#00d4ff] dark:text-slate-300 dark:hover:text-[#00d4ff] transition-colors">Precios</a>
            {/* <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#00d4ff] dark:text-slate-300 dark:hover:text-[#00d4ff] transition-colors">Clientes</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#00d4ff] dark:text-slate-300 dark:hover:text-[#00d4ff] transition-colors">Soporte</a> */}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors">
              Iniciar Sesión
            </button>
            <a href="#waitlist" className="flex h-9 items-center justify-center rounded-lg bg-[#00d4ff] px-4 text-sm font-bold text-slate-900 shadow-sm hover:bg-[#00a3cc] transition-colors">
              Solicitar Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[100px] dark:bg-blue-900/20"></div>
          <div className="absolute top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#00d4ff]/20 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1 text-xs font-semibold text-[#00a3cc] dark:text-[#00d4ff]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
                </span>
                Acceso anticipado
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                Asistencia Segura con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-blue-600">QR y GPS</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Moderniza el control de personal. Validación geolocalizada en tiempo real para empresas líderes. Elimina el fraude y simplifica la nómina.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#waitlist" className="flex h-12 items-center justify-center rounded-xl bg-[#00d4ff] px-6 text-base font-bold text-slate-900 shadow-lg shadow-[#00d4ff]/25 hover:bg-[#00a3cc] hover:scale-105 transition-all duration-200">
                  <Rocket className="mr-2 h-5 w-5" />
                  Solicitar Demo
                </a>
                <button className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Cómo Funciona?
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-4">
                <div className="flex -space-x-2">
                  <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
                  <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
                  <img alt="User avatar" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
                </div>
                <p>Confían en nosotros +15 empresas</p>
              </div>
            </div>

            {/* Right Content - Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Floating Badge - Location */}
              <div className="absolute top-20 left-0 lg:left-10 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2 rounded-lg bg-white/90 p-3 shadow-xl backdrop-blur-sm dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-semibold">
                    <span className="block text-slate-400">Ubicación</span>
                    <span className="text-slate-800 dark:text-slate-200">Precisa</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Time */}
              <div className="absolute bottom-40 right-0 z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2 rounded-lg bg-white/90 p-3 shadow-xl backdrop-blur-sm dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-semibold">
                    <span className="block text-slate-400">Registro</span>
                    <span className="text-slate-800 dark:text-slate-200">Tiempo Real</span>
                  </div>
                </div>
              </div>

              {/* Phone Container */}
              <div className="relative z-10 mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                {/* Phone Screen */}
                <div className="relative flex-1 bg-slate-800 overflow-hidden w-full h-full">
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

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
                      <span className="text-white text-xs font-semibold">Sede Central - Lima</span>
                    </div>
                  </div>

                  {/* Scanner UI */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {/* Scan Area */}
                    <div className="relative w-48 h-48 border-2 border-[#00d4ff]/50 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.5)]">
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#00d4ff] rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#00d4ff] rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#00d4ff] rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#00d4ff] rounded-br-lg"></div>

                      {/* QR Code */}
                      <div className="w-full h-full p-6 flex items-center justify-center">
                        <QrCode className="w-full h-full text-[#00d4ff] opacity-90" strokeWidth={1.5} />
                      </div>

                      {/* Scanning Line */}
                      <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent shadow-[0_0_15px_rgba(0,212,255,1)] animate-scan"></div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-6 flex items-center gap-2 bg-green-500/90 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-bold tracking-wide">UBICACIÓN VALIDADA</span>
                    </div>
                  </div>

                  {/* Bottom Sheet */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/85 dark:bg-[#0f2023]/85 backdrop-blur-xl rounded-t-2xl p-5 z-30">
                    <div className="w-10 h-1 bg-slate-300/50 rounded-full mx-auto mb-4"></div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img alt="Employee portrait" className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Carlos Mendoza</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-300">Desarrollador Senior</p>
                      </div>
                      <div className="bg-[#00d4ff]/10 p-2 rounded-full text-[#00d4ff]">
                        <div className="h-5 w-5 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <div className="mt-3 border-t border-slate-200/50 dark:border-slate-700/50 pt-3">
                      <p className="text-center text-xs font-medium text-[#00a3cc] dark:text-[#00d4ff]">Registrando entrada... 08:59 AM</p>
                    </div>
                  </div>
                </div>

                {/* Home Bar Indicator */}
                <div className="bg-gray-900 h-6 w-full flex items-center justify-center">
                  <div className="w-1/3 h-1 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className="py-20 bg-white dark:bg-[#162a2e] border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Tecnología en Acción
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Descubre cómo QORE simplifica el registro de asistencia con una infraestructura robusta y fácil de usar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[#f5f8f8] p-8 hover:border-[#00d4ff]/50 hover:shadow-lg hover:shadow-[#00d4ff]/5 transition-all dark:bg-[#0f2023] dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-[#00d4ff] group-hover:text-white transition-colors">
                  <QrCode className="h-7 w-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Escaneo QR Rápido</h3>
                  <p className="text-slate-500 dark:text-slate-400">Registro de entrada en milisegundos con tecnología de reconocimiento optimizada.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[#f5f8f8] p-8 hover:border-[#00d4ff]/50 hover:shadow-lg hover:shadow-[#00d4ff]/5 transition-all dark:bg-[#0f2023] dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-[#00d4ff] group-hover:text-white transition-colors">
                  <MapPin className="h-7 w-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Validación GPS</h3>
                  <p className="text-slate-500 dark:text-slate-400">Geolocalización precisa para asegurar que el personal esté donde debe estar.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[#f5f8f8] p-8 hover:border-[#00d4ff]/50 hover:shadow-lg hover:shadow-[#00d4ff]/5 transition-all dark:bg-[#0f2023] dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 group-hover:bg-[#00d4ff] group-hover:text-white transition-colors">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reportes en Vivo</h3>
                  <p className="text-slate-500 dark:text-slate-400">Dashboard administrativo con datos al instante para toma de decisiones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-[#f5f8f8] dark:bg-[#0f2023] border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <p className="text-sm font-bold tracking-wide text-[#00d4ff] uppercase">CÓMO FUNCIONA</p>
              <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Tan simple como 1, 2, 3
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Una solución integral diseñada para la eficiencia de tu equipo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 w-14 h-14 bg-[#00d4ff] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                  1
                </div>
                <div className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 pt-14 flex flex-col items-center gap-6 border border-slate-100 dark:border-slate-700">
                  <div className="w-full aspect-square flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                    <img src="/qr-code.png" alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-3 text-center">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Genera el código</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      El sistema muestra un código QR dinámico y único en la pantalla de la oficina, renovándose automáticamente por seguridad.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 w-14 h-14 bg-[#00d4ff] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                  2
                </div>
                <div className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 pt-14 flex flex-col items-center gap-6 border border-slate-100 dark:border-slate-700">
                  <div className="w-full aspect-square flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                    <img src="/scanning.png" alt="Scanning QR" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-3 text-center">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Escanea</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      El colaborador escanea el código usando la App de QORE en su smartphone personal de forma rápida y sin contacto.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-6 w-14 h-14 bg-[#00d4ff] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">
                  3
                </div>
                <div className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 pt-14 flex flex-col items-center gap-6 border border-slate-100 dark:border-slate-700">
                  <div className="w-full aspect-square flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                    <img src="/gps.png" alt="GPS Validation" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-3 text-center">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Validación Inteligente</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      El sistema verifica la ubicación GPS exacta y confirma la asistencia en tiempo real, garantizando datos precisos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-white dark:bg-[#162a2e] border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <p className="text-sm font-bold tracking-wide text-[#00d4ff] uppercase">
                ACCESO ANTICIPADO
              </p>
              <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Únete a la lista de espera
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Sé de los primeros en experimentar el futuro del control de asistencia.
                Completa el formulario y nuestro equipo te contactará para una demo personalizada.
              </p>
            </div>

            <WaitlistForm />

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00d4ff]/10">
                  <CheckCircle className="h-6 w-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Demo Gratuita</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sin compromiso ni costo
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00d4ff]/10">
                  <Clock className="h-6 w-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Respuesta en 24-48h</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Te contactamos pronto
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00d4ff]/10">
                  <Building2 className="h-6 w-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Solución Empresarial</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Adaptada a tu negocio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f8f8] dark:bg-[#0f2023] pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <a className="text-slate-500 hover:text-[#00d4ff] dark:text-slate-400 transition-colors" href="#">Política de Privacidad</a>
              <a className="text-slate-500 hover:text-[#00d4ff] dark:text-slate-400 transition-colors" href="#">Términos de Servicio</a>
              <a className="text-slate-500 hover:text-[#00d4ff] dark:text-slate-400 transition-colors" href="#">Contacto</a>
              <a className="text-slate-500 hover:text-[#00d4ff] dark:text-slate-400 transition-colors" href="#">Ayuda</a>
            </div>

            <div className="flex justify-center gap-6">
              <a className="text-slate-400 hover:text-[#00d4ff] transition-colors" href="#">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a> 
              <a className="text-slate-400 hover:text-[#00d4ff] transition-colors" href="#">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>

            <p className="text-sm text-slate-400">© 2026 QORE Systems. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
