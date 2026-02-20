import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/lib/auth';
import OnboardingWizard from '@/components/dashboard/OnboardingWizard';

export default async function OnboardingPage() {
  const profile = await getCurrentProfile();

  if (!profile?.tenant_id) {
    redirect('/login');
  }

  // Already completed onboarding — go to dashboard
  if (profile.tenant?.onboarding_completed) {
    redirect('/dashboard');
  }

  return <OnboardingWizard />;
}
