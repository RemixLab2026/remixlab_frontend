import type { Scene } from '@/types/creation';
import StepNavigation from '@/components/create/StepNavigation';

interface StoryboardSectionProps {
  items: Scene[];
  generatedImages: Record<number, string>;
  selectedScenes: Record<number, boolean>;
  isPhotoPending: boolean;
  pendingSceneNumber?: number;
  isSelectPending: boolean;
  onSelectImage: (num: number) => void;
  onGoImage: () => void;
  showStepNav?: boolean;
}

export default function StoryboardSection({
  items,
  generatedImages,
  selectedScenes,
  isPhotoPending,
  pendingSceneNumber,
  isSelectPending,
  onSelectImage,
  onGoImage,
  showStepNav = true,
}: StoryboardSectionProps) {
  const hasSelectedAny = Object.keys(selectedScenes).length > 0;

  return (
    <section className='pb-12 pt-6 text-white md:pb-16 md:pt-8'>
      {/* StepNavigation */}
      {showStepNav && <StepNavigation currentStep='storyboard' />}

      {/* 헤더 */}
      <div className='mb-6 mt-4 md:mb-8 md:mt-6'>
        <h2 className='text-[18px] font-bold tracking-tight md:text-[22px]'>스토리보드</h2>
      </div>

      {/* 리스트 */}
      <div className='space-y-4'>
        {items.map((scene) => {
          const isReady = !!generatedImages[scene.sceneNumber];
          const isDone = !!selectedScenes[scene.sceneNumber];
          const isGenerating = isPhotoPending && pendingSceneNumber === scene.sceneNumber;

          return (
            <div key={scene.sceneNumber} className='flex flex-col gap-3 md:flex-row md:gap-5'>
              {/* 번호 박스 */}
              <div className='flex h-[90px] w-full shrink-0 flex-row items-center justify-center gap-3 rounded-[14px] bg-[linear-gradient(180deg,#60b5b1_0%,#439d98_100%)] px-4 shadow-md md:h-[110px] md:w-[140px] md:flex-col md:gap-0 md:rounded-[16px]'>
                <span className='text-[26px] font-bold leading-none md:text-[30px]'>{scene.sceneNumber}</span>
                <span className='text-[12px] font-medium text-white/90 md:mt-2 md:text-[13px]'>
                  {scene.emotion || '분위기'}
                </span>
              </div>

              {/* 카드 */}
              <div className='flex flex-1 flex-col gap-4 rounded-[14px] border border-white/5 bg-[#0c1216] px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-5 md:rounded-[16px]'>
                {/* 텍스트 영역 */}
                <div className='flex flex-1 flex-col gap-3 md:flex-row md:items-center md:pr-8'>
                  {/* 태그 */}
                  <div className='flex w-full flex-wrap gap-2 md:w-[240px] md:shrink-0'>
                    {scene.visualElements
                      .split(',')
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className='rounded-full border border-white/5 bg-[#1c2429] px-3 py-1 text-[11px] text-white/70 md:px-3.5 md:py-1.5 md:text-[12px]'
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>

                  {/* 구분선 (데스크탑만) */}
                  <div className='hidden h-8 w-px bg-white/10 md:mx-6 md:block' />

                  {/* 설명 */}
                  <p className='text-[14px] leading-relaxed text-white/90 md:text-[15px]'>{scene.sceneDescription}</p>
                </div>

                {/* 버튼 */}
                <div className='flex w-full md:w-auto md:justify-end'>
                  {isDone ? (
                    <div className='flex h-[42px] w-full items-center justify-center rounded-[10px] bg-[#22282c] text-[12px] font-medium text-white/80 md:h-[44px] md:w-[110px] md:text-[13px] md:rounded-[12px]'>
                      <svg className='mr-1.5 h-4 w-4 opacity-70' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                      </svg>
                      완료
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectImage(scene.sceneNumber)}
                      disabled={!isReady || isSelectPending}
                      className='flex h-[42px] w-full items-center justify-center rounded-[10px] bg-[#161e22] text-[11px] font-medium text-white/80 transition-all hover:bg-[#1f292e] disabled:cursor-not-allowed disabled:opacity-50 md:h-[44px] md:w-[140px] md:text-[12px] md:rounded-[12px]'
                    >
                      <span>
                        {isGenerating || !isReady ? '준비 중...' : isSelectPending ? '처리 중...' : '이미지 생성'}
                      </span>

                      {!isSelectPending && isReady && !isGenerating && (
                        <div className='ml-2 flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5'>
                          <img src='/token.png' alt='토큰' className='h-[10px] w-[10px] md:h-[11px] md:w-[11px]' />
                          <span className='text-[10px] font-semibold md:text-[11px]'>3</span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 버튼 */}
      <div className='mt-10 flex justify-center md:mt-12 md:justify-end'>
        <button
          onClick={onGoImage}
          disabled={!hasSelectedAny}
          className={`group flex w-full items-center justify-center gap-2 rounded-[12px] px-6 py-3 text-[13px] font-bold transition-all md:w-auto md:rounded-[14px] md:px-8 md:py-3.5 md:text-[15px] ${
            hasSelectedAny
              ? 'cursor-pointer bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-black shadow-[0_0_20px_rgba(55,220,225,0.3)] hover:opacity-90'
              : 'cursor-not-allowed bg-white/10 text-white/30'
          }`}
        >
          이미지 확인
          <svg
            className={`h-4 w-4 transition-transform ${hasSelectedAny ? 'group-hover:translate-x-1' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 12h14M12 5l7 7-7 7' />
          </svg>
        </button>
      </div>
    </section>
  );
}
