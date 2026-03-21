import { useMutation } from '@tanstack/react-query';
import type { AuthPayload } from '@/apis/auth';
import type { AuthMode } from '@/store/authStore';

export const useAuthMutation = (mode: AuthMode) => {
  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      await new Promise((res) => setTimeout(res, 800));

      if (mode === 'login') {
        console.log('login request');
      } else {
        console.log('signup request');
      }

      return {
        accessToken: 'dummy-token-123',
        email: payload.email,
      };
    },
  });
};
