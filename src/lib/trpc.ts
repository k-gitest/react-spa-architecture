import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { queryClient } from '@/lib/queryClient';
import type { AppRouter } from '../../supabase/functions/trpc/router';
//import type { AppRouter } from '../../shared/trpc.types.d.ts';
import { useSessionStore } from '@/hooks/use-session-store';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/constants';
import { UseFormReturn, FieldPath, FieldValues } from 'react-hook-form';
import { typeToFlattenedError } from 'zod';
import { toast } from '@/hooks/use-toast';

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

export function syncZodErrors<T extends FieldValues, U = unknown>(
  form: UseFormReturn<T>,
  zodError: typeToFlattenedError<T, U> | null | undefined,
) {
  if (!zodError) return;
  // エラー処理のロジック
  const fieldErrors = zodError.fieldErrors as Record<string, string[]>;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const message = messages?.[0];
    if (!message) return;
    const values = form.getValues();

    if (field in values) {
      form.setError(field as FieldPath<T>, {
        type: 'server',
        message,
      });
    } else {
      toast({ title: message });
      form.setError('root' as unknown as FieldPath<T>, {
        type: 'server',
        message,
      });
    }
  });
}
