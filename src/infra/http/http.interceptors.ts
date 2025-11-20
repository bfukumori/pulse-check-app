import { useAuth } from '../stores/auth.store';
import { api } from './http-client';

export function registerInterceptors() {
  return api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await useAuth.getState().logout();
      }
      return Promise.reject(error);
    }
  );
}
