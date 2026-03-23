import type { Scene } from '@/types/creation';

interface StoryboardSectionProps {
    items: Scene[];
    generatedImages: Record<number, string>;
    selectedScenes: Record<number, boolean>;
    isPhotoPending: boolean;
    pendingSceneNumber?: number;
    isSelectPending: boolean;
    onSelectImage: (num: number) => void;
    onGoImage: () => void;
}

export default function StoryboardSection({
                                              items,
                                              generatedImages,
                                              selectedScenes,
                                              isPhotoPending,
                                              pendingSceneNumber,
                                              isSelectPending,
                                              onSelectImage,
                                              onGoImage
                                          }: StoryboardSectionProps) {

    const hasSelectedAny = Object.keys(selectedScenes).length > 0;

    return (
        <section className='pb-16 pt-8 text-white'>
            <h2 className='text-[22px] font-bold mb-8'>스토리보드</h2>

            <div className='space-y-4'>
                {items.map((scene) => {
                    const isReady = !!generatedImages[scene.sceneNumber];
                    const isDone = !!selectedScenes[scene.sceneNumber];
                    const isGenerating = isPhotoPending && pendingSceneNumber === scene.sceneNumber;

                    return (
                        <div key={scene.sceneNumber} className='flex gap-5'>
                            {/* 왼쪽 번호 영역 */}
                            <div className={`flex h-[100px] w-[150px] shrink-0 flex-col items-center justify-center rounded-[22px] ${isDone ? 'bg-cyan-900/30 border border-cyan-500/20' : 'bg-gradient-to-b from-cyan-400 to-cyan-600'}`}>
                                <span className='text-[32px] font-bold'>{scene.sceneNumber}</span>
                                {isReady && !isDone && <span className='text-[10px] bg-black/30 px-2 py-0.5 rounded-full mt-1'>READY</span>}
                            </div>

                            {/* 정보 카드 */}
                            <div className='flex-1 flex items-center justify-between rounded-[22px] bg-white/5 px-8 py-5 border border-white/10 backdrop-blur-md'>
                                <div className='flex-1'>
                                    <p className='text-[12px] text-cyan-400 mb-1 uppercase font-bold'>{scene.emotion} · {scene.cameraAngle}</p>
                                    <p className='text-[16px] text-white/90 leading-relaxed'>{scene.sceneDescription}</p>
                                </div>

                                {/* 💡 버튼 조건부 렌더링 */}
                                {isDone ? (
                                    <div className='flex h-[46px] w-[130px] items-center justify-center rounded-[16px] bg-white/5 text-white/40 text-[13px] border border-white/5'>
                                        <span className='mr-1.5'>✓</span> 완료
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onSelectImage(scene.sceneNumber)}
                                        disabled={!isReady || isSelectPending}
                                        className={`flex h-[46px] w-[130px] items-center justify-center rounded-[16px] font-bold text-[13px] transition-all ${!isReady ? 'bg-white/5 opacity-30 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-600 shadow-lg'}`}
                                    >
                                        {isGenerating || !isReady ? '생성 중...' : '이미지 선택'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='mt-10 flex justify-end'>
                <button
                    onClick={onGoImage}
                    disabled={!hasSelectedAny}
                    className='px-8 py-3 bg-white text-black rounded-full font-bold disabled:opacity-30'
                >
                    이미지 확인하기
                </button>
            </div>
        </section>
    );
}