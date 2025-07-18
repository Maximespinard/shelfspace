import { create } from 'zustand';
import type { ItemWithCategory } from '../types/item.types';
import type { FormMode } from '../types/item.form';

/**
 * Zustand store for managing item modal state.
 * Handles opening/closing modal and tracking edit mode.
 */

interface ItemModalStore {
  isOpen: boolean;
  mode: FormMode;
  itemToEdit: ItemWithCategory | null;
  onCloseEdit?: () => void;
  onSuccessCallback?: () => void;
  open: (mode: FormMode, itemWithCategory?: ItemWithCategory | null, onSuccess?: () => void) => void;
  close: () => void;
}

export const useItemModal = create<ItemModalStore>((set) => ({
  isOpen: false,
  mode: 'add',
  itemToEdit: null,
  onSuccessCallback: undefined,
  open: (mode, item = null, onSuccess) => set({ 
    isOpen: true, 
    mode, 
    itemToEdit: item,
    onSuccessCallback: onSuccess 
  }),
  close: () => set({ 
    isOpen: false, 
    mode: 'add', 
    itemToEdit: null,
    onSuccessCallback: undefined 
  }),
}));
