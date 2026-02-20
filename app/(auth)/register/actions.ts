'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { registerSchema } from '@/lib/validations';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function register(_prevState: { error: string } | null, formData: FormData) {
  const raw = {
    full_name: formData.get('full_name'),
    company_name: formData.get('company_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { full_name, company_name, email, password } = parsed.data;

  // 1. Create auth user (admin client to skip email confirmation)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name,
      role: 'owner',
    },
  });

  if (authError) {
    if (authError.message?.includes('already been registered')) {
      return { error: 'Ya existe una cuenta con este email.' };
    }
    console.error('Register auth error:', authError);
    return { error: 'Error al crear la cuenta. Intenta de nuevo.' };
  }

  const userId = authData.user.id;

  // 2. Create tenant
  const suffix = Math.random().toString(36).substring(2, 6);
  const slug = `${slugify(company_name)}-${suffix}`;

  const { data: tenant, error: tenantError } = await supabaseAdmin
    .from('tenants')
    .insert({ name: company_name, slug })
    .select('id')
    .single();

  if (tenantError || !tenant) {
    // Cleanup: delete auth user
    await supabaseAdmin.auth.admin.deleteUser(userId);
    console.error('Tenant creation error:', tenantError);
    return { error: 'Error al crear la empresa. Intenta de nuevo.' };
  }

  // 3. Link user to tenant
  const { error: linkError } = await supabaseAdmin
    .from('users')
    .update({ tenant_id: tenant.id })
    .eq('id', userId);

  if (linkError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    console.error('User-tenant link error:', linkError);
    return { error: 'Error al configurar la cuenta. Intenta de nuevo.' };
  }

  // 4. Auto-login
  const supabase = await createServerSupabaseClient();
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { error: 'Cuenta creada. Inicia sesión manualmente.' };
  }

  redirect('/onboarding');
}
