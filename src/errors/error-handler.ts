import { handleAuthError, createAuthApiErrorFromData } from '@/errors/auth-error-handler';
import { TRPCClientError } from '@trpc/client';
import {
  handleApiError,
  mapTRPCErrorCodeToPostgrestErrorCode,
  createPostgrestErrorFromData,
} from '@/errors/api-error-handler';
import { PostgrestError, AuthError } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

/*
共通エラーハンドリング
*/
export const errorHandler = (error: unknown) => {
  if (error instanceof TRPCClientError && error.data.name === 'TRPCError') {
    if (error.data.authError) {
      const authApiError = createAuthApiErrorFromData(error.data.authError);
      const errorMessage = handleAuthError(authApiError);
      toast({ title: `${errorMessage}` });
      return;
    }
    if (error.data.postgrestError) {
      const postgrestError = createPostgrestErrorFromData(error.data.postgrestError);
      const errorMessage = handleApiError(postgrestError);
      toast({ title: `${errorMessage}` });
      return;
    }
    if (error.data.zodError) {
      const errorMessage = 'zodError';
      toast({ title: `${errorMessage}` });
      return;
    }

    const setPostgrestError = mapTRPCErrorCodeToPostgrestErrorCode(error.data);
    const errorMessage = handleApiError(setPostgrestError);
    toast({ title: `${errorMessage}` });
    return;
  }

  if (error instanceof PostgrestError) {
    const errorMessage = handleApiError(error);
    toast({ title: `${errorMessage}` });
    return;
  }

  if (error instanceof AuthError) {
    const errorMessage = handleAuthError(error);
    toast({ title: `${errorMessage}` });
    return;
  }

  if (error instanceof Error) {
    toast({ title: `エラーが発生しました: 不明なエラー` });
    console.error('エラー詳細:', error);
    return;
  }
};
