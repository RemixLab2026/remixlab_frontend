import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';
import AuthToggle from '@/components/auth/AuthToggle';
import { useAuthMutation } from '@/hooks/useAuthMutation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function AuthPage() {
  const { mode, toggleMode, login } = useAuthStore();
  const navigate = useNavigate();

  const authMutation = useAuthMutation(mode);

  return (
    <main className='relative flex min-h-screen items-center justify-center px-6'>
      <AuthCard mode={mode} footer={<AuthToggle mode={mode} onToggle={toggleMode} />}>
        <AuthForm
          mode={mode}
          isPending={authMutation.isPending}
          onSubmit={(values) =>
            authMutation.mutate(values, {
              onSuccess: (data) => {
                // zustand 저장
                login(data.accessToken);

                // 홈으로 이동
                navigate('/');
              },
            })
          }
        />
      </AuthCard>
    </main>
  );
}
