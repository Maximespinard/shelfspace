import { z } from 'zod';

export const categorySchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(30, 'Name must be under 30 characters'),
  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Must be a valid hex color'),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type NewCategory = Omit<CategorySchema, '_id'>;
export type ExistingCategory = Required<CategorySchema>;
