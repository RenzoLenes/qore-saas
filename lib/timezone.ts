/**
 * Timezone utilities — "Store UTC, Display Local"
 *
 * All date boundaries and display formatting respect the tenant's IANA timezone.
 * Uses native Intl.DateTimeFormat (Node 18+), no external dependencies.
 */

import { getCurrentProfile } from '@/lib/auth';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Parse Intl-formatted parts into a plain object */
function getPartsInTz(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),    // 1-indexed
    day: Number(parts.day),
    hours: Number(parts.hour) % 24, // Intl returns "24" for midnight sometimes
    minutes: Number(parts.minute),
    seconds: Number(parts.second),
  };
}

/** Build a UTC Date from "wall-clock" parts in the given timezone */
function wallToUtc(year: number, month: number, day: number, h: number, m: number, s: number, ms: number, tz: string): Date {
  // Start with a rough guess
  const guess = new Date(Date.UTC(year, month - 1, day, h, m, s, ms));
  // Check what wall-clock that guess maps to in the target timezone
  const parts = getPartsInTz(guess, tz);
  // Compute the offset difference and adjust
  const guessWall = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hours, parts.minutes, parts.seconds);
  const diff = guess.getTime() - guessWall;
  return new Date(Date.UTC(year, month - 1, day, h, m, s, ms) + diff);
}

// ---------------------------------------------------------------------------
// Tenant timezone resolver
// ---------------------------------------------------------------------------

/** Get the IANA timezone for the current tenant (defaults to America/Lima) */
export async function getTenantTimezone(): Promise<string> {
  const profile = await getCurrentProfile();
  return (profile?.tenant as { timezone?: string } | undefined)?.timezone ?? 'America/Lima';
}

// ---------------------------------------------------------------------------
// Day / Range boundaries (returns ISO UTC strings for Supabase queries)
// ---------------------------------------------------------------------------

/** Midnight of "today" in the tenant's timezone, as an ISO UTC string */
export function getTenantTodayStart(tz: string): string {
  const now = new Date();
  const { year, month, day } = getPartsInTz(now, tz);
  return wallToUtc(year, month, day, 0, 0, 0, 0, tz).toISOString();
}

/** Start and end of a specific date in the tenant's timezone */
export function getTenantDayRange(date: Date, tz: string): { start: string; end: string } {
  const { year, month, day } = getPartsInTz(date, tz);
  return {
    start: wallToUtc(year, month, day, 0, 0, 0, 0, tz).toISOString(),
    end: wallToUtc(year, month, day, 23, 59, 59, 999, tz).toISOString(),
  };
}

/** Start and end of a month (0-indexed) in the tenant's timezone */
export function getTenantMonthRange(year: number, month: number, tz: string): { start: string; end: string } {
  const lastDay = new Date(year, month + 1, 0).getDate(); // e.g. 28/29/30/31
  return {
    start: wallToUtc(year, month + 1, 1, 0, 0, 0, 0, tz).toISOString(),
    end: wallToUtc(year, month + 1, lastDay, 23, 59, 59, 999, tz).toISOString(),
  };
}

/** Array of 7 Dates (Mon-Sun) for the current week in the tenant's timezone */
export function getTenantCurrentWeek(tz: string): Date[] {
  const now = new Date();
  const { year, month, day } = getPartsInTz(now, tz);
  // day-of-week in tenant tz
  const tenantToday = wallToUtc(year, month, day, 12, 0, 0, 0, tz); // noon to avoid DST edge
  const dow = tenantToday.getUTCDay(); // 0=Sun
  const mondayOffset = dow === 0 ? -6 : 1 - dow;

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(tenantToday);
    d.setUTCDate(d.getUTCDate() + mondayOffset + i);
    week.push(d);
  }
  return week;
}

// ---------------------------------------------------------------------------
// Punctuality check
// ---------------------------------------------------------------------------

/** Is the check-in on time relative to the schedule in the tenant's timezone? */
export function isOnTime(checkInUtc: string, schedule: string, tz: string): boolean {
  const startTime = schedule.split('-')[0]?.trim();
  if (!startTime) return true;
  const [hours, minutes] = startTime.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return true;

  // Get check-in wall-clock in tenant tz
  const ciParts = getPartsInTz(new Date(checkInUtc), tz);
  const ciMinutes = ciParts.hours * 60 + ciParts.minutes;
  const scheduleMinutes = hours * 60 + minutes;
  return ciMinutes <= scheduleMinutes;
}

// ---------------------------------------------------------------------------
// Display formatters
// ---------------------------------------------------------------------------

/** "08:30 a. m." — time in tenant timezone */
export function formatTenantTime(utcTimestamp: string, tz: string): string {
  return new Date(utcTimestamp).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: tz,
  });
}

/** "lun, 17 feb" — short date in tenant timezone */
export function formatTenantDate(utcTimestamp: string, tz: string): string {
  return new Date(utcTimestamp).toLocaleDateString('es-PE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: tz,
  });
}

/** "Lunes 17 Feb" — full date for tooltips */
export function formatTenantFullDate(utcTimestamp: string, tz: string): string {
  const d = new Date(utcTimestamp);
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const parts = getPartsInTz(d, tz);
  // Reconstruct day-of-week from the wall date
  const wall = new Date(parts.year, parts.month - 1, parts.day);
  return `${dayNames[wall.getDay()]} ${parts.day} ${monthNames[parts.month - 1]}`;
}

/** "2026-02-20" — date key in tenant timezone (for day-matching logic) */
export function tenantDateKey(utcTimestamp: string, tz: string): string {
  const { year, month, day } = getPartsInTz(new Date(utcTimestamp), tz);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** "17 feb" — short date without weekday */
export function formatTenantShortDate(utcTimestamp: string, tz: string): string {
  return new Date(utcTimestamp).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    timeZone: tz,
  });
}

/** Decomposed "now" in the tenant's timezone */
export function getTenantNow(tz: string): {
  year: number;
  month: number;   // 0-indexed (JS convention)
  day: number;
  dayOfWeek: number; // 0=Sun
  hours: number;
  minutes: number;
} {
  const now = new Date();
  const parts = getPartsInTz(now, tz);
  const wall = new Date(parts.year, parts.month - 1, parts.day);
  return {
    year: parts.year,
    month: parts.month - 1, // convert to 0-indexed
    day: parts.day,
    dayOfWeek: wall.getDay(),
    hours: parts.hours,
    minutes: parts.minutes,
  };
}

/** "today" date key in tenant timezone */
export function getTenantTodayKey(tz: string): string {
  const now = new Date();
  const { year, month, day } = getPartsInTz(now, tz);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
