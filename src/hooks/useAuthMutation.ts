import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';
import type {AuthRequest} from '@/types/auth';

export const useAuthHooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const accessToken = useAuthStore((state) => state.accessToken);

  // 1. 회원가입 (응답 상태 201 확인)
  const registerMutation = useMutation({
    mutationFn: (data: AuthRequest) => authApi.register(data),
    onSuccess: (response) => {
      if (response.status === 201) {
        console.log('회원가입이 성공적으로 완료되었습니다.');
        // 필요시 리다이렉트 로직 추가 (예: navigate('/login'))
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
        // 성공적으로 200이 떨어지고 Header에서 토큰을 추출했다면 스토어에 저장
        setAccessToken(token);

        // 로그인 성공 후 즉시 유저 정보를 가져오도록 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });

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

  // 3. 유저 정보 조회 (토큰이 있을 때만 동작)
  const userInfoQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: authApi.getUserInfo,
    enabled: !!accessToken, // accessToken이 존재할 때만 API 호출 (자동 연동)
  });

  return {
    registerMutation,
    loginMutation,
    userInfoQuery,
  };
};