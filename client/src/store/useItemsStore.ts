import { create } from 'zustand';
import {
  fetchItemsApi,
  createItemApi,
  updateItemApi,
  deleteItemApi,
} from '@/lib/api/items';
import { handleApiError } from '@/lib/utils/handleApiError';
import { handleApiSuccess } from '@/lib/utils/handleApiSuccess';
import type { ExistingItem, NewItem } from '@/schemas/item.schema';

interface ItemsStore {
  items: ExistingItem[];
  fetchItems: () => Promise<void>;
  addItem: (data: NewItem) => Promise<void>;
  updateItem: (id: string, data: NewItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],

  fetchItems: async () => {
    try {
      const { data } = await fetchItemsApi();
      set({ items: data });
    } catch (err) {
      handleApiError(err, undefined, 'item');
      console.warn('Fetch items error:', err);
    }
  },

  addItem: async (newItem) => {
    try {
      const { data } = await createItemApi(newItem);
      set((state) => ({ items: [...state.items, data] }));
      handleApiSuccess('Item created!');
    } catch (err) {
      handleApiError(err, undefined, 'item');
      console.warn('Create item error:', err);
    }
  },

  updateItem: async (id, updatedItem) => {
    try {
      const { data } = await updateItemApi(id, updatedItem);
      set((state) => ({
        items: state.items.map((item) => (item._id === id ? data : item)),
      }));
      handleApiSuccess('Item updated!');
    } catch (err) {
      handleApiError(err, undefined, 'item');
      console.warn('Update item error:', err);
    }
  },

  deleteItem: async (id) => {
    try {
      await deleteItemApi(id);
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
      }));
      handleApiSuccess('Item deleted!');
    } catch (err) {
      handleApiError(err, undefined, 'item');
      console.warn('Delete item error:', err);
    }
  },
}));
