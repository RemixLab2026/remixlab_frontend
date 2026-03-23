import { axiosInstance } from './axiosInstance';
import type { PlotRequest, PlotResponse } from '@/types/creation';

// creationApi를 '객체'로 내보냅니다.
export const creationApi = {
    /**
     * AI 플롯 생성 (POST)
     * 이미지 명세 기준 경로: /api/v1/creation/make/plot
     */
    createAIPlot: async (payload: PlotRequest): Promise<PlotResponse> => {
        // 이제 여기서 전달받은 payload를 사용하므로 TS6133 에러가 사라집니다.
        const response = await axiosInstance.post<PlotResponse>('/api/v1/creation/make/plot', payload);
        return response.data;
    },

    /** * (추가 예시) 목록 조회가 필요하다면 여기에 추가
     */
    getPlotList: async () => {
        const response = await axiosInstance.get('/api/v1/creation/plots');
        return response.data;
    }
};