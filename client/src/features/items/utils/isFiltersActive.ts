import { type ItemFilters } from '../store/useItemFiltersStore';

export function filtersAreActive(filters: ItemFilters): boolean {
  const defaultFilters: Partial<ItemFilters> = {
    search: '',
    category: 'all',
    sortBy: 'createdAt',
    order: 'desc',
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: '',
  };

  return Object.entries(filters).some(([key, value]) => {
    return value !== defaultFilters[key as keyof ItemFilters];
  });
}
