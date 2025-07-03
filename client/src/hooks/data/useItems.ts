import { useEffect } from 'react';
import { useItemsStore } from '@/store/useItemsStore';
import { useItemFilters } from '@/store/useItemFiltersStore';
import { buildItemQueryParams } from '@/lib/utils/buildItemQueryParams';

export const useItems = () => {
  const { filters } = useItemFilters();
  const items = useItemsStore((state) => state.items);
  const fetchItems = useItemsStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems(buildItemQueryParams(filters));
  }, [filters]);

  return { items };
};
