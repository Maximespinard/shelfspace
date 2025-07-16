import { axiosInstance } from '@/lib/api/axios';
import type { Category, CreateCategoryData } from '../types/category.types';

export const fetchCategoriesApi = async () => {
  const res = await axiosInstance.get<Category[]>('/categories');
  return res.data;
};

export const createCategoryApi = async (data: CreateCategoryData) => {
  const res = await axiosInstance.post<Category>('/categories', data);
  return res.data;
};

export const updateCategoryApi = async (id: string, data: CreateCategoryData) => {
  const res = await axiosInstance.patch<Category>(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategoryApi = async (id: string) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};
