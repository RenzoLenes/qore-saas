import { MercadoPagoConfig, PreApproval, PreApprovalPlan } from 'mercadopago';

// Re-export plans from the standalone module (no SDK dependency)
export { PLANS, type PlanId, type PlanConfig, getPlan, formatLimit } from './plans';

// Lazy-initialized MercadoPago client — only crashes when actually used,
// not when plan-limits.ts or other modules import PLANS.
let _client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (!_client) {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined');
    }
    _client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });
  }
  return _client;
}

export function getPreApproval(): PreApproval {
  return new PreApproval(getClient());
}

export function getPreApprovalPlan(): PreApprovalPlan {
  return new PreApprovalPlan(getClient());
}
