# QORE SaaS — Roadmap Detallado

**Fecha de auditoría:** 2026-03-01
**Branch evaluado:** `refactor/landing-page` | **Commit:** `0ec1cbc`
**Evaluadores:** QA Engineer, Tech Lead, PMO
**Readiness actual:** 55/100

---

## Resumen Ejecutivo

QORE tiene una base técnica sólida (Next.js 16, React 19, Supabase, Tailwind CSS 4) y un core de asistencia funcional (QR/GPS check-in, dashboard, nómina). Sin embargo, existen **3 bloqueadores críticos** que impiden la monetización: sin pasarela de pagos, middleware de auth roto, y un bug en cálculos de nómina. Este roadmap define el camino de ~16 semanas hacia un producto comercializable.

---

## Scorecard Actual

| Área                   | Puntaje | Notas                                                    |
| ---------------------- | ------- | -------------------------------------------------------- |
| Estructura del proyecto | 8/10    | Limpia, bien organizada. Código muerto menor.            |
| Calidad de código       | 7/10    | Sin `any`. Type safety minada por 18x double-casts.      |
| Arquitectura            | 7/10    | Buenos patrones. Middleware roto. N+1 queries.            |
| Seguridad               | 5/10    | Buen RLS, pero gap crítico en middleware. Sin CSRF/rate limit. |
| Performance             | 7/10    | Buen SSR. N+1 queries y CSS global son los issues principales. |
| Escalabilidad           | 5/10    | Schema multi-tenant sólido. Sin paginación ni caching.   |
| Sistemas faltantes      | 4/10    | Sin tests, CI/CD, monitoring, ni billing.                |
| Deuda técnica           | 6/10    | Manejable. Priorizar middleware, types y queries.        |

---

## Fase 0: Hotfixes Críticos

> **Duración:** 3-5 días
> **Meta:** Eliminar bugs que corrompen datos y vulnerabilidades de seguridad inmediatas

### 0.1 Fix `countWorkDays` — Bug de nómina (CRITICAL)

- **Problema:** `countWorkDays()` compara días en inglés (`Monday`, `Tuesday`...) contra la config de locaciones que usa español (`Lunes`, `Martes`...). Resultado: **todas** las tasas de asistencia y cálculos de nómina son incorrectos.
- **Archivo:** `lib/queries/payroll.ts`
- **Fix:** Normalizar comparación de días a un formato consistente (mapeo inglés↔español o usar índices numéricos).
- **Esfuerzo:** 2-4 horas
- **Impacto:** Afecta datos financieros de todos los tenants

### 0.2 Renombrar `proxy.ts` → `middleware.ts` (CRITICAL)

- **Problema:** El archivo `proxy.ts` contiene lógica correcta de middleware (auth redirects, role-based routing, onboarding redirect) pero Next.js requiere que se llame `middleware.ts` y exporte `middleware` (no `proxy`). Resultado: **zero protección de rutas a nivel edge**.
- **Archivo:** `proxy.ts` → `middleware.ts`
- **Fix:** Renombrar archivo y función exportada.
- **Esfuerzo:** 1 hora
- **Impacto:** Sin esto, usuarios no autenticados pueden acceder a server components del dashboard

### 0.3 Fix crash en Settings cuando tenant es null (CRITICAL)

- **Problema:** La página de settings crashea si `getCurrentProfile()` retorna un tenant null (edge case durante onboarding incompleto).
- **Archivo:** `app/(dashboard)/settings/page.tsx`
- **Fix:** Agregar null check y redirect a onboarding si no hay tenant.
- **Esfuerzo:** 1-2 horas

### 0.4 Fix QR URL hardcodeada a localhost (HIGH)

- **Problema:** Los QR generados apuntan a `localhost:3000`, inútiles en producción.
- **Archivo:** `components/qr/QRPreview.tsx`
- **Fix:** Usar `process.env.NEXT_PUBLIC_APP_URL` o `window.location.origin`.
- **Esfuerzo:** 30 minutos

---

