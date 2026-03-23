import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import type { PlotData } from '@/types/creation';
import { useCreationHooks } from '@/hooks/useCreationHooks';

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

export default function GeneratePlotPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasStartedAutoRef = useRef(false); // 자동 생성 중복 실행 방지

  const {
    createPhotoMutation,
    selectPhotoMutation,
    generatedImages,
    selectedScenes,
    autoGeneratePhotos
  } = useCreationHooks();

  const plotData = location.state?.plotData as PlotData | undefined;

  // 💡 1. 진입 시 자동으로 모든 플롯의 AI 사진 생성 요청
  useEffect(() => {
    if (plotData && !hasStartedAutoRef.current) {
      autoGeneratePhotos(plotData);
      hasStartedAutoRef.current = true;
    } else if (!plotData) {
      navigate('/', { replace: true });
    }
  }, [plotData, autoGeneratePhotos, navigate]);

  if (!plotData) return null;

  // 💡 2. 버튼 클릭 시 "사진 선택하기" API만 실행
  const handleSelectImage = (sceneNumber: number) => {
    if (!plotData || typeof plotData.creationId !== 'number') return;

    // 이미 생성되어 보관된 이미지를 서버에 "선택" 확정 요청
    selectPhotoMutation.mutate({
      creationId: plotData.creationId,
      selections: [{ sceneNumber }]
    });
  };

  return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h1 className='text-[28px] font-bold text-white mb-2'>{plotData.title}</h1>
            <p className='text-[15px] text-white/50'>
              장르: <span className='text-white/80'>{plotData.genre}</span> | 분위기: <span className='text-white/80'>{plotData.mood}</span>
            </p>
          </div>
          <div className='flex gap-2'>
            {STORY_TAGS.map((tag, idx) => (
                <button key={idx} className={idx === 0 ? 'rounded-full bg-cyan-500/10 px-3.5 py-1.5 text-[11px] text-cyan-300 border border-cyan-500/50' : 'rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] text-white/70'}>
                  {tag}
                </button>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          {plotData.scenes.map((scene) => {
            const isImageReady = !!generatedImages[scene.sceneNumber];
            const isSelected = !!selectedScenes[scene.sceneNumber];
            const isPhotoPending = createPhotoMutation.isPending && createPhotoMutation.variables?.scenes[0].sceneNumber === scene.sceneNumber;
            const isSelectPending = selectPhotoMutation.isPending && selectPhotoMutation.variables?.selections[0].sceneNumber === scene.sceneNumber;

            return (
                <div key={scene.sceneNumber} className='flex gap-5'>
                  {/* 왼쪽 인덱스 박스 */}
                  <div className='relative flex h-[100px] w-[150px] shrink-0 flex-col items-center justify-center rounded-[22px] bg-gradient-to-b from-[#3ee0e6] to-[#1da8af] text-white'>
                    <span className='text-[32px] font-bold'>{scene.sceneNumber}</span>
                    {isImageReady && <span className='text-[9px] font-bold bg-black/20 px-1.5 py-0.5 rounded mt-1'>READY</span>}
                  </div>

                  {/* 정보 카드 */}
                  <div className='relative flex min-h-[100px] flex-1 items-center justify-between rounded-[22px] bg-white/5 px-8 py-5 backdrop-blur-md border border-white/10'>
                    <div className='flex-1 pr-8'>
                      <div className='flex gap-2 mb-3'>
                        {scene.visualElements.split(',').map((tag, i) => (
                            <span key={i} className='rounded-full bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-300'>{tag.trim()}</span>
                        ))}
                      </div>
                      <p className='text-[16px] text-white/90'>{scene.sceneDescription}</p>
                    </div>

                    {/* 💡 버튼: 자동 생성된 사진을 DB에 "선택" 처리 */}
                    <button
                        onClick={() => handleSelectImage(scene.sceneNumber)}
                        disabled={!isImageReady || isSelected || isSelectPending}
                        className='relative flex h-[46px] w-[134px] items-center justify-center rounded-[16px] bg-[#0e595f] text-[13px] font-semibold text-white transition hover:opacity-90 disabled:opacity-30'
                    >
                      {isSelectPending ? '등록 중...' :
                          isSelected ? '선택 완료' :
                              isPhotoPending || !isImageReady ? '생성 대기...' : '이미지 선택'}

                      {isSelected && <img src='/success.png' className='ml-2 h-3.5 w-3.5' alt="done" />}
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
      </section>
  );
}