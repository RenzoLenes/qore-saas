// ─── Dashboard Metrics ─────────────────────────────────
export const dashboardMetrics = {
  asistenciasHoy: 247,
  trabajadoresActivos: 312,
  sedesOperativas: 8,
  alertasHoy: 3,
  tasaAsistencia: 94.2,
};

export const weeklyAttendance = [
  { day: 'Lun', value: 88 },
  { day: 'Mar', value: 92 },
  { day: 'Mié', value: 96 },
  { day: 'Jue', value: 85 },
  { day: 'Vie', value: 94 },
  { day: 'Sáb', value: 45 },
  { day: 'Dom', value: 12 },
];

export const recentActivity = [
  { id: '1', name: 'María Torres', action: 'Entrada', sede: 'Sede Central', time: '08:59', status: 'ok' as const },
  { id: '2', name: 'Luis García', action: 'Entrada', sede: 'Sede Norte', time: '09:02', status: 'ok' as const },
  { id: '3', name: 'Pedro Ruiz', action: 'Alerta GPS', sede: 'Sede Sur', time: '09:05', status: 'alert' as const },
  { id: '4', name: 'Ana Castillo', action: 'Entrada', sede: 'Sede Central', time: '09:08', status: 'ok' as const },
  { id: '5', name: 'Carlos Mendoza', action: 'Salida', sede: 'Sede Este', time: '09:10', status: 'ok' as const },
  { id: '6', name: 'Laura Jiménez', action: 'Entrada tardía', sede: 'Sede Central', time: '09:15', status: 'warning' as const },
  { id: '7', name: 'Roberto Flores', action: 'Entrada', sede: 'Sede Norte', time: '09:18', status: 'ok' as const },
  { id: '8', name: 'Diana Morales', action: 'Alerta GPS', sede: 'Sede Sur', time: '09:22', status: 'alert' as const },
];

// ─── Sedes ─────────────────────────────────────────────
export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  radioGps: number;
  trabajadores: number;
  asistenciaHoy: number;
  estado: 'activa' | 'inactiva';
  horario: string;
  lat: number;
  lng: number;
}

export const sedes: Sede[] = [
  {
    id: 'sede-1',
    nombre: 'Sede Central',
    direccion: 'Av. Javier Prado 1234, San Isidro, Lima',
    radioGps: 150,
    trabajadores: 85,
    asistenciaHoy: 78,
    estado: 'activa',
    horario: 'Lun-Vie · 08:00 — 18:00',
    lat: -12.0977,
    lng: -77.0365,
  },
  {
    id: 'sede-2',
    nombre: 'Sede Norte',
    direccion: 'Calle Los Olivos 567, Los Olivos, Lima',
    radioGps: 100,
    trabajadores: 62,
    asistenciaHoy: 58,
    estado: 'activa',
    horario: 'Lun-Vie · 07:00 — 17:00',
    lat: -11.9811,
    lng: -77.0683,
  },
  {
    id: 'sede-3',
    nombre: 'Sede Sur',
    direccion: 'Av. Tomás Marsano 890, Surquillo, Lima',
    radioGps: 120,
    trabajadores: 45,
    asistenciaHoy: 41,
    estado: 'activa',
    horario: 'Lun-Sáb · 08:00 — 20:00',
    lat: -12.1136,
    lng: -76.9988,
  },
  {
    id: 'sede-4',
    nombre: 'Sede Este',
    direccion: 'Av. La Molina 2345, La Molina, Lima',
    radioGps: 200,
    trabajadores: 38,
    asistenciaHoy: 35,
    estado: 'activa',
    horario: 'Lun-Vie · 09:00 — 18:00',
    lat: -12.0826,
    lng: -76.9428,
  },
  {
    id: 'sede-5',
    nombre: 'Almacén Callao',
    direccion: 'Jr. Industrial 456, Callao',
    radioGps: 250,
    trabajadores: 28,
    asistenciaHoy: 25,
    estado: 'activa',
    horario: 'Lun-Sáb · 06:00 — 16:00',
    lat: -12.0564,
    lng: -77.1185,
  },
  {
    id: 'sede-6',
    nombre: 'Oficina Miraflores',
    direccion: 'Calle Schell 234, Miraflores, Lima',
    radioGps: 80,
    trabajadores: 22,
    asistenciaHoy: 0,
    estado: 'inactiva',
    horario: 'Lun-Vie · 09:00 — 18:00',
    lat: -12.1191,
    lng: -77.0311,
  },
];

