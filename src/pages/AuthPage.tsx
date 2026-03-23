import AuthCard from '@/components/auth/AuthCard';
import AuthForm from '@/components/auth/AuthForm';
import AuthToggle from '@/components/auth/AuthToggle';

import { useAuthHooks } from '@/hooks/useAuthMutation';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function AuthPage() {
    const { mode, toggleMode, login } = useAuthStore();
    const navigate = useNavigate();

    // useAuthHooks에서 로그인과 회원가입 mutation을 각각 꺼냅니다.
    const { loginMutation, registerMutation } = useAuthHooks();

    // 현재 모드(로그인/회원가입)에 따라 로딩 상태를 보여주기 위해 합칩니다.
    const isPending = mode === 'login' ? loginMutation.isPending : registerMutation.isPending;

    return (
        <main className='relative flex min-h-screen items-center justify-center px-6'>
            <AuthCard mode={mode} footer={<AuthToggle mode={mode} onToggle={toggleMode} />}>
                <AuthForm
                    mode={mode}
                    isPending={isPending}
                    onSubmit={(values) => {
                        // 1. 로그인 모드일 때
                        if (mode === 'login') {
                            loginMutation.mutate(values, {
                                onSuccess: ({ token }) => {
                                    if (token) {
                                        login(token); // Zustand에 토큰 저장
                                        navigate('/');  // 메인 페이지로 이동
                                    }
                                },
                            });
                        }
                        // 2. 회원가입 모드일 때
                        else {
                            registerMutation.mutate(values, {
                                onSuccess: (response) => {
                                    // 회원가입 성공(201) 시 처리
                                    if (response.status === 201) {
                                        alert('회원가입이 성공적으로 완료되었습니다. 로그인해 주세요!');
                                        toggleMode(); // 자동으로 로그인 모드 화면으로 전환
                                    }
                                },
                            });
                        }
                    }}
                />
            </AuthCard>
        </main>
    );
}