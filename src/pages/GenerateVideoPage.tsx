import { useLocation, useNavigate } from 'react-router-dom';

interface GenerateVideoPageState {
  videoId?: number;
  soraId?: string;
  message?: string;
  prompt?: string;
}

export default function GenerateVideoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as GenerateVideoPageState) || {};

  const { videoId, soraId, message, prompt } = state;

  // TODO: 추후 실제 유저 레벨 값으로 교체
  const userLevel = 3;

  // 생성 결과가 없고, 레벨도 부족할 때만 잠금 화면 표시
  if (!videoId && userLevel < 3) {
    return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        <div className='relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

          <div className='relative mb-5 text-[72px] text-white/68'>🔒</div>
          <p className='relative mb-2 text-[28px] font-semibold text-white'>Level 3에서 해금</p>
          <p className='relative mb-8 text-[15px] text-white/42'>영상 생성 기능은 Level 3부터 사용할 수 있습니다</p>

          <button
            onClick={() => navigate('/quest')}
            className='relative h-[44px] min-w-[132px] rounded-[12px] bg-[linear-gradient(180deg,rgba(14,89,95,0.96),rgba(9,58,62,0.96))] px-5 text-[13px] font-medium text-cyan-200 shadow-[0_10px_22px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:opacity-90'
          >
            <span className='absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_38%)]' />
            <span className='relative'>퀘스트 수행하기</span>
          </button>
        </div>
      </section>
    );
  }

  // 생성 결과가 없는 경우
  if (!videoId) {
    return (
      <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
        <div className='relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

          <div className='relative mb-5 text-[72px] text-white/30'>🎬</div>
          <p className='relative mb-2 text-[28px] font-semibold text-white'>생성된 영상이 없습니다</p>
          <p className='relative mb-8 text-[15px] text-white/42'>홈에서 프롬프트를 입력하고 영상 생성을 진행해주세요</p>

          <button
            onClick={() => navigate('/')}
            className='min-w-[138px] rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_18px_rgba(55,220,225,0.18)] transition hover:opacity-90'
          >
            홈으로 이동
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      <div className='relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-10 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

        <div className='relative mb-12 text-center'>
          <h2 className='mb-3 text-[26px] font-semibold text-white'>콘텐츠가 완성되었습니다!</h2>
          <p className='text-[15px] text-white/40'>비디오 생성 요청이 완료되었습니다.</p>
        </div>

        <div className='relative mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
          {/* 비디오 썸네일/플레이스홀더 */}
          <div className='rounded-[18px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_42%,rgba(0,0,0,0.32)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'>
            <div className='flex h-[320px] items-center justify-center rounded-[16px] border border-white/10 bg-black/20'>
              <div className='text-center'>
                <div className='mb-3 text-[44px] text-white/25'>▶</div>
                <p className='text-[18px] font-medium text-white'>영상 생성 요청 완료</p>
                <p className='mt-2 text-sm text-white/50'>상태 조회 API 연동 전 단계입니다.</p>
              </div>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className='rounded-[18px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'>
            <p className='mb-2 text-[12px] font-semibold tracking-[0.18em] text-cyan-300'>PROMPT</p>
            <div className='rounded-[14px] border border-white/10 bg-white/[0.03] p-4'>
              <p className='text-[15px] leading-7 text-white/88'>{prompt || '입력된 프롬프트가 없습니다.'}</p>
            </div>

            <div className='mt-6'>
              <p className='mb-3 text-[12px] font-semibold tracking-[0.18em] text-cyan-300'>RESULT</p>
              <div className='space-y-3 rounded-[14px] border border-white/10 bg-white/[0.03] p-4 text-sm text-white/72'>
                <div className='flex items-center justify-between'>
                  <span>videoId</span>
                  <span className='font-medium text-white'>{videoId}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>soraId</span>
                  <span className='max-w-[220px] truncate font-medium text-white'>{soraId || '-'}</span>
                </div>
                <div className='flex items-center justify-between gap-3'>
                  <span>message</span>
                  <span className='text-right font-medium text-white'>{message || '-'}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>status</span>
                  <span className='font-medium text-cyan-300'>requested</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative flex items-center justify-center gap-3'>
          <button
            onClick={() => navigate('/')}
            className='min-w-[118px] rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.045))] px-5 py-2.5 text-[13px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:bg-white/10'
          >
            다시 생성
          </button>

          <button className='min-w-[138px] rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_18px_rgba(55,220,225,0.18)] transition hover:opacity-90'>
            프로젝트 저장
          </button>
        </div>
      </div>
    </section>
  );
}
