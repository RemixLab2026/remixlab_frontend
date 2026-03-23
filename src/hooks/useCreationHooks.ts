import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { creationApi } from '@/apis/creation';
import type { PlotData, Scene, PlotResponse, PlotRequest } from '@/types/creation';

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

    // 생성된 이미지 URL 보관 (sceneNumber: url)
    const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
    // 선택 완료된 장면 추적
    const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});

    // 1. 플롯 생성 Mutation (PlotResponse 타입을 onSuccess에 명시하여 경고 해결)
    const createPlotMutation = useMutation({
        mutationFn: (data: PlotRequest) => creationApi.createAIPlot(data),
        onSuccess: (response: PlotResponse) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['plotList'] });
            }
        },
    });

    // 2. AI 사진 생성 Mutation (자동 호출용)
    const createPhotoMutation = useMutation({
        mutationFn: (payload: CreatePhotoPayload) => creationApi.createAIPhoto(payload),
        onSuccess: (response: PhotoResponse, variables) => {
            if (response.success && response.data) {
                const { sceneNumber } = variables.scenes[0];
                setGeneratedImages((prev) => ({ ...prev, [sceneNumber]: response.data.imageUrl }));
            }
        },
    });

    // 3. 사진 선택하기 Mutation (버튼 클릭용)
    const selectPhotoMutation = useMutation({
        mutationFn: (payload: { creationId: number; selections: { sceneNumber: number }[] }) =>
            creationApi.selectPhoto(payload),
        onSuccess: (_, variables) => {
            const sceneNumber = variables.selections[0].sceneNumber;
            setSelectedScenes((prev) => ({ ...prev, [sceneNumber]: true }));
        },
    });

    // 💡 자동 생성을 위한 함수
    const autoGeneratePhotos = useCallback((plotData: PlotData) => {
        const { creationId: _unusedId, ...restOfPlotData } = plotData;
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