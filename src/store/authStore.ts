import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthMode = 'login' | 'register';

interface AuthState {
    accessToken: string | null;
    mode: AuthMode;
    setAccessToken: (token: string) => void;
    login: (token: string) => void;
    logout: () => void;
    toggleMode: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            mode: 'login', // 기본값은 로그인

            setAccessToken: (token: string) => set({ accessToken: token }),

            // login 함수: 토큰을 저장합니다.
            login: (token: string) => set({ accessToken: token }),

            logout: () => set({ accessToken: null }),

            // toggleMode 함수: login <-> register 상태를 전환합니다.
            toggleMode: () => set((state) => ({ mode: state.mode === 'login' ? 'register' : 'login' })),
        }),
        {
            name: 'auth-storage'
        }
    )
);