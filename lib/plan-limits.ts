import { PLANS, type PlanId, formatLimit } from './plans';

interface PlanLimits {
  maxWorkers: number;
  maxLocations: number;
}

const TRIAL_LIMITS: PlanLimits = {
  maxWorkers: 5,
  maxLocations: 1,
};

export function getPlanLimits(plan: string): PlanLimits {
  if (plan === 'trial') return TRIAL_LIMITS;
  const config = PLANS[plan as PlanId];
  if (!config) return TRIAL_LIMITS;
  return {
    maxWorkers: config.maxWorkers,
    maxLocations: config.maxLocations,
  };
}

export interface LimitCheckResult {
  allowed: boolean;
  current: number;
  max: number;
  resource: string;
}

export function checkLimit(current: number, max: number, resource: string): LimitCheckResult {
  return {
    allowed: current < max,
    current,
    max,
    resource,
  };
}
