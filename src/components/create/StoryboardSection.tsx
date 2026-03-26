import type { Scene } from '@/types/creation';
import StepNavigation from '@/components/create/StepNavigation'; // 🌟 StepNavigation 임포트

interface StoryboardSectionProps {
    items: Scene[];
    generatedImages: Record<number, string>;
    selectedScenes: Record<number, boolean>;
    isPhotoPending: boolean;
    pendingSceneNumber?: number;
    isSelectPending: boolean;
    onSelectImage: (num: number) => void;
    onGoImage: () => void;
    showStepNav?: boolean; // 🌟 추가된 prop
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
                                              showStepNav = true, // 기본값 true 설정
                                          }: StoryboardSectionProps) {
    // 선택된 씬이 하나라도 있는지 확인 (버튼 활성화 조건)
    const hasSelectedAny = Object.keys(selectedScenes).length > 0;

    return (
        <section className='pb-16 pt-8 text-white'>
            {/* 🌟 StepNavigation 추가 */}
            {showStepNav && <StepNavigation currentStep='storyboard' />}

            <div className='mb-8 mt-6 flex items-center justify-between'>
                <h2 className='text-[22px] font-bold tracking-tight text-white'>스토리보드</h2>
            </div>

            {/* 세로형 리스트 레이아웃 */}
            <div className='space-y-4'>
                {items.map((scene) => {
                    const isReady = !!generatedImages[scene.sceneNumber];
                    const isDone = !!selectedScenes[scene.sceneNumber];
                    const isGenerating = isPhotoPending && pendingSceneNumber === scene.sceneNumber;

                    return (
                        <div key={scene.sceneNumber} className='flex gap-5'>
                            {/* 왼쪽 인덱스 박스 (에메랄드 그라데이션) */}
                            <div className='flex h-[110px] w-[140px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#60b5b1_0%,#439d98_100%)] shadow-md'>
                                <span className='text-[30px] font-bold leading-none text-white'>{scene.sceneNumber}</span>
                                <span className='mt-2 text-[13px] font-medium text-white/90'>
                  {scene.emotion || '분위기'}
                </span>
                            </div>

                            {/* 정보 카드 (리스트 아이템 바디) */}
                            <div className='flex flex-1 items-center justify-between rounded-[16px] border border-white/5 bg-[#0c1216] px-8 py-5 shadow-sm'>
                                <div className='flex flex-1 items-center pr-8'>
                                    {/* 시각 요소 태그 */}
                                    <div className='flex w-[240px] shrink-0 flex-wrap gap-2 overflow-hidden'>
                                        {scene.visualElements.split(',').slice(0, 2).map((tag, i) => (
                                            <span
                                                key={i}
                                                className='whitespace-nowrap rounded-full border border-white/5 bg-[#1c2429] px-3.5 py-1.5 text-[12px] text-white/70'
                                            >
                        {tag.trim()}
                      </span>
                                        ))}
                                    </div>

                                    {/* 수직 구분선 */}
                                    <div className='mx-6 h-8 w-px bg-white/10'></div>

                                    {/* 씬 설명 */}
                                    <p className='text-[15px] font-medium leading-relaxed text-white/90'>
                                        {scene.sceneDescription}
                                    </p>
                                </div>

                                {/* 버튼 조건부 로직 */}
                                {isDone ? (
                                    /* 1) 완료된 플롯: '완료' 표시 */
                                    <div className='flex h-[44px] w-[110px] items-center justify-center rounded-[12px] bg-[#22282c] text-[13px] font-medium text-white/80'>
                                        <svg
                                            className='mr-1.5 h-4 w-4 opacity-70'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2.5'
                                                d='M5 13l4 4L19 7'
                                            ></path>
                                        </svg>
                                        <span className='text-[11px]'>완료</span>
                                    </div>
                                ) : (
                                    /* 2) 미완료 플롯: '이미지 생성' 버튼 */
                                    <button
                                        onClick={() => onSelectImage(scene.sceneNumber)}
                                        disabled={!isReady || isSelectPending}
                                        className='flex h-[44px] w-[140px] cursor-pointer items-center justify-center rounded-[12px] bg-[#161e22] text-[12px] font-medium text-white/80 transition-all hover:bg-[#1f292e] disabled:cursor-not-allowed disabled:opacity-50'
                                    >
                    <span className='text-[11px]'>
                      {isGenerating || !isReady ? '준비 중...' : isSelectPending ? '처리 중...' : '이미지 생성'}
                    </span>
                                        {!isSelectPending && isReady && !isGenerating && (
                                            <div className='ml-2 flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5'>
                                                <img src='/token.png' alt='토큰' className='h-[11px] w-[11px] opacity-90' />
                                                <span className='text-[11px] font-semibold text-white'>3</span>
                                            </div>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 🌟 하단 메인 액션 버튼 (우측 정렬 및 화살표 추가) */}
            <div className='mt-12 flex justify-end'>
                <button
                    onClick={onGoImage}
                    disabled={!hasSelectedAny}
                    className={`group flex items-center justify-center gap-2 rounded-[14px] px-8 py-3.5 text-[15px] font-bold transition-all ${
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