import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/privacidad', '/terminos', '/api/waitlist', '/api/mercadopago/webhook'];
const AUTH_ROUTES = ['/set-password', '/auth/callback'];
const ONBOARDING_ROUTE = '/onboarding';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isWorker = user?.user_metadata?.role === 'worker';

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname === route)) {
    return supabaseResponse;
  }

  // Allow static assets and Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.includes('.')) {
    return supabaseResponse;
  }

  // Redirect unauthenticated users to login
  if (!user && pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot-password') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow auth routes (set-password, callback) for authenticated users
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return supabaseResponse;
  }

  // Redirect authenticated users away from login/register
  if (user && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = isWorker ? '/worker' : '/dashboard';
    return NextResponse.redirect(url);
  }

  // Prevent workers from accessing admin dashboard
  if (user && isWorker && (pathname.startsWith('/dashboard') || pathname.startsWith('/locations') || pathname.startsWith('/workers') || pathname.startsWith('/payroll') || pathname.startsWith('/billing') || pathname.startsWith('/qr') || pathname.startsWith('/settings') || pathname.startsWith('/onboarding'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/worker';
    return NextResponse.redirect(url);
  }

  // Prevent admins from accessing worker panel
  if (user && !isWorker && (pathname === '/worker' || pathname.startsWith('/worker/') || pathname.startsWith('/scan/'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Onboarding redirect for admin users (not workers)
  if (user && !isWorker && pathname !== ONBOARDING_ROUTE && pathname !== '/settings') {
    const { data: profile } = await supabase
      .from('users')
      .select('tenant_id, tenant:tenants(onboarding_completed)')
      .eq('id', user.id)
      .single();

    const tenant = profile?.tenant as unknown as { onboarding_completed: boolean } | null;
    if (profile?.tenant_id && tenant && !tenant.onboarding_completed) {
      const url = request.nextUrl.clone();
      url.pathname = ONBOARDING_ROUTE;
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
