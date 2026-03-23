import { axiosInstance } from './axiosInstance';

// 백엔드 API 응답 구조에 맞춘 타입 정의
export interface QuestApiResponse {
    success: boolean;
    data: {
        quests: {
            name: string;
        }[];
    };
    error: string | null;
}

export const questApi = {
    // 내 퀘스트 목록 가져오기
    getMyQuests: async () => {
        const response = await axiosInstance.get<QuestApiResponse>('/api/v1/quest/show');
        // 데이터의 깊은 곳(quests 배열)까지 바로 접근해서 리턴합니다.
        return response.data.data.quests;
    },
};