import { create } from 'zustand';
import type { Category } from '../types/category.types';
import type { FormMode } from '../types/category.types';

interface CategoryModalStore {
  isOpen: boolean;
  mode: FormMode;
  categoryToEdit: Category | null;
  open: (mode: FormMode, category?: Category | null) => void;
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
