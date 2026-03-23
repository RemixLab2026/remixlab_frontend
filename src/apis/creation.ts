import { axiosInstance } from './axiosInstance';
import type { PlotRequest, PlotResponse } from '@/types/creation';

export const creationApi = {
    // 1. AI 플롯 생성 (아이디어 기반)
    createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
        const response = await axiosInstance.post<PlotResponse>('/api/v1/creation/make/plot', payload);
        return response.data;
    },

    // 2. AI 사진 생성 (백그라운드 자동 호출)
    createAIPhoto: async (payload: any): Promise<any> => {
        const response = await axiosInstance.post('/api/v1/creation/make/photo', payload);
        return response.data;
    },

    // 3. 사진 선택하기 (사용자 버튼 클릭 시 확정)
    selectPhoto: async (payload: { creationId: number; selections: { sceneNumber: number }[] }): Promise<any> => {
        const response = await axiosInstance.post('/api/v1/photo/select', payload);
        return response.data;
    },

    // 4. 플롯 목록 조회
    getPlotList: async () => {
        const response = await axiosInstance.get('/api/v1/creation/plots');
        return response.data;
    }
};