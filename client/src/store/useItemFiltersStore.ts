import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ItemFilters {
  search?: string;
  category?: string;
  sortBy?: 'price' | 'acquisitionDate' | 'createdAt' | 'title';
  order?: 'asc' | 'desc';
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
}

interface ItemFiltersStore {
  filters: ItemFilters;
  setFilter: <K extends keyof ItemFilters>(
    key: K,
    value: ItemFilters[K]
  ) => void;
  resetFilters: () => void;
}

export const useItemFilters = create<ItemFiltersStore>()(
  devtools(
    (set) => ({
      filters: {
        search: '',
        category: 'all',
        sortBy: 'createdAt',
        order: 'desc',
        minPrice: '',
        maxPrice: '',
        startDate: '',
        endDate: '',
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'all',
            sortBy: 'createdAt',
            order: 'desc',
            minPrice: '',
            maxPrice: '',
            startDate: '',
            endDate: '',
          },
        }),
    }),
    { name: 'ItemFiltersStore' }
  )
);
