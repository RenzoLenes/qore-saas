import { redirect } from 'next/navigation';
import WorkerTopbar from '@/components/worker/WorkerTopbar';
import { getCurrentProfile } from '@/lib/auth';

export default async function WorkerLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  if (!profile) redirect('/login');
  if (profile.role !== 'worker') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-surface">
      <WorkerTopbar name={profile.full_name} />
      <main className="max-w-lg mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
