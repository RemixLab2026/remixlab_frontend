import { useLocation, useNavigate } from 'react-router-dom';
import type { PlotData } from '@/types/creation';

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

interface GenerateImagePageState {
  plotData?: PlotData;
  generatedImages?: Record<number, string>;
}

export default function GenerateImagePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as GenerateImagePageState) || {};

  const { plotData, generatedImages } = state;

  return (
    <section className='mx-auto max-w-[1280px] px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10'>
      {/* 상단 헤더 및 태그 필터 */}
      <div className='mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between'>
        <h2 className='tracking-tight text-[18px] font-bold text-white md:text-[22px]'>이미지 미리보기</h2>

        <div className='flex w-full gap-2 overflow-x-auto pb-1 md:w-auto md:justify-end'>
          {IMAGE_TAGS.map((tag, index) => (
            <button
              key={tag}
              className={
                index === 0
                  ? 'cursor-pointer whitespace-nowrap rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-[11px] text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.1)] md:px-4 md:text-[12px]'
                  : 'cursor-pointer whitespace-nowrap rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-white/50 transition-colors hover:text-white md:px-4 md:text-[12px]'
              }
              type='button'
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {!plotData ? (
        <div className='flex min-h-[320px] flex-col items-center justify-center rounded-[20px] border border-white/5 bg-white/[0.02] px-6 text-center backdrop-blur-xl md:min-h-[400px] md:rounded-[24px]'>
          <p className='text-sm text-white/40 md:text-base'>표시할 이미지 데이터가 없습니다.</p>
          <button onClick={() => navigate('/')} className='mt-4 cursor-pointer text-sm text-cyan-400 hover:underline'>
            홈으로 돌아가기
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
          {plotData.scenes.map((scene) => {
            const currentImageUrl = generatedImages?.[scene.sceneNumber];

            return (
              <div
                key={scene.sceneNumber}
                className='group relative flex cursor-pointer flex-col rounded-[20px] border border-white/10 bg-[#0c1216] p-3 shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-[#11181d] md:rounded-[24px] md:p-4 md:hover:scale-[1.02]'
              >
                {/* 카드 상단 이미지 영역 */}
                <div className='relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#161b21] md:rounded-[18px]'>
                  {currentImageUrl ? (
                    <img
                      src={currentImageUrl}
                      alt={`장면 ${scene.sceneNumber}`}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-white/[0.03]'>
                      <svg className='h-8 w-8 text-white/10 md:h-10 md:w-10' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z' />
                      </svg>
                    </div>
                  )}

                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                </div>

                {/* 카드 하단 텍스트 영역 */}
                <div className='mt-4 flex items-start px-1 md:mt-5'>
                  <p className='text-[14px] leading-relaxed md:text-[15px]'>
                    <span className='mr-1.5 font-bold text-cyan-400'>장면 {scene.sceneNumber}.</span>
                    <span className='line-clamp-2 font-medium text-white/90'>{scene.sceneDescription}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 하단 액션 버튼 */}
      {plotData && (
        <div className='mt-10 flex justify-center md:mt-12'>
          <button
            onClick={() => navigate('/')}
            className='w-full cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[13px] font-semibold text-white/80 transition-all hover:bg-white/10 md:w-auto md:px-10 md:py-3.5 md:text-[14px]'
          >
            다시 생성하기
          </button>
        </div>
      )}
    </section>
  );
}
