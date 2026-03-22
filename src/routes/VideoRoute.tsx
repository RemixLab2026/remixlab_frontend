import { Navigate } from 'react-router-dom';

interface VideoRouteProps {
  children: React.ReactNode;
}

export default function VideoRoute({ children }: VideoRouteProps) {
  const userLevel = 1;

  if (userLevel < 3) {
    return <Navigate to='/locked' replace />;
  }

  return <>{children}</>;
}
