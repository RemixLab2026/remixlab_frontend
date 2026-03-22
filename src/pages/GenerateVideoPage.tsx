import { useNavigate } from 'react-router-dom';

export default function GenerateVideoPage() {
  const navigate = useNavigate();
  const userLevel = 1;

  if (userLevel < 3) {
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

  return (
    <section className='mx-auto max-w-[1280px] px-8 pb-16 pt-10'>
      <div className='relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))] px-10 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_14px_34px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(35,209,215,0.10),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.03),transparent_28%),linear-gradient(90deg,rgba(255,255,255,0.008),transparent_28%,rgba(255,255,255,0.018)_62%,rgba(0,0,0,0.06)_100%)]' />

        <div className='relative mb-12 text-center'>
          <h2 className='mb-3 text-[26px] font-semibold text-white'>콘텐츠가 완성되었습니다!</h2>
          <p className='text-[15px] text-white/40'>총 5개의 장면으로 구성된 콘텐츠가 생성되었습니다.</p>
        </div>

        <div className='relative mb-12 grid grid-cols-5 gap-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='flex h-[92px] items-center justify-center rounded-[16px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0.03)_42%,rgba(0,0,0,0.32)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-[12px] text-white/35'>
                ▶
              </div>
            </div>
          ))}
        </div>

        <div className='relative flex items-center justify-center gap-3'>
          <button className='min-w-[118px] rounded-[12px] bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.045))] px-5 py-2.5 text-[13px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:bg-white/10'>
            다운로드
          </button>

          <button className='min-w-[138px] rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_18px_rgba(55,220,225,0.18)] transition hover:opacity-90'>
            프로젝트 저장
          </button>
        </div>
      </div>
    </section>
  );
}
