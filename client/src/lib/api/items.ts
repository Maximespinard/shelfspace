import { axiosInstance } from '../axios';
import type { NewItem } from '@/schemas/item.schema';

export const fetchItemsApi = async (queryParams) => {
  const res = await axiosInstance.get('/items', { params: queryParams });
  return res.data;
};

export const createItemApi = async (data: NewItem) => {
  const res = await axiosInstance.post('/items', data);
  return res.data;
};

export const updateItemApi = async (id: string, data: NewItem) => {
  const res = await axiosInstance.patch(`/items/${id}`, data);
  return res.data;
};

export const deleteItemApi = async (id: string) => {
  const res = await axiosInstance.delete(`/items/${id}`);
  return res.data;
};
