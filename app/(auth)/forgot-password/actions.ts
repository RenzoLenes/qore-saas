'use server';

import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const emailSchema = z.string().email('Ingresa un email válido.');

export async function forgotPassword(_prevState: { error?: string; success?: boolean } | null, formData: FormData) {
  const raw = formData.get('email') as string;
  const parsed = emailSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const email = parsed.data;

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.qore.io'}/auth/callback?type=recovery`,
  });

  if (error) {
    console.error('Forgot password error:', error);
    return { error: 'Error al enviar el email. Intenta de nuevo.' };
  }

  // Always show success to avoid email enumeration
  return { success: true };
}
