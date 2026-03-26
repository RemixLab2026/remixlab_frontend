import StepNavigation from '@/components/create/StepNavigation';
import type { Scene } from '@/types/creation';
import type { SelectedPhotoItem } from '@/apis/creation';

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

interface ImagePreviewSectionProps {
  items: Scene[];
  selectedPhotos: SelectedPhotoItem[];
  showStepNav?: boolean;
  onGoVideo?: () => void;
  canGoVideo?: boolean;
  isVideoCreating?: boolean;
}

export default function ImagePreviewSection({
                                              items,
                                              selectedPhotos,
                                              showStepNav,
                                              onGoVideo,
                                              canGoVideo: externalCanGoVideo,
                                              isVideoCreating,
                                            }: ImagePreviewSectionProps) {
  const selectedPhotoMap = selectedPhotos.reduce<Record<number, string>>((acc, photo) => {
    acc[photo.sceneNumber] = photo.url;
    return acc;
  }, {});

  const isAllImagesReady = items.length > 0 && items.every((scene) => !!selectedPhotoMap[scene.sceneNumber]);
  const isButtonEnabled = externalCanGoVideo ?? isAllImagesReady;

  // 버튼이 활성화되어 있고, 로딩 중이 아닐 때만 클릭 가능 상태로 간주
  const isClickable = isButtonEnabled && !isVideoCreating;

  return (
      <section className='pb-16 pt-8'>
        {showStepNav && <StepNavigation currentStep='image' />}

        {/* 상단 헤더 및 태그 필터 */}
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-[22px] font-bold text-white tracking-tight'>선택된 이미지 미리보기</h2>

          <div className='flex flex-wrap gap-2'>
            {IMAGE_TAGS.map((tag, index) => (
                <button
                    key={tag}
                    className={cn(
                        'cursor-pointer rounded-full px-4 py-1.5 text-[12px] transition-all',
                        index === 0
                            ? 'border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                            : 'bg-white/5 text-white/50 hover:text-white'
                    )}
                >
                  {tag}
                </button>
            ))}
          </div>
        </div>

        {/* 🌟 이미지와 동일한 3열 격자 레이아웃 (반응형 적용) */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((scene) => {
            const imageUrl = selectedPhotoMap[scene.sceneNumber];
            const isGenerated = !!imageUrl;

            return (
                <div
                    key={scene.sceneNumber}
                    className='group relative flex cursor-pointer flex-col rounded-[24px] border border-white/10 bg-[#0c1216] p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-[#11181d]'
                >
                  {/* 카드 상단 이미지 영역 */}
                  <div className='relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#161b21]'>
                    {isGenerated ? (
                        <img
                            src={imageUrl}
                            alt={`장면 ${scene.sceneNumber}`}
                            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                    ) : (
                        /* 이미지 로딩 실패나 없을 때 아이콘 표시 */
                        <div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-white/[0.03]'>
                          <svg className='h-10 w-10 text-white/10' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z' />
                          </svg>
                          <span className='text-[10px] uppercase tracking-widest text-white/20'>No Selected Image</span>
                        </div>
                    )}
                    {/* 이미지 위 오버레이 */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                  </div>

                  {/* 카드 하단 텍스트 영역 */}
                  <div className='mt-5 flex items-start px-1'>
                    <p className='text-[15px] leading-relaxed'>
                      <span className='mr-1.5 font-bold text-cyan-400'>장면 {scene.sceneNumber}.</span>
                      <span className='line-clamp-2 font-medium text-white/90'>
                    {scene.sceneDescription}
                  </span>
                    </p>
                  </div>
                </div>
            );
          })}
        </div>

        {/* 하단 메인 액션 버튼 */}
        {onGoVideo && (
            <div className='mt-12 flex justify-end'>
              <button
                  onClick={onGoVideo}
                  disabled={!isClickable}
                  className={`group flex items-center justify-center gap-2 rounded-[14px] px-8 py-3.5 text-[15px] font-bold transition-all ${
                      isClickable
                          ? 'cursor-pointer bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] text-black shadow-[0_0_20px_rgba(55,220,225,0.3)] hover:opacity-90'
                          : 'cursor-not-allowed bg-white/10 text-white/30'
                  }`}
              >
                {isVideoCreating ? '영상 생성 중...' : '영상 제작하기'}

                {!isVideoCreating && (
                    <svg
                        className={`h-4 w-4 transition-transform ${isClickable ? 'group-hover:translate-x-1' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 12h14M12 5l7 7-7 7' />
                    </svg>
                )}
              </button>
            </div>
        )}
      </section>
  );
}