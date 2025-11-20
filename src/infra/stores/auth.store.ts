import { AxiosError } from 'axios';
import { create } from 'zustand';
import { SecureAuthStorage } from '../auth/secure-auth-storage';
import { decodeToken } from '../helpers/decode-token';
import { SignInRequestDto } from '../services/auth/sign-in/sign-in.dto';
import { signInService } from '../services/auth/sign-in/sign-in.service';
import { SignUpRequestDto } from '../services/auth/sign-up/sign-up.dto';
import { signUpService } from '../services/auth/sign-up/sign-up.service';

const storage = new SecureAuthStorage();

interface User {
  id: number;
  departmentId: number;
  role: 'admin' | 'member';
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (dto: SignInRequestDto) => Promise<void>;
  register: (dto: SignUpRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  user: null,

  login: async ({ email, password }: SignInRequestDto) => {
    set({ isLoading: true, error: null });
    try {
      const { token } = await signInService({ email, password });

      await storage.saveAccessToken(token);

      const payload = decodeToken(token);

      await storage.saveAccessToken(token);
      set({
        user: {
          id: payload.id,
          departmentId: payload.department_id,
          role: payload.role,
          name: payload.name,
        },
        isLoading: false,
      });
    } catch (err: unknown) {
      let message = 'Erro ao autenticar';
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message;
      }
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  register: async (dto: SignUpRequestDto) => {
    set({ isLoading: true, error: null });
    try {
      await signUpService(dto);

      set({ isLoading: false });
    } catch (err: unknown) {
      let message = 'Erro ao criar conta';
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message;
      }
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    await storage.clear();
    set({ user: null });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await storage.getAccessToken();

      if (!token) {
        set({ user: null, isLoading: false });
        return;
      }

      const payload = decodeToken(token);

      set({
        user: {
          id: payload.id,
          departmentId: payload.department_id,
          role: payload.role,
          name: payload.name,
        },
        isLoading: false,
      });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
