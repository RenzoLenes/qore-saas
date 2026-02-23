'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import { getTenantTimezone, getTenantTodayStart, getTenantMonthRange, getTenantTodayKey, tenantDateKey } from '@/lib/timezone';
import type { PayrollWorker } from '@/lib/queries/payroll';

/**
 * Server action to fetch payroll data for a specific month.
 * Called from the client when the user changes the month filter.
 */
export async function getPayrollForMonth(month: string): Promise<PayrollWorker[]> {
  if (!/^\d{4}-\d{2}$/.test(month)) return [];

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
  const [y, m] = month.split('-').map(Number);
  const { start: monthStart, end: monthEnd } = getTenantMonthRange(y, m - 1, tz);
  const workerIds = workers.map((w) => w.id);

  const { data: allRecords } = await supabase
    .from('attendance_records')
    .select('worker_id, type, timestamp')
    .eq('tenant_id', profile.tenant_id)
    .in('worker_id', workerIds)
    .gte('timestamp', monthStart)
    .lte('timestamp', monthEnd)
    .order('timestamp');

  const records = allRecords ?? [];
  const recordsByWorker = new Map<string, typeof records>();
  for (const r of records) {
    const list = recordsByWorker.get(r.worker_id) ?? [];
    list.push(r);
    recordsByWorker.set(r.worker_id, list);
  }

  const todayIso = getTenantTodayStart(tz);
  const todayKey = getTenantTodayKey(tz);

  return workers.map((worker) => {
    const workerRecords = recordsByWorker.get(worker.id) ?? [];
    const checkIns = workerRecords.filter((r) => r.type === 'check_in');
    const checkOuts = workerRecords.filter((r) => r.type === 'check_out');

    let hoursMonth = 0;
    let overtimeHours = 0;
    const daysSet = new Set<string>();

    for (const ci of checkIns) {
      const dayStr = tenantDateKey(ci.timestamp, tz);
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
}
