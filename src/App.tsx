import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login, signup } from './apis/auth';
import { useAuthUIStore } from './store/authStore';

export default function App() {
  const { mode, setMode } = useAuthUIStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';

  const authMutation = useMutation({
    mutationFn: async () => {
      const payload = { email, password };
      return isLogin ? login(payload) : signup(payload);
    },
    onSuccess: (data) => {
      console.log(isLogin ? '로그인 성공' : '회원가입 성공', data);
    },
    onError: (error) => {
      console.error(isLogin ? '로그인 실패' : '회원가입 실패', error);
    },
  });

  const isFilled = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isFilled) return;
    authMutation.mutate();
  };

  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-4'>
      <div className='absolute inset-0 opacity-90' />

      <section className='relative w-full max-w-[390px] rounded-[20px] border border-white/10 bg-white/[0.04] px-7 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-[14px]'>
        <div className='mb-8 flex flex-col items-center'>
          <h1 className='text-[42px] font-medium tracking-[-0.05em] text-white'>Remixlab</h1>
          <p className='mt-2 text-[12px] text-white/45'>{isLogin ? '로그인을 환영합니다' : '회원가입을 환영합니다'}</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='mb-2 block text-[11px] font-semibold text-white/80'>이메일주소</label>
            <input
              type='email'
              placeholder='이메일 주소'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='h-[38px] w-full rounded-[10px] border border-white/8 bg-[#0E1220]/40 px-4 text-[12px] text-white outline-none placeholder:text-white/20 focus:border-white/20'
            />
          </div>

          <div>
            <label className='mb-2 block text-[11px] font-semibold text-white/80'>비밀번호</label>
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='h-[38px] w-full rounded-[10px] border border-white/8 bg-[#0E1220]/40 px-4 text-[12px] text-white outline-none placeholder:text-white/20 focus:border-white/20'
            />
          </div>

          <button
            type='submit'
            disabled={!isFilled || authMutation.isPending}
            className={[
              'mt-1 flex h-[40px] w-full items-center justify-center rounded-[10px] text-[12px] font-semibold transition',
              isFilled
                ? 'bg-cyan-400 text-[#041019] hover:brightness-110'
                : 'border border-white/10 bg-white/8 text-white/70',
            ].join(' ')}
          >
            {authMutation.isPending ? '처리중...' : isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className='mt-5 flex justify-end gap-2 text-[11px] text-white/25'>
          <span>{isLogin ? '아직 회원이 아닌가요?' : '이미 계정이 있나요?'}</span>
          <button
            type='button'
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
            className='text-white/55 underline underline-offset-2 hover:text-white'
          >
            {isLogin ? '회원가입하기' : '로그인하기'}
          </button>
        </div>
      </section>
    </main>
  );
}
