import { axiosInstance } from './axiosInstance';
import type {AuthRequest, UserInfo} from '@/types/auth';

export const authApi = {
  // 1. 회원가입 API (성공 시 201 Created 반환)
  register: async (data: AuthRequest) => {
    // axios는 2xx 응답을 모두 성공으로 간주하므로 201도 정상 처리됩니다.
    const response = await axiosInstance.post('/api/auth/signup', data);
    return response;
  },

  // 2. 로그인 API (응답 Header에서 토큰 추출)
  login: async (data: AuthRequest) => {
    const response = await axiosInstance.post('/login', data);

    // 백엔드 설정에 따라 헤더 키값이 다를 수 있으니 유연하게 대응 ('authorization' 또는 커스텀 헤더)
    const tokenHeader = response.headers['authorization'] || response.headers['accesstoken'];

    // 헤더 값에 'Bearer '가 포함되어 넘어올 경우를 대비해 순수 토큰만 추출
    const token = tokenHeader?.replace('Bearer ', '')?.trim();

    return { data: response.data, token };
  },

  // 3. 유저 정보 불러오기 API
  getUserInfo: async (): Promise<UserInfo> => {
    // 인터셉터가 알아서 Header에 Bearer 토큰을 넣어주므로 경로만 호출하면 됩니다.
    const response = await axiosInstance.get('/api/users/me');
    return response.data;
  }
};