'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import { locationSchema } from '@/lib/validations';

export async function createLocation(_prevState: { error: string } | null, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'No tienes permisos para crear sedes.' };
  }

  const raw = {
    name: formData.get('name'),
    address: formData.get('address'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
    gps_radius: formData.get('gps_radius'),
    schedule: formData.get('schedule'),
    work_days: formData.getAll('work_days'),
    entry_mode: formData.get('entry_mode') || null,
    exit_mode: formData.get('exit_mode') || null,
    status: formData.get('status'),
  };

  const parsed = locationSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('locations').insert({
    ...parsed.data,
    tenant_id: profile.tenant_id,
  });

  if (error) {
    return { error: 'Error al crear la sede. Intenta de nuevo.' };
  }

  revalidatePath('/locations');
  redirect('/locations');
}

export async function updateLocation(id: string, _prevState: { error: string } | null, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'No tienes permisos para editar sedes.' };
  }

  const raw = {
    name: formData.get('name'),
    address: formData.get('address'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
    gps_radius: formData.get('gps_radius'),
    schedule: formData.get('schedule'),
    work_days: formData.getAll('work_days'),
    entry_mode: formData.get('entry_mode') || null,
    exit_mode: formData.get('exit_mode') || null,
    status: formData.get('status'),
  };

  const parsed = locationSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('locations')
    .update(parsed.data)
    .eq('id', id)
    .eq('tenant_id', profile.tenant_id);

  if (error) {
    return { error: 'Error al actualizar la sede. Intenta de nuevo.' };
  }

  revalidatePath('/locations');
  revalidatePath(`/locations/${id}`);
  redirect(`/locations/${id}`);
}
