'use client';

import { useActionState, useState } from 'react';
import { completeOnboarding } from '@/lib/actions/tenant';
import {
  MapPin,
  ScanLine,
  ShieldCheck,
  Repeat,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowRight,
  LogIn,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import type { CheckInMode } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

interface ModeOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

const ENTRY_OPTIONS: ModeOption[] = [
  {
    value: 'gps_only',
    label: 'Solo GPS',
    description:
      'El trabajador abre la app y registra su ubicación. No necesita escanear nada. Ideal para equipos en campo o con múltiples puntos de trabajo.',
    icon: MapPin,
  },
  {
    value: 'static_qr',
    label: 'QR Estático',
    description:
      'El trabajador escanea un QR impreso fijo en la sede y debe estar dentro del radio GPS. Bueno para oficinas y almacenes.',
    icon: ScanLine,
  },
  {
    value: 'dynamic_qr',
    label: 'QR Dinámico',
    description:
      'El trabajador escanea un QR que rota cada 5 minutos y debe estar dentro del radio GPS. Máxima seguridad contra fraude.',
    icon: ShieldCheck,
    badge: 'Recomendado',
  },
];

const EXIT_OPTIONS: ModeOption[] = [
  {
    value: 'same',
    label: 'Mismo que entrada',
    description: 'Usa exactamente el mismo método que configuraste para la entrada.',
    icon: Repeat,
  },
  {
    value: 'gps_only',
    label: 'Solo GPS',
    description:
      'Solo registra ubicación al salir. La mayoría de empresas usan esta opción para la salida.',
    icon: MapPin,
    badge: 'Popular',
  },
  {
    value: 'static_qr',
    label: 'QR Estático',
    description:
      'Requiere escanear el QR fijo de la sede + GPS al salir.',
    icon: ScanLine,
  },
  {
    value: 'dynamic_qr',
    label: 'QR Dinámico',
    description:
      'Requiere escanear el QR rotativo + GPS al salir. Control total.',
    icon: ShieldCheck,
  },
];

const MODE_LABELS: Record<string, string> = {
  gps_only: 'Solo GPS',
  static_qr: 'QR Estático',
  dynamic_qr: 'QR Dinámico',
};

const MODE_ICONS: Record<string, LucideIcon> = {
  gps_only: MapPin,
  static_qr: ScanLine,
  dynamic_qr: ShieldCheck,
};

const TOTAL_STEPS = 4;

function RadioCard({
  option,
  selected,
  onSelect,
}: {
  option: ModeOption;
  selected: boolean;
  onSelect: (value: string) => void;
}) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? 'border-brand bg-brand/8 ring-1 ring-brand/20'
          : 'border-border bg-surface hover:border-[var(--text-muted)] hover:bg-surface-raised'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
            selected ? 'bg-brand/20 text-brand' : 'bg-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className={`font-semibold text-sm ${
                selected ? 'text-brand' : 'text-foreground'
              }`}
            >
              {option.label}
            </p>
            {option.badge && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                selected
                  ? 'bg-brand/20 text-brand'
                  : 'bg-brand/10 text-brand/70'
              }`}>
                {option.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
            {option.description}
          </p>
        </div>
        <div
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 mt-0.5 transition-colors ${
            selected ? 'border-brand bg-brand' : 'border-[var(--text-muted)]/40'
          }`}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    </button>
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [entryMode, setEntryMode] = useState<CheckInMode>('dynamic_qr');
  const [exitMode, setExitMode] = useState<string>('gps_only');
  const [formState, formAction, isPending] = useActionState(completeOnboarding, null);

  const resolvedExitMode: CheckInMode =
    exitMode === 'same' ? entryMode : (exitMode as CheckInMode);

  function handleNext() {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  const EntryIcon = MODE_ICONS[entryMode];
  const ExitIcon = MODE_ICONS[resolvedExitMode];

  return (
    <div className="w-full max-w-lg">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step
                ? 'w-8 bg-brand'
                : i < step
                  ? 'w-2 bg-brand/50'
                  : 'w-2 bg-[var(--border)]'
            }`}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface-raised p-8">
        {/* ==================== STEP 0: Welcome ==================== */}
        {step === 0 && (
          <div className="flex flex-col items-center text-center">
            <Image src="/logo.png" alt="QORE" width={180} height={48} className="h-12 w-auto mb-6" />

            <h2 className="text-2xl font-extrabold tracking-tight mb-2">
              Configuremos tu empresa
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              En 3 pasos rápidos definirás cómo marcan asistencia tus trabajadores.
            </p>

            <div className="w-full mt-8 space-y-3">
              {[
                {
                  icon: LogIn,
                  title: 'Modo de entrada',
                  desc: 'Cómo registran llegada',
                },
                {
                  icon: LogOut,
                  title: 'Modo de salida',
                  desc: 'Cómo registran salida',
                },
                {
                  icon: Check,
                  title: 'Confirmar',
                  desc: 'Revisar y aplicar',
                },
              ].map((item, i) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand flex-shrink-0">
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      Paso {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-[var(--text-muted)] mt-6 leading-relaxed">
              Esta será la configuración por defecto de tu empresa. Después podrás personalizarla por sede o por trabajador en Configuración.
            </p>
          </div>
        )}

        {/* ==================== STEP 1: Entry Mode ==================== */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                ¿Cómo marcan entrada tus trabajadores?
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1.5">
                Este será el default para toda la empresa. Puedes cambiarlo por sede o trabajador después.
              </p>
            </div>
            <div className="grid gap-3">
              {ENTRY_OPTIONS.map((option) => (
                <RadioCard
                  key={option.value}
                  option={option}
                  selected={entryMode === option.value}
                  onSelect={(val) => setEntryMode(val as CheckInMode)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== STEP 2: Exit Mode ==================== */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                ¿Y para registrar la salida?
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1.5">
                La mayoría de empresas usa solo GPS para la salida, pero puedes requerir QR también.
              </p>
            </div>
            <div className="grid gap-3">
              {EXIT_OPTIONS.map((option) => (
                <RadioCard
                  key={option.value}
                  option={option}
                  selected={exitMode === option.value}
                  onSelect={setExitMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================== STEP 3: Confirm ==================== */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Confirmar configuración
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1.5">
                Revisa que todo esté correcto. Puedes modificarlo en cualquier momento desde Configuración.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-surface p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                  <EntryIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    Modo de entrada
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {MODE_LABELS[entryMode]}
                  </p>
                </div>
                <LogIn className="h-4 w-4 text-[var(--text-muted)]" />
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 flex-shrink-0">
                  <ExitIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    Modo de salida
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {MODE_LABELS[resolvedExitMode]}
                    {exitMode === 'same' && (
                      <span className="text-[var(--text-muted)] font-normal ml-1 text-xs">
                        (mismo que entrada)
                      </span>
                    )}
                  </p>
                </div>
                <LogOut className="h-4 w-4 text-[var(--text-muted)]" />
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-brand/5 border border-brand/10 px-4 py-3">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <span className="font-medium text-brand">Nota:</span> Esta configuración aplica a toda tu empresa. Puedes crear excepciones por sede o por trabajador en cualquier momento.
              </p>
            </div>

            {formState?.error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {formState.error}
              </div>
            )}
          </div>
        )}

        {/* ==================== Navigation ==================== */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Atrás
            </button>
          ) : (
            <div />
          )}

          {step === 0 && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark"
            >
              Empezar
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {(step === 1 || step === 2) && (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-brand-dark"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {step === 3 && (
            <form action={formAction}>
              <input type="hidden" name="default_entry_mode" value={entryMode} />
              <input type="hidden" name="default_exit_mode" value={resolvedExitMode} />
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Completar Configuración
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
