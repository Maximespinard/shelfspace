import { create } from 'zustand';
import type { ExistingItem } from '@/schemas/item.schema';

type Mode = 'add' | 'edit';

interface ItemModalStore {
  isOpen: boolean;
  mode: Mode;
  itemToEdit: ExistingItem | null;
  onCloseEdit?: () => void;
  open: (mode: Mode, ExistingItem?: ExistingItem | null) => void;
  close: () => void;
}

export const useItemModal = create<ItemModalStore>((set) => ({
  isOpen: false,
  mode: 'add',
  itemToEdit: null,
  open: (mode, item = null) => set({ isOpen: true, mode, itemToEdit: item }),
  close: () => set({ isOpen: false, mode: 'add', itemToEdit: null }),
}));
