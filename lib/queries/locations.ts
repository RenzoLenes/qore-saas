import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import type { Location } from '@/lib/types';

export const getLocations = cache(async (): Promise<Location[]> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return [];

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: locations } = await supabase
    .from('locations')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .order('name');

  if (!locations) return [];

  // Fetch worker counts and today's attendance per location in parallel
  const enriched = await Promise.all(
    locations.map(async (loc) => {
      const [workerRes, attendanceRes] = await Promise.all([
        supabase
          .from('workers')
          .select('id', { count: 'exact', head: true })
          .eq('location_id', loc.id)
          .eq('status', 'active'),
        supabase
          .from('attendance_records')
          .select('id', { count: 'exact', head: true })
          .eq('location_id', loc.id)
          .eq('type', 'check_in')
          .gte('timestamp', todayStart.toISOString()),
      ]);

      return {
        ...loc,
        worker_count: workerRes.count ?? 0,
        today_attendance: attendanceRes.count ?? 0,
      } as Location;
    })
  );

  return enriched;
});

export const getLocationById = cache(async (id: string): Promise<Location | null> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return null;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: location } = await supabase
    .from('locations')
    .select('*, tenant:tenants(default_entry_mode, default_exit_mode)')
    .eq('id', id)
    .eq('tenant_id', profile.tenant_id)
    .single();

  if (!location) return null;

  const [workerRes, attendanceRes] = await Promise.all([
    supabase
      .from('workers')
      .select('id', { count: 'exact', head: true })
      .eq('location_id', id)
      .eq('status', 'active'),
    supabase
      .from('attendance_records')
      .select('id', { count: 'exact', head: true })
      .eq('location_id', id)
      .eq('type', 'check_in')
      .gte('timestamp', todayStart.toISOString()),
  ]);

  return {
    ...location,
    worker_count: workerRes.count ?? 0,
    today_attendance: attendanceRes.count ?? 0,
  } as Location;
});