## Fase 1: Revenue Ready

> **Duración:** Semanas 1-4
> **Meta:** Aceptar el primer cliente que pague
> **Resultado esperado:** Readiness 70/100

### 1.1 Forgot Password Flow (P0)

- **Problema:** Botón "¿Olvidaste tu contraseña?" tiene `type="button"` sin `onClick`. Infraestructura existe (`set-password`, recovery callback) pero falta el trigger.
- **Archivos a modificar:**
  - `app/(auth)/login/page.tsx` — Agregar modal o página de recuperación
  - Crear `app/(auth)/forgot-password/page.tsx` — Form de email + `supabase.auth.resetPasswordForEmail()`
  - `lib/email-templates/` — Template de reset password (opcional, Supabase tiene default)
- **Esfuerzo:** 2-3 días
- **Dependencias:** Ninguna

### 1.2 Integración MercadoPago (P0)

- **Problema:** Pricing existe en landing (Starter $49, Professional $99, Business $149) pero no hay forma de cobrar.
- **Por qué MercadoPago:** Mercado objetivo es Perú/LATAM. MercadoPago soporta soles (PEN), tarjetas locales, Yape, transferencias bancarias y tiene mejor penetración en la región.
- **Componentes a construir:**

| Componente | Descripción | Esfuerzo |
|------------|-------------|----------|
| `lib/mercadopago.ts` | Cliente MercadoPago SDK + helpers | 4h |
| `app/api/mercadopago/preference/route.ts` | Crear Preference (checkout) para suscripción | 4h |
| `app/api/mercadopago/webhook/route.ts` | Procesar IPN/webhooks (payment.created, subscription_preapproval.updated, etc.) | 1d |
| `app/(dashboard)/billing/page.tsx` | Página de billing en dashboard | 1d |
| `components/billing/PlanCard.tsx` | Card de plan actual + upgrade CTA | 4h |
| `components/billing/BillingHistory.tsx` | Historial de pagos | 4h |
| Tabla `subscriptions` en Supabase | mp_customer_id, mp_preapproval_id, plan, status, next_payment_date | 2h |
| Actualizar landing page CTAs | Conectar botones de pricing a checkout de MercadoPago | 2h |

- **Esfuerzo total:** 2-3 semanas
- **Dependencias:** Cuenta MercadoPago configurada, access token de producción
- **SDK:** `mercadopago` (npm) — SDK oficial de MercadoPago para Node.js
- **Modelo de cobro:** Suscripciones recurrentes via `preapproval` API de MercadoPago

### 1.3 Plan Limits Enforcement (P0)

- **Problema:** Campo `tenants.plan` existe (default `'trial'`) pero no se valida en ningún lugar.
- **Límites a implementar:**

| Plan | Workers | Locations | QR Dinámico | Reportes | Soporte |
|------|---------|-----------|-------------|----------|---------|
| Trial | 5 | 1 | No | Básicos | Email |
| Starter ($49) | 25 | 3 | No | CSV | Email |
| Professional ($99) | 100 | 10 | Sí | CSV + Excel | Prioritario |
| Business ($149) | Ilimitado | Ilimitado | Sí | CSV + Excel + PDF | Dedicado |

- **Archivos a modificar:**
  - Crear `lib/plan-limits.ts` — Definición de límites por plan + helper `checkPlanLimit()`
  - `lib/actions/workers.ts` — Verificar límite antes de crear worker
  - `lib/actions/locations.ts` — Verificar límite antes de crear sede
  - `components/dashboard/Sidebar.tsx` — Mostrar uso actual vs límite
  - Crear `components/billing/UpgradePrompt.tsx` — Modal cuando se alcanza un límite
- **Esfuerzo:** 1-2 semanas
- **Dependencias:** 1.2 (Stripe) para upgrade flow

### 1.4 Rate Limiting en APIs (HIGH)

