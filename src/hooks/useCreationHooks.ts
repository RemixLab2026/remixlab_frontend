import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { creationApi } from '@/apis/creation';
import type { PlotRequest } from '@/types/creation';

export const useCreationHooks = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 💡 생성된 이미지 URL들을 저장하는 상태 (Key: sceneNumber, Value: url)
    const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});

    // 1. AI 플롯 생성
    const createPlotMutation = useMutation({
        mutationFn: (data: PlotRequest) => creationApi.createAIPlot(data),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['plotList'] });
                navigate('/generate/plot', { state: { plotData: response.data }, replace: true });
            }
        },
        onError: (error) => {
            console.error('플롯 생성 실패:', error);
            alert('플롯 생성 중 오류가 발생했습니다.');
        }
    });

    // 2. AI 사진 생성 (상태값만 업데이트)
    const createPhotoMutation = useMutation({
        mutationFn: (payload: any) => creationApi.createAIPhoto(payload),
        onSuccess: (response, variables) => {
            if (response.success) {
                const imageUrl = response.data.imageUrl;
                const sceneNumber = variables.scenes[0].sceneNumber;

                // 💡 페이지 이동 없이 상태 객체에 URL 추가
                setGeneratedImages((prev) => ({
                    ...prev,
                    [sceneNumber]: imageUrl,
                }));

                console.log(`Scene ${sceneNumber} 데이터 저장 완료:`, imageUrl);
            }
        },
        onError: (error) => {
            console.error('이미지 생성 실패:', error);
            alert('이미지 생성 중 오류가 발생했습니다.');
        }
    });

    const plotListQuery = (enabled: boolean = false) => useQuery({
        queryKey: ['plotList'],
        queryFn: creationApi.getPlotList,
        enabled: enabled,
    });

    return {
        createPlotMutation,
        createPhotoMutation,
        generatedImages,
        plotListQuery,
    };
};