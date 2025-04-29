import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { useAuth as useAuthTRPC } from '@/features/auth/hooks/use-auth-queries-trpc';
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

export const AuthHeader = () => {
  const session = useSessionStore((state) => state.session);
  const [userId, setUserId] = useState<string | null>(null)
  const { signOutMutation } = useAuth();
  const { signOutMutation: signOutMutationTRPC } = useAuthTRPC();
  const { useGetProfile } = useProfile();
  const { data } = useGetProfile(userId);

  useEffect(() => {
    if (session?.user) {
      setUserId(session.user.id)
    }
  }, [session]);

  const handleLogout = async () => {
    signOutMutation.mutate();
  };
  const handleLogoutTRPC = async () => {
    signOutMutationTRPC.mutate();
  };

  return (
    <header className="text-center px-5 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-5 dark:text-white">
          <Link to="/dashboard">⚛️ + ⚡</Link>
        </h1>

        <nav className="flex justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
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
                  onClick={handleLogout}
                  role="button"
                  aria-label="ログアウト"
                  aria-disabled={signOutMutation.isPending}
                >
                  {signOutMutation.isPending && <Loader className="animate-spin h-4 w-4" />}
                  <span>ログアウト</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  className="cursor-pointer"
                  onClick={handleLogoutTRPC}
                  role="button"
                  aria-label="ログアウト"
                  aria-disabled={signOutMutationTRPC.isPending}
                >
                  {signOutMutationTRPC.isPending && <Loader className="animate-spin" />}
                  <span>ログアウト</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
