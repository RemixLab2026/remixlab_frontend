import { useState } from 'react';
import type { AuthMode } from '@/store/authStore';

interface AuthFormProps {
  mode: AuthMode;
  isPending: boolean;
  onSubmit: (values: { email: string; password: string }) => void;
}

export default function AuthForm({ mode, isPending, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = mode === 'login';
  const isFilled = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFilled) return;

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-7'>
      <div>
        <label className='mb-3 block text-[13px] font-semibold text-white/80'>이메일주소</label>
        <input
          type='email'
          placeholder='이메일 주소'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='h-[48px] w-full rounded-[14px] border border-white/10 bg-[#0E1220]/50 px-5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40'
        />
      </div>

      <div>
        <label className='mb-3 block text-[13px] font-semibold text-white/80'>비밀번호</label>
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='h-[48px] w-full rounded-[14px] border border-white/10 bg-[#0E1220]/50 px-5 text-[14px] text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40'
        />
      </div>

      <button
        type='submit'
        disabled={!isFilled || isPending}
        className={[
          'mt-2 flex h-[52px] w-full items-center justify-center rounded-[14px] text-[14px] font-semibold transition',
          isFilled
            ? 'bg-cyan-400 text-[#041019] hover:brightness-110'
            : 'border border-white/10 bg-white/10 text-white/60',
        ].join(' ')}
      >
        {isPending ? '처리중...' : isLogin ? '로그인' : '회원가입'}
      </button>
    </form>
  );
}
