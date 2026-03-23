import StepNavigation from '@/components/create/StepNavigation';

interface CompleteSectionProps {
  showStepNav: boolean;
  videoUrl?: string;
  isLoading?: boolean;
  sceneCount?: number;
}

export default function CompleteSection({ showStepNav, videoUrl, isLoading, sceneCount = 5 }: CompleteSectionProps) {
  return (
    <section className='pb-16 pt-8'>
      {showStepNav && <StepNavigation currentStep='complete' />}

      <div className='relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-10 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <div className='relative mb-12 text-center'>
          <h2 className='mb-3 text-[26px] font-semibold text-white'>
            {isLoading ? '영상 생성 중입니다...' : '콘텐츠가 완성되었습니다!'}
          </h2>
          <p className='text-[15px] text-white/40'>총 {sceneCount}개의 장면으로 구성된 콘텐츠가 생성되었습니다.</p>
        </div>

        <div className='relative mb-12 flex justify-center'>
          {isLoading ? (
            <div className='flex min-h-[320px] w-full max-w-[760px] items-center justify-center rounded-[18px] bg-white/5'>
              <div className='flex flex-col items-center gap-4'>
                <div className='h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400' />
                <p className='text-white/60'>AI가 영상을 만들고 있어요...</p>
              </div>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} controls className='w-full max-w-[760px] rounded-[18px] bg-black' />
          ) : (
            <div className='flex min-h-[320px] w-full max-w-[760px] items-center justify-center rounded-[18px] bg-white/5 text-white/40'>
              영상이 없습니다.
            </div>
          )}
        </div>

        <div className='relative flex items-center justify-center gap-3'>
          <a
            href={videoUrl}
            download
            className='min-w-[118px] rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.045))] px-5 py-2.5 text-center text-[13px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:bg-white/10'
          >
            다운로드
          </a>

          <button className='min-w-[138px] rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_18px_rgba(55,220,225,0.18)] transition hover:opacity-90'>
            프로젝트 저장
          </button>
        </div>
      </div>
    </section>
  );
}
