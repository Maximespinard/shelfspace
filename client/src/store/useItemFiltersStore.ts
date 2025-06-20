import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { defaultEmptyFilters } from '@/constants/filters';

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
  defaultEmptyFilters: ItemFilters;
  setFilter: <K extends keyof ItemFilters>(
    key: K,
    value: ItemFilters[K]
  ) => void;
  resetFilters: () => void;
}

export const useItemFilters = create<ItemFiltersStore>()(
  devtools(
    (set) => ({
      filters: { ...defaultEmptyFilters },
      defaultEmptyFilters: { ...defaultEmptyFilters },
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      resetFilters: () =>
        set({
          filters: defaultEmptyFilters,
        }),
    }),
    { name: 'ItemFiltersStore' }
  )
);
