'use server';

import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function setPassword(_prevState: { error: string } | null, formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden.' };
  }

  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Sesión expirada. Usa el enlace del email nuevamente.' };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error('Set password error:', error);
    return { error: 'Error al guardar la contraseña. Intenta de nuevo.' };
  }

  const role = user.user_metadata?.role;
  redirect(role === 'worker' ? '/worker' : '/dashboard');
}
