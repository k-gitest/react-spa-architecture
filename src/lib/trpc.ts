import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { queryClient } from '@/lib/queryClient';
import type { AppRouter } from '../../supabase/functions/trpc/router';
import { useAuthStore } from '@/hooks/use-auth-store';

export const trpcClient = () => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trpc`,
        headers: () => {
          const session = useAuthStore.getState().session;
          return {
            Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          };
        },
      }),
    ],
  });
};

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient(),
  queryClient,
});
