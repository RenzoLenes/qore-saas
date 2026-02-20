'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export function AuthHashHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes('access_token')) return;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type = params.get('type');

    if (!accessToken || !refreshToken) return;

    const supabase = createBrowserSupabaseClient();

    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    }).then(({ error }) => {
      // Clear hash from URL
      window.history.replaceState(null, '', window.location.pathname);

      if (error) {
        console.error('Failed to set session from hash:', error);
        router.push('/login');
        return;
      }

      if (type === 'recovery') {
        router.push('/set-password');
      } else {
        // For other flows, redirect based on role
        supabase.auth.getUser().then(({ data: { user } }) => {
          const role = user?.user_metadata?.role;
          router.push(role === 'worker' ? '/worker' : '/dashboard');
        });
      }
    });
  }, [router]);

  return null;
}
