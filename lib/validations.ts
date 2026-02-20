import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor ingresa un email válido')
    .max(255, 'El email es demasiado largo'),

  company_name: z
    .string()
    .min(1, 'El nombre de la empresa es requerido')
    .max(255, 'El nombre de la empresa es demasiado largo')
    .trim(),

  company_size: z.enum(['1-10', '11-50', '51-200', '200+'],
    {
      message: 'Selecciona el tamaño de empresa',
    }
  ),

  industry: z
    .enum([
      'Construcción',
      'Retail',
      'Servicios',
      'Logística',
      'Oficina/Administrativo',
      'Otro',
    ])
    .optional(),

  contact_consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar ser contactado para continuar',
    }),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

const checkInModeEnum = z.enum(['gps_only', 'static_qr', 'dynamic_qr']);

export const locationSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre es demasiado largo')
    .trim(),
  address: z
    .string()
    .min(1, 'La dirección es requerida')
    .max(500, 'La dirección es demasiado larga')
    .trim(),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  gps_radius: z.coerce.number().int().min(50).max(500).default(150),
  schedule: z.string().min(1).default('08:00 - 18:00'),
  work_days: z.array(z.string()).min(1, 'Selecciona al menos un día').default(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
  entry_mode: checkInModeEnum.nullable().default(null),
  exit_mode: checkInModeEnum.nullable().default(null),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type LocationFormData = z.infer<typeof locationSchema>;

export const workerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre es demasiado largo')
    .trim(),
  position: z
    .string()
    .min(1, 'El cargo es requerido')
    .max(255, 'El cargo es demasiado largo')
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .max(255)
    .optional()
    .or(z.literal('')),
  entry_mode: checkInModeEnum.nullable().optional(),
  exit_mode: checkInModeEnum.nullable().optional(),
  location_id: z
    .string()
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'inactive', 'leave']).default('active'),
}).refine(
  (data) => {
    // If entry_mode requires QR, location is required
    if (data.entry_mode && data.entry_mode !== 'gps_only') {
      return !!data.location_id && data.location_id !== '';
    }
    return true;
  },
  {
    message: 'Selecciona una sede para los modos QR',
    path: ['location_id'],
  }
);

export type WorkerFormData = z.infer<typeof workerSchema>;

export const tenantSettingsSchema = z.object({
  default_entry_mode: checkInModeEnum,
  default_exit_mode: checkInModeEnum,
});

export type TenantSettingsData = z.infer<typeof tenantSettingsSchema>;

export const onboardingSchema = z.object({
  default_entry_mode: checkInModeEnum,
  default_exit_mode: checkInModeEnum,
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export const registerSchema = z.object({
  full_name: z.string().min(1, 'El nombre es requerido').max(255).trim(),
  company_name: z.string().min(1, 'El nombre de la empresa es requerido').max(255).trim(),
  email: z.string().email('Email inválido').max(255),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const gpsMetadataSchema = z.object({
  accuracy: z.number().nullable(),
  altitude: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  speed: z.number().nullable(),
  heading: z.number().nullable(),
}).optional();

export const checkInSchema = z.object({
  type: z.enum(['check_in', 'check_out']),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  qr_token: z.string().optional(),
  gps_metadata: gpsMetadataSchema,
});
