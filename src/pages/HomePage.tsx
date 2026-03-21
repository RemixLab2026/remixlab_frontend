export default function HomePage() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-[#02060d] text-white'>
      {/* background */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(0,170,255,0.30),transparent_30%),linear-gradient(180deg,#06131c_0%,#02060d_52%,#000000_100%)]' />

      {/* side vignette */}
      <div className='absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r from-black/55 to-transparent' />
      <div className='absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l from-black/45 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-black to-transparent' />

      {/* header */}
      <header className='relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between px-10 pt-6'>
        <h1 className='text-[20px] font-semibol text-white'>Remixlab</h1>

        <nav className='flex items-center gap-2 rounded-full border border-white/8 bg-white/8 px-3 py-1.5 backdrop-blur-md'>
          <button className='rounded-full bg-white/12 px-6 py-2 text-[12px] text-white'>Home</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Dashboard</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Create</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Quest</button>
        </nav>

        <div className='flex items-center gap-3'>
          <button className='text-[13px] text-white/90'>Login</button>
          <button className='rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))] px-4 py-1.5 text-[13px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_18px_rgba(0,0,0,0.25)] backdrop-blur-md'>
            Sign up
          </button>
        </div>
      </header>

      {/* hero */}
      <section className='relative z-10 flex min-h-[calc(100vh-84px)] flex-col items-center justify-center px-6 pb-24 pt-12'>
        <p className='mb-6 text-center text-[18px] font-medium tracking-[-0.03em] text-white/62'>
          아이디어만으로 시작하는 <span className='font-semibold text-white/92'>AI 기반 창작 실험실</span>
        </p>

        <h2
          className='text-center text-[128px] font-semibold leading-none tracking-[-0.075em] text-white/95'
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 7%, rgba(0,0,0,0.42) 13%, rgba(0,0,0,0.82) 20%, rgba(0,0,0,1) 28%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 7%, rgba(0,0,0,0.42) 13%, rgba(0,0,0,0.82) 20%, rgba(0,0,0,1) 28%)',
          }}
        >
          Remixlab
        </h2>

        <div className='mt-10 flex w-full max-w-[860px] items-center gap-5 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-7 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-md'>
          <span className='text-[40px] font-light leading-none text-white/92'>+</span>
          <input
            placeholder='당신의 아이디어를 입력해주세요.'
            className='w-full bg-transparent text-[22px] font-normal tracking-[-0.03em] text-white/88 outline-none placeholder:text-white/26'
          />
        </div>

        <div className='mt-6 flex w-full max-w-[860px] gap-4'>
          <button className='flex-1 rounded-[14px] bg-cyan-400 px-8 py-4 text-[18px] font-semibold text-black transition hover:brightness-110'>
            ✦ 프롬 생성
          </button>
          <button className='flex-1 rounded-[14px] bg-cyan-400 px-8 py-4 text-[18px] font-semibold text-black transition hover:brightness-110'>
            ✦ 이미지 생성
          </button>
          <button className='flex-1 rounded-[14px] bg-cyan-400 px-8 py-4 text-[18px] font-semibold text-black transition hover:brightness-110'>
            ✦ 영상 생성
          </button>
        </div>
      </section>
    </main>
  );
}
