import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLogin = useAuthStore((state) => !!state.accessToken);

  if (!isLogin) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}