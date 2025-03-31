import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/hooks/use-auth-store';

export const ProtectedRoute = () => {
  const session = useAuthStore((state) => state.session);
  const location = useLocation();

  if (!session) {
    // セッションがない（認証されていない）場合、新規登録ページへリダイレクト
    return <Navigate to="/auth/register" state={{ from: location }} replace />;
  }

  // セッションがある（認証済み）の場合、子要素をレンダリング
  return <Outlet />;
};