import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { checkInSchema } from '@/lib/validations';
import { haversineDistance, analyzeGpsSpoofing } from '@/lib/geo';
import { resolveMode } from '@/lib/resolve-mode';
import { rateLimit } from '@/lib/rate-limit';
import type { CheckInMode } from '@/lib/types';

export async function POST(request: NextRequest) {
  // Rate limit: 20 requests per minute per IP
  const limited = rateLimit(request, { max: 20, windowSec: 60 });
  if (limited) return limited;

  try {
    // 1. Authenticate
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // 2. Parse and validate body
    const body = await request.json();
    const parsed = checkInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { type, lat, lng, qr_token, gps_metadata } = parsed.data;

    // 3. Get worker with location AND tenant (for mode cascade)
    const { data: worker } = await supabase
      .from('workers')
      .select('*, location:locations(*), tenant:tenants(default_entry_mode, default_exit_mode)')
      .eq('user_id', user.id)
      .single();

    if (!worker) {
      return NextResponse.json({ error: 'Trabajador no encontrado' }, { status: 403 });
    }

    if (worker.status !== 'active') {
      return NextResponse.json({ error: 'Tu cuenta está inactiva. Contacta a tu administrador.' }, { status: 403 });
    }

    const location = worker.location;
    const tenant = worker.tenant as unknown as { default_entry_mode: CheckInMode; default_exit_mode: CheckInMode };

    // 4. Resolve effective mode using cascade: worker → location → tenant
    const effectiveMode = resolveMode(type, worker, location, tenant);

    // 5. Fetch previous record for spoofing analysis
    const { data: prevRecord } = await supabaseAdmin
      .from('attendance_records')
      .select('lat, lng, timestamp')
      .eq('worker_id', worker.id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .maybeSingle();

    const spoofingResult = analyzeGpsSpoofing(
      gps_metadata,
      prevRecord,
      lat,
      lng,
      new Date().toISOString(),
    );

    // 6. MODE: gps_only — record GPS + time, no radius/QR validation
    if (effectiveMode === 'gps_only') {
      const accuracy = gps_metadata?.accuracy ?? 0;
      const withinRadius = location
        ? haversineDistance(lat, lng, location.lat, location.lng) <= location.gps_radius + accuracy
        : null;

      const { data: record, error } = await supabase
        .from('attendance_records')
        .insert({
          tenant_id: worker.tenant_id,
          worker_id: worker.id,
          location_id: worker.location_id,
          type,
          method: 'gps',
          lat,
          lng,
          within_radius: withinRadius,
          gps_metadata: gps_metadata ?? null,
          gps_suspicious: spoofingResult.suspicious,
          gps_flags: spoofingResult.flags,
        })
        .select()
        .single();

      if (error) {
        console.error('Attendance insert error:', error);
        return NextResponse.json({ error: 'Error al registrar asistencia' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        record,
        message: type === 'check_in' ? 'Entrada registrada' : 'Salida registrada',
      }, { status: 201 });
    }

    // 7. MODES: static_qr and dynamic_qr — require active location + GPS within radius
    if (!location || location.status !== 'active') {
      return NextResponse.json({ error: 'La sede asignada no está activa' }, { status: 422 });
    }

    const distance = haversineDistance(lat, lng, location.lat, location.lng);
    const withinRadius = distance <= location.gps_radius;

    if (!withinRadius) {
      return NextResponse.json({
        error: `Estás fuera del rango GPS permitido (${Math.round(distance)}m de ${location.gps_radius}m)`,
      }, { status: 422 });
    }

    // 8. QR validation — required for QR modes regardless of entry/exit
    if (!qr_token) {
      return NextResponse.json({ error: 'Se requiere escanear el código QR' }, { status: 422 });
    }

    let qrQuery = supabaseAdmin
      .from('qr_codes')
      .select('id')
      .eq('token', qr_token)
      .eq('location_id', worker.location_id)
      .eq('is_active', true);

    if (effectiveMode === 'dynamic_qr') {
      qrQuery = qrQuery
        .eq('qr_type', 'dynamic')
        .gte('expires_at', new Date().toISOString());
    } else {
      qrQuery = qrQuery.eq('qr_type', 'static');
    }

    const { data: qr } = await qrQuery.single();

    if (!qr) {
      return NextResponse.json({
        error: effectiveMode === 'dynamic_qr'
          ? 'Código QR inválido o expirado'
          : 'Código QR inválido',
      }, { status: 422 });
    }

    // 9. Insert attendance record (effectiveMode is static_qr or dynamic_qr here)
    const method = 'qr' as const;

    const { data: record, error } = await supabase
      .from('attendance_records')
      .insert({
        tenant_id: worker.tenant_id,
        worker_id: worker.id,
        location_id: worker.location_id,
        type,
        method,
        lat,
        lng,
        within_radius: withinRadius,
        gps_metadata: gps_metadata ?? null,
        gps_suspicious: spoofingResult.suspicious,
        gps_flags: spoofingResult.flags,
      })
      .select()
      .single();

    if (error) {
      console.error('Attendance insert error:', error);
      return NextResponse.json({ error: 'Error al registrar asistencia' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      record,
      message: type === 'check_in' ? 'Entrada registrada' : 'Salida registrada',
    }, { status: 201 });

  } catch (error) {
    console.error('Attendance API error:', error);
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
