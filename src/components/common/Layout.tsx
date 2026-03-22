import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCreateActive = location.pathname.startsWith('/create');
  const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/generate/');

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#02060d] text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(0,172,193,0.30),transparent_28%),radial-gradient(circle_at_85%_62%,rgba(120,40,140,0.16),transparent_24%),linear-gradient(180deg,#04101a_0%,#02060d_55%,#000000_100%)]' />

      <header className='relative z-10 mx-auto flex max-w-[1280px] items-center justify-between px-8 pt-6'>
        {/* ✅ 로고 이미지 */}
        <div className='flex shrink-0'>
          <button onClick={() => navigate('/')} className='flex items-center'>
            <img src='/small.png' alt='Remixlab' className='h-[22px] w-auto opacity-90 transition hover:opacity-100' />
          </button>
        </div>

        {/* 중앙 네비 */}
        <nav className='absolute left-1/2 top-6 -translate-x-1/2'>
          <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md'>
            <button
              onClick={() => navigate('/')}
              className={`rounded-full px-6 py-2 text-[12px] transition ${
                isHomeActive ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className={`rounded-full px-6 py-2 text-[12px] transition ${
                isActive('/dashboard') ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/create')}
              className={`rounded-full px-6 py-2 text-[12px] transition ${
                isCreateActive ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Create
            </button>

            <button
              onClick={() => navigate('/quest')}
              className={`rounded-full px-6 py-2 text-[12px] transition ${
                isActive('/quest') ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Quest
            </button>
          </div>
        </nav>

        {/* 오른쪽 */}
        <div className='ml-auto flex shrink-0 items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Lv. 1</span>
            <div className='h-[8px] w-[110px] rounded-full bg-white/18'>
              <div className='h-full w-[70%] rounded-full bg-white' />
            </div>
          </div>

          <div className='flex items-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-4 py-2'>
            <img src='/token.png' alt='토큰' className='h-[10px] w-[10px] object-contain opacity-90' />
            <span className='text-sm'>12</span>
          </div>
        </div>
      </header>

      <div className='relative z-10'>
        <Outlet />
      </div>
    </main>
  );
}
