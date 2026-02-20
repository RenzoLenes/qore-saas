import { QrCode } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio — QORE',
  description: 'Términos y condiciones de uso de la plataforma QORE. Lee nuestros términos de servicio antes de usar la plataforma.',
};

export default function TerminosPage() {
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
            Términos de Servicio
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Última actualización: 1 de febrero de 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 text-[var(--text-secondary)] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">1. Aceptación de los Términos</h2>
            <p>
              Al acceder o utilizar la plataforma QORE (&ldquo;el Servicio&rdquo;), operada por QORE Systems
              (&ldquo;la Empresa&rdquo;), aceptas quedar vinculado por estos Términos de Servicio. Si no estás
              de acuerdo con alguna parte de estos términos, no podrás acceder al Servicio.
            </p>
            <p className="mt-3">
              Estos términos aplican a todos los visitantes, usuarios, clientes y cualquier persona que
              acceda o utilice el Servicio, incluyendo la lista de espera, la aplicación web, la aplicación
              móvil y las API.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">2. Descripción del Servicio</h2>
            <p>
              QORE es una plataforma de Software como Servicio (SaaS) que provee:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Control de asistencia mediante escaneo de códigos QR dinámicos.</li>
              <li>Validación de presencia física mediante geolocalización GPS.</li>
              <li>Generación de reportes de asistencia en tiempo real.</li>
              <li>Dashboard administrativo para gestión de personal y sedes.</li>
              <li>Sistema de alertas y detección de anomalías.</li>
              <li>API de integración con sistemas de terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">3. Registro y Cuentas</h2>
            <p>
              Para utilizar el Servicio, debes crear una cuenta proporcionando información precisa,
              completa y actualizada. Eres responsable de:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
              <li>Todas las actividades que ocurran bajo tu cuenta.</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
              <li>Asegurar que la información de tu cuenta esté actualizada.</li>
            </ul>
            <p className="mt-3">
              Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos
              o que permanezcan inactivas por un período prolongado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">4. Planes y Pagos</h2>
            <p>
              El Servicio se ofrece en diferentes planes de suscripción. Al seleccionar un plan de pago:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Los pagos se procesan mensualmente de forma anticipada.</li>
              <li>Los precios están expresados en dólares estadounidenses (USD) y no incluyen impuestos aplicables.</li>
              <li>Nos reservamos el derecho de modificar los precios con aviso previo de 30 días.</li>
              <li>No se realizan reembolsos por períodos parciales de uso.</li>
              <li>La falta de pago puede resultar en la suspensión o terminación del servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">5. Uso Aceptable</h2>
            <p>Al utilizar el Servicio, te comprometes a:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>No utilizar el Servicio para fines ilegales o no autorizados.</li>
              <li>No intentar acceder a cuentas, sistemas o datos de otros usuarios.</li>
              <li>No interferir con el funcionamiento normal del Servicio.</li>
              <li>No realizar ingeniería inversa, descompilar o desensamblar el software.</li>
              <li>No usar el Servicio para monitorear o rastrear empleados sin su conocimiento y consentimiento.</li>
              <li>Cumplir con todas las leyes laborales y de protección de datos aplicables en tu jurisdicción.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">6. Propiedad Intelectual</h2>
            <p>
              El Servicio, incluyendo su código fuente, diseño, logotipos, marcas registradas, textos,
              gráficos y demás contenido, son propiedad exclusiva de QORE Systems y están protegidos
              por leyes de propiedad intelectual.
            </p>
            <p className="mt-3">
              Se te otorga una licencia limitada, no exclusiva, no transferible y revocable para
              utilizar el Servicio de acuerdo con estos términos y el plan contratado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">7. Datos del Cliente</h2>
            <p>
              Retienes todos los derechos sobre los datos que ingresas en la plataforma (&ldquo;Datos del
              Cliente&rdquo;). Nos otorgas una licencia limitada para procesar estos datos exclusivamente
              con el fin de proveer el Servicio.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Eres responsable de la legalidad de los datos que subes a la plataforma.</li>
              <li>Debes obtener el consentimiento necesario de tus empleados para el registro de asistencia.</li>
              <li>Al terminar tu cuenta, puedes solicitar la exportación de tus datos dentro de los 30 días siguientes.</li>
              <li>Después de 90 días de la terminación, los datos serán eliminados permanentemente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">8. Disponibilidad del Servicio</h2>
            <p>
              Nos esforzamos por mantener una disponibilidad del 99.8% mensual. Sin embargo, el Servicio
              puede estar temporalmente no disponible por:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Mantenimiento programado (notificado con al menos 24 horas de anticipación).</li>
              <li>Actualizaciones de seguridad urgentes.</li>
              <li>Circunstancias de fuerza mayor.</li>
              <li>Problemas con proveedores de infraestructura de terceros.</li>
            </ul>
            <p className="mt-3">
              Para clientes Enterprise, los términos de disponibilidad se definen en el Acuerdo de
              Nivel de Servicio (SLA) específico.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">9. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley, QORE Systems no será responsable por daños
              indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pero no
              limitado a: pérdida de beneficios, datos, uso u otras pérdidas intangibles.
            </p>
            <p className="mt-3">
              Nuestra responsabilidad total por cualquier reclamación relacionada con el Servicio
              no excederá el monto pagado por el cliente durante los últimos 12 meses previos al
              evento que da origen a la reclamación.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">10. Terminación</h2>
            <p>
              Cualquiera de las partes puede terminar la relación contractual:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong className="text-foreground">Por el cliente:</strong> En cualquier momento, cancelando la suscripción desde el panel de administración.</li>
              <li><strong className="text-foreground">Por QORE:</strong> Con aviso previo de 30 días, o inmediatamente en caso de violación de estos términos.</li>
            </ul>
            <p className="mt-3">
              Al terminar, tu acceso al Servicio cesará. Podrás solicitar la exportación de tus datos
              dentro del período establecido en la sección 7.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">11. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento.
              Los cambios significativos serán notificados con al menos 30 días de anticipación a
              través de correo electrónico o aviso en la plataforma.
            </p>
            <p className="mt-3">
              El uso continuado del Servicio después de la entrada en vigor de las modificaciones
              constituye la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">12. Ley Aplicable</h2>
            <p>
              Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes aplicables
              en la jurisdicción de operación de QORE Systems. Cualquier disputa se resolverá mediante
              los tribunales competentes de dicha jurisdicción, salvo que las partes acuerden someterse
              a arbitraje.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">13. Contacto</h2>
            <p>
              Para consultas sobre estos Términos de Servicio:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong className="text-foreground">Email:</strong>{' '}
                <a href="mailto:legal@qore.io" className="text-brand hover:underline">legal@qore.io</a>
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
            <Link href="/privacidad" className="text-xs text-[var(--text-muted)] hover:text-foreground transition-colors">
              Política de Privacidad
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
