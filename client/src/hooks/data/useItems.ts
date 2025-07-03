import { useEffect, useState } from 'react';
import { useItemsStore } from '@/store/useItemsStore';
import { useItemFilters } from '@/store/useItemFiltersStore';
import { buildItemQueryParams } from '@/lib/utils/buildItemQueryParams';

export const useItems = () => {
  const { filters } = useItemFilters();
  const filterKey = JSON.stringify(filters);
  const items = useItemsStore((state) => state.items);
  const fetchItems = useItemsStore((state) => state.fetchItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchItems(buildItemQueryParams(filters)).finally(() => setLoading(false));
  }, [filterKey]);

  return { items, loading };
};
