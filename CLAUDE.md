# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QORE SaaS — a Next.js 16 landing page and waitlist system for an attendance management platform (QR/GPS-based). All user-facing text is in Spanish (es-ES).

## Commands

```bash
npm run dev      # Dev server on port 3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint (eslint-config-next with core-web-vitals + typescript)
```

No test framework is configured.

## Architecture

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 with dark mode (`dark:` prefix)
- **Database**: Supabase (`/lib/supabase.ts` exports `supabase` for client and `supabaseAdmin` for API routes bypassing RLS)
- **Email**: Resend with React Email templates in `/lib/email-templates/`
- **Validation**: Zod schemas in `/lib/validations.ts`, used both client-side and in API routes
- **Icons**: lucide-react

### Key Flow

1. Landing page (`/app/page.tsx`) renders waitlist form (client component)
2. Form submits to `POST /api/waitlist/route.ts`
3. API validates with Zod, inserts into `waitlist_leads` table, sends confirmation + team notification emails (non-blocking)

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase client
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase admin (API routes only)
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TEAM_EMAIL` — Email service

## Conventions

- Use `@/` path alias for imports
- Server Components by default; add `'use client'` only when needed
- Brand primary color: `#00d4ff`
- Type inference from Zod: `z.infer<typeof schema>`
- Email failures are caught and logged but never fail the API request
- Database error `23505` = duplicate email (return 409)
