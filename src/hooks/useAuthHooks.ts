import { useMutation } from '@tanstack/react-query'; // useQuery, useQueryClient 제거
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';
import type { AuthRequest } from '@/types/auth';

export const useAuthHooks = () => {
  const navigate = useNavigate();

  // setAccessToken 대신, 토큰과 더미 유저 데이터를 한 번에 세팅해 주는 login 액션을 가져옵니다.
  const loginAction = useAuthStore((state) => state.login);

  // 1. 회원가입 (응답 상태 201 확인)
  const registerMutation = useMutation({
    mutationFn: (data: AuthRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.status === 201) {
        console.log('회원가입이 성공적으로 완료되었습니다.');
        // 필요시 모드를 'login'으로 변경하거나 리다이렉트 (예: navigate('/login'))
      }
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    }
  });

  // 2. 로그인
  const loginMutation = useMutation({
    mutationFn: (data: AuthRequest) => authApi.login(data),
    onSuccess: ({ token }) => {
      if (token) {
        // Zustand의 login 액션 호출 (토큰 저장 + 더미 유저 정보 자동 세팅)
        loginAction(token);

        // 홈 화면으로 리다이렉트
        navigate('/', { replace: true });
      } else {
        console.warn('로그인은 성공했으나 Header에 토큰이 없습니다.');
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    }
  });

  // 3. 유저 정보 조회 (userInfoQuery) 제거됨
  // 이유: 백엔드 API 대신 Zustand의 더미 상태(state)로 화면을 그리기로 했기 때문입니다.

  return {
    registerMutation,
    loginMutation,
  };
};