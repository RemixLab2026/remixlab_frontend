import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CompleteSection from '@/components/create/CompleteSection';
import IdeaEntry from '@/components/create/IdeaEntry';
import ImagePreviewSection from '@/components/create/ImagePreviewSection';
import StoryboardSection from '@/components/create/StoryboardSection';
import TokenModal from '@/components/create/TokenModal';
import VideoLockedSection from '@/components/create/VideoLockedSection';
import type { CreateStep, StoryboardItem } from '@/types/create';

const INITIAL_STORYBOARD: StoryboardItem[] = [
  {
    id: 1,
    mood: '적막한',
    tags: ['마법소녀 루나', '별빛이 내리는 밤거리'],
    description: '길을 걷다가 울음소리를 듣는다.',
    imageGenerated: false,
  },
  {
    id: 2,
    mood: '긴장감 있는',
    tags: ['마법소녀 루나', '어두운 골목'],
    description: '다친 고양이를 발견한다.',
    imageGenerated: false,
  },
  {
    id: 3,
    mood: '따뜻한',
    tags: ['마법소녀 루나, 고양이', '빛나는 마법'],
    description: '마법으로 고양이를 치료한다.',
    imageGenerated: false,
  },
  {
    id: 4,
    mood: '평화로운',
    tags: ['마법소녀 루나, 고양이', '달빛 아래 공원'],
    description: '함께 걷기 시작한다.',
    imageGenerated: false,
  },
  {
    id: 5,
    mood: '환상적인',
    tags: ['마법소녀 루나, 변신한 고양이', '마법의 힘 날개다'],
    description: '고양이가 요정으로 변신한다.',
    imageGenerated: false,
  },
];

export default function CreatePage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<CreateStep>('idea');
  const [idea, setIdea] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [storyboardItems, setStoryboardItems] = useState<StoryboardItem[]>(INITIAL_STORYBOARD);

  const tokenCount = 12;
  const userLevel = 1;

  const mode = searchParams.get('mode');
  const step = searchParams.get('step');

  const canGoImage = useMemo(() => storyboardItems.every((item) => item.imageGenerated), [storyboardItems]);
  const canGoVideo = useMemo(() => storyboardItems.some((item) => item.imageGenerated), [storyboardItems]);
  const canComplete = userLevel >= 3;

  useEffect(() => {
    if (step === 'storyboard') {
      setCurrentStep('storyboard');
      return;
    }

    if (step === 'image') {
      setCurrentStep('image');
      return;
    }

    if (step === 'video') {
      setCurrentStep('video');
      return;
    }

    if (step === 'complete') {
      setCurrentStep('complete');
      return;
    }

    if (mode === 'home-storyboard') {
      setCurrentStep('storyboard');
      return;
    }

    if (mode === 'home-image') {
      setCurrentStep('image');
      return;
    }

    if (mode === 'home-video') {
      if (userLevel < 3) {
        setCurrentStep('video');
      } else {
        setCurrentStep('complete');
      }
      return;
    }

    setCurrentStep('idea');
  }, [mode, step, userLevel]);

  const handleGenerateFlow = () => {
    if (tokenCount < 1) {
      setShowTokenModal(true);
      return;
    }

    setCurrentStep('storyboard');
    setStoryboardItems(INITIAL_STORYBOARD);
  };

  const handleGenerateImage = (id: number) => {
    setStoryboardItems((prev) => prev.map((item) => (item.id === id ? { ...item, imageGenerated: true } : item)));
  };

  return (
    <div className='relative mx-auto max-w-[1280px] px-8 pb-16 pt-8'>
      {showTokenModal && <TokenModal onClose={() => setShowTokenModal(false)} />}

      {currentStep === 'idea' && <IdeaEntry idea={idea} setIdea={setIdea} onGenerateFlow={handleGenerateFlow} />}

      {currentStep === 'storyboard' && (
        <StoryboardSection
          items={storyboardItems}
          showStepNav={!mode?.startsWith('home-')}
          onGenerateImage={handleGenerateImage}
          onGoImage={!mode?.startsWith('home-') ? () => setCurrentStep('image') : undefined}
          canGoImage={!mode?.startsWith('home-') ? canGoImage : undefined}
        />
      )}

      {currentStep === 'image' && (
        <ImagePreviewSection
          items={storyboardItems}
          showStepNav={!mode?.startsWith('home-')}
          onGoVideo={!mode?.startsWith('home-') ? () => setCurrentStep('video') : undefined}
          canGoVideo={!mode?.startsWith('home-') ? canGoVideo : undefined}
        />
      )}

      {currentStep === 'video' && (
        <VideoLockedSection
          showStepNav={!mode?.startsWith('home-')}
          onGoComplete={!mode?.startsWith('home-') ? () => setCurrentStep('complete') : undefined}
          completeEnabled={!mode?.startsWith('home-') ? canComplete : undefined}
        />
      )}

      {currentStep === 'complete' && <CompleteSection showStepNav={!mode?.startsWith('home-')} />}
    </div>
  );
}
