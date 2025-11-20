import axios, { AxiosError } from 'axios';
import { SecureAuthStorage } from '../auth/secure-auth-storage';
import { useAuth } from '../stores/auth.store';

const storage = new SecureAuthStorage();

const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await storage.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await useAuth.getState().logout();
    }
    return Promise.reject(error);
  }
);

export { api };
