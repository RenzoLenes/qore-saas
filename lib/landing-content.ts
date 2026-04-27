import {
  MapPin,
  Activity,
  Smartphone,
  ShieldCheck,
  Clock,
  CircleCheck,
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Producto', href: '/#features' },
  { label: 'Proceso', href: '/#how-it-works' },
  { label: 'Precios', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export const PROBLEM_CARDS = [
  {
    method: 'MÉTODO 01',
    title: 'Huellero biométrico',
    desc: 'El dispositivo de huella digital en la puerta de la oficina. Funciona — hasta que no.',
    items: [
      'Solo sirve en una ubicación física',
      'Se hackea con foto, silicona o dedo de otro',
      'Hardware caro que se daña o pierde calibración',
    ],
    stat: '1 por sede',
    statSub: 'No escala entre ubicaciones',
  },
  {
    method: 'MÉTODO 02',
    title: 'Excel y WhatsApp',
    desc: 'El supervisor manda lista por grupo, RRHH la vacía en Excel, nadie valida si estuvo presente.',
    items: [
      '8–15 horas/semana consolidando datos a mano',
      'Sin validación de ubicación — nadie sabe si realmente estuvo',
      'Fórmulas rotas, datos duplicados, errores de nómina',
    ],
    stat: '~12 hrs',
    statSub: 'Por semana consolidando a mano',
  },
  {
    method: 'MÉTODO 03',
    title: 'Apps enterprise caras',
    desc: 'Soluciones diseñadas para multinacionales con equipo de IT dedicado — no para PyMEs peruanas.',
    items: [
      'Contrato anual, implementación de 4–6 semanas',
      'Requiere hardware: relojes, tablets, lectores',
      'Soporte en inglés, horario US — no resuelve problemas locales',
    ],
    stat: '4–6 semanas',
    statSub: 'Implementación antes de operar',
  },
];

export const HOW_STEPS = [
  {
    num: '01',
    title: 'Configurás tu sede',
    desc: 'Marcás la ubicación en el mapa, ajustás el radio GPS y QORE genera tu código QR listo para imprimir.',
    visual: 'map',
  },
  {
    num: '02',
    title: 'Tu equipo escanea',
    desc: 'Cada colaborador escanea el QR con su celular. El sistema valida GPS en milisegundos — sin apps que instalar.',
    visual: 'scan',
  },
  {
    num: '03',
    title: 'Datos en tiempo real',
    desc: 'Panel en vivo con asistencia, tardanzas, sedes activas. Exportás en Excel o CSV cuando quieras.',
    visual: 'chart',
  },
] as const;

export type HowStepVisual = (typeof HOW_STEPS)[number]['visual'];

export const BENTO_SIDE_CARDS = [
  {
    icon: MapPin,
    title: 'Multi-sede',
    desc: 'Cada sede con su radio GPS y QR propio.',
  },
  {
    icon: Activity,
    title: 'Reportes en vivo',
    desc: 'Exportás en Excel, CSV o PDF en un clic.',
  },
  {
    icon: Smartphone,
    title: 'Sin hardware',
    desc: 'Cualquier smartphone con cámara funciona.',
  },
];

export const ANTI_FRAUD = [
  {
    num: '01',
    title: 'QR dinámico',
    desc: 'El código QR de cada sede se regenera cada 15 segundos. Una foto o captura queda obsoleta en un parpadeo.',
    tech: 'Rotación ~15 s',
    visual: 'qr',
  },
  {
    num: '02',
    title: 'Validación GPS',
    desc: 'Cada marca valida el radio geográfico de la sede en tiempo real. Fuera del perímetro, el sistema rechaza el registro.',
    tech: 'Radio 5–500 m',
    visual: 'pin',
  },
  {
    num: '03',
    title: 'Detección de anomalías',
    desc: 'Dispositivo nuevo, horario inusual o múltiples intentos. El sistema alerta a RRHH antes que el fraude pase.',
    tech: 'Alertas en vivo',
    visual: 'alert',
  },
] as const;

export type AntiFraudVisual = (typeof ANTI_FRAUD)[number]['visual'];

export const PLAN_FEATURES = [
  'Colaboradores ilimitados',
  'QR dinámico + GPS en todas las sedes',
  'Dashboard en vivo + reportes exportables',
  'Onboarding 1-a-1 con el equipo QORE',
  'Soporte WhatsApp con respuesta < 2 h',
  'Voto en el roadmap del producto',
];

export const ENTERPRISE_FEATURES = [
  { text: 'Todo el Plan QORE +', strong: true },
  { text: 'Integración con tu ERP o nómina', strong: false },
  { text: 'Roles y permisos por sede', strong: false },
  { text: 'SLA 99.9% + soporte dedicado', strong: false },
  { text: 'Facturación anual con descuento', strong: false },
];

export const FAQS = [
  {
    q: '¿Qué necesitamos para empezar a usar QORE?',
    a: 'Solo un smartphone por colaborador. No necesitas comprar hardware, instalar apps ni configurar servidores. Creas tus sedes desde el panel, defines el radio GPS, y QORE genera el QR listo para imprimir.',
  },
  {
    q: '¿Cuánto toma la implementación?',
    a: '30 minutos para una sede con colaboradores ya registrados. Te acompañamos 1-a-1 en la configuración inicial — incluido en el precio.',
  },
  {
    q: '¿Qué pasa si un colaborador no tiene smartphone?',
    a: 'Puedes designar un dispositivo compartido en la sede (tablet o smartphone) para que los colaboradores sin celular marquen con su usuario. Sigue siendo seguro — el QR rota y el GPS valida la ubicación.',
  },
  {
    q: '¿Qué tan preciso es el GPS? ¿Y si alguien intenta falsificar ubicación?',
    a: 'Precisión típica de 5–15 metros. Detectamos falsificación GPS (mock location, apps de spoofing) y bloqueamos el registro. Puedes configurar el radio de validación por sede según tus necesidades (de 5 a 500 m).',
  },
  {
    q: '¿Puedo exportar los datos a mi sistema de nómina?',
    a: 'Sí. Exportas en Excel, CSV o PDF directamente desde el dashboard. El formato es compatible con los software de nómina más usados en Perú. Integraciones custom en el plan Empresa.',
  },
  {
    q: '¿Qué pasa después de los 3 meses a S/ 39.90?',
    a: 'Pasas automáticamente a S/ 69 por sede al mes. Sin contratos anuales. Si no quieres continuar, cancelas con un clic antes de que finalicen los 3 meses — sin preguntas.',
  },
];

export const CTA_TRUST = [
  { icon: CircleCheck, text: 'Demo gratuita' },
  { icon: Clock, text: 'Respuesta < 24 h' },
  { icon: ShieldCheck, text: 'Sin compromiso' },
];

export const FOOTER_COLS = [
  {
    title: 'Producto',
    links: [
      { label: 'Cómo funciona', href: '#how-it-works' },
      { label: 'Anti-fraude', href: '#anti-fraude' },
      { label: 'Precios', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/privacidad' },
      { label: 'Términos de Servicio', href: '/terminos' },
    ],
  },
];
