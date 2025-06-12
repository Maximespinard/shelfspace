import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter your email or username').max(100),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100),
});

export type LoginSchema = z.infer<typeof loginSchema>;
