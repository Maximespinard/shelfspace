import { axiosInstance } from './axios';
import type { ItemFilters } from '@/store/useItemFiltersStore';

export const fetchItemsApi = async (queryParams: ItemFilters) => {
  const res = await axiosInstance.get('/items', { params: queryParams });
  return res.data;
};

export const createItemApi = async (data: FormData) => {
  const res = await axiosInstance.post('/items', data);
  return res.data;
};

export const updateItemApi = async (id: string, data: FormData) => {
  const res = await axiosInstance.patch(`/items/${id}`, data);
  return res.data;
};

export const deleteItemApi = async (id: string) => {
  const res = await axiosInstance.delete(`/items/${id}`);
  return res.data;
};
