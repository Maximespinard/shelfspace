import { axiosInstance } from './axios';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const fetchMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const logoutUser = async () => {
  return axiosInstance.post('/auth/logout');
};
