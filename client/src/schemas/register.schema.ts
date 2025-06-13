import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot be longer than 20 characters'),

    email: z.string().email('Please enter a valid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(100),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterSchema, 'confirmPassword'>;
