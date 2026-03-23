import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { creationApi } from '@/apis/creation';
import type { PlotData, Scene, PlotResponse, PlotRequest } from '@/types/creation';

// 💡 PhotoResponse 인터페이스 독립 정의 (상속 충돌 방지)
interface PhotoResponse {
    success: boolean;
    data: {
        imageUrl: string;
    };
    error: string | null;
}

// 💡 페이로드 타입 정의 (creationId 제외)
interface CreatePhotoPayload extends Omit<PlotData, 'creationId'> {
    scenes: Scene[];
}

export const useCreationHooks = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 상태 관리
    const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
    const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});

    // 1. AI 플롯 생성 Mutation
    const createPlotMutation = useMutation({
        mutationFn: (data: PlotRequest) => creationApi.createAIPlot(data),
        onSuccess: (response: PlotResponse) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['plotList'] });
                // 결과 데이터를 가지고 스토리보드 페이지로 이동
                navigate('/generate/plot', { state: { plotData: response.data }, replace: true });
            }
        },
    });

    // 2. AI 사진 생성 Mutation (백그라운드 자동 호출용)
    const createPhotoMutation = useMutation({
        mutationFn: (payload: CreatePhotoPayload) => creationApi.createAIPhoto(payload),
        onSuccess: (response: PhotoResponse, variables) => {
            if (response.success && response.data) {
                const imageUrl = response.data.imageUrl;
                const sceneNumber = variables.scenes[0].sceneNumber;
                setGeneratedImages((prev) => ({ ...prev, [sceneNumber]: imageUrl }));
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
            console.log(`Scene ${sceneNumber} 선택 완료`);
        },
        onError: () => alert('사진 선택 중 오류가 발생했습니다.'),
    });

    // 💡 자동 생성 로직 (ESLint 경고 해결 버전)
    const autoGeneratePhotos = useCallback((plotData: PlotData) => {
        // 사용하지 않는 creationId는 _unused로 명시하여 경고 해결
        const { creationId: _unused, ...restOfPlotData } = plotData;

        plotData.scenes.forEach((scene: Scene) => {
            // 이미 생성된 이미지가 있다면 스킵
            if (generatedImages[scene.sceneNumber]) return;

            createPhotoMutation.mutate({
                ...restOfPlotData,
                scenes: [scene]
            });
        });
    }, [createPhotoMutation, generatedImages]);

    return {
        createPlotMutation,
        createPhotoMutation,
        selectPhotoMutation,
        generatedImages,
        selectedScenes,
        autoGeneratePhotos
    };
};