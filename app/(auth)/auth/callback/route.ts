import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const type = searchParams.get('type');

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Recovery flow → redirect to set-password page
    if (type === 'recovery') {
      const url = request.nextUrl.clone();
      url.pathname = '/set-password';
      url.search = '';
      return NextResponse.redirect(url);
    }

    // Default: redirect based on role
    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role;
    const url = request.nextUrl.clone();
    url.pathname = role === 'worker' ? '/worker' : '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // No code: redirect to login
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  return NextResponse.redirect(url);
}
