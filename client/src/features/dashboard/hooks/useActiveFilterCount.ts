import { useMemo } from 'react';
import { useItemFilters } from '../../items/store/useItemFiltersStore';

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
