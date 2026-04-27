import type { Metadata } from 'next';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad — QORE',
  description: 'Política de privacidad de Senel Studio. Conoce cómo recopilamos, usamos y protegemos tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <>
      <Nav />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-[0.18em] text-[#2dd4ff] font-mono">
            LEGAL
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-sm text-slate-500">
            Última actualización: 1 de febrero de 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 text-slate-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Información General</h2>
            <p>
              Senel Studio (&ldquo;QORE&rdquo;, &ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo;) opera la plataforma QORE,
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
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de información:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong className="text-slate-900">Datos de registro:</strong> Nombre, correo electrónico corporativo,
                nombre de la empresa, tamaño de la empresa y rubro al registrarse en nuestra lista de espera o plataforma.
              </li>
              <li>
                <strong className="text-slate-900">Datos de uso:</strong> Registros de asistencia, marcas de tiempo,
                coordenadas GPS (con consentimiento), datos de escaneo QR e información del dispositivo.
              </li>
              <li>
                <strong className="text-slate-900">Datos técnicos:</strong> Dirección IP, tipo de navegador,
                sistema operativo, páginas visitadas y cookies analíticas.
              </li>
              <li>
                <strong className="text-slate-900">Datos de comunicación:</strong> Contenido de correos electrónicos,
                solicitudes de soporte y retroalimentación proporcionada.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Cómo Usamos los Datos</h2>
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
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Base Legal del Tratamiento</h2>
            <p>El tratamiento de datos personales se basa en:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-slate-900">Consentimiento:</strong> Otorgado al registrarse o aceptar cookies.</li>
              <li><strong className="text-slate-900">Ejecución contractual:</strong> Necesario para proveer los servicios contratados.</li>
              <li><strong className="text-slate-900">Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraude.</li>
              <li><strong className="text-slate-900">Obligación legal:</strong> Para cumplir con regulaciones de protección de datos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Almacenamiento y Seguridad</h2>
            <p>
              Aplicamos medidas razonables para proteger los datos personales:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Encriptación de datos en reposo gestionada por nuestros proveedores de infraestructura cloud.</li>
              <li>HTTPS/TLS para todos los datos en tránsito.</li>
              <li>Controles de acceso basados en roles y reglas de seguridad a nivel de base de datos.</li>
              <li>Contraseñas almacenadas con hash mediante un sistema de autenticación estándar de la industria.</li>
            </ul>
            <p className="mt-3">
              Los datos se almacenan en infraestructura cloud de proveedores externos. Retenemos los datos
              durante el tiempo necesario para cumplir con los fines descritos en esta política, o hasta que
              el usuario solicite su eliminación.
            </p>
            <p className="mt-3">
              Ningún sistema en internet es 100% seguro. Si bien aplicamos medidas razonables, no podemos
              garantizar la seguridad absoluta de los datos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Compartición de Datos</h2>
            <p>
              No vendemos datos personales a terceros. Podemos compartir información con:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-slate-900">Proveedores de servicio:</strong> Proveedores de infraestructura cloud, servicios de email transaccional y analítica, bajo acuerdos de procesamiento de datos.</li>
              <li><strong className="text-slate-900">Empresas clientes:</strong> Los datos de asistencia de sus empleados según el contrato de servicio.</li>
              <li><strong className="text-slate-900">Autoridades:</strong> Cuando sea requerido por ley o proceso legal válido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Tus Derechos</h2>
            <p>Como titular de datos personales, tienes derecho a:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-slate-900">Acceso:</strong> Solicitar una copia de tus datos personales.</li>
              <li><strong className="text-slate-900">Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong className="text-slate-900">Eliminación:</strong> Solicitar la eliminación de tus datos personales.</li>
              <li><strong className="text-slate-900">Portabilidad:</strong> Recibir tus datos en formato estructurado y legible.</li>
              <li><strong className="text-slate-900">Oposición:</strong> Oponerte al tratamiento de tus datos en ciertas circunstancias.</li>
              <li><strong className="text-slate-900">Revocación:</strong> Retirar tu consentimiento en cualquier momento.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contacta a nuestro equipo en{' '}
              <a href="mailto:contacto@senelstudio.me" className="text-[#0891b2] hover:underline font-mono">contacto@senelstudio.me</a>.
              Responderemos dentro de los 30 días hábiles siguientes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p>
              Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio y cookies
              analíticas para comprender cómo los usuarios interactúan con nuestra plataforma. Puedes
              gestionar tus preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">9. Datos de Geolocalización</h2>
            <p>
              La funcionalidad GPS de QORE requiere consentimiento explícito del usuario. Los datos de
              geolocalización se utilizan exclusivamente para validar la presencia física en el momento
              del registro de asistencia. No rastreamos la ubicación de los usuarios fuera del momento
              del registro.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">10. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Notificaremos cambios
              significativos a través de nuestro sitio web o por correo electrónico. La fecha de
              última actualización se indica al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">11. Contacto</h2>
            <p>
              Para consultas sobre esta política o el tratamiento de tus datos personales:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong className="text-slate-900">Email:</strong>{' '}
                <a href="mailto:contacto@senelstudio.me" className="text-[#0891b2] hover:underline font-mono">contacto@senelstudio.me</a>
              </li>
              <li><strong className="text-slate-900">Empresa:</strong> Senel Studio</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
