import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';

export default function App() {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {/* 처음 진입 */}
        <Route path='/' element={isLogin ? <HomePage /> : <Navigate to='/login' />} />

        {/* 로그인 페이지 */}
        <Route path='/login' element={<AuthPage />} />

        {/* 보호된 페이지 */}
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
