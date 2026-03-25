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

type LoosePhotoItem = {
  sceneNumber?: number;
  imageUrl?: string;
  url?: string;
  image_url?: string;
};

type LoosePhotoResponse = {
  success?: boolean;
  data?:
    | LoosePhotoItem
    | LoosePhotoItem[]
    | {
        photos?: LoosePhotoItem[];
        images?: LoosePhotoItem[];
        results?: LoosePhotoItem[];
        imageUrl?: string;
        url?: string;
        image_url?: string;
      };
  imageUrl?: string;
  url?: string;
  image_url?: string;
};

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
      const safeResponse = response as unknown as LoosePhotoResponse;

      const responseData = safeResponse?.data;

      // 1) 여러 장이 배열로 오는 경우
      const multiPhotos = Array.isArray(responseData)
        ? responseData
        : (responseData as { photos?: LoosePhotoItem[]; images?: LoosePhotoItem[]; results?: LoosePhotoItem[] })
            ?.photos ||
          (responseData as { photos?: LoosePhotoItem[]; images?: LoosePhotoItem[]; results?: LoosePhotoItem[] })
            ?.images ||
          (responseData as { photos?: LoosePhotoItem[]; images?: LoosePhotoItem[]; results?: LoosePhotoItem[] })
            ?.results;

      if (Array.isArray(multiPhotos) && multiPhotos.length > 0) {
        const nextImages: Record<number, string> = {};

        multiPhotos.forEach((item, index) => {
          const sceneNumber = item.sceneNumber ?? variables.scenes[index]?.sceneNumber;
          const imageUrl = item.imageUrl ?? item.url ?? item.image_url;

          if (sceneNumber && imageUrl) {
            nextImages[sceneNumber] = imageUrl;
          }
        });

        if (Object.keys(nextImages).length > 0) {
          setGeneratedImages((prev) => ({
            ...prev,
            ...nextImages,
          }));
        }

        return;
      }

      // 2) 단일 응답인 경우도 대응
      const firstScene = variables.scenes[0];
      if (!firstScene) return;

      const singleImageUrl =
        (responseData as LoosePhotoItem)?.imageUrl ??
        (responseData as LoosePhotoItem)?.url ??
        (responseData as LoosePhotoItem)?.image_url ??
        safeResponse?.imageUrl ??
        safeResponse?.url ??
        safeResponse?.image_url;

      if (!singleImageUrl) return;

      setGeneratedImages((prev) => ({
        ...prev,
        [firstScene.sceneNumber]: singleImageUrl,
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

      createPhotoMutation.mutate({
        ...restOfPlotData,
        scenes: plotData.scenes,
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
