import type { CheckInMode, Worker, Location, Tenant } from '@/lib/types';

/**
 * Resolves the effective entry mode using the cascade:
 * worker.entry_mode → location.entry_mode → tenant.default_entry_mode
 */
export function resolveEntryMode(
  worker: Pick<Worker, 'entry_mode'>,
  location: Pick<Location, 'entry_mode'> | null | undefined,
  tenant: Pick<Tenant, 'default_entry_mode'>,
): CheckInMode {
  return worker.entry_mode ?? location?.entry_mode ?? tenant.default_entry_mode;
}

/**
 * Resolves the effective exit mode using the cascade:
 * worker.exit_mode → location.exit_mode → tenant.default_exit_mode
 */
export function resolveExitMode(
  worker: Pick<Worker, 'exit_mode'>,
  location: Pick<Location, 'exit_mode'> | null | undefined,
  tenant: Pick<Tenant, 'default_exit_mode'>,
): CheckInMode {
  return worker.exit_mode ?? location?.exit_mode ?? tenant.default_exit_mode;
}

/**
 * Resolves the effective mode for a given attendance type.
 */
export function resolveMode(
  type: 'check_in' | 'check_out',
  worker: Pick<Worker, 'entry_mode' | 'exit_mode'>,
  location: Pick<Location, 'entry_mode' | 'exit_mode'> | null | undefined,
  tenant: Pick<Tenant, 'default_entry_mode' | 'default_exit_mode'>,
): CheckInMode {
  return type === 'check_in'
    ? resolveEntryMode(worker, location, tenant)
    : resolveExitMode(worker, location, tenant);
}
