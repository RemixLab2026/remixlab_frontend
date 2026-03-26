import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { dummyCreationApi } from '@/apis/creation';
import type { PlotData } from '@/types/creation';
import type { SelectedPhotoItem } from '@/apis/creation';

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

  // 🌟 더미 흐름 제어를 위한 로컬 상태들
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [selectedScenes, setSelectedScenes] = useState<Record<number, boolean>>({});
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhotoItem[]>([]);
  const [pendingSceneNumber, setPendingSceneNumber] = useState<number | undefined>(undefined);

  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [isVideoCreating, setIsVideoCreating] = useState(false);

  const hasStartedAutoRef = useRef(false);

  // 더미 레벨 처리 (비디오 생성이 가능하도록 3으로 설정)
  const userLevel = 3;

  // 1. [아이디어 단계] AI 플롯 생성 Mutation
  const { mutate: createPlot, isPending: isPlotPending } = useMutation({
    mutationFn: () => dummyCreationApi.createAIPlot({ user_input: idea }),
    onSuccess: (response) => {
      if (response.success) {
        setPlotData(response.data);
        setCurrentStep('storyboard');
      }
    },
  });

  const handleGenerateFlow = () => {
    if (!idea.trim()) return;
    createPlot();
  };

  // 2. [스토리보드 단계] 씬별 이미지 자동 생성 (1번씬부터 순차적으로)
  useEffect(() => {
    if (currentStep === 'storyboard' && plotData && !hasStartedAutoRef.current) {
      hasStartedAutoRef.current = true;

      const generatePhotos = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { creationId, ...restPlotData } = plotData;

        for (const scene of plotData.scenes) {
          setPendingSceneNumber(scene.sceneNumber);
          try {
            // 🌟 CreatePhotoPayload 타입 규격에 완벽하게 맞춰서 페이로드 생성
            const payload = {
              ...restPlotData,
              scenes: [scene],
            };

            // as any 없이 깔끔하게 호출!
            const res = await dummyCreationApi.createAIPhoto(payload);
            if (res.success) {
              setGeneratedImages((prev) => ({ ...prev, [scene.sceneNumber]: res.data.imageUrl }));
            }
          } catch (error) {
            console.error(error);
          }
        }
        setPendingSceneNumber(undefined);
      };

      generatePhotos();
    }
  }, [currentStep, plotData]);

  // 3. [스토리보드 단계] 이미지 선택 핸들러
  const handleSelectImage = (sceneNumber: number) => {
    // UI에 "완료" 표시
    setSelectedScenes((prev) => ({ ...prev, [sceneNumber]: true }));

    // 선택된 사진 배열에 추가 (다음 이미지 미리보기 단계용)
    const url = generatedImages[sceneNumber];
    if (url) {
      setSelectedPhotos((prev) => {
        if (prev.find((p) => p.sceneNumber === sceneNumber)) return prev;
        return [...prev, { sceneNumber, url }];
      });
    }
  };

  // 4. [이미지 미리보기 단계] 비디오 생성 핸들러 (폴링 시뮬레이션)
  const handleGoVideo = () => {
    if (!plotData) return;

    // 레벨 3 미만이면 잠금 화면
    if (userLevel < 3) {
      setCurrentStep('video-locked');
      return;
    }

    setIsVideoCreating(true);

    // a) 비디오 생성 요청
    dummyCreationApi.createVideo({ creationId: plotData.creationId }).then((res) => {
      if (res.success && res.data) {

        // b) 3초 뒤에 상태 조회(완료) 시뮬레이션
        setTimeout(() => {
          dummyCreationApi.getVideoStatus(res.data.videoId).then((statusRes) => {
            if (statusRes.success) {
              setVideoUrl(statusRes.data.url);
              setIsVideoCreating(false);
              setCurrentStep('complete'); // 🌟 로딩이 끝나면 완성 화면으로 이동
            }
          });
        }, 3000);
      }
    });
  };

  return (
      <div className='mx-auto max-w-[1280px] px-8 pt-8 pb-20'>
        {/* 1. 아이디어 입력 */}
        {currentStep === 'idea' && (
            <IdeaEntry
                idea={idea}
                setIdea={setIdea}
                onGenerateFlow={handleGenerateFlow}
                isPending={isPlotPending}
            />
        )}

        {/* 2. 스토리보드 (플롯 + 이미지 생성) */}
        {currentStep === 'storyboard' && plotData && (
            <StoryboardSection
                items={plotData.scenes}
                generatedImages={generatedImages}
                selectedScenes={selectedScenes}
                isPhotoPending={pendingSceneNumber !== undefined}
                pendingSceneNumber={pendingSceneNumber}
                isSelectPending={false} // 더미에서는 대기 없음
                onSelectImage={handleSelectImage}
                onGoImage={() => setCurrentStep('image')}
            />
        )}

        {/* 3. 선택된 이미지 미리보기 */}
        {currentStep === 'image' && plotData && (
            <ImagePreviewSection
                items={plotData.scenes}
                selectedPhotos={selectedPhotos}
                showStepNav={true}
                onGoVideo={handleGoVideo}
                // 최소 1장 이상 선택해야 영상 제작 버튼 활성화
                canGoVideo={selectedPhotos.length > 0}
                isVideoCreating={isVideoCreating}
            />
        )}

        {/* 4. 비디오 잠금 화면 */}
        {currentStep === 'video-locked' && <VideoLockedSection showStepNav={true} />}

        {/* 5. 비디오 완성 화면 (앞서 작업한 투톤 버튼, MP4 렌더링 포함) */}
        {currentStep === 'complete' && plotData && (
            <CompleteSection
                showStepNav={true}
                videoUrl={videoUrl}
                isLoading={isVideoCreating}
                sceneCount={plotData.scenes.length}
            />
        )}
      </div>
  );
}