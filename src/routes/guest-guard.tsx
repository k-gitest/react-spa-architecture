import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStore } from '@/hooks/use-session-store';

export const GuestGuard = () => {
  const session = useSessionStore((state) => state.session);

  if (session) {
    // セッションがある（ログイン済み）の場合、トップページへリダイレクト
    return <Navigate to="/dashboard" replace />;
  }

  // セッションがない（未ログイン）の場合、子要素をレンダリング
  return <Outlet />;
};
