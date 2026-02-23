import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import { getTenantTimezone, getTenantTodayStart, getTenantMonthRange, getTenantNow, getTenantTodayKey, tenantDateKey } from '@/lib/timezone';
import type { Worker, AttendanceRecord } from '@/lib/types';

export interface PayrollWorker extends Worker {
  today_check_in?: string;
  hours_today: number;
  hours_month: number;
  days_worked: number;
  overtime_hours: number;
}

export interface PayrollMetrics {
  total_workers: number;
  total_hours: number;
  overtime_hours: number;
  workers_with_records: number;
}

/**
 * Returns the start and end ISO strings for a given month (YYYY-MM).
 * Defaults to current month if not provided.
 * Uses tenant timezone for correct boundaries.
 */
function getMonthRange(tz: string, month?: string): { start: string; end: string } {
  let year: number, m: number;
  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const [y, mo] = month.split('-').map(Number);
    year = y;
    m = mo - 1; // JS months are 0-indexed
  } else {
    const now = getTenantNow(tz);
    year = now.year;
    m = now.month;
  }
  return getTenantMonthRange(year, m, tz);
}

/**
 * Fetch all workers with attendance metrics for the given month.
 * Uses a single batch query for attendance instead of N+1.
 */
export const getWorkers = cache(async (month?: string): Promise<PayrollWorker[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const { data: workers } = await supabase
    .from('workers')
    .select('*, location:locations(name)')
    .eq('tenant_id', profile.tenant_id)
    .order('name');

  if (!workers || workers.length === 0) return [];

  const tz = await getTenantTimezone();
  const { start: monthStart, end: monthEnd } = getMonthRange(tz, month);
  const workerIds = workers.map((w) => w.id);

  // Single batch query for all attendance records in the month
  const { data: allRecords } = await supabase
    .from('attendance_records')
    .select('worker_id, type, timestamp')
    .eq('tenant_id', profile.tenant_id)
    .in('worker_id', workerIds)
    .gte('timestamp', monthStart)
    .lte('timestamp', monthEnd)
    .order('timestamp');

  const records = allRecords ?? [];

  // Group records by worker
  const recordsByWorker = new Map<string, typeof records>();
  for (const r of records) {
    const list = recordsByWorker.get(r.worker_id) ?? [];
    list.push(r);
    recordsByWorker.set(r.worker_id, list);
  }

  // Today's range for today_check_in / hours_today
  const todayIso = getTenantTodayStart(tz);
  const todayKey = getTenantTodayKey(tz);

  const enriched: PayrollWorker[] = workers.map((worker) => {
    const workerRecords = recordsByWorker.get(worker.id) ?? [];
    const checkIns = workerRecords.filter((r) => r.type === 'check_in');
    const checkOuts = workerRecords.filter((r) => r.type === 'check_out');

    // Monthly calculations
    let hoursMonth = 0;
    let overtimeHours = 0;
    const daysSet = new Set<string>();

    for (const ci of checkIns) {
      const dayStr = tenantDateKey(ci.timestamp, tz);
      // Find the matching check_out for the same day
      const co = checkOuts.find(
        (r) => tenantDateKey(r.timestamp, tz) === dayStr && new Date(r.timestamp) > new Date(ci.timestamp),
      );
      const ciDate = new Date(ci.timestamp);
      const endTime = co ? new Date(co.timestamp) : (dayStr === todayKey ? new Date() : ciDate);
      const dayHours = (endTime.getTime() - ciDate.getTime()) / 3600000;
      if (dayHours > 0) {
        hoursMonth += dayHours;
        if (dayHours > 8) overtimeHours += dayHours - 8;
        daysSet.add(dayStr);
      }
    }

    // Today's data
    const todayCheckIn = checkIns.find((r) => r.timestamp >= todayIso);
    let hoursToday = 0;
    if (todayCheckIn) {
      const todayCheckOut = checkOuts.find(
        (r) => tenantDateKey(r.timestamp, tz) === todayKey,
      );
      const end = todayCheckOut ? new Date(todayCheckOut.timestamp) : new Date();
      hoursToday = (end.getTime() - new Date(todayCheckIn.timestamp).getTime()) / 3600000;
    }

    return {
      ...worker,
      today_check_in: todayCheckIn?.timestamp ?? undefined,
      hours_today: Math.round(hoursToday * 10) / 10,
      hours_month: Math.round(hoursMonth * 10) / 10,
      days_worked: daysSet.size,
      overtime_hours: Math.round(overtimeHours * 10) / 10,
    };
  });

  return enriched;
});

export const getWorkerById = cache(async (id: string): Promise<Worker | null> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return null;

  const { data } = await supabase
    .from('workers')
    .select('*, location:locations(name, entry_mode, exit_mode, work_days), tenant:tenants(default_entry_mode, default_exit_mode)')
    .eq('id', id)
    .eq('tenant_id', profile.tenant_id)
    .single();

  return data as Worker | null;
});

/**
 * Get attendance records for a worker for the given month (defaults to current month).
 */
export const getAttendanceForWorker = cache(async (workerId: string, month?: string): Promise<AttendanceRecord[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const tz = await getTenantTimezone();
  const { start, end } = getMonthRange(tz, month);

  const { data } = await supabase
    .from('attendance_records')
    .select('*, location:locations(name)')
    .eq('worker_id', workerId)
    .eq('tenant_id', profile.tenant_id)
    .gte('timestamp', start)
    .lte('timestamp', end)
    .order('timestamp', { ascending: false });

  return (data ?? []) as AttendanceRecord[];
});
