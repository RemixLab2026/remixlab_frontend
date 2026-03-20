import { create } from 'zustand';

type AuthMode = 'login' | 'signup';

interface AuthUIState {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  toggleMode: () => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  mode: 'login',
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'login' ? 'signup' : 'login',
    })),
}));
