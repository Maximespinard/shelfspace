import { create } from 'zustand';

type Category = {
  _id: string;
  name: string;
  color: string;
};

type Mode = 'add' | 'edit';

interface CategoryModalStore {
  isOpen: boolean;
  mode: Mode;
  categoryToEdit: Category | null;
  open: (mode: Mode, category?: Category | null) => void;
  close: () => void;
}

export const useCategoryModal = create<CategoryModalStore>((set) => ({
  isOpen: false,
  mode: 'add',
  categoryToEdit: null,
  open: (mode, category = null) =>
    set({ isOpen: true, mode, categoryToEdit: category }),
  close: () => set({ isOpen: false, mode: 'add', categoryToEdit: null }),
}));
