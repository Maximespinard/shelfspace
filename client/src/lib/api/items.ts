import { axiosInstance } from './axios';
import type { ItemFilters } from '@/store/useItemFiltersStore';
import type { 
  ItemWithCategory, 
  CreateItemData,
  UpdateItemData 
} from '@/types/api';

// Existing endpoints (FormData-based)
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

// JSON-based endpoints (same URLs, different content type)
export const createItemJsonApi = async (itemData: CreateItemData) => {
  const { data } = await axiosInstance.post<{ data: ItemWithCategory }>('/items', itemData);
  return data;
};

export const updateItemJsonApi = async (id: string, itemData: UpdateItemData) => {
  const { data } = await axiosInstance.patch<{ data: ItemWithCategory }>(`/items/${id}`, itemData);
  return data;
};

// Image-specific endpoints
export const uploadItemImageApi = async (id: string, image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  
  const { data } = await axiosInstance.post<{ data: ItemWithCategory }>(
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
  const { data } = await axiosInstance.delete<{ data: ItemWithCategory }>(`/items/${id}/image`);
  return data;
};
