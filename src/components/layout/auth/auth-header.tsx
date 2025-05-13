import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { VariantToggle } from '@/components/variant-toggle';
import { Loader } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfile } from '@/features/profile/hooks/use-profile-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';
import { useEffect, useState } from 'react';
import { getAvatarUrl } from '@/lib/supabase';
import { errorHandler } from '@/errors/error-handler';
import { useNavigate } from 'react-router-dom';
import { useSignOutHandler } from '@/features/auth/hooks/use-signout-handler';

export const AuthHeader = () => {
  const session = useSessionStore((state) => state.session);
  const navigate = useNavigate();
  const { handleSignOut, isPending } = useSignOutHandler();
  const [userId, setUserId] = useState<string | null>(null);
  const { useGetProfile } = useProfile();
  const { data } = useGetProfile(userId);

  const signOutClick = () => {
    handleSignOut({
      onSuccess: () => navigate('/login'),
      onError: errorHandler,
    });
  };
  useEffect(() => {
    if (session?.user) {
      setUserId(session.user.id);
    }
  }, [session]);

  return (
    <header className="text-center px-5 pt-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <Link to="/dashboard">⚛️ + ⚡</Link>
        </h1>

        <nav className="flex justify-center gap-2">
          <VariantToggle />
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 border border-black-700 cursor-pointer dark:bg-white">
                <AvatarImage
                  src={data?.avatar ? getAvatarUrl(data.avatar) : session?.user.user_metadata.avatar_url}
                  alt="avatar"
                />
                <AvatarFallback>avatar</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{data?.user_name ?? session?.user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/auth/setting">Setting</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  className="cursor-pointer"
                  onClick={signOutClick}
                  role="button"
                  aria-label="ログアウト"
                  aria-disabled={isPending}
                >
                  {isPending && <Loader className="animate-spin h-4 w-4" />}
                  <span>ログアウト</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};
