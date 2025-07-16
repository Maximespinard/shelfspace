import { useMemo } from 'react';
import { useItemFilters } from '../../items/store/useItemFiltersStore';

/**
 * Hook that counts the number of active filters (excluding search and default values).
 * Used to display filter count badges in the UI.
 * 
 * @returns Number of active filters
 * 
 * @example
 * ```tsx
 * const activeCount = useActiveFilterCount();
 * // Shows: "Filters (3)" when 3 filters are active
 * ```
 */
export function useActiveFilterCount(): number {
  const { filters } = useItemFilters();

  return useMemo(() => {
    let count = 0;

    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (
      (filters.sortBy && filters.sortBy !== 'createdAt') ||
      filters.order !== 'desc'
    ) {
      count++;
    }

    return count;
  }, [filters]);
}
