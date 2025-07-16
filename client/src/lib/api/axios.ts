import axios from 'axios';

/**
 * Configured axios instance for API calls.
 * Includes automatic JWT token attachment and cookie handling.
 * 
 * Features:
 * - Automatic JWT token from localStorage
 * - Credential support for cookies
 * - Base URL from environment variables
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
