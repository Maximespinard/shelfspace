import { create } from 'zustand';
import {
  fetchCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '@/lib/api/categories';
import type { Category, CreateCategoryData } from '@/types/api';
import { handleApiError } from '@/lib/utils/handleApiError';
import { handleApiSuccess } from '@/lib/utils/handleApiSuccess';

interface CategoriesStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (data: CreateCategoryData) => Promise<void>;
  updateCategory: (id: string, data: CreateCategoryData) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const data = await fetchCategoriesApi();
      set({ categories: data });
    } catch (err) {
      handleApiError(err, undefined, 'category');
      console.warn('Fetch categories error:', err);
    }
  },

  addCategory: async (newCategory) => {
    try {
      const data = await createCategoryApi(newCategory);
      set((state) => ({ categories: [...state.categories, data] }));
      handleApiSuccess('Category created!');
    } catch (err) {
      handleApiError(err, undefined, 'category');
      console.warn('Create category error:', err);
    }
  },

  updateCategory: async (id, updatedCategory) => {
    try {
      const data = await updateCategoryApi(id, updatedCategory);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? data : cat
        ),
      }));
      handleApiSuccess('Category updated!');
    } catch (err) {
      handleApiError(err, undefined, 'category');
      console.warn('Update category error:', err);
    }
  },

  deleteCategory: async (id) => {
    try {
      await deleteCategoryApi(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));
      handleApiSuccess('Category deleted!');
    } catch (err) {
      handleApiError(err, undefined, 'category');
      console.warn('Delete category error:', err);
    }
  },
}));
