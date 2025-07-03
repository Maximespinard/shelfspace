import { create } from 'zustand';
import type { ExistingCategory } from '@/schemas/category.schema';

type Mode = 'add' | 'edit';

interface CategoryModalStore {
  isOpen: boolean;
  mode: Mode;
  categoryToEdit: ExistingCategory | null;
  open: (mode: Mode, category?: ExistingCategory | null) => void;
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
