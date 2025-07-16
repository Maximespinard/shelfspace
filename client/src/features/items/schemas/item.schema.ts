import { z } from 'zod';

const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  color: z.string(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

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

  category: categorySchema.optional(),

  image: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'Image must be under 5MB',
    }),
});

type ItemSchema = z.infer<typeof itemSchema>;

export type ExistingItem = Omit<ItemSchema, 'image'> & {
  imageUrl?: string;
};

export const itemFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be under 100 characters'),

  description: z
    .string()
    .max(5000, 'Description must be under 5000 characters')
    .transform((val) => val || ''),

  price: z
    .union([z.number(), z.null(), z.literal('')])
    .transform((val) => (val === '' ? null : val))
    .refine(
      (val) =>
        val === null || (typeof val === 'number' && val >= 0 && val <= 100000),
      'Price must be between 0 and 100000'
    )
    .refine(
      (val) =>
        val === null ||
        (typeof val === 'number' && Number(val.toFixed(2)) === val),
      'Price must have at most 2 decimal places'
    ),

  acquisitionDate: z
    .string()
    .transform((val) => val || '')
    .refine(
      (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
      'Date must be in format YYYY-MM-DD'
    ),

  category: z.string().transform((val) => val || ''),

  image: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Image must be under 5MB'
    ),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;