- **Problema:** `/api/waitlist` y `/api/attendance` sin rate limiting. Posible spam de leads + emails y abuso del endpoint de asistencia.
- **Solución:** Implementar rate limiter basado en IP.
- **Opciones:**
  - `@vercel/kv` + sliding window (si se deploya en Vercel)
  - In-memory con `Map` + cleanup interval (MVP)
  - Upstash Redis rate limiter
- **Archivos:**
  - Crear `lib/rate-limit.ts` — Rate limiter reutilizable
  - `app/api/waitlist/route.ts` — Agregar check
  - `app/api/attendance/route.ts` — Agregar check
- **Esfuerzo:** 1-2 días

### 1.5 Error Tracking + Analytics (P1)

- **Problema:** Zero visibilidad en errores de producción y comportamiento de usuarios.
- **Implementar:**
  - **Sentry:** `@sentry/nextjs` — Error tracking + performance monitoring
  - **Analytics:** Plausible (privacy-friendly) o PostHog (product analytics con feature flags)
- **Archivos:**
  - `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
  - `next.config.ts` — withSentryConfig wrapper
  - `app/global-error.tsx` — Error boundary global con Sentry report
  - Script de analytics en `app/layout.tsx`
- **Esfuerzo:** 1-2 días

### 1.6 SEO y Metadata Faltante (P1)

- **Problema:** Faltan OG image, favicon propio, sitemap.xml, robots.txt, canonical URLs.
- **Archivos a crear:**
  - `app/sitemap.ts` — Sitemap dinámico de Next.js
  - `app/robots.ts` — Robots.txt dinámico
  - `app/favicon.ico` + `app/apple-touch-icon.png`
  - `public/og-image.png` — Imagen para social sharing (1200x630)
  - Actualizar `app/layout.tsx` metadata con OG image y canonical
- **Esfuerzo:** 1 día

### 1.7 Error Boundaries (P1)

- **Problema:** Cero archivos `error.tsx` en toda la app. Errores de server components muestran página genérica de Next.js.
- **Archivos a crear:**
  - `app/(dashboard)/error.tsx`
  - `app/(auth)/error.tsx`
  - `app/(worker)/error.tsx`
  - `app/(marketing)/error.tsx`
  - `app/global-error.tsx`
- **Esfuerzo:** 4-6 horas

---

## Fase 2: Launch Ready

> **Duración:** Semanas 5-8
> **Meta:** Lanzamiento público con confianza
> **Resultado esperado:** Readiness 85/100

### 2.1 Delete/Archive de Workers y Locations (P1)

- **Problema:** No hay forma de eliminar o archivar trabajadores ni sedes.
- **Implementación:** Soft-delete con campo `archived_at` timestamp.
- **Archivos:**
  - Migración SQL: agregar `archived_at` a `workers` y `locations`
  - `lib/actions/workers.ts` — `archiveWorker()` server action
  - `lib/actions/locations.ts` — `archiveLocation()` server action
  - UI: Confirmation dialog + botón en detail pages
  - Filtro en queries existentes: `.is('archived_at', null)`
- **Esfuerzo:** 2-3 días

### 2.2 User Profile Management (P1)

- **Problema:** No hay forma de cambiar nombre, email o contraseña del usuario.
- **Archivos:**
  - Crear `app/(dashboard)/profile/page.tsx`
  - Crear `components/profile/ProfileForm.tsx` — Editar nombre, email
  - Crear `components/profile/ChangePasswordForm.tsx`
  - `lib/actions/profile.ts` — Server actions para update
- **Esfuerzo:** 2-3 días

### 2.3 Export Excel (P1)

- **Problema:** Landing page promete export Excel y PDF, pero solo existe CSV.
- **Implementación:** Usar `xlsx` (SheetJS) para Excel.
- **Archivos:**
  - `npm install xlsx`
  - `components/payroll/PayrollTable.tsx` — Agregar botón Excel junto al de CSV
  - Crear `lib/export.ts` — Helper reutilizable para generar Excel
- **Esfuerzo:** 2-3 días

### 2.4 Cookie Consent Banner (P1)

- **Problema:** Política de privacidad menciona cookies pero no hay banner de consentimiento.
- **Archivos:**
  - Crear `components/CookieConsent.tsx` — Banner client component con localStorage persistence
  - Agregar en `app/layout.tsx`
  - Condicionar carga de analytics al consentimiento
- **Esfuerzo:** 1 día

### 2.5 Client-side Validation en Login (HIGH)

- **Problema:** Form de login no valida campos vacíos antes de submit.
- **Archivos:**
  - `app/(auth)/login/page.tsx` — Agregar Zod schema + validación antes de submit
  - Extraer `components/ui/PasswordInput.tsx` — Componente reutilizable (actualmente duplicado en 3 páginas auth)
- **Esfuerzo:** 4-6 horas

### 2.6 Email Notifications (P2)

- **Problema:** No hay alertas automáticas para eventos de asistencia.
- **Implementar:**

| Notificación | Trigger | Destinatario |
|--------------|---------|--------------|
| Ausencia detectada | Worker no marca entrada pasada la hora | Admin |
| Tardanza | Entrada después de hora configurada | Admin |
| GPS Spoofing detectado | Flag de fraude en attendance record | Admin |
| Resumen diario | Cron al final del día | Admin |

- **Archivos:**
  - `lib/email-templates/absence-alert.tsx`
  - `lib/email-templates/late-arrival.tsx`
  - `lib/email-templates/fraud-alert.tsx`
  - `lib/email-templates/daily-summary.tsx`
  - `app/api/cron/daily-summary/route.ts` — Endpoint para Vercel Cron
  - Trigger en `app/api/attendance/route.ts` para alertas en tiempo real
- **Esfuerzo:** 1 semana

### 2.7 Multi-Admin / Team Management (P2)

- **Problema:** Solo el owner puede administrar. No hay invitación de admins adicionales.
- **Archivos:**
  - Crear `app/(dashboard)/team/page.tsx` — Lista de miembros del equipo
  - Crear `components/team/InviteAdminForm.tsx`
  - `lib/actions/team.ts` — inviteAdmin, removeAdmin, changeRole
  - `lib/email-templates/admin-invitation.tsx`
  - Migración: rol `admin` vs `owner` vs `viewer` en profiles
- **Esfuerzo:** 1 semana

### 2.8 Reemplazar Social Proof Fabricado (P1)

- **Problema:** Testimonios y logos de empresas ficticias. Riesgo legal y de credibilidad.
- **Opciones:**
  - Reemplazar con testimonios reales de beta testers
  - Cambiar a sección "Early adopters" con logos reales (con permiso)
  - Remover sección temporalmente y reemplazar con métricas del producto
- **Esfuerzo:** 1 día (diseño) + recolección de testimonios reales (ongoing)

### 2.9 Dashboard Empty State + Onboarding Checklist (P2)

- **Problema:** Después del onboarding wizard, usuario cae en dashboard vacío sin guía.
- **Implementar:**
  - Crear `components/dashboard/OnboardingChecklist.tsx`
  - Steps: "Crea tu primera sede" → "Registra tu primer trabajador" → "Genera un código QR" → "Realiza tu primer registro de asistencia"
  - Mostrar si el tenant tiene 0 locations o 0 workers
  - Progress bar con estado de completitud
- **Esfuerzo:** 2-3 días

---

## Fase 3: Scale Ready

> **Duración:** Semanas 9-16
> **Meta:** Soportar crecimiento y mejorar retención
> **Resultado esperado:** Readiness 95/100

### 3.1 PWA Manifest + Push Notifications (P2)

- **Problema:** Workers usan la app desde mobile pero no hay PWA ni push.
- **Archivos:**
  - `public/manifest.json` — PWA manifest
  - `app/layout.tsx` — Link al manifest
  - Service worker para push notifications
  - `app/api/push/subscribe/route.ts` — Registrar suscripción push
  - `app/api/push/send/route.ts` — Enviar push notification
- **Esfuerzo:** 2-3 semanas

### 3.2 Worker Self-Service Portal (P2)

- **Problema:** Workers no pueden ver su historial completo ni recibos de pago.
- **Archivos:**
  - Crear `app/(worker)/history/page.tsx` — Historial de asistencia paginado
  - Crear `app/(worker)/payslip/page.tsx` — Recibo de horas del mes
  - Agregar navegación en worker layout
- **Esfuerzo:** 1 semana

### 3.3 Bulk Import de Workers (CSV) (P2)

- **Archivos:**
  - Crear `components/workers/BulkImportDialog.tsx` — Upload + preview + confirm
  - `lib/actions/workers.ts` — `bulkImportWorkers()` con validación por fila
  - Template CSV descargable
- **Esfuerzo:** 3-5 días

### 3.4 PDF Reports (P2)

- **Implementar:** Usar `@react-pdf/renderer` para generar PDFs server-side.
- **Reportes:**
  - Reporte mensual de asistencia por sede
  - Reporte de nómina individual por trabajador
  - Reporte consolidado para contabilidad
- **Esfuerzo:** 1 semana

### 3.5 Optimización de Queries (Technical Debt)

- **Problema:** N+1 queries en dashboard (7 queries/día) y locations (1+2N queries).
- **Fixes:**

| Query actual | Optimización | Archivo |
|--------------|-------------|---------|
| `getWeeklyAttendance` — 7 queries individuales | Single query con `date_trunc` y `GROUP BY` | `lib/queries/dashboard.ts:98-118` |
| `getLocations` — 1+2N queries por sede | JOINs con subquery counts | `lib/queries/locations.ts:27-49` |
| Payroll calculation en JS (~8000 records en memoria) | Aggregation query en SQL | `lib/queries/payroll.ts:89-134` |

- **Esfuerzo:** 3-5 días
- **Impacto:** Reducción de ~90% en queries para tenants grandes

### 3.6 Paginación Global (Technical Debt)

- **Problema:** Todos los listados cargan datasets completos sin paginación.
- **Archivos afectados:**
  - `app/(dashboard)/workers/page.tsx` — Workers list
  - `app/(dashboard)/locations/page.tsx` — Locations list
  - `app/(dashboard)/payroll/page.tsx` — Payroll table
  - `components/dashboard/ActivitySection.tsx` — Activity feed
- **Implementar:** Cursor-based pagination con `searchParams` para page/limit.
- **Esfuerzo:** 3-5 días

### 3.7 Generar Tipos Supabase (Technical Debt)

- **Problema:** 18x `as unknown as` casts en el codebase por falta de tipos de Supabase.
- **Fix:** `supabase gen types typescript --project-id <id> > lib/database.types.ts`
- **Luego:** Crear typed query helpers que eliminen todos los casts.
- **Esfuerzo:** 1-2 días

### 3.8 CI/CD Pipeline (P2)

- **Crear:** `.github/workflows/ci.yml`
  - `npm run lint` — ESLint
  - `npm run build` — Verificar build exitoso
  - (Futuro) Tests unitarios y E2E
- **Crear:** `.github/workflows/deploy.yml` — Deploy a Vercel via GitHub integration
- **Esfuerzo:** 1-2 días

### 3.9 Testing Infrastructure (P2)

- **Setup:** Vitest + React Testing Library + Playwright
- **Prioridad de tests:**

| Tipo | Target | Razón |
|------|--------|-------|
| Unit | `lib/geo.ts` (haversine, spoofing) | Lógica crítica de negocio |
| Unit | `lib/resolve-mode.ts` (cascade) | Lógica de modos compleja |
| Unit | `lib/queries/payroll.ts` (cálculos) | Datos financieros |
| Integration | `app/api/attendance/route.ts` | Endpoint más complejo |
| Integration | `app/api/waitlist/route.ts` | Flujo público |
| E2E | Landing → Waitlist submit | Happy path marketing |
| E2E | Login → Dashboard → Create worker | Happy path admin |
| E2E | Worker login → Check-in → Check-out | Happy path worker |

- **Esfuerzo:** 2-3 semanas (setup + tests prioritarios)

### 3.10 API Documentation para Integraciones (P3)

- **Crear:** Documentación OpenAPI/Swagger de endpoints
- **Evaluar:** Webhooks para eventos (attendance.created, worker.invited, etc.)
- **Esfuerzo:** 1 semana

### 3.11 Help Center / Knowledge Base (P3)

- **Opciones:**
  - Intercom / Crisp / Tawk.to para chat + knowledge base
  - Notion público como docs temporales
  - Sección `/docs` en la app
- **Esfuerzo:** 1-2 semanas

---

## Deuda Técnica Adicional (Backlog)

Estos items no bloquean ninguna fase pero deben resolverse eventualmente:

| # | Item | Archivo(s) | Esfuerzo |
|---|------|-----------|----------|
| 1 | Extraer `PasswordInput` reutilizable (duplicado en 3 páginas) | `app/(auth)/login/`, `register/`, `set-password/` | 2h |
| 2 | Eliminar `lib/mock-data.ts` (156 líneas, no usado) | `lib/mock-data.ts` | 10min |
| 3 | Eliminar assets default de Next.js | `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | 10min |
| 4 | Eliminar landing page variants abandonadas | `app/(marketing)/v1-v4/` (~2,700 líneas) | 10min |
| 5 | Eliminar tipos duplicados de waitlist | `types/waitlist.ts` (usar `z.infer` de validations) | 30min |
| 6 | Mover MapLibre CSS a import condicional | `app/globals.css:2` | 1h |
| 7 | Limitar grain overlay solo a marketing pages | `app/layout.tsx:59`, `app/globals.css:149-157` | 1h |
| 8 | Eliminar `resolveMode` duplicado en WorkerPanel | `components/worker/WorkerPanel.tsx:23-33` | 30min |
| 9 | Lógica de payroll duplicada entre queries y actions | `lib/queries/payroll.ts`, `lib/actions/payroll.ts` | 2h |
| 10 | Agregar `loading.tsx` en route groups | `app/(dashboard)/`, `app/(auth)/`, `app/(worker)/` | 2h |
| 11 | UI no funcional: search en topbar, bell icon fake | `components/dashboard/Topbar.tsx` | Remover o implementar |
| 12 | AuthHashHandler corre en todas las páginas innecesariamente | `components/AuthHashHandler.tsx` | 1h |
| 13 | `next.config.ts` vacío — agregar images.remotePatterns | `next.config.ts` | 30min |
| 14 | eslint-disable en WorkerPanel useEffect | `components/worker/WorkerPanel.tsx:155` | 30min |
| 15 | Auth callback no valida resultado de `exchangeCodeForSession` | `app/(auth)/auth/callback/route.ts:11` | 30min |

