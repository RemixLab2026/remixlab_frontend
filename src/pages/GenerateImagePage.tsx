import { useLocation, useNavigate } from 'react-router-dom';

const IMAGE_TAGS = ['애니메이션', '시네마틱', '3D', '어린이', '캐릭터'];

interface GenerateImagePageState {
  imageUrl?: string;
  prompt?: string;
}

export default function GenerateImagePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as GenerateImagePageState) || {};

  const { imageUrl, prompt } = state;

  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>이미지 생성 결과</h2>

        <div className='flex flex-wrap gap-2'>
          {IMAGE_TAGS.map((tag, index) => (
            <button
              key={tag}
              className={
                index === 0
                  ? 'rounded-full bg-[linear-gradient(180deg,rgba(0,224,255,0.14),rgba(0,224,255,0.05))] px-3.5 py-1.5 text-[11px] text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.55)_inset,0_0_12px_rgba(34,211,238,0.08)]'
                  : 'rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-3.5 py-1.5 text-[11px] text-white/72'
              }
              type='button'
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {!imageUrl ? (
        <div className='flex min-h-[420px] flex-col items-center justify-center rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
          <div className='mb-4 text-[40px] text-white/20'>🖼️</div>
          <p className='mb-2 text-[18px] font-medium text-white'>생성된 이미지가 없습니다.</p>
          <p className='mb-6 text-sm text-white/55'>홈에서 프롬프트를 입력하고 이미지 생성을 진행해주세요.</p>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] px-5 py-3 text-[13px] font-semibold text-black transition hover:opacity-90'
          >
            홈으로 이동
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
          {/* 이미지 영역 */}
          <div className='relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

            <div className='relative overflow-hidden rounded-[14px]'>
              <img src={imageUrl} alt='AI 생성 이미지' className='h-[520px] w-full rounded-[14px] object-cover' />
            </div>
          </div>

          {/* 정보 영역 */}
          <div className='relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

            <div className='relative'>
              <p className='mb-2 text-[12px] font-semibold tracking-[0.18em] text-cyan-300'>PROMPT</p>
              <div className='rounded-[14px] border border-white/10 bg-white/[0.03] p-4'>
                <p className='text-[15px] leading-7 text-white/88'>{prompt || '입력된 프롬프트가 없습니다.'}</p>
              </div>

              <div className='mt-6'>
                <p className='mb-3 text-[12px] font-semibold tracking-[0.18em] text-cyan-300'>RESULT</p>
                <div className='space-y-3 rounded-[14px] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/72'>
                  <div className='flex items-center justify-between'>
                    <span>생성 상태</span>
                    <span className='font-medium text-white'>완료</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>출력 타입</span>
                    <span className='font-medium text-white'>AI 이미지</span>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex gap-3'>
                <button
                  type='button'
                  onClick={() => navigate('/')}
                  className='flex-1 rounded-[12px] border border-white/10 bg-white/5 py-3 text-[13px] font-semibold text-white transition hover:bg-white/10'
                >
                  다시 생성하기
                </button>

                <a
                  href={imageUrl}
                  download
                  className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3 text-center text-[13px] font-semibold text-black transition hover:opacity-90'
                >
                  이미지 다운로드
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
