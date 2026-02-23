import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getTenantTodayStart } from '@/lib/timezone';
import type { Worker, Location, AttendanceRecord } from '@/lib/types';

export interface WorkerStatus {
  worker: Worker & { location: Location | null };
  isCheckedIn: boolean;
  lastRecord: AttendanceRecord | null;
  recentRecords: AttendanceRecord[];
  timezone: string;
}

export const getWorkerStatus = cache(async (userId: string): Promise<WorkerStatus | null> => {
  const supabase = await createServerSupabaseClient();

  const { data: worker } = await supabase
    .from('workers')
    .select('*, location:locations(*), tenant:tenants(default_entry_mode, default_exit_mode, timezone)')
    .eq('user_id', userId)
    .single();

  if (!worker) return null;

  const tz = (worker.tenant as unknown as { timezone?: string })?.timezone ?? 'America/Lima';
  const todayIso = getTenantTodayStart(tz);

  const [lastRecordRes, recentRes] = await Promise.all([
    supabase
      .from('attendance_records')
      .select('*')
      .eq('worker_id', worker.id)
      .gte('timestamp', todayIso)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('attendance_records')
      .select('*')
      .eq('worker_id', worker.id)
      .order('timestamp', { ascending: false })
      .limit(5),
  ]);

  return {
    worker: worker as Worker & { location: Location | null },
    isCheckedIn: lastRecordRes.data?.type === 'check_in',
    lastRecord: lastRecordRes.data,
    recentRecords: recentRes.data ?? [],
    timezone: tz,
  };
});
