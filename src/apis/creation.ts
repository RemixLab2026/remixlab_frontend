import { axiosInstance } from './axiosInstance';
import type { PlotRequest, PlotResponse } from '@/types/creation';

export const creationApi = {
    // AI 플롯 생성
    createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
        const response = await axiosInstance.post<PlotResponse>('/api/v1/creation/make/plot', payload);
        return response.data;
    },

    // AI 사진 생성 (각 장면별)
    createAIPhoto: async (payload: any): Promise<any> => {
        const response = await axiosInstance.post('/api/v1/creation/make/photo', payload);
        return response.data;
    },

    // (선택) 내 플롯 목록 조회
    getPlotList: async () => {
        const response = await axiosInstance.get('/api/v1/creation/plots');
        return response.data;
    }
};