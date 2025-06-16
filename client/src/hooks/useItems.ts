import { useEffect } from 'react';
import { useItemsStore } from '@/store/useItemsStore';

export const useItems = () => {
  const items = useItemsStore((state) => state.items);
  const fetchItems = useItemsStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems();
  }, []);

  return { items };
};
