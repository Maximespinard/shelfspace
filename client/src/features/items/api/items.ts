import { axiosInstance } from '@/lib/api/axios';
import type { ItemFilters } from '../store/useItemFiltersStore';
import type { ItemWithCategory } from '../types/item.types';

// API endpoints
export const fetchItemsApi = async (queryParams: ItemFilters) => {
  const res = await axiosInstance.get('/items', { params: queryParams });
  return res.data; // Response interceptor automatically unwraps { message, data } → data
};

export const createItemApi = async (data: FormData) => {
  const res = await axiosInstance.post<ItemWithCategory>(
    '/items',
    data
  );
  return res.data;
};

export const updateItemApi = async (id: string, data: FormData) => {
  const res = await axiosInstance.patch<ItemWithCategory>(
    `/items/${id}`,
    data
  );
  return res.data;
};

export const deleteItemApi = async (id: string) => {
  const res = await axiosInstance.delete(`/items/${id}`);
  return res.data;
};

// Image-specific endpoints
export const uploadItemImageApi = async (id: string, image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await axiosInstance.post<ItemWithCategory>(
    `/items/${id}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

export const deleteItemImageApi = async (id: string) => {
  const { data } = await axiosInstance.delete<ItemWithCategory>(
    `/items/${id}/image`
  );
  return data;
};
