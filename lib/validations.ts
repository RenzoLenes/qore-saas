import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor ingresa un email válido')
    .max(255, 'El email es demasiado largo'),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
