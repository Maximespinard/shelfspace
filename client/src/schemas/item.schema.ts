import { z } from 'zod';

export const itemSchema = z.object({
  _id: z.string().optional(),

  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be under 100 characters'),

  description: z
    .string()
    .max(5000, 'Description must be under 5000 characters')
    .optional(),

  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0, 'Price must be at least 0')
    .max(100000, 'Price cannot exceed 100000')
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: 'Price must have at most 2 decimal places',
    })
    .optional(),

  acquisitionDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
      'Date must be in format YYYY-MM-DD'
    ),

  category: z
    .string()
    .refine((val) => val === '' || val.length >= 10, {
      message: 'Invalid category ID',
    })
    .optional(),

  imageUrl: z
    .string()
    .url('Image URL must be valid')
    .optional()
    .or(z.literal('')),
});

export type ItemSchema = z.infer<typeof itemSchema>;
export type NewItem = Omit<ItemSchema, '_id'>;
export type ExistingItem = Required<ItemSchema>;
