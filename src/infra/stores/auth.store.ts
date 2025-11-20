import { AxiosError } from 'axios';
import { create } from 'zustand';
import { SecureAuthStorage } from '../auth/secure-auth-storage';
import { SignInRequestDto } from '../services/auth/sign-in/sign-in.dto';
import { signInService } from '../services/auth/sign-in/sign-in.service';

const storage = new SecureAuthStorage();

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (dto: SignInRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async ({ email, password }: SignInRequestDto) => {
    set({ isLoading: true, error: null });
    try {
      const { token } = await signInService({
        email,
        password,
      });

      await storage.saveAccessToken(token);
      set({ isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        set({ error: err.message ?? 'Erro ao autenticar', isLoading: false });
      }
      throw err;
    }
  },

  logout: async () => {
    await storage.clear();
    set({ isAuthenticated: false });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await storage.getAccessToken();

      if (!token) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }
      set({ isAuthenticated: true, isLoading: false });
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }
  },
}));
