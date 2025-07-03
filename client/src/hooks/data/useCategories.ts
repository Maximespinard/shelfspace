import { useEffect } from 'react';
import { useCategoriesStore } from '@/store/useCategoriesStore';

export const useCategories = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
  };
};
