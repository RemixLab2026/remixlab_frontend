import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-[#02060d] text-white'>
      {/* background */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(0,170,255,0.30),transparent_30%),linear-gradient(180deg,#06131c_0%,#02060d_52%,#000000_100%)]' />

      {/* header */}
      <header className='relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-between px-10 pt-6'>
        <h1 className='text-[20px] font-semibold'>Remixlab</h1>

        <nav className='flex items-center gap-2 rounded-full border border-white/8 bg-white/8 px-3 py-1.5 backdrop-blur-md'>
          <button className='rounded-full bg-white/12 px-6 py-2 text-[12px]'>Home</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Dashboard</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Create</button>
          <button className='px-5 py-2 text-[12px] text-white/65'>Quest</button>
        </nav>

        {/* 🔥 오른쪽 상단 UI */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-[13px] text-white/80'>Lv. 1</span>

            <div className='h-[6px] w-[120px] rounded-full bg-white/20'>
              <div className='h-full w-[30%] rounded-full bg-white'></div>
            </div>
          </div>

          <div className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-md'>
            <span>🪙</span>
            <span className='text-[13px]'>12</span>
          </div>
        </div>
      </header>

      {/* 페이지 영역 */}
      <div className='relative z-10'>
        <Outlet />
      </div>
    </main>
  );
}
