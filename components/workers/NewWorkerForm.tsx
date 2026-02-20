'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Briefcase, Mail, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { createWorker } from '@/lib/actions/workers';
import type { Location, CheckInMode } from '@/lib/types';

const MODE_OPTIONS: { value: string; label: string; description: string }[] = [
  { value: '', label: 'Heredar', description: 'Usa el modo configurado en la sede o empresa.' },
  { value: 'gps_only', label: 'Solo GPS', description: 'Registra ubicación y hora. Sin validación de radio ni QR.' },
  { value: 'static_qr', label: 'QR Estático', description: 'QR permanente en la sede + GPS dentro del radio.' },
  { value: 'dynamic_qr', label: 'QR Dinámico', description: 'QR rotativo (5 min) + GPS dentro del radio. Más seguro.' },
];

interface NewWorkerFormProps {
  locations: Location[];
  defaultEntryMode: CheckInMode;
  defaultExitMode: CheckInMode;
}

export default function NewWorkerForm({ locations, defaultEntryMode, defaultExitMode }: NewWorkerFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createWorker, null);
  const [entryMode, setEntryMode] = useState<string>('');
  const [exitMode, setExitMode] = useState<string>('');
  const [locationId, setLocationId] = useState('');

  const effectiveEntry = (entryMode || defaultEntryMode) as CheckInMode;
  const locationRequired = effectiveEntry !== 'gps_only';

  const modeLabels: Record<string, string> = {
    gps_only: 'Solo GPS',
    static_qr: 'QR Estático',
    dynamic_qr: 'QR Dinámico',
  };

  const locationOptions = [
    { value: '', label: locationRequired ? 'Selecciona una sede' : 'Sin sede asignada' },
    ...locations.map((loc) => ({ value: loc.id, label: loc.name })),
  ];

  return (
    <form action={formAction} className="rounded-xl border border-border bg-surface-raised p-6 space-y-5">
      {state?.error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          {state.error}
        </div>
      )}

      <Input label="Nombre Completo" icon={User} type="text" id="name" name="name" required placeholder="Ej: Carlos Méndez" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Cargo" icon={Briefcase} type="text" id="position" name="position" required placeholder="Ej: Supervisor de Operaciones" />
        <Input label="Email (opcional)" icon={Mail} type="email" id="email" name="email" placeholder="carlos@empresa.com" />
      </div>

      {/* Entry mode selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Modo de Entrada</label>
        <div className="flex gap-2">
          {MODE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex-1">
              <input
                type="radio"
                name="_entry_radio"
                value={value}
                checked={entryMode === value}
                onChange={() => setEntryMode(value)}
                className="peer sr-only"
              />
              <div className="text-center text-xs font-medium py-2.5 rounded-lg border border-border cursor-pointer transition-colors peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand">
                {label}
              </div>
            </label>
          ))}
        </div>
        <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
          {entryMode
            ? MODE_OPTIONS.find((m) => m.value === entryMode)?.description
            : `Hereda de la sede/empresa: ${modeLabels[defaultEntryMode]}`
          }
        </p>
      </div>

      {/* Exit mode selector */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Modo de Salida</label>
        <div className="flex gap-2">
          {MODE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex-1">
              <input
                type="radio"
                name="_exit_radio"
                value={value}
                checked={exitMode === value}
                onChange={() => setExitMode(value)}
                className="peer sr-only"
              />
              <div className="text-center text-xs font-medium py-2.5 rounded-lg border border-border cursor-pointer transition-colors peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand">
                {label}
              </div>
            </label>
          ))}
        </div>
        <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
          {exitMode
            ? MODE_OPTIONS.find((m) => m.value === exitMode)?.description
            : `Hereda de la sede/empresa: ${modeLabels[defaultExitMode]}`
          }
        </p>
      </div>

      {/* Hidden inputs for actual form submission */}
      <input type="hidden" name="entry_mode" value={entryMode} />
      <input type="hidden" name="exit_mode" value={exitMode} />

      <Select
        label={locationRequired ? 'Sede Asignada' : 'Sede Asignada (opcional)'}
        icon={MapPin}
        name="location_id"
        required={locationRequired}
        options={locationOptions}
        value={locationId}
        onChange={setLocationId}
        placeholder={locationRequired ? 'Selecciona una sede' : 'Sin sede asignada'}
      />

      <input type="hidden" name="status" value="active" />

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={pending} className="flex-1 h-11">
          {pending ? 'Agregando...' : 'Agregar Trabajador'}
        </Button>
        <Button variant="secondary" type="button" onClick={() => router.back()} className="h-11 px-6">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
