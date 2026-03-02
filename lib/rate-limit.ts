import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

interface RateLimitOptions {
  /** Max requests per window */
  max: number;
  /** Window size in seconds */
  windowSec: number;
  /** Key extractor — defaults to IP address */
  keyFn?: (req: NextRequest) => string;
}

/**
 * In-memory sliding window rate limiter.
 * Returns null if allowed, or a NextResponse 429 if rate limited.
 */
export function rateLimit(req: NextRequest, opts: RateLimitOptions): NextResponse | null {
  cleanup();

  const key = opts.keyFn
    ? opts.keyFn(req)
    : req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown';

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + opts.windowSec * 1000 });
    return null;
  }

  entry.count++;

  if (entry.count > opts.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(opts.max),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
        },
      },
    );
  }

  return null;
}
