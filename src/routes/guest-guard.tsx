import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/hooks/use-auth-store';

export const GuestGuard = () => {
  const session = useAuthStore((state) => state.session);

  if (session) {
    // セッションがある（ログイン済み）の場合、トップページへリダイレクト
    return <Navigate to="/" replace />;
  }

  // セッションがない（未ログイン）の場合、子要素をレンダリング
  return <Outlet />;
};