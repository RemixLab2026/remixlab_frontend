import { useState, useEffect, useRef } from 'react';
import { useCreationHooks } from '@/hooks/useCreationHooks';
import type { PlotData } from '@/types/creation';

import IdeaEntry from '@/components/create/IdeaEntry';
import StoryboardSection from '@/components/create/StoryboardSection';
import ImagePreviewSection from '@/components/create/ImagePreviewSection';

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState<'idea' | 'storyboard' | 'image'>('idea');
  const [idea, setIdea] = useState('');
  const [plotData, setPlotData] = useState<PlotData | null>(null);
  const hasStartedAutoRef = useRef(false);

  const {
    createPlotMutation,
    createPhotoMutation,
    selectPhotoMutation,
    generatedImages,
    selectedScenes,
    autoGeneratePhotos,
  } = useCreationHooks();

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

  const handleSelectImage = (sceneNumber: number) => {
    if (!plotData) return;

    selectPhotoMutation.mutate({
      creationId: plotData.creationId,
      selections: [{ sceneNumber }],
    });
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
          generatedImages={generatedImages}
          showStepNav={true}
          onGoVideo={() => {}}
        />
      )}
    </div>
  );
}