---

## Timeline Visual

```
Semana  0         1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
        │         │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
FASE 0  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        Hotfixes (3-5 días)
        │         │    │    │    │
FASE 1  ░░░░░░░░░░████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                  Revenue Ready (4 semanas)
                  │    │    │    │    │    │    │    │
FASE 2  ░░░░░░░░░░░░░░░░░░░░░░░░░████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                                  Launch Ready (4 semanas)
                                  │    │    │    │    │    │    │    │    │    │    │    │
FASE 3  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████████████████████████░
                                                      Scale Ready (8 semanas)
```

---

## Métricas de Éxito por Fase

| Fase | Métrica | Target |
|------|---------|--------|
| Fase 0 | Bugs críticos resueltos | 0 CRITICAL bugs |
| Fase 1 | Primer pago procesado | 1+ transacción exitosa |
| Fase 1 | Error visibility | 100% de errores tracked en Sentry |
| Fase 2 | Lanzamiento público | Landing page sin contenido fabricado |
| Fase 2 | Feature completeness | 100% de promesas del landing cumplidas |
| Fase 3 | Performance | <3s time-to-interactive en dashboard |
| Fase 3 | Test coverage | >60% en lógica de negocio crítica |
| Fase 3 | Scale | Soportar 50+ tenants, 500+ workers sin degradación |
