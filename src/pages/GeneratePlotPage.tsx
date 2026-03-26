import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { PlotData } from '@/types/creation';
import { useCreationHooks } from '@/hooks/useCreationHooks';

const STORY_TAGS = ['스릴러', '코미디', '드라마', '애니메이션', '공포'];

export default function GeneratePlotPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasStartedAutoRef = useRef(false);

  // 전체 로딩 상태를 관리하는 State
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  const {
    createPhotoMutation,
    selectPhotoMutation,
    selectedScenes,
    autoGeneratePhotos,
  } = useCreationHooks();

  const plotData = location.state?.plotData as PlotData | undefined;

  // 1. 진입 시 모든 플롯 사진 자동 생성 (백그라운드)
  useEffect(() => {
    if (plotData && !hasStartedAutoRef.current) {
      autoGeneratePhotos(plotData);
      hasStartedAutoRef.current = true;
    } else if (!plotData) {
      navigate('/', { replace: true });
    }
  }, [plotData, autoGeneratePhotos, navigate]);

  // 2. 사진 생성이 진행 중인지 감지하여 로딩 상태 해제
  useEffect(() => {
    // 자동 생성이 시작되었고, mutation의 pending 상태가 끝났을 때 로딩 해제
    if (hasStartedAutoRef.current && !createPhotoMutation.isPending) {
      setIsGlobalLoading(false);
    }
  }, [createPhotoMutation.isPending]);

  if (!plotData) return null;

  // 3. 버튼 클릭 시 "사진 선택" API 연동 (UI 표기는 '이미지 생성'으로 통일)
  const handleSelectImage = (sceneNumber: number) => {
    if (!plotData || typeof plotData.creationId !== 'number') return;
    selectPhotoMutation.mutate({
      creationId: plotData.creationId,
      selections: [{ sceneNumber }],
    });
  };

  // 4. 전역 로딩 화면 (이미지 생성 중일 때 표시)
  if (isGlobalLoading) {
    return (
        <section className='flex min-h-[calc(100vh-88px)] flex-col items-center justify-center'>
          <div className='h-12 w-12 animate-spin rounded-full border-[4px] border-cyan-500/20 border-t-cyan-400'></div>
          <p className='mt-6 text-[15px] font-medium text-white/70'>
            스토리보드에 필요한 이미지를 생성하고 있습니다...
          </p>
        </section>
    );
  }

  return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        {/* 헤더 부분 */}
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h1 className='mb-2 text-[28px] font-bold text-white'>{plotData.title}</h1>
            <p className='text-[15px] text-white/50'>
              장르: <span className='text-white/80'>{plotData.genre}</span> | 분위기:{' '}
              <span className='text-white/80'>{plotData.mood}</span>
            </p>
          </div>
          <div className='flex gap-2'>
            {STORY_TAGS.map((tag, idx) => (
                <button
                    key={idx}
                    className={
                      idx === 0
                          ? 'rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-1.5 text-[12px] text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                          : 'rounded-full bg-white/5 px-4 py-1.5 text-[12px] text-white/70'
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
                <div key={scene.sceneNumber} className='flex gap-5'>
                  {/* 왼쪽 인덱스 박스 (첨부하신 이미지의 에메랄드 그라데이션 및 감정 텍스트 반영) */}
                  <div className='flex h-[110px] w-[140px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#60b5b1_0%,#439d98_100%)] shadow-md'>
                    <span className='text-[30px] font-bold leading-none text-white'>{scene.sceneNumber}</span>
                    <span className='mt-2 text-[13px] font-medium text-white/90'>{scene.emotion || '분위기'}</span>
                  </div>

                  {/* 정보 카드 (리스트 아이템 바디) */}
                  <div className='flex flex-1 items-center justify-between rounded-[16px] bg-[#0c1216] px-8 py-5 border border-white/5 shadow-sm'>
                    <div className='flex flex-1 items-center pr-8'>
                      {/* 시각 요소 태그 */}
                      <div className='flex w-[240px] shrink-0 gap-2'>
                        {scene.visualElements.split(',').slice(0, 2).map((tag, i) => (
                            <span
                                key={i}
                                className='rounded-full border border-white/5 bg-[#1c2429] px-3.5 py-1.5 text-[12px] text-white/70'
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

                    {/* 조건부 버튼 로직 */}
                    {isSelected ? (
                        /* 1) 완료된 플롯: '완료' 표시 (체크 아이콘 포함) */
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
                            onClick={() => handleSelectImage(scene.sceneNumber)}
                            disabled={isSelectPending}
                            className='flex h-[44px] w-[140px] cursor-pointer items-center justify-center rounded-[12px] bg-[#161e22] text-[12px] font-medium text-white/80 transition-all hover:bg-[#1f292e] disabled:cursor-not-allowed disabled:opacity-50'
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
            );
          })}
        </div>
      </section>
  );
}