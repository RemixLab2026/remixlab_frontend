import ActionButton from '@/components/create/ActionButton';
import StepNavigation from '@/components/create/StepNavigation';
import type { Scene } from '@/types/creation';

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

interface ImagePreviewSectionProps {
    items: Scene[];
    generatedImages: Record<number, string>;
    showStepNav: boolean;
    onGoVideo?: () => void;
    // canGoVideo는 이제 내부에서 계산하거나 외부에서 주입받을 수 있습니다.
    canGoVideo?: boolean;
}

export default function ImagePreviewSection({
                                                items,
                                                generatedImages,
                                                showStepNav,
                                                onGoVideo,
                                                canGoVideo: externalCanGoVideo,
                                            }: ImagePreviewSectionProps) {

    // 💡 모든 장면의 이미지가 생성되었는지 확인 (내부 판정 로직)
    // 만약 "하나라도 생성되면 가능"하게 하려면 items.some으로 바꾸세요.
    const isAllImagesReady = items.length > 0 && items.every((scene) => !!generatedImages[scene.sceneNumber]);

    // 외부에서 넘겨준 값이 있으면 그것을 쓰고, 없으면 내부 판정값을 사용합니다.
    const isButtonEnabled = externalCanGoVideo ?? isAllImagesReady;

    return (
        <section className='pb-16 pt-8'>
            {showStepNav && <StepNavigation currentStep='image' />}

            <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-[20px] font-semibold text-white'>이미지 미리보기</h2>

                <div className='flex flex-wrap gap-2'>
                    {IMAGE_TAGS.map((tag, index) => (
                        <button
                            key={tag}
                            className={cn(
                                'rounded-full px-3.5 py-1.5 text-[11px] transition-all',
                                index === 0
                                    ? 'bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_12px_rgba(34,211,238,0.08)]'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-3 gap-6'>
                {items.map((scene) => {
                    const imageUrl = generatedImages[scene.sceneNumber];
                    const isGenerated = !!imageUrl;

                    return (
                        <div
                            key={scene.sceneNumber}
                            className='relative overflow-hidden rounded-[22px] bg-white/[0.03] p-3 shadow-[0_14px_34px_rgba(0,0,0,0.24)] border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/10'
                        >
                            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.08),transparent_24%)]' />

                            {/* 이미지 영역 */}
                            <div className='relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-black/20'>
                                {isGenerated ? (
                                    <img
                                        src={imageUrl}
                                        alt={`Scene ${scene.sceneNumber}`}
                                        className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
                                    />
                                ) : (
                                    <div className='flex flex-col items-center gap-2'>
                                        <div className='h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400' />
                                        <span className='text-[10px] text-white/20 uppercase tracking-widest'>Generating Scene {scene.sceneNumber}</span>
                                    </div>
                                )}
                            </div>

                            {/* 장면 설명 */}
                            <div className='relative px-2 py-4'>
                                <p className='text-[14px] leading-relaxed'>
                                    <span className='font-bold text-cyan-300 mr-1.5'># {scene.sceneNumber}</span>
                                    <span className={cn(
                                        'transition-colors duration-300',
                                        isGenerated ? 'text-white/90' : 'text-white/30'
                                    )}>
                    {scene.sceneDescription}
                  </span>
                                </p>

                                <div className='mt-3 flex flex-wrap gap-2 opacity-50'>
                                    {scene.visualElements.split(',').slice(0, 2).map((element, idx) => (
                                        <span key={idx} className='text-[10px] bg-white/5 px-2 py-0.5 rounded-md text-white/70'>
                           {element.trim()}
                       </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {onGoVideo && (
                <div className='mt-10 flex justify-end'>
                    <ActionButton
                        label='영상 제작하기'
                        disabled={!isButtonEnabled} // 💡 모든 이미지가 준비되어야 활성화
                        onClick={onGoVideo}
                    />
                </div>
            )}
        </section>
    );
}