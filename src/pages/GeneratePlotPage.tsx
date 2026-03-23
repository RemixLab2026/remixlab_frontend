import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { PlotData, Scene } from '@/types/creation';
import { useCreationHooks } from '@/hooks/useCreationHooks';

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

export default function GeneratePlotPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 훅에서 이미지 데이터와 생성 Mutation을 가져옴
  const { createPhotoMutation, generatedImages } = useCreationHooks();

  const plotData = location.state?.plotData as PlotData | undefined;

  useEffect(() => {
    if (!plotData) navigate('/', { replace: true });
  }, [plotData, navigate]);

  if (!plotData) return null;

  const handleGenerateImage = (targetScene: Scene) => {
    const { creationId, ...restOfPlotData } = plotData;
    const payload = {
      ...restOfPlotData,
      scenes: [targetScene]
    };
    createPhotoMutation.mutate(payload);
  };

  return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        {/* 헤더 부분 */}
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h1 className='text-[28px] font-bold text-white mb-2'>{plotData.title}</h1>
            <p className='text-[15px] text-white/50'>
              장르: <span className='text-white/80'>{plotData.genre}</span> |
              분위기: <span className='text-white/80'>{plotData.mood}</span>
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            {STORY_TAGS.map((tag, index) => (
                <button key={tag} className={index === 0 ? 'rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] px-3.5 py-1.5 text-[11px] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_12px_rgba(34,211,238,0.08)]' : 'rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-3.5 py-1.5 text-[11px] text-white/72'}>
                  {tag}
                </button>
            ))}
          </div>
        </div>

        {/* 스토리보드 리스트 */}
        <div className='space-y-4'>
          {plotData.scenes.map((scene) => {
            // 💡 상태값(generatedImages)에 데이터가 있는지 확인
            const isSaved = !!generatedImages[scene.sceneNumber];
            const isGenerating = createPhotoMutation.isPending &&
                createPhotoMutation.variables?.scenes[0].sceneNumber === scene.sceneNumber;

            return (
                <div key={scene.sceneNumber} className='flex gap-5'>
                  {/* 왼쪽: 장면 번호 영역 (이미지 렌더링 안 함) */}
                  <div className='relative flex h-[100px] w-[150px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#3ee0e6_0%,#25c4cb_58%,#1da8af_100%)] text-white shadow-[0_12px_28px_rgba(24,196,203,0.16)]'>
                    <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.22),transparent_34%)]' />
                    <span className='relative text-[32px] font-bold leading-none'>{scene.sceneNumber}</span>
                    {isSaved && !isGenerating && (
                        <span className='relative mt-1 text-[9px] font-bold bg-black/20 px-1.5 py-0.5 rounded uppercase tracking-tighter'>Data Ready</span>
                    )}
                  </div>

                  {/* 오른쪽: 상세 카드 */}
                  <div className='relative flex min-h-[100px] flex-1 items-center justify-between overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-8 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
                    <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.12),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%)]' />

                    <div className='relative flex min-w-0 flex-1 items-center gap-8'>
                      <div className='flex max-w-[350px] flex-wrap gap-2'>
                        {scene.visualElements.split(',').map((tag, idx) => (
                            <span key={`${tag}-${idx}`} className='rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.11),rgba(0,224,255,0.04))] px-3 py-[4px] text-[11px] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>{tag.trim()}</span>
                        ))}
                      </div>
                      <div className='h-[44px] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.10),transparent)]' />
                      <div className='flex-1'>
                        <p className='text-[12px] text-cyan-500/80 mb-1 font-semibold uppercase'>{scene.cameraAngle} · {scene.motion}</p>
                        <p className='text-[16px] leading-relaxed text-white/90 font-medium'>{scene.sceneDescription}</p>
                      </div>
                    </div>

                    {/* 이미지 생성 버튼 */}
                    <button
                        onClick={() => handleGenerateImage(scene)}
                        disabled={isGenerating}
                        className='relative ml-6 flex h-[46px] w-[134px] items-center justify-center overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] !text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:opacity-90 active:scale-95 disabled:opacity-50'
                    >
                      <span className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%)]' />
                      <span className='relative'>
                    {isGenerating ? '생성 중...' : isSaved ? '다시 생성' : '이미지 생성'}
                  </span>
                      {!isGenerating && !isSaved && (
                          <span className='relative ml-1.5 flex h-[20px] items-center rounded-full bg-white/10 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'>
                      <img src='/token.png' alt='토큰' className='h-[11px] w-[11px] object-contain opacity-90' />
                      <span className='ml-1 text-[9px] font-bold'>3</span>
                    </span>
                      )}
                      {isSaved && !isGenerating && (
                          <img src='/success.png' className='ml-2 h-3 w-3 relative' alt="done" />
                      )}
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
      </section>
  );
}