import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';
import AuthToggle from '@/components/auth/AuthToggle';
import { useAuthMutation } from '@/hooks/useAuthMutation';
import { useAuthUIStore } from '@/store/authStore';

export default function AuthPage() {
  const { mode, toggleMode } = useAuthUIStore();
  const authMutation = useAuthMutation(mode);

  return (
    <main className='relative flex min-h-screen items-center justify-center px-6'>
      <div className='absolute inset-0 opacity-90' />

      <AuthCard mode={mode} footer={<AuthToggle mode={mode} onToggle={toggleMode} />}>
        <AuthForm mode={mode} isPending={authMutation.isPending} onSubmit={(values) => authMutation.mutate(values)} />
      </AuthCard>
    </main>
  );
}
