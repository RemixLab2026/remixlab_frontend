import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { useAuthStore } from '@/store/authStore';

import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashbaoardPage';
import QuestPage from '@/pages/QuestPage';

import GeneratePlotPage from '@/pages/GeneratePlotPage';
import GenerateImagePage from '@/pages/GenerateImagePage';
import GenerateVideoPage from '@/pages/GenerateVideoPage';

import CreatePage from '@/pages/CreatePage';

export default function App() {
  const isLogin = useAuthStore((state) => !!state.accessToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path='/login'
            element={isLogin ? <Navigate to="/" replace /> : <AuthPage />}
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/quest' element={<QuestPage />} />

          {/* Home에서 들어가는 개별 생성 */}
          <Route path='/generate/plot' element={<GeneratePlotPage />} />
          <Route path='/generate/image' element={<GenerateImagePage />} />
          <Route path='/generate/video' element={<GenerateVideoPage />} />

          {/* Create에서 들어가는 단계형 생성 */}
          <Route path='/create' element={<CreatePage />} />
        </Route>

        <Route path='*' element={<Navigate to={isLogin ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
