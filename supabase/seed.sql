-- Seed data for QORE SaaS
-- Run AFTER creating a user via Supabase Auth (replace the user ID below)

-- 1. Create tenant
insert into public.tenants (id, name, slug, plan) values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'QORE Demo', 'qore-demo', 'pro');

-- 2. Link the first auth user to the tenant (run after creating user in Auth)
-- UPDATE public.users SET tenant_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', role = 'owner' WHERE id = '<YOUR_AUTH_USER_ID>';

-- 3. Locations
insert into public.locations (id, tenant_id, name, address, lat, lng, gps_radius, schedule, work_days, status) values
  ('00000000-0000-0001-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sede Central Lima', 'Av. Javier Prado Este 4600, Santiago de Surco', -12.0853, -76.9714, 150, 'Lun - Vie · 08:00 - 18:00', '{Mon,Tue,Wed,Thu,Fri}', 'active'),
  ('00000000-0000-0002-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Oficina San Isidro', 'Calle Las Begonias 415, San Isidro', -12.0977, -77.0365, 100, 'Lun - Vie · 09:00 - 19:00', '{Mon,Tue,Wed,Thu,Fri}', 'active'),
  ('00000000-0000-0003-0000-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Planta Callao', 'Av. Argentina 2458, Callao', -12.0556, -77.0895, 200, 'Lun - Sab · 07:00 - 16:00', '{Mon,Tue,Wed,Thu,Fri,Sat}', 'active'),
  ('00000000-0000-0004-0000-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sucursal Miraflores', 'Av. Larco 1301, Miraflores', -12.1197, -77.0305, 120, 'Lun - Vie · 08:30 - 17:30', '{Mon,Tue,Wed,Thu,Fri}', 'active'),
  ('00000000-0000-0005-0000-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Almacén Ate', 'Av. Nicolás Ayllón 3720, Ate', -12.0245, -76.9178, 250, 'Lun - Sab · 06:00 - 15:00', '{Mon,Tue,Wed,Thu,Fri,Sat}', 'active'),
  ('00000000-0000-0006-0000-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sede Arequipa', 'Calle Mercaderes 310, Arequipa', -16.3989, -71.5370, 150, 'Lun - Vie · 08:00 - 17:00', '{Mon,Tue,Wed,Thu,Fri}', 'inactive');

-- 4. Workers
insert into public.workers (id, tenant_id, location_id, name, position, email, status) values
  ('00000000-0000-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0001-0000-000000000001', 'Carlos Méndez', 'Supervisor de Operaciones', 'carlos@demo.com', 'active'),
  ('00000000-0000-0002-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0001-0000-000000000001', 'Ana Torres', 'Analista de RRHH', 'ana@demo.com', 'active'),
  ('00000000-0000-0003-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0002-0000-000000000002', 'Miguel Ríos', 'Contador Senior', 'miguel@demo.com', 'active'),
  ('00000000-0000-0004-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0002-0000-000000000002', 'Laura García', 'Asistente Administrativo', 'laura@demo.com', 'active'),
  ('00000000-0000-0005-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0003-0000-000000000003', 'Roberto Díaz', 'Jefe de Almacén', 'roberto@demo.com', 'active'),
  ('00000000-0000-0006-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0003-0000-000000000003', 'Patricia Luna', 'Operaria', 'patricia@demo.com', 'active'),
  ('00000000-0000-0007-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0004-0000-000000000004', 'Fernando Castillo', 'Ejecutivo de Ventas', 'fernando@demo.com', 'active'),
  ('00000000-0000-0008-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0004-0000-000000000004', 'María Sánchez', 'Recepcionista', 'maria@demo.com', 'active'),
  ('00000000-0000-0009-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0005-0000-000000000005', 'Jorge Vargas', 'Despachador', 'jorge@demo.com', 'active'),
  ('00000000-0000-0010-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0005-0000-000000000005', 'Sofía Herrera', 'Coordinadora Logística', 'sofia@demo.com', 'active'),
  ('00000000-0000-0011-0001-000000000011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0001-0000-000000000001', 'Diego Morales', 'Ingeniero de Sistemas', 'diego@demo.com', 'leave'),
  ('00000000-0000-0012-0001-000000000012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0006-0000-000000000006', 'Valentina Cruz', 'Administradora Regional', 'valentina@demo.com', 'active');

-- 5. Attendance records (today and recent days)
insert into public.attendance_records (tenant_id, worker_id, location_id, type, method, timestamp, lat, lng, within_radius) values
  -- Today check-ins
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0001-0001-000000000001', '00000000-0000-0001-0000-000000000001', 'check_in', 'qr', now()::date + interval '7 hours 55 minutes', -12.0853, -76.9714, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0002-0001-000000000002', '00000000-0000-0001-0000-000000000001', 'check_in', 'qr', now()::date + interval '8 hours 2 minutes', -12.0854, -76.9715, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0003-0001-000000000003', '00000000-0000-0002-0000-000000000002', 'check_in', 'gps', now()::date + interval '9 hours 10 minutes', -12.0978, -77.0366, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0004-0001-000000000004', '00000000-0000-0002-0000-000000000002', 'check_in', 'qr', now()::date + interval '8 hours 45 minutes', -12.0977, -77.0365, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0005-0001-000000000005', '00000000-0000-0003-0000-000000000003', 'check_in', 'qr', now()::date + interval '6 hours 58 minutes', -12.0556, -77.0895, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0006-0001-000000000006', '00000000-0000-0003-0000-000000000003', 'check_in', 'qr', now()::date + interval '7 hours 5 minutes', -12.0557, -77.0896, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0007-0001-000000000007', '00000000-0000-0004-0000-000000000004', 'check_in', 'gps', now()::date + interval '8 hours 30 minutes', -12.1197, -77.0305, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0008-0001-000000000008', '00000000-0000-0004-0000-000000000004', 'check_in', 'qr', now()::date + interval '8 hours 35 minutes', -12.1198, -77.0306, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0009-0001-000000000009', '00000000-0000-0005-0000-000000000005', 'check_in', 'qr', now()::date + interval '6 hours 0 minutes', -12.0245, -76.9178, true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0010-0001-000000000010', '00000000-0000-0005-0000-000000000005', 'check_in', 'qr', now()::date + interval '6 hours 15 minutes', -12.0246, -76.9179, true);

-- 6. QR codes for active locations
insert into public.qr_codes (tenant_id, location_id, token, expires_at, is_active) values
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0001-0000-000000000001', 'qr_token_sede_central_001', now() + interval '5 minutes', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0002-0000-000000000002', 'qr_token_san_isidro_001', now() + interval '5 minutes', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0003-0000-000000000003', 'qr_token_callao_001', now() + interval '5 minutes', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0004-0000-000000000004', 'qr_token_miraflores_001', now() + interval '5 minutes', true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '00000000-0000-0005-0000-000000000005', 'qr_token_ate_001', now() + interval '5 minutes', true);
