import { create } from 'zustand';

type Mode = 'add' | 'edit';

type Item = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  acquisitionDate?: string;
  imageUrl?: string;
  category?: string;
};

interface ItemModalStore {
  isOpen: boolean;
  mode: Mode;
  itemToEdit: Item | null;
  open: (mode: Mode, item?: Item | null) => void;
  close: () => void;
}

export const useItemModal = create<ItemModalStore>((set) => ({
  isOpen: false,
  mode: 'add',
  itemToEdit: null,
  open: (mode, item = null) => set({ isOpen: true, mode, itemToEdit: item }),
  close: () => set({ isOpen: false, mode: 'add', itemToEdit: null }),
}));
