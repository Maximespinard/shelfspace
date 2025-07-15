import { create } from 'zustand';
import type { ItemWithCategory } from '@/types/api';
import type { FormMode } from '@/types/forms';

interface ItemModalStore {
  isOpen: boolean;
  mode: FormMode;
  itemToEdit: ItemWithCategory | null;
  onCloseEdit?: () => void;
  open: (mode: FormMode, itemWithCategory?: ItemWithCategory | null) => void;
  close: () => void;
}

export const useItemModal = create<ItemModalStore>((set) => ({
  isOpen: false,
  mode: 'add',
  itemToEdit: null,
  open: (mode, item = null) => set({ isOpen: true, mode, itemToEdit: item }),
  close: () => set({ isOpen: false, mode: 'add', itemToEdit: null }),
}));
