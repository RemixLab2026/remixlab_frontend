import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { creationApi } from '@/apis/creation';
import type { PlotRequest } from '@/types/creation';

export const useCreationHooks = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 1. AI 플롯 생성 Mutation
    const createPlotMutation = useMutation({
        mutationFn: (data: PlotRequest) => creationApi.createAIPlot(data),
        onSuccess: (response) => {
            // 성공 상태 코드가 201인지 확인 (이미지 명세 기준)
            if (response.success) {
                console.log('AI 플롯 생성 성공:', response.data);

                // 생성 후 목록을 다시 불러와야 한다면 캐시 무효화
                queryClient.invalidateQueries({ queryKey: ['plotList'] });

                // 상세 페이지 또는 결과 페이지로 이동하며 데이터 전달
                navigate('/generate/plot', {
                    state: { plotData: response.data },
                    replace: true
                });
            }
        },
        onError: (error) => {
            console.error('플롯 생성 실패:', error);
            alert('플롯 생성 중 오류가 발생했습니다.');
        }
    });

    // 2. (선택사항) 내 플롯 목록 조회 Query
    // 나중에 목록 페이지가 필요할 때 사용하세요.
    const plotListQuery = (enabled: boolean = false) => useQuery({
        queryKey: ['plotList'],
        queryFn: creationApi.getPlotList, // API 파일에 해당 함수가 있다고 가정
        enabled: enabled,
    });

    return {
        createPlotMutation,
        plotListQuery,
    };
};