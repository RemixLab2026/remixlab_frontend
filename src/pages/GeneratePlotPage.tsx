import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { PlotData } from '@/types/creation';
import { useCreationHooks } from '@/hooks/useCreationHooks';

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

export default function GeneratePlotPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasStartedAutoRef = useRef(false);

  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  const { createPhotoMutation, selectPhotoMutation, selectedScenes, autoGeneratePhotos } = useCreationHooks();

  const plotData = location.state?.plotData as PlotData | undefined;

  useEffect(() => {
    if (plotData && !hasStartedAutoRef.current) {
      autoGeneratePhotos(plotData);
      hasStartedAutoRef.current = true;
    } else if (!plotData) {
      navigate('/', { replace: true });
    }
  }, [plotData, autoGeneratePhotos, navigate]);

  useEffect(() => {
    if (hasStartedAutoRef.current && !createPhotoMutation.isPending) {
      setIsGlobalLoading(false);
    }
  }, [createPhotoMutation.isPending]);

  if (!plotData) return null;

  const handleSelectImage = (sceneNumber: number) => {
    if (!plotData || typeof plotData.creationId !== 'number') return;
    selectPhotoMutation.mutate({
      creationId: plotData.creationId,
      selections: [{ sceneNumber }],
    });
  };

  if (isGlobalLoading) {
    return (
      <section className='flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-6 text-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-[4px] border-cyan-500/20 border-t-cyan-400' />
        <p className='mt-6 text-[14px] font-medium text-white/70 md:text-[15px]'>
          스토리보드에 필요한 이미지를 생성하고 있습니다...
        </p>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-[1280px] px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10'>
      {/* 헤더 */}
      <div className='mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between'>
        <div className='min-w-0'>
          <h1 className='mb-2 break-words text-[22px] font-bold text-white md:text-[28px]'>{plotData.title}</h1>
          <p className='text-[13px] leading-relaxed text-white/50 md:text-[15px]'>
            장르: <span className='text-white/80'>{plotData.genre}</span> | 분위기:{' '}
            <span className='text-white/80'>{plotData.mood}</span>
          </p>
        </div>

        <div className='flex w-full gap-2 overflow-x-auto pb-1 md:w-auto md:justify-end'>
          {STORY_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type='button'
              className={
                idx === 0
                  ? 'whitespace-nowrap rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-[11px] text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.1)] md:px-4 md:text-[12px]'
                  : 'whitespace-nowrap rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-white/70 md:px-4 md:text-[12px]'
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 스토리보드 리스트 */}
      <div className='space-y-4'>
        {plotData.scenes.map((scene) => {
          const isSelected = !!selectedScenes[scene.sceneNumber];
          const isSelectPending =
            selectPhotoMutation.isPending &&
            selectPhotoMutation.variables?.selections[0].sceneNumber === scene.sceneNumber;

          return (
            <div key={scene.sceneNumber} className='flex flex-col gap-3 md:flex-row md:gap-5'>
              {/* 왼쪽 인덱스 박스 */}
              <div className='flex h-[96px] w-full shrink-0 flex-row items-center justify-center gap-3 rounded-[16px] bg-[linear-gradient(180deg,#60b5b1_0%,#439d98_100%)] px-4 shadow-md md:h-[110px] md:w-[140px] md:flex-col md:gap-0'>
                <span className='text-[28px] font-bold leading-none text-white md:text-[30px]'>
                  {scene.sceneNumber}
                </span>
                <span className='text-[13px] font-medium text-white/90 md:mt-2'>{scene.emotion || '분위기'}</span>
              </div>

              {/* 정보 카드 */}
              <div className='flex flex-1 flex-col gap-4 rounded-[16px] border border-white/5 bg-[#0c1216] px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-8 md:py-5'>
                {/* 텍스트 영역 */}
                <div className='flex flex-1 flex-col gap-4 md:flex-row md:items-center md:pr-8'>
                  {/* 태그 */}
                  <div className='flex w-full flex-wrap gap-2 md:w-[240px] md:shrink-0'>
                    {scene.visualElements
                      .split(',')
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className='rounded-full border border-white/5 bg-[#1c2429] px-3 py-1.5 text-[11px] text-white/70 md:px-3.5 md:text-[12px]'
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>

                  {/* 구분선 */}
                  <div className='hidden h-8 w-px bg-white/10 md:mx-6 md:block' />

                  {/* 설명 */}
                  <p className='text-[14px] font-medium leading-relaxed text-white/90 md:text-[15px]'>
                    {scene.sceneDescription}
                  </p>
                </div>

                {/* 버튼 영역 */}
                <div className='flex w-full md:w-auto md:justify-end'>
                  {isSelected ? (
                    <div className='flex h-[44px] w-full items-center justify-center rounded-[12px] bg-[#22282c] text-[13px] font-medium text-white/80 md:w-[110px]'>
                      <svg className='mr-1.5 h-4 w-4 opacity-70' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M5 13l4 4L19 7' />
                      </svg>
                      <span className='text-[11px]'>완료</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSelectImage(scene.sceneNumber)}
                      disabled={isSelectPending}
                      className='flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#161e22] text-[12px] font-medium text-white/80 transition-all hover:bg-[#1f292e] disabled:cursor-not-allowed disabled:opacity-50 md:w-[140px]'
                    >
                      <span className='text-[11px]'>{isSelectPending ? '처리 중...' : '이미지 생성'}</span>

                      {!isSelectPending && (
                        <div className='ml-2 flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5'>
                          <img src='/token.png' alt='토큰' className='h-[11px] w-[11px] opacity-90' />
                          <span className='text-[11px] font-semibold text-white'>3</span>
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
    </section>
  );
}
