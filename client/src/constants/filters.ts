import type { ItemFilters } from '@/features/items/store/useItemFiltersStore';

export const defaultEmptyFilters: ItemFilters = {
  search: '',
  category: 'all',
  sortBy: 'createdAt',
  order: 'desc',
  minPrice: '',
  maxPrice: '',
  startDate: '',
  endDate: '',
};
