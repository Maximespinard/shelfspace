import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .max(30, 'Category name must be 30 characters or less'),

  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Color must be a valid hex code (e.g., #AABBCC)',
    })
    .optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;
