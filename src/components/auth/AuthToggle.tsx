import type { AuthMode } from '../../store/authStore';

interface AuthToggleProps {
  mode: AuthMode;
  onToggle: () => void;
}

export default function AuthToggle({ mode, onToggle }: AuthToggleProps) {
  const isLogin = mode === 'login';

  return (
    <div className='mt-7 flex justify-end gap-2 text-[13px] text-white/30'>
      <span>{isLogin ? '아직 회원이 아닌가요?' : '이미 계정이 있나요?'}</span>
      <button type='button' onClick={onToggle} className='text-white/70 underline underline-offset-2 hover:text-white'>
        {isLogin ? '회원가입하기' : '로그인하기'}
      </button>
    </div>
  );
}
