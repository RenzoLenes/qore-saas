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
