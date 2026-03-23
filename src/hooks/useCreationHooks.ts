import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { creationApi } from '@/apis/creation';
import type { PlotData, Scene, PlotResponse, PlotRequest } from '@/types/creation';

// 타입 충돌 방지를 위한 독립 인터페이스
interface PhotoResponse {
    success: boolean;
    data: { imageUrl: string };
    error: string | null;
}

interface CreatePhotoPayload extends Omit<PlotData, 'creationId'> {
    scenes: Scene[];
}

export const useCreationHooks = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 생성된 이미지 URL 보관 (메모리)
    const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
    // DB 선택 완료 여부 추적
    const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});

    // 1. 플롯 생성
    const createPlotMutation = useMutation({
        mutationFn: (data: PlotRequest) => creationApi.createAIPlot(data),
        onSuccess: (response: PlotResponse) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['plotList'] });
                navigate('/generate/plot', { state: { plotData: response.data }, replace: true });
            }
        },
    });

    // 2. AI 사진 생성 (페이지 진입 시 자동 호출용)
    const createPhotoMutation = useMutation({
        mutationFn: (payload: CreatePhotoPayload) => creationApi.createAIPhoto(payload),
        onSuccess: (response: PhotoResponse, variables) => {
            if (response.success && response.data) {
                const { imageUrl } = response.data;
                const { sceneNumber } = variables.scenes[0];
                setGeneratedImages((prev) => ({ ...prev, [sceneNumber]: imageUrl }));
            }
        },
    });

    // 3. 사진 선택하기 (사용자 클릭 시 호출)
    const selectPhotoMutation = useMutation({
        mutationFn: (payload: { creationId: number; selections: { sceneNumber: number }[] }) =>
            creationApi.selectPhoto(payload),
        onSuccess: (_, variables) => {
            const sceneNumber = variables.selections[0].sceneNumber;
            setSelectedScenes((prev) => ({ ...prev, [sceneNumber]: true }));
            queryClient.invalidateQueries({ queryKey: ['plotList'] });
        },
        onError: () => alert('사진 선택 중 오류가 발생했습니다.'),
    });

    // 자동 생성 실행 함수
    const autoGeneratePhotos = useCallback((plotData: PlotData) => {
        const { creationId: _unused, ...restOfPlotData } = plotData;
        plotData.scenes.forEach((scene: Scene) => {
            createPhotoMutation.mutate({
                ...restOfPlotData,
                scenes: [scene]
            });
        });
    }, [createPhotoMutation.mutate]);

    return {
        createPlotMutation,
        createPhotoMutation,
        selectPhotoMutation,
        generatedImages,
        selectedScenes,
        autoGeneratePhotos
    };
};