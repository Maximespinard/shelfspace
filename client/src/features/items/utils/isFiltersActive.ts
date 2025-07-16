import { type ItemFilters } from '../store/useItemFiltersStore';

/**
 * Determines if any filters are active (different from default values).
 * Used to show/hide filter reset buttons and empty state variations.
 * 
 * @param filters - Current filter state from the store
 * @returns True if any filters are active, false if all are at default values
 * 
 * @example
 * ```tsx
 * const hasActiveFilters = filtersAreActive(filters);
 * // Show "No items found" vs "No items found with current filters"
 * ```
 */
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
