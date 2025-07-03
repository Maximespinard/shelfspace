import { axiosInstance } from './axios';
import type { NewCategory } from '@/schemas/category.schema';

export const fetchCategoriesApi = async () => {
  const res = await axiosInstance.get('/categories');
  return res.data;
};

export const createCategoryApi = async (data: NewCategory) => {
  const res = await axiosInstance.post('/categories', data);
  return res.data;
};

export const updateCategoryApi = async (id: string, data: NewCategory) => {
  const res = await axiosInstance.patch(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategoryApi = async (id: string) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};
