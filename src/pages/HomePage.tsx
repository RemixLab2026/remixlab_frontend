import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const userLevel = 1;

  const handleVideo = () => {
    if (userLevel < 3) {
      navigate('/locked');
    } else {
      navigate('/video');
    }
  };

  return (
    <section className='flex min-h-[calc(100vh-84px)] flex-col items-center justify-center px-6 pb-24 pt-12'>
      <p className='mb-6 text-[18px] text-white/62'>
        아이디어만으로 시작하는 <span className='text-white'>AI 기반 창작 실험실</span>
      </p>
      <h2
        className='text-center text-[128px] font-semibold tracking-[-0.075em] text-white'
        style={{
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,1) 40%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,1) 40%)',
        }}
      >
        Remixlab
      </h2>
      <div className='mt-10 flex w-full max-w-[860px] items-center gap-5 rounded-[18px] border border-white/10 bg-white/5 px-7 py-5 backdrop-blur-md'>
        <span className='text-[40px]'>+</span>
        <input
          placeholder='당신의 아이디어를 입력해주세요.'
          className='w-full bg-transparent text-[22px] outline-none placeholder:text-white/30'
        />
      </div>

      {/* 🔥 버튼 연결 */}
      <div className='mt-6 flex w-full max-w-[860px] gap-4'>
        <button
          onClick={() => navigate('/plot')}
          className='flex-1 rounded-[14px] bg-cyan-400 py-4 text-black font-semibold'
        >
          ✦ 플롯 생성
        </button>

        <button
          onClick={() => navigate('/image')}
          className='flex-1 rounded-[14px] bg-cyan-400 py-4 text-black font-semibold'
        >
          ✦ 이미지 생성
        </button>

        <button onClick={handleVideo} className='flex-1 rounded-[14px] bg-cyan-400 py-4 text-black font-semibold'>
          ✦ 영상 생성
        </button>
      </div>
    </section>
  );
}
