import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import type { DashboardMetrics, WeeklyAttendance, RecentActivity } from '@/lib/types';

export const getDashboardMetrics = cache(async (): Promise<DashboardMetrics> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) {
    return { total_workers: 0, active_locations: 0, today_attendance: 0, attendance_rate: 0 };
  }

  const tenantId = profile.tenant_id;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [workersRes, locationsRes, attendanceRes] = await Promise.all([
    supabase
      .from('workers')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active'),
    supabase
      .from('locations')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active'),
    supabase
      .from('attendance_records')
      .select('worker_id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('type', 'check_in')
      .gte('timestamp', todayStart.toISOString()),
  ]);

  const totalWorkers = workersRes.count ?? 0;
  const todayAttendance = attendanceRes.count ?? 0;

  return {
    total_workers: totalWorkers,
    active_locations: locationsRes.count ?? 0,
    today_attendance: todayAttendance,
    attendance_rate: totalWorkers > 0 ? Math.round((todayAttendance / totalWorkers) * 100) : 0,
  };
});

export const getWeeklyAttendance = cache(async (): Promise<WeeklyAttendance[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const results: WeeklyAttendance[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const { count } = await supabase
      .from('attendance_records')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', profile.tenant_id)
      .eq('type', 'check_in')
      .gte('timestamp', dayStart.toISOString())
      .lte('timestamp', dayEnd.toISOString());

    results.push({ day: days[date.getDay() === 0 ? 6 : date.getDay() - 1], count: count ?? 0 });
  }

  return results;
});

export const getRecentActivity = cache(async (): Promise<RecentActivity[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const { data } = await supabase
    .from('attendance_records')
    .select('id, type, method, timestamp, within_radius, worker:workers(name), location:locations(name)')
    .eq('tenant_id', profile.tenant_id)
    .order('timestamp', { ascending: false })
    .limit(10);

  return (data ?? []).map((record) => ({
    id: record.id,
    worker_name: (record.worker as unknown as { name: string })?.name ?? 'Desconocido',
    location_name: (record.location as unknown as { name: string })?.name ?? 'Desconocida',
    type: record.type as 'check_in' | 'check_out',
    method: record.method,
    timestamp: record.timestamp,
    within_radius: record.within_radius,
  }));
});
