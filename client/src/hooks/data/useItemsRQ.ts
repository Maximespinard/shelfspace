import { useItemFilters } from '@/store/useItemFiltersStore';
import { buildItemQueryParams } from '@/lib/utils/buildItemQueryParams';
import { useItemsQuery } from '@/hooks/queries';
import type { ItemWithCategory } from '@/types/api';

/**
 * Hook to fetch items using React Query
 * Replaces the Zustand-based useItems hook
 */
export const useItemsRQ = (): {
  items: ItemWithCategory[];
  total: number;
  loading: boolean;
  error: unknown;
} => {
  const { filters } = useItemFilters();
  const queryParams = buildItemQueryParams(filters);

  const { data, isLoading, error } = useItemsQuery(queryParams);

  return {
    items: data?.items || [],
    total: data?.total || 0,
    loading: isLoading,
    error,
  };
};
