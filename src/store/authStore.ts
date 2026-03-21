import { create } from 'zustand';

export type AuthMode = 'login' | 'signup';

interface AuthState {
  mode: AuthMode;
  isLogin: boolean;
  token: string | null;

  setMode: (mode: AuthMode) => void;
  toggleMode: () => void;

  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  mode: 'login',
  isLogin: false,
  token: null,

  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'login' ? 'signup' : 'login',
    })),

  login: (token) =>
    set({
      isLogin: true,
      token,
    }),

  logout: () =>
    set({
      isLogin: false,
      token: null,
    }),
}));
