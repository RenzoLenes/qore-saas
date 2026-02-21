import Link from 'next/link';
import { CheckCircle2, Users } from 'lucide-react';
import { getAbsentWorkers } from '@/lib/queries/dashboard';

export default async function AbsentWorkers() {
  const workers = await getAbsentWorkers();

  return (
    <div className="rounded-xl border border-border bg-surface-raised">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold">Ausentes Hoy</h3>
        {workers.length > 0 && (
          <span className="text-[10px] font-medium bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
            {workers.length}
          </span>
        )}
      </div>

      {workers.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
          <p className="text-sm text-[var(--text-muted)]">Todos presentes</p>
        </div>
      ) : (
        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {workers.map((worker) => (
            <div key={worker.id} className="px-5 py-3">
              <p className="text-sm font-medium">{worker.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {worker.position} &middot; {worker.location_name}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="px-5 py-3 border-t border-border">
        <Link
          href="/workers"
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-foreground transition-colors"
        >
          <Users className="h-3 w-3" />
          Ver trabajadores
        </Link>
      </div>
    </div>
  );
}
