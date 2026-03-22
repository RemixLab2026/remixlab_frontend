import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className='flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-4 pb-24 pt-8'>
      <p className='mb-6 text-[18px] text-white/62'>
        아이디어만으로 시작하는 <span className='font-semibold text-white'>AI기반 창작 실험실</span>
      </p>

      {/* 텍스트 → 이미지 변경 */}
      <div
        className='mb-2'
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.38) 5%, rgba(255,255,255,1) 25%)',
          maskImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.38) 5%, rgba(255,255,255,1) 25%)',
        }}
      >
        <img src='/big.png' alt='Remixlab' className='w-[750px] max-w-full opacity-95' />
      </div>

      <div className='mt-10 flex w-full max-w-[850px] items-center gap-5 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-7 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md'>
        <span className='text-[34px] text-white/60'>＋</span>
        <input
          placeholder='당신의 아이디어를 입력해주세요.'
          className='w-full bg-transparent text-[18px] text-white outline-none placeholder:text-white/28'
        />
      </div>

      <div className='mt-6 flex w-full max-w-[850px] gap-3'>
        <button
          onClick={() => navigate('/generate/plot')}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black'
        >
          ✦ 플롯 생성
        </button>

        <button
          onClick={() => navigate('/generate/image')}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black'
        >
          ✦ 이미지 생성
        </button>

        <button
          onClick={() => navigate('/generate/video')}
          className='flex-1 rounded-[12px] bg-[linear-gradient(90deg,#44dde4_0%,#2bd2d7_100%)] py-3.5 text-[13px] font-semibold text-black'
        >
          ✦ 영상 생성
        </button>
      </div>
    </section>
  );
}
