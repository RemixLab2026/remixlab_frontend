import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  creationApi,
  type CreatePhotoPayload,
  type PhotoResponse,
  type SelectPhotoPayload,
  type SelectPhotoResponse,
} from '@/apis/creation';
import type { PlotData, PlotResponse, PlotRequest } from '@/types/creation';

export const useCreationHooks = () => {
  const queryClient = useQueryClient();

  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});

  const createPlotMutation = useMutation<PlotResponse, Error, PlotRequest>({
    mutationFn: (payload) => creationApi.createAIPlot(payload),
    onSuccess: (response) => {
      if (!response.success) return;
      queryClient.invalidateQueries({ queryKey: ['plotList'] });
    },
  });

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