// ─── Trabajadores / Planillas ──────────────────────────
export interface Trabajador {
  id: string;
  nombre: string;
  cargo: string;
  sede: string;
  estado: 'presente' | 'ausente' | 'tardanza' | 'permiso';
  horasHoy: number;
  horasMes: number;
  entrada: string | null;
  salida: string | null;
}

export const trabajadores: Trabajador[] = [
  { id: 'w-1', nombre: 'María Torres', cargo: 'Analista Contable', sede: 'Sede Central', estado: 'presente', horasHoy: 7.5, horasMes: 162, entrada: '08:02', salida: null },
  { id: 'w-2', nombre: 'Luis García', cargo: 'Desarrollador Senior', sede: 'Sede Norte', estado: 'presente', horasHoy: 6.8, horasMes: 158, entrada: '08:45', salida: null },
  { id: 'w-3', nombre: 'Pedro Ruiz', cargo: 'Operario', sede: 'Sede Sur', estado: 'tardanza', horasHoy: 5.2, horasMes: 140, entrada: '09:32', salida: null },
  { id: 'w-4', nombre: 'Ana Castillo', cargo: 'Gerente de Proyectos', sede: 'Sede Central', estado: 'presente', horasHoy: 8.0, horasMes: 176, entrada: '07:58', salida: null },
  { id: 'w-5', nombre: 'Carlos Mendoza', cargo: 'Supervisor de Obra', sede: 'Sede Este', estado: 'presente', horasHoy: 8.0, horasMes: 180, entrada: '07:00', salida: '16:00' },
  { id: 'w-6', nombre: 'Laura Jiménez', cargo: 'Diseñadora UX', sede: 'Sede Central', estado: 'tardanza', horasHoy: 4.5, horasMes: 148, entrada: '09:15', salida: null },
  { id: 'w-7', nombre: 'Roberto Flores', cargo: 'Técnico IT', sede: 'Sede Norte', estado: 'presente', horasHoy: 7.0, horasMes: 165, entrada: '08:30', salida: null },
  { id: 'w-8', nombre: 'Diana Morales', cargo: 'Almacenera', sede: 'Almacén Callao', estado: 'presente', horasHoy: 8.0, horasMes: 184, entrada: '06:05', salida: null },
  { id: 'w-9', nombre: 'Fernando López', cargo: 'Contador', sede: 'Sede Central', estado: 'ausente', horasHoy: 0, horasMes: 152, entrada: null, salida: null },
  { id: 'w-10', nombre: 'Sofía Ramírez', cargo: 'Recepcionista', sede: 'Sede Central', estado: 'permiso', horasHoy: 0, horasMes: 144, entrada: null, salida: null },
  { id: 'w-11', nombre: 'Javier Navarro', cargo: 'Ingeniero Civil', sede: 'Sede Este', estado: 'presente', horasHoy: 7.5, horasMes: 170, entrada: '07:30', salida: null },
  { id: 'w-12', nombre: 'Valeria Cruz', cargo: 'Marketing Manager', sede: 'Sede Central', estado: 'presente', horasHoy: 6.0, horasMes: 155, entrada: '08:55', salida: null },
];

export const horasDetalle = [
  { fecha: '2026-02-02', entrada: '08:02', salida: '18:05', horas: 9.05, estado: 'normal' as const },
  { fecha: '2026-02-03', entrada: '07:58', salida: '18:10', horas: 9.2, estado: 'normal' as const },
  { fecha: '2026-02-04', entrada: '08:35', salida: '18:00', horas: 8.42, estado: 'tardanza' as const },
  { fecha: '2026-02-05', entrada: '08:00', salida: '17:55', horas: 8.92, estado: 'normal' as const },
  { fecha: '2026-02-06', entrada: '08:05', salida: '18:30', horas: 9.42, estado: 'normal' as const },
  { fecha: '2026-02-07', entrada: '08:00', salida: '13:00', horas: 5.0, estado: 'normal' as const },
];
