import { useState, useEffect, useRef } from 'react';
import { useCreationHooks } from '@/hooks/useCreationHooks';
import { useVideoCreation } from '@/hooks/useVideoCreation';
import type { PlotData } from '@/types/creation';

import IdeaEntry from '@/components/create/IdeaEntry';
import StoryboardSection from '@/components/create/StoryboardSection';
import ImagePreviewSection from '@/components/create/ImagePreviewSection';
import CompleteSection from '@/components/create/CompleteSection';
import VideoLockedSection from '@/components/create/VideoLockedSection';

type CreateStep = 'idea' | 'storyboard' | 'image' | 'video-locked' | 'complete';

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState<CreateStep>('idea');
  const [idea, setIdea] = useState('');
  const [plotData, setPlotData] = useState<PlotData | null>(null);
  const hasStartedAutoRef = useRef(false);

  // 예시: 실제로는 유저 정보 store에서 가져오세요.
  const userLevel = 2;

  const {
    createPlotMutation,
    createPhotoMutation,
    selectPhotoMutation,
    generatedImages,
    selectedScenes,
    autoGeneratePhotos,
  } = useCreationHooks();

  const { selectedPhotosQuery, createVideoMutation, videoUrl, videoStatus, isPolling } = useVideoCreation(
    plotData?.creationId,
    currentStep === 'image'
  );

  const handleGenerateFlow = () => {
    if (!idea.trim()) return;

    createPlotMutation.mutate(
      { user_input: idea },
      {
        onSuccess: (response) => {
          if (response.success) {
            setPlotData(response.data);
            setCurrentStep('storyboard');
          }
        },
      }
    );
  };

  useEffect(() => {
    if (currentStep === 'storyboard' && plotData && !hasStartedAutoRef.current) {
      autoGeneratePhotos(plotData);
      hasStartedAutoRef.current = true;
    }
  }, [currentStep, plotData, autoGeneratePhotos]);

  useEffect(() => {
    if (videoStatus.toLowerCase() === 'complete' && videoUrl) {
      setCurrentStep('complete');
    }
  }, [videoStatus, videoUrl]);

  const handleSelectImage = (sceneNumber: number) => {
    if (!plotData) return;

    selectPhotoMutation.mutate({
      creationId: plotData.creationId,
      selections: [{ sceneNumber }],
    });
  };

  const handleGoVideo = () => {
    if (!plotData) return;

    if (userLevel < 3) {
      setCurrentStep('video-locked');
      return;
    }

    createVideoMutation.mutate(
      { creationId: plotData.creationId },
      {
        onSuccess: (response) => {
          if (response.success) {
            setCurrentStep('complete');
          }
        },
      }
    );
  };

  return (
    <div className='mx-auto max-w-[1280px] px-8 pt-8'>
      {currentStep === 'idea' && (
        <IdeaEntry
          idea={idea}
          setIdea={setIdea}
          onGenerateFlow={handleGenerateFlow}
          isPending={createPlotMutation.isPending}
        />
      )}

      {currentStep === 'storyboard' && plotData && (
        <StoryboardSection
          items={plotData.scenes}
          generatedImages={generatedImages}
          selectedScenes={selectedScenes}
          isPhotoPending={createPhotoMutation.isPending}
          pendingSceneNumber={createPhotoMutation.variables?.scenes[0].sceneNumber}
          isSelectPending={selectPhotoMutation.isPending}
          onSelectImage={handleSelectImage}
          onGoImage={() => setCurrentStep('image')}
        />
      )}

      {currentStep === 'image' && plotData && (
        <ImagePreviewSection
          items={plotData.scenes}
          selectedPhotos={selectedPhotosQuery.data?.data?.phots ?? []}
          showStepNav={true}
          onGoVideo={handleGoVideo}
          canGoVideo={(selectedPhotosQuery.data?.data?.phots?.length ?? 0) > 0}
          isVideoCreating={createVideoMutation.isPending}
        />
      )}

      {currentStep === 'video-locked' && <VideoLockedSection showStepNav={true} />}

      {currentStep === 'complete' && plotData && (
        <CompleteSection
          showStepNav={true}
          videoUrl={videoUrl}
          isLoading={createVideoMutation.isPending || isPolling || videoStatus.toLowerCase() !== 'complete'}
          sceneCount={plotData.scenes.length}
        />
      )}
    </div>
  );
}
