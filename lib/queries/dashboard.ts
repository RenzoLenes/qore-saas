import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import type { DashboardMetrics, WeeklyAttendance, RecentActivity, LiveLocation, AbsentWorker } from '@/lib/types';

export const getDashboardMetrics = cache(async (): Promise<DashboardMetrics> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) {
    return {
      total_workers: 0, active_locations: 0, total_locations: 0,
      today_attendance: 0, attendance_rate: 0,
      absent_today: 0, on_leave: 0, punctuality_rate: 0,
    };
  }

  const tenantId = profile.tenant_id;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [workersRes, onLeaveRes, activeLocationsRes, totalLocationsRes, todayCheckInsRes] = await Promise.all([
    supabase
      .from('workers')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active'),
    supabase
      .from('workers')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'leave'),
    supabase
      .from('locations')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active'),
    supabase
      .from('locations')
      .select('id', { count: 'exact', head: true })
      .eq('tenant_id', tenantId),
    supabase
      .from('attendance_records')
      .select('worker_id, timestamp, location:locations(schedule)')
      .eq('tenant_id', tenantId)
      .eq('type', 'check_in')
      .gte('timestamp', todayStart.toISOString()),
  ]);

  const totalWorkers = workersRes.count ?? 0;
  const onLeave = onLeaveRes.count ?? 0;
  const todayCheckIns = todayCheckInsRes.data ?? [];

  // Distinct worker count (avoids counting duplicate check_ins)
  const uniqueWorkerIds = new Set(todayCheckIns.map((r) => r.worker_id));
  const todayAttendance = uniqueWorkerIds.size;

  // Calculate punctuality: compare each check_in timestamp vs location schedule start
  let onTimeCount = 0;
  for (const record of todayCheckIns) {
    const location = record.location as unknown as { schedule: string } | null;
    const schedule = location?.schedule ?? '08:00 - 18:00';
    const startTime = schedule.split('-')[0]?.trim();
    if (!startTime) { onTimeCount++; continue; }
    const [hours, minutes] = startTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) { onTimeCount++; continue; }
    const checkIn = new Date(record.timestamp);
    const scheduledStart = new Date(checkIn);
    scheduledStart.setHours(hours, minutes, 0, 0);
    if (checkIn <= scheduledStart) onTimeCount++;
  }

  return {
    total_workers: totalWorkers,
    active_locations: activeLocationsRes.count ?? 0,
    total_locations: totalLocationsRes.count ?? 0,
    today_attendance: todayAttendance,
    attendance_rate: totalWorkers > 0 ? Math.round((todayAttendance / totalWorkers) * 100) : 0,
    absent_today: Math.max(0, totalWorkers - todayAttendance),
    on_leave: onLeave,
    punctuality_rate: todayAttendance > 0 ? Math.round((onTimeCount / todayAttendance) * 100) : 0,
  };
});

export const getWeeklyAttendance = cache(async (): Promise<WeeklyAttendance[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const results: WeeklyAttendance[] = [];

  // Calculate Monday of the current week
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  // Iterate Mon (0) to Sun (6)
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const fullDate = `${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}`;

    // Future days get 0 count without querying
    if (date > today) {
      results.push({ day: days[i], count: 0, fullDate });
      continue;
    }

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

    results.push({ day: days[i], count: count ?? 0, fullDate });
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
    .select('id, type, method, timestamp, within_radius, worker:workers(name, position), location:locations(name, schedule)')
    .eq('tenant_id', profile.tenant_id)
    .eq('type', 'check_in')
    .order('timestamp', { ascending: false })
    .limit(15);

  return (data ?? []).map((record) => {
    const worker = record.worker as unknown as { name: string; position: string } | null;
    const location = record.location as unknown as { name: string; schedule: string } | null;
    return {
      id: record.id,
      worker_name: worker?.name ?? 'Desconocido',
      worker_position: worker?.position ?? '',
      location_name: location?.name ?? 'Desconocida',
      location_schedule: location?.schedule ?? '08:00 - 18:00',
      type: record.type as 'check_in' | 'check_out',
      method: record.method,
      timestamp: record.timestamp,
      within_radius: record.within_radius,
    };
  });
});

export const getLiveLocations = cache(async (): Promise<LiveLocation[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Fetch active locations with assigned worker count
  const { data: locations } = await supabase
    .from('locations')
    .select('id, name')
    .eq('tenant_id', profile.tenant_id)
    .eq('status', 'active');

  if (!locations?.length) return [];

  // Count active workers per location
  const { data: workers } = await supabase
    .from('workers')
    .select('id, location_id')
    .eq('tenant_id', profile.tenant_id)
    .eq('status', 'active');

  // Fetch all today's attendance records
  const { data: attendance } = await supabase
    .from('attendance_records')
    .select('worker_id, location_id, type, timestamp')
    .eq('tenant_id', profile.tenant_id)
    .gte('timestamp', todayStart.toISOString())
    .order('timestamp', { ascending: true });

  // Calculate who is currently present per location:
  // A worker is "present" if their last record today at that location is a check_in
  const lastRecordByWorkerLocation = new Map<string, 'check_in' | 'check_out'>();
  for (const record of attendance ?? []) {
    const key = `${record.worker_id}_${record.location_id}`;
    lastRecordByWorkerLocation.set(key, record.type as 'check_in' | 'check_out');
  }

  return locations.map((loc) => {
    const totalAssigned = (workers ?? []).filter((w) => w.location_id === loc.id).length;
    let present = 0;
    for (const [key, type] of lastRecordByWorkerLocation) {
      if (key.endsWith(`_${loc.id}`) && type === 'check_in') {
        present++;
      }
    }
    return {
      id: loc.id,
      name: loc.name,
      present,
      total: totalAssigned,
      percentage: totalAssigned > 0 ? Math.round((present / totalAssigned) * 100) : 0,
    };
  });
});

export const getAbsentWorkers = cache(async (): Promise<AbsentWorker[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [workersRes, attendanceRes] = await Promise.all([
    supabase
      .from('workers')
      .select('id, name, position, location:locations(name)')
      .eq('tenant_id', profile.tenant_id)
      .eq('status', 'active')
      .order('name'),
    supabase
      .from('attendance_records')
      .select('worker_id')
      .eq('tenant_id', profile.tenant_id)
      .eq('type', 'check_in')
      .gte('timestamp', todayStart.toISOString()),
  ]);

  const workers = workersRes.data ?? [];
  const checkedInIds = new Set((attendanceRes.data ?? []).map((a) => a.worker_id));

  return workers
    .filter((w) => !checkedInIds.has(w.id))
    .map((w) => {
      const location = w.location as unknown as { name: string } | null;
      return {
        id: w.id,
        name: w.name,
        position: w.position,
        location_name: location?.name ?? 'Sin sede',
      };
    });
});
