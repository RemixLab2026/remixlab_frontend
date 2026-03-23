import { useQuery } from '@tanstack/react-query';
import { questApi } from '@/apis/quest';
import { useAuthStore } from '@/store/authStore';

export const useQuestHooks = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    // 내 퀘스트 정보 조회 Query
    const myQuestsQuery = useQuery({
        queryKey: ['myQuests'],
        queryFn: questApi.getMyQuests,
        enabled: !!accessToken, // accessToken이 존재할 때만 API 자동 호출
    });

    return {
        myQuestsQuery,
    };
};