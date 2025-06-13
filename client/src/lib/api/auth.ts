import { axiosInstance } from '../axios';
import type { LoginPayload } from '@/schemas/login.schema';
import type { RegisterPayload } from '@/schemas/register.schema';

export const registerUserApi = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

export const loginUserApi = async (data: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const fetchMeApi = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const logoutUserApi = async () => {
  return axiosInstance.post('/auth/logout');
};
