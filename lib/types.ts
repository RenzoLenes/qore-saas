// Shared types derived from database schema

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
  default_entry_mode: CheckInMode;
  default_exit_mode: CheckInMode;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  full_name: string;
  role: 'owner' | 'admin' | 'viewer' | 'worker';
  tenant_id: string;
  created_at: string;
  tenant?: Tenant;
}

export type CheckInMode = 'gps_only' | 'static_qr' | 'dynamic_qr';

export interface Location {
  id: string;
  tenant_id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  gps_radius: number;
  schedule: string;
  work_days: string[];
  entry_mode: CheckInMode | null; // null = inherit from tenant
  exit_mode: CheckInMode | null;  // null = inherit from tenant
  status: 'active' | 'inactive';
  created_at: string;
  // Joined fields
  tenant?: Tenant;
  // Computed fields from queries
  worker_count?: number;
  today_attendance?: number;
}

export interface Worker {
  id: string;
  tenant_id: string;
  location_id: string | null;
  user_id: string | null;
  name: string;
  position: string;
  email: string | null;
  entry_mode: CheckInMode | null; // null = inherit from location/tenant
  exit_mode: CheckInMode | null;  // null = inherit from location/tenant
  status: 'active' | 'inactive' | 'leave';
  created_at: string;
  // Joined fields
  location?: Location;
  tenant?: Tenant;
}

export interface GpsMetadata {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  speed: number | null;
  heading: number | null;
}

export interface AttendanceRecord {
  id: string;
  tenant_id: string;
  worker_id: string;
  location_id: string | null;
  type: 'check_in' | 'check_out';
  method: 'qr' | 'gps' | 'manual';
  timestamp: string;
  lat: number | null;
  lng: number | null;
  within_radius: boolean | null;
  gps_metadata: GpsMetadata | null;
  gps_suspicious: boolean;
  gps_flags: string[];
  // Joined fields
  worker?: Worker;
  location?: Location;
}

export type QRType = 'static' | 'dynamic';

export interface QRCode {
  id: string;
  location_id: string;
  tenant_id: string;
  token: string;
  qr_type: QRType;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

// Dashboard-specific types
export interface DashboardMetrics {
  total_workers: number;
  active_locations: number;
  total_locations: number;
  today_attendance: number;
  attendance_rate: number;
  absent_today: number;
  on_leave: number;
  punctuality_rate: number;
}

export interface WeeklyAttendance {
  day: string;
  count: number;
  fullDate: string;
}

export interface RecentActivity {
  id: string;
  worker_name: string;
  worker_position: string;
  location_name: string;
  location_schedule: string;
  type: 'check_in' | 'check_out';
  method: string;
  timestamp: string;
  within_radius: boolean | null;
}

export interface LiveLocation {
  id: string;
  name: string;
  present: number;
  total: number;
  percentage: number;
}

export interface AbsentWorker {
  id: string;
  name: string;
  position: string;
  location_name: string;
}
