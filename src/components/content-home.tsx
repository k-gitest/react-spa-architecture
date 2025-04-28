import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSessionStore } from '@/hooks/use-session-store';

export const ContentHome = () => {
  const session = useSessionStore((state) => state.session);
  return (
    <div className="w-full h-[calc(100vh-148px)] bg-gray-200 flex flex-col gap-6 justify-center items-center rounded-md">
      <h2 className="text-6xl">MEMO APP</h2>
      <div className="flex gap-2">
        {!session && (
          <>
            <Button>
              <Link to="/register">新規登録</Link>
            </Button>
            <Button>
              <Link to="/login">ログイン</Link>
            </Button>
          </>
        )}
        {session && (
          <Button>
            <Link to="/dashboard">dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
