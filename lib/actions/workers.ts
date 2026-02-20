'use server';

import * as React from 'react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getCurrentProfile } from '@/lib/auth';
import { resend } from '@/lib/resend';
import { workerSchema } from '@/lib/validations';
import { WorkerInvitationEmail } from '@/lib/email-templates/worker-invitation';

export async function createWorker(_prevState: { error: string } | null, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'No tienes permisos para agregar trabajadores.' };
  }

  const raw = {
    name: formData.get('name'),
    position: formData.get('position'),
    email: formData.get('email'),
    entry_mode: formData.get('entry_mode') || null,
    exit_mode: formData.get('exit_mode') || null,
    location_id: formData.get('location_id'),
    status: formData.get('status'),
  };

  const parsed = workerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const email = parsed.data.email;
  if (!email) {
    return { error: 'El email es requerido para enviar la invitación.' };
  }

  // Create auth user for the worker
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: {
      full_name: parsed.data.name,
      role: 'worker',
      tenant_id: profile.tenant_id,
    },
  });

  if (authError) {
    if (authError.message?.includes('already been registered')) {
      return { error: 'Ya existe una cuenta con este email.' };
    }
    console.error('Auth user creation error:', authError);
    return { error: 'Error al crear la cuenta del trabajador.' };
  }

  // Insert worker with user_id link
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('workers').insert({
    name: parsed.data.name,
    position: parsed.data.position,
    email,
    entry_mode: parsed.data.entry_mode ?? null,
    exit_mode: parsed.data.exit_mode ?? null,
    location_id: parsed.data.location_id || null,
    status: parsed.data.status,
    tenant_id: profile.tenant_id,
    user_id: authData.user.id,
  });

  if (error) {
    // Cleanup: delete the auth user if worker insert fails
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    console.error('Worker insert error:', error);
    return { error: 'Error al agregar el trabajador. Intenta de nuevo.' };
  }

  // Send invitation email (fire-and-forget)
  const tenantName = profile.tenant?.name ?? 'tu empresa';
  supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
  }).then(({ data: linkData }) => {
    if (!linkData?.properties?.action_link) return;
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Te han invitado a QORE — ${tenantName}`,
      react: React.createElement(WorkerInvitationEmail, {
        workerName: parsed.data.name,
        companyName: tenantName,
        inviteUrl: linkData.properties.action_link,
      }),
    }).catch((err) => console.error('Failed to send worker invitation:', err));
  }).catch((err) => console.error('Failed to generate invite link:', err));

  revalidatePath('/workers');
  redirect('/workers');
}

export async function updateWorker(id: string, _prevState: { error: string } | null, formData: FormData) {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'No tienes permisos para editar trabajadores.' };
  }

  const raw = {
    name: formData.get('name'),
    position: formData.get('position'),
    email: formData.get('email'),
    entry_mode: formData.get('entry_mode') || null,
    exit_mode: formData.get('exit_mode') || null,
    location_id: formData.get('location_id'),
    status: formData.get('status'),
  };

  const parsed = workerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('workers')
    .update({
      name: parsed.data.name,
      position: parsed.data.position,
      email: parsed.data.email || null,
      entry_mode: parsed.data.entry_mode ?? null,
      exit_mode: parsed.data.exit_mode ?? null,
      location_id: parsed.data.location_id || null,
      status: parsed.data.status,
    })
    .eq('id', id)
    .eq('tenant_id', profile.tenant_id);

  if (error) {
    return { error: 'Error al actualizar el trabajador. Intenta de nuevo.' };
  }

  revalidatePath('/workers');
  revalidatePath(`/workers/${id}`);
  redirect(`/workers/${id}`);
}
