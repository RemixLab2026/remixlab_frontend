import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isCreateActive = location.pathname.startsWith('/create');
  const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/generate/');

  const userInfo = useAuthStore((state) => state.userInfo);

  const maxXp = 1000;
  const currentExp = userInfo?.exp ?? 0;
  const headerExpPercentage = Math.min((currentExp / maxXp) * 100, 100);

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#02060d] text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(0,172,193,0.30),transparent_28%),radial-gradient(circle_at_85%_62%,rgba(120,40,140,0.16),transparent_24%),linear-gradient(180deg,#04101a_0%,#02060d_55%,#000000_100%)]' />

      <header className='relative z-10 mx-auto flex max-w-[1280px] flex-col gap-4 px-4 pt-4 md:flex-row md:items-center md:justify-between md:px-8 md:pt-6'>
        {/* 로고 */}
        <div className='flex justify-center md:justify-start'>
          <button onClick={() => navigate('/')} className='flex cursor-pointer items-center'>
            <img
              src='/small.png'
              alt='Remixlab'
              className='h-[20px] w-auto opacity-90 transition hover:opacity-100 md:h-[22px]'
            />
          </button>
        </div>

        {/* 중앙 네비 */}
        <nav className='w-full md:absolute md:left-1/2 md:top-6 md:w-auto md:-translate-x-1/2'>
          <div className='flex w-full items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/10 px-2 py-1.5 backdrop-blur-md md:w-auto md:px-3'>
            <button
              onClick={() => navigate('/')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] transition md:px-6 ${
                isHomeActive ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] transition md:px-6 ${
                isActive('/dashboard') ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/create')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] transition md:px-6 ${
                isCreateActive ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Create
            </button>

            <button
              onClick={() => navigate('/quest')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] transition md:px-6 ${
                isActive('/quest') ? 'bg-white/18 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Quest
            </button>
          </div>
        </nav>

        {/* 오른쪽 정보 */}
        <div className='flex w-full items-center justify-between gap-3 md:ml-auto md:w-auto md:shrink-0'>
          <div className='flex items-center gap-2'>
            <span className='text-sm'>Lv. {userInfo?.level ?? 1}</span>
            <div className='h-[8px] w-[80px] rounded-full bg-white/18 md:w-[110px]'>
              <div
                className='h-full rounded-full bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                style={{ width: `${headerExpPercentage}%` }}
              />
            </div>
          </div>

          <div className='flex items-center gap-2 rounded-full border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-2 md:px-4'>
            <img src='/token.png' alt='토큰' className='h-[10px] w-[10px] object-contain opacity-90' />
            <span className='text-sm'>{userInfo?.token ?? 0}</span>
          </div>
        </div>
      </header>

      <div className='relative z-10'>
        <Outlet />
      </div>
    </main>
  );
}
