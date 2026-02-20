'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import { tenantSettingsSchema, onboardingSchema } from '@/lib/validations';

export async function updateTenantSettings(_prevState: unknown, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || profile.role !== 'owner') {
    return { error: 'Solo el propietario puede modificar la configuración.' };
  }

  const parsed = tenantSettingsSchema.safeParse({
    default_entry_mode: formData.get('default_entry_mode'),
    default_exit_mode: formData.get('default_exit_mode'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('tenants')
    .update({
      default_entry_mode: parsed.data.default_entry_mode,
      default_exit_mode: parsed.data.default_exit_mode,
    })
    .eq('id', profile.tenant_id);

  if (error) {
    return { error: 'Error al guardar la configuración.' };
  }

  revalidatePath('/settings');
  return { success: true };
}

export async function completeOnboarding(_prevState: unknown, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id) {
    return { error: 'No autenticado.' };
  }

  const parsed = onboardingSchema.safeParse({
    default_entry_mode: formData.get('default_entry_mode'),
    default_exit_mode: formData.get('default_exit_mode'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('tenants')
    .update({
      default_entry_mode: parsed.data.default_entry_mode,
      default_exit_mode: parsed.data.default_exit_mode,
      onboarding_completed: true,
    })
    .eq('id', profile.tenant_id);

  if (error) {
    return { error: 'Error al guardar la configuración.' };
  }

  revalidatePath('/');
  redirect('/dashboard');
}
