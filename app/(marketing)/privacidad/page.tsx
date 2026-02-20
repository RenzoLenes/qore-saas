import { QrCode } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — QORE',
  description: 'Política de privacidad de QORE Systems. Conoce cómo recopilamos, usamos y protegemos tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <QrCode className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">QORE</span>
          </Link>
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-foreground transition-colors">
            Volver al inicio
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">Legal</span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Política de Privacidad
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Última actualización: 1 de febrero de 2026
          </p>
        </div>

        <div className="prose-custom flex flex-col gap-8 text-[var(--text-secondary)] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">1. Información General</h2>
            <p>
              QORE Systems (&ldquo;QORE&rdquo;, &ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo;) opera la plataforma QORE,
              un sistema de gestión de asistencia con tecnología QR y GPS. Esta Política de Privacidad
              describe cómo recopilamos, usamos, almacenamos y protegemos la información personal de
              nuestros usuarios, clientes y visitantes del sitio web.
            </p>
            <p className="mt-3">
              Al utilizar nuestros servicios o visitar nuestro sitio web, aceptas las prácticas descritas
              en esta política. Si no estás de acuerdo con estas prácticas, te pedimos que no utilices
              nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de información:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong className="text-foreground">Datos de registro:</strong> Nombre, correo electrónico corporativo,
                nombre de la empresa, tamaño de la empresa y rubro al registrarse en nuestra lista de espera o plataforma.
              </li>
              <li>
                <strong className="text-foreground">Datos de uso:</strong> Registros de asistencia, marcas de tiempo,
                coordenadas GPS (con consentimiento), datos de escaneo QR e información del dispositivo.
              </li>
              <li>
                <strong className="text-foreground">Datos técnicos:</strong> Dirección IP, tipo de navegador,
                sistema operativo, páginas visitadas y cookies analíticas.
              </li>
              <li>
                <strong className="text-foreground">Datos de comunicación:</strong> Contenido de correos electrónicos,
                solicitudes de soporte y retroalimentación proporcionada.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">3. Cómo Usamos los Datos</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Proveer, mantener y mejorar nuestros servicios de control de asistencia.</li>
              <li>Procesar solicitudes de demo y comunicaciones relacionadas con la lista de espera.</li>
              <li>Enviar notificaciones sobre el servicio, actualizaciones y alertas de seguridad.</li>
              <li>Generar reportes de asistencia y análisis para las empresas clientes.</li>
              <li>Detectar y prevenir fraude en el registro de asistencia.</li>
              <li>Cumplir con obligaciones legales y regulatorias aplicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">4. Base Legal del Tratamiento</h2>
            <p>El tratamiento de datos personales se basa en:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-foreground">Consentimiento:</strong> Otorgado al registrarse o aceptar cookies.</li>
              <li><strong className="text-foreground">Ejecución contractual:</strong> Necesario para proveer los servicios contratados.</li>
              <li><strong className="text-foreground">Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude.</li>
              <li><strong className="text-foreground">Obligación legal:</strong> Para cumplir con regulaciones de protección de datos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">5. Almacenamiento y Seguridad</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger los datos personales,
              incluyendo:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Encriptación AES-256 para datos en reposo.</li>
              <li>TLS 1.3 para datos en tránsito.</li>
              <li>Infraestructura cloud certificada SOC 2 Type II.</li>
              <li>Controles de acceso basados en roles (RBAC).</li>
              <li>Auditorías de seguridad periódicas y pruebas de penetración.</li>
            </ul>
            <p className="mt-3">
              Los datos se almacenan en servidores ubicados en infraestructura cloud de alta disponibilidad.
              Retenemos los datos durante el tiempo necesario para cumplir con los fines descritos en esta
              política, a menos que la ley requiera un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">6. Compartición de Datos</h2>
            <p>
              No vendemos datos personales a terceros. Podemos compartir información con:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-foreground">Proveedores de servicio:</strong> Como servicios de email (Resend), infraestructura cloud (Supabase) y analítica.</li>
              <li><strong className="text-foreground">Empresas clientes:</strong> Los datos de asistencia de sus empleados según el contrato de servicio.</li>
              <li><strong className="text-foreground">Autoridades:</strong> Cuando sea requerido por ley o proceso legal válido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">7. Tus Derechos</h2>
            <p>Como titular de datos personales, tienes derecho a:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-foreground">Acceso:</strong> Solicitar una copia de tus datos personales.</li>
              <li><strong className="text-foreground">Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong className="text-foreground">Eliminación:</strong> Solicitar la eliminación de tus datos personales.</li>
              <li><strong className="text-foreground">Portabilidad:</strong> Recibir tus datos en formato estructurado y legible.</li>
              <li><strong className="text-foreground">Oposición:</strong> Oponerte al tratamiento de tus datos en ciertas circunstancias.</li>
              <li><strong className="text-foreground">Revocación:</strong> Retirar tu consentimiento en cualquier momento.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contacta a nuestro equipo en{' '}
              <a href="mailto:privacidad@qore.io" className="text-brand hover:underline">privacidad@qore.io</a>.
              Responderemos dentro de los 30 días hábiles siguientes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">8. Cookies</h2>
            <p>
              Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio y cookies
              analíticas para comprender cómo los usuarios interactúan con nuestra plataforma. Puedes
              gestionar tus preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">9. Datos de Geolocalización</h2>
            <p>
              La funcionalidad GPS de QORE requiere consentimiento explícito del usuario. Los datos de
              geolocalización se utilizan exclusivamente para validar la presencia física en el momento
              del registro de asistencia. No rastreamos la ubicación de los usuarios fuera del momento
              del registro.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">10. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Notificaremos cambios
              significativos a través de nuestro sitio web o por correo electrónico. La fecha de
              última actualización se indica al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">11. Contacto</h2>
            <p>
              Para consultas sobre esta política o el tratamiento de tus datos personales:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong className="text-foreground">Email:</strong>{' '}
                <a href="mailto:privacidad@qore.io" className="text-brand hover:underline">privacidad@qore.io</a>
              </li>
              <li><strong className="text-foreground">Empresa:</strong> QORE Systems</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">&copy; {new Date().getFullYear()} QORE Systems</p>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
              Inicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
