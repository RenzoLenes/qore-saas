'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  label?: string;
  name?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  icon: Icon,
  label,
  name,
  required,
  className = '',
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={value} required={required} />}

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={`
            flex items-center gap-2 w-full h-10 px-3.5 rounded-lg border text-sm text-left transition-all
            ${open
              ? 'border-brand ring-2 ring-brand/40'
              : 'border-border hover:border-[var(--text-muted)]'
            }
            bg-background text-foreground
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {Icon && <Icon className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />}
          <span className={`flex-1 truncate ${selected ? '' : 'text-[var(--text-muted)]'}`}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown className={`h-3.5 w-3.5 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div
            className="absolute z-50 mt-1.5 w-full min-w-[180px] rounded-lg border border-border bg-surface-raised shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden"
            style={{ animation: 'fade-in 0.15s ease-out' }}
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`
                      flex items-center gap-2 w-full px-3.5 py-2 text-sm text-left transition-colors
                      ${isSelected
                        ? 'bg-brand/8 text-brand font-medium'
                        : 'text-foreground hover:bg-surface'
                      }
                    `}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
