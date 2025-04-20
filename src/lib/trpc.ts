import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { queryClient } from '@/lib/queryClient';
import type { AppRouter } from '../../supabase/functions/trpc/router';
import { useSessionStore } from '@/hooks/use-session-store';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/constants';

export const trpcClient = () => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${SUPABASE_URL}/functions/v1/trpc`,
        headers: () => {
          const session = useSessionStore.getState().session;
          return {
            Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
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
