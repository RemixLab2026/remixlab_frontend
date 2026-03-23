import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { creationApi } from '@/apis/creation';
import type { PlotData, Scene, PlotResponse, PlotRequest } from '@/types/creation';

interface BaseApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

interface PhotoData {
  imageUrl: string;
}

type PhotoResponse = BaseApiResponse<PhotoData>;

interface SelectPhotoPayload {
  creationId: number;
  selections: { sceneNumber: number }[];
}

type SelectPhotoResponse = BaseApiResponse<null>;

interface CreatePhotoPayload extends Omit<PlotData, 'creationId'> {
  scenes: Scene[];
}

export const useCreationHooks = () => {
  const queryClient = useQueryClient();

  // sceneNumber 기준으로 생성된 이미지 저장
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});

  // sceneNumber 기준으로 선택 완료 여부 저장
  const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});

  // 1. 플롯 생성
  const createPlotMutation = useMutation<PlotResponse, Error, PlotRequest>({
    mutationFn: (payload) => creationApi.createAIPlot(payload),
    onSuccess: (response) => {
      if (!response.success) return;

      queryClient.invalidateQueries({ queryKey: ['plotList'] });
    },
  });

  // 2. AI 사진 생성
  const createPhotoMutation = useMutation<PhotoResponse, Error, CreatePhotoPayload>({
    mutationFn: (payload) => creationApi.createAIPhoto(payload),
    onSuccess: (response, variables) => {
      if (!response.success || !response.data) return;

      const scene = variables.scenes[0];
      if (!scene) return;

      setGeneratedImages((prev) => ({
        ...prev,
        [scene.sceneNumber]: response.data.imageUrl,
      }));
    },
  });

  // 3. 사진 선택
  const selectPhotoMutation = useMutation<SelectPhotoResponse, Error, SelectPhotoPayload>({
    mutationFn: (payload) => creationApi.selectPhoto(payload),
    onSuccess: (response, variables) => {
      if (!response.success) return;

      const selected = variables.selections[0];
      if (!selected) return;

      setSelectedScenes((prev) => ({
        ...prev,
        [selected.sceneNumber]: true,
      }));
    },
  });

  // 4. 플롯의 각 scene에 대해 사진 자동 생성
  const autoGeneratePhotos = useCallback(
    (plotData: PlotData) => {
      const { creationId, ...restOfPlotData } = plotData;

      void creationId;

      plotData.scenes.forEach((scene) => {
        createPhotoMutation.mutate({
          ...restOfPlotData,
          scenes: [scene],
        });
      });
    },
    [createPhotoMutation]
  );

  return {
    createPlotMutation,
    createPhotoMutation,
    selectPhotoMutation,
    generatedImages,
    selectedScenes,
    autoGeneratePhotos,
  };
};
