import { useMutation } from '@tanstack/react-query';
import { login, signup, type AuthPayload } from '../apis/auth';
import type { AuthMode } from '../store/authStore';

export const useAuthMutation = (mode: AuthMode) => {
  const isLogin = mode === 'login';

  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      return isLogin ? login(payload) : signup(payload);
    },
    onSuccess: (data) => {
      console.log(isLogin ? '로그인 성공' : '회원가입 성공', data);
    },
    onError: (error) => {
      console.error(isLogin ? '로그인 실패' : '회원가입 실패', error);
    },
  });
};
