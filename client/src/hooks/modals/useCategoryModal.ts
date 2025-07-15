import { create } from 'zustand';
import type { Category } from '@/types/api';
import type { FormMode } from '@/types/forms';

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
