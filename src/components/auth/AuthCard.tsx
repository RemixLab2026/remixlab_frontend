import type { ReactNode } from 'react';
import type { AuthMode } from '@/store/authStore';

interface AuthCardProps {
  mode: AuthMode;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthCard({ mode, children, footer }: AuthCardProps) {
  const isLogin = mode === 'login';

  return (
    <section className='relative w-full max-w-[520px] rounded-[26px] border border-white/10 bg-white/[0.05] px-10 py-12 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-[18px]'>
      {/* 로고 영역 */}
      <div className='mb-10 flex flex-col items-center'>
        <img src='src/assets/small.png' alt='Remixlab' className='h-[40px] w-auto opacity-90' />

        <p className='mt-3 text-[13px] text-white/50'>{isLogin ? '로그인을 환영합니다' : '회원가입을 환영합니다'}</p>
      </div>

      {children}
      {footer}
    </section>
  );
}
