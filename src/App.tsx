import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import PlotPage from '@/pages/PlotPage';
import ImagePage from '@/pages/ImagePage';
import VideoPage from '@/pages/VideoPage';
import LockedPage from '@/pages/LockedPage';

import ProtectedRoute from '@/routes/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';
import Layout from '@/components/common/Layout';

export default function App() {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path='/login' element={<AuthPage />} />

        {/* 보호된 영역 */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<HomePage />} />
          <Route path='/plot' element={<PlotPage />} />
          <Route path='/image' element={<ImagePage />} />
          <Route path='/video' element={<VideoPage />} />
          <Route path='/locked' element={<LockedPage />} />
        </Route>

        {/* fallback */}
        <Route path='*' element={<Navigate to={isLogin ? '/' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  );
}
