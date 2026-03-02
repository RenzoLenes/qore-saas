export type PlanId = 'starter' | 'professional' | 'business';

export interface PlanConfig {
  id: PlanId;
  name: string;
  price: number;
  currency: string;
  maxWorkers: number;
  maxLocations: number;
  features: string[];
}

export const PLANS: Record<PlanId, PlanConfig> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 49,
    currency: 'PEN',
    maxWorkers: 30,
    maxLocations: 1,
    features: [
      '1 sede',
      'Registro con QR + GPS',
      'Dashboard de asistencia',
      'Reportes en Excel',
      'Gestión de trabajadores',
      'Soporte por email',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 99,
    currency: 'PEN',
    maxWorkers: 80,
    maxLocations: 3,
    features: [
      'Hasta 3 sedes',
      'Todo de Starter +',
      'Radio GPS configurable por sede',
      'Módulo de nómina',
      'Reportes avanzados (Excel, CSV, PDF)',
      'Mapa de sedes en tiempo real',
      'Soporte prioritario',
    ],
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 149,
    currency: 'PEN',
    maxWorkers: 999999,
    maxLocations: 999999,
    features: [
      'Sedes ilimitadas',
      'Todo de Professional +',
      'Roles y permisos por sede',
      'Multi-administrador',
      'Exportación automatizada',
      'Alertas por email',
      'Soporte dedicado',
    ],
  },
};

export function getPlan(planId: string): PlanConfig | null {
  return PLANS[planId as PlanId] ?? null;
}

/** Display-friendly max value */
export function formatLimit(max: number): string {
  return max >= 999999 ? 'Ilimitados' : String(max);
}
