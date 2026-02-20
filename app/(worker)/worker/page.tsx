import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentProfile } from '@/lib/auth';
import { getWorkerStatus } from '@/lib/queries/worker';
import WorkerPanel from '@/components/worker/WorkerPanel';

function WorkerSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-xl border border-border bg-surface-raised p-6">
        <div className="h-6 w-40 bg-border rounded mb-2" />
        <div className="h-4 w-24 bg-border rounded" />
      </div>
      <div className="rounded-xl border border-border bg-surface-raised p-8">
        <div className="h-14 w-full bg-border rounded-xl" />
      </div>
      <div className="rounded-xl border border-border bg-surface-raised p-6">
        <div className="h-4 w-32 bg-border rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-border rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function WorkerContent() {
  const profile = await getCurrentProfile();
  if (!profile) redirect('/login');

  const status = await getWorkerStatus(profile.id);
  if (!status) {
    return (
      <div className="rounded-xl border border-border bg-surface-raised p-8 text-center">
        <p className="text-[var(--text-muted)]">No se encontró tu perfil de trabajador.</p>
        <p className="text-sm text-[var(--text-muted)] mt-2">Contacta a tu administrador.</p>
      </div>
    );
  }

  return <WorkerPanel data={status} />;
}

export default function WorkerPage() {
  return (
    <Suspense fallback={<WorkerSkeleton />}>
      <WorkerContent />
    </Suspense>
  );
}
