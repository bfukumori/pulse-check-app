import { AxiosError } from "axios";
import { create } from "zustand";
import { SecureAuthStorage } from "../auth/secure-auth-storage";
import { SignInRequestDto } from "../services/auth/sign-in/sign-in.dto";
import { signInService } from "../services/auth/sign-in/sign-in.service";
import { SignUpRequestDto } from "../services/auth/sign-up/sign-up.dto";
import { signUpService } from "../services/auth/sign-up/sign-up.service";

const storage = new SecureAuthStorage();

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (dto: SignInRequestDto) => Promise<void>;
  register: (dto: SignUpRequestDto) => Promise<void>;
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
      const response = await signInService({ email, password });

      await storage.saveAccessToken(response.token);

      set({ isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      let message = "Erro ao autenticar";
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
      let message = "Erro ao criar conta";
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message;
      }
      set({ error: message, isLoading: false });
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
