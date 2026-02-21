import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { getLiveLocations } from '@/lib/queries/dashboard';

export default async function LiveLocations() {
  const locations = await getLiveLocations();

  return (
    <div className="rounded-xl border border-border bg-surface-raised">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold">Sedes en Vivo</h3>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <span className="text-[10px] font-medium bg-brand/10 text-brand px-2 py-0.5 rounded-full">
          Ahora
        </span>
      </div>

      {locations.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">
          Sin sedes activas
        </div>
      ) : (
        <div className="divide-y divide-border">
          {locations.map((loc) => (
            <div key={loc.id} className="flex items-center gap-3 px-5 py-3">
              <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                loc.present > 0 ? 'bg-emerald-500' : 'bg-[var(--text-muted)]/40'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-medium truncate">{loc.name}</span>
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0 tabular-nums">
                    {loc.present}/{loc.total}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-500"
                      style={{ width: `${loc.percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-[var(--text-muted)] w-8 text-right tabular-nums">
                    {loc.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-5 py-3 border-t border-border">
        <Link
          href="/locations"
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-foreground transition-colors"
        >
          <MapPin className="h-3 w-3" />
          Ver todas las sedes
        </Link>
      </div>
    </div>
  );
}
