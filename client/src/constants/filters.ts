import type { ItemFilters } from '@/store/useItemFiltersStore';

export const defaultEmptyFilters: ItemFilters = {
  search: '',
  category: 'all',
  sortBy: 'createdAt',
  order: 'desc',
  minPrice: 0,
  maxPrice: 0,
  startDate: '',
  endDate: '',
};
