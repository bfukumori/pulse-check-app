import axios from 'axios';
import { SecureAuthStorage } from '../auth/secure-auth-storage';

const storage = new SecureAuthStorage();

const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await storage.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
