import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthMode = 'login' | 'register';

// 프론트엔드 UI에 필요한 모든 필드를 포함한 타입 정의
export interface UserInfoState {
    username: string;
    exp: number;
    level: number;
    expPercentage: number;
    token: number;
}

interface AuthState {
    accessToken: string | null;
    mode: AuthMode;
    userInfo: UserInfoState | null; // 유저 정보 상태 추가
    setAccessToken: (token: string) => void;
    login: (token: string) => void;
    logout: () => void;
    toggleMode: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            mode: 'login',
            userInfo: null, // 초기값은 null

            setAccessToken: (token: string) => set({ accessToken: token }),

            // 로그인 시 토큰과 함께 더미 유저 데이터를 세팅합니다.
            login: (token: string) => set({
                accessToken: token,
                userInfo: {
                    username: '리믹스랩_마스터', // 더미 데이터
                    exp: 350,
                    level: 4,
                    expPercentage: 65, // 65% 채워진 상태
                    token: 1500
                }
            }),

            // 로그아웃 시 유저 정보도 날려줍니다.
            logout: () => set({ accessToken: null, userInfo: null }),

            toggleMode: () => set((state) => ({ mode: state.mode === 'login' ? 'register' : 'login' })),
        }),
        {
            name: 'auth-storage'
        }
    )
);