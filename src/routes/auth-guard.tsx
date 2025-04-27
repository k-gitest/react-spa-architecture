import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStore } from '@/hooks/use-session-store';

export const AuthGuard = () => {
  const session = useSessionStore((state) => state.session);
  const location = useLocation();

  if (!session) {
    // セッションがない（認証されていない）場合、ログインページへリダイレクト
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // セッションがある（認証済み）の場合、子要素をレンダリング
  return <Outlet />;
};
