'use client';

import { useState, useActionState } from 'react';
import { Building2, MapPin, Zap, Lock, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { updateTenantSettings } from '@/lib/actions/tenant';
import type { CheckInMode } from '@/lib/types';

const MODE_OPTIONS: { value: CheckInMode; label: string; description: string; icon: typeof MapPin }[] = [
  { value: 'gps_only', label: 'Solo GPS', description: 'Registra ubicación y hora.', icon: MapPin },
  { value: 'static_qr', label: 'QR Estático', description: 'QR permanente + GPS en radio.', icon: Lock },
  { value: 'dynamic_qr', label: 'QR Dinámico', description: 'QR rotativo 5 min + GPS.', icon: Zap },
];

interface SettingsFormProps {
  tenant: {
    default_entry_mode: CheckInMode;
    default_exit_mode: CheckInMode;
    name: string;
    plan: string;
  };
}

export default function SettingsForm({ tenant }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(updateTenantSettings, null);
  const [entryMode, setEntryMode] = useState<CheckInMode>(tenant.default_entry_mode);
  const [exitMode, setExitMode] = useState<CheckInMode>(tenant.default_exit_mode);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {/* Error message */}
      {state?.error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          {state.error}
        </div>
      )}

      {/* Success message */}
      {state?.success && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-500 flex items-center gap-2">
          <Check className="h-4 w-4" />
          Configuración guardada correctamente.
        </div>
      )}

      {/* Section 1: Company Info (read-only) */}
      <div className="rounded-xl border border-border bg-surface-raised p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="h-4.5 w-4.5 text-brand" />
          <h2 className="text-base font-semibold">Información de la Empresa</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Nombre</label>
            <div className="h-11 flex items-center px-4 rounded-lg border border-border bg-background text-foreground text-sm">
              {tenant.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Plan</label>
            <div className="h-11 flex items-center px-4 rounded-lg border border-border bg-background text-foreground text-sm capitalize">
              {tenant.plan}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Default Modes */}
      <div className="rounded-xl border border-border bg-surface-raised p-6 space-y-6">
        <h2 className="text-base font-semibold">Modos por Defecto</h2>

        {/* Entry Mode */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Modo de Entrada</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MODE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="_entry_mode_radio"
                  value={value}
                  checked={entryMode === value}
                  onChange={() => setEntryMode(value)}
                  className="peer sr-only"
                />
                <div className="rounded-xl border border-border p-4 transition-all peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:ring-1 peer-checked:ring-brand/20 hover:border-[var(--text-muted)]">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className="h-4 w-4 text-[var(--text-muted)] peer-checked:text-brand" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Exit Mode */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Modo de Salida</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MODE_OPTIONS.map(({ value, label, description, icon: Icon }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="_exit_mode_radio"
                  value={value}
                  checked={exitMode === value}
                  onChange={() => setExitMode(value)}
                  className="peer sr-only"
                />
                <div className="rounded-xl border border-border p-4 transition-all peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:ring-1 peer-checked:ring-brand/20 hover:border-[var(--text-muted)]">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className="h-4 w-4 text-[var(--text-muted)] peer-checked:text-brand" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden inputs for form submission */}
      <input type="hidden" name="default_entry_mode" value={entryMode} />
      <input type="hidden" name="default_exit_mode" value={exitMode} />

      {/* Submit */}
      <Button type="submit" loading={pending} className="h-11 px-8">
        {pending ? 'Guardando...' : 'Guardar Configuración'}
      </Button>
    </form>
  );
}
