import { axiosInstance } from './axiosInstance';
import type { AuthRequest, UserInfo } from '@/types/auth';

export const authApi = {
  // 1. 회원가입 API (성공 시 201 Created 반환)
  register: async (data: AuthRequest) => {
    // axios는 2xx 응답을 모두 성공으로 간주하므로 201도 정상 처리됩니다.
    const response = await axiosInstance.post('/api/v1/user/create', data);
    return response;
  },

  // 2. 로그인 API (응답 Header에서 토큰 추출)
  login: async (data: AuthRequest) => {
    const response = await axiosInstance.post('/login', data);
    console.log('response:::', response);
    const token = response.headers['accesstoken'];

    return { data: response.data, token };
  },

  // 3. 유저 정보 불러오기 API
  getUserInfo: async (): Promise<UserInfo> => {
    // 인터셉터가 알아서 Header에 Bearer 토큰을 넣어주므로 경로만 호출하면 됩니다.
    const response = await axiosInstance.get('/api/v1/user/info');
    return response.data;
  },
};
