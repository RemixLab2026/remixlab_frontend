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

    // GeneratePlotPage에서 전달받은 데이터들
    const { plotData, generatedImages } = state;

    return (
        <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
            {/* 상단 헤더 및 태그 필터 */}
            <div className='mb-8 flex items-center justify-between'>
                <h2 className='text-[22px] font-bold text-white tracking-tight'>이미지 미리보기</h2>

                <div className='flex gap-2'>
                    {IMAGE_TAGS.map((tag, index) => (
                        <button
                            key={tag}
                            className={
                                index === 0
                                    ? 'cursor-pointer rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-1.5 text-[12px] text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.1)]'
                                    : 'cursor-pointer rounded-full bg-white/5 px-4 py-1.5 text-[12px] text-white/50 hover:text-white transition-colors'
                            }
                            type='button'
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {!plotData ? (
                /* 데이터가 없을 때 표시할 빈 화면 */
                <div className='flex min-h-[400px] flex-col items-center justify-center rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl'>
                    <p className='text-white/40'>표시할 이미지 데이터가 없습니다.</p>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-4 text-cyan-400 text-sm hover:underline cursor-pointer'
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            ) : (
                /* 이미지와 동일한 3열 격자 레이아웃 (반응형 적용) */
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {plotData.scenes.map((scene) => {
                        const currentImageUrl = generatedImages?.[scene.sceneNumber];

                        return (
                            <div
                                key={scene.sceneNumber}
                                className='group relative flex cursor-pointer flex-col rounded-[24px] border border-white/10 bg-[#0c1216] p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-[#11181d]'
                            >
                                {/* 카드 상단 이미지 영역 */}
                                <div className='relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#161b21]'>
                                    {currentImageUrl ? (
                                        <img
                                            src={currentImageUrl}
                                            alt={`장면 ${scene.sceneNumber}`}
                                            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                        />
                                    ) : (
                                        /* 이미지 로딩 실패나 없을 때 아이콘 표시 */
                                        <div className='flex h-full w-full items-center justify-center bg-white/[0.03]'>
                                            <svg className="h-10 w-10 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                                            </svg>
                                        </div>
                                    )}
                                    {/* 이미지 위 오버레이 */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
                                </div>

                                {/* 카드 하단 텍스트 영역 */}
                                <div className='mt-5 flex items-start px-1'>
                                    <p className='text-[15px] leading-relaxed'>
                                        <span className='mr-1.5 font-bold text-cyan-400'>장면 {scene.sceneNumber}.</span>
                                        <span className='font-medium text-white/90 line-clamp-2'>
                      {scene.sceneDescription}
                    </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 하단 액션 버튼 */}
            {plotData && (
                <div className='mt-12 flex justify-center'>
                    <button
                        onClick={() => navigate('/')}
                        className='cursor-pointer rounded-full border border-white/10 bg-white/5 px-10 py-3.5 text-[14px] font-semibold text-white/80 transition-all hover:bg-white/10'
                    >
                        다시 생성하기
                    </button>
                </div>
            )}
        </section>
    );
}