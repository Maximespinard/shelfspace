import { z } from 'zod';

export const itemFiltersSchema = z
  .object({
    search: z.string().optional(),
    category: z.string().optional(),
    sortBy: z
      .enum(['price', 'acquisitionDate', 'createdAt', 'title'])
      .optional(),
    order: z.enum(['asc', 'desc']).optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return Number(data.maxPrice) >= Number(data.minPrice);
      }
      return true;
    },
    {
      message: 'Max price must be greater than or equal to min price.',
      path: ['maxPrice'],
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: 'End date must be after or equal to start date.',
      path: ['endDate'],
    }
  );

export type ItemFiltersSchema = z.infer<typeof itemFiltersSchema>;
