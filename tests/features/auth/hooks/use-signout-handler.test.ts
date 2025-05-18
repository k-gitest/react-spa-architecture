import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AuthError } from '@supabase/supabase-js';

// モック関数の型を修正
type SignOutMutateFunction = (
  variables?: void,
  options?: {
    onSuccess?: () => void;
    onError?: (error: AuthError) => void;
    onSettled?: () => void;
  }
) => void;

// モック関数の定義を修正
const mutateTanstack = vi.fn() as SignOutMutateFunction;
const mutateTRPC = vi.fn() as SignOutMutateFunction;
const signOutAuthServiceMock = vi.fn();

// インポート位置を vi.mock の前に移動
import { useSignOutHandler } from '@/features/auth/hooks/use-signout-handler';
import { useBehaviorVariant } from '@/hooks/use-behavior-variant';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { useAuth as useAuthTRPC } from '@/features/auth/hooks/use-auth-queries-trpc';
import { signOutAuthService } from '@/features/auth/services/authService';

// モックの定義
vi.mock('@/hooks/use-behavior-variant');
vi.mock('@/features/auth/hooks/use-auth-queries-tanstack');
vi.mock('@/features/auth/hooks/use-auth-queries-trpc');
vi.mock('@/features/auth/services/authService');

describe('useSignOutHandler', () => {
  const getCurrentVariantMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useBehaviorVariant).mockReturnValue({
      getCurrentVariant: getCurrentVariantMock,
    });

    // シンプルなモックの実装に戻す
    vi.mocked(useAuth).mockReturnValue({
      signOutMutation: {
        mutate: mutateTanstack,
        isPending: false,
      },
    } as any);

    vi.mocked(useAuthTRPC).mockReturnValue({
      signOutMutation: {
        mutate: mutateTRPC,
        isPending: false,
      },
    } as any);
    
    vi.mocked(signOutAuthService).mockImplementation(signOutAuthServiceMock);
  });

  it('tanstack バリアントで signOutMutation.mutate() が呼ばれる', async () => {
    getCurrentVariantMock.mockReturnValue({ id: 'tanstack' });

    const { result } = renderHook(() => useSignOutHandler());

    await act(async () => {
      await result.current.handleSignOut();
    });

    expect(mutateTanstack).toHaveBeenCalled();
    expect(mutateTRPC).not.toHaveBeenCalled();
    expect(signOutAuthServiceMock).not.toHaveBeenCalled();
  });

  it('trpc バリアントで signOutMutationTRPC.mutate() が呼ばれる', async () => {
    getCurrentVariantMock.mockReturnValue({ id: 'trpc' });

    const { result } = renderHook(() => useSignOutHandler());

    await act(async () => {
      await result.current.handleSignOut();
    });

    expect(mutateTRPC).toHaveBeenCalled();
    expect(mutateTanstack).not.toHaveBeenCalled();
    expect(signOutAuthServiceMock).not.toHaveBeenCalled();
  });

  it('variant がどちらでもない場合は signOutAuthService を呼び出す（成功）', async () => {
    signOutAuthServiceMock.mockResolvedValue(undefined);
    const onSuccess = vi.fn();
    getCurrentVariantMock.mockReturnValue({ id: 'none' });

    const { result } = renderHook(() => useSignOutHandler());

    await act(async () => {
      await result.current.handleSignOut({ onSuccess });
    });

    expect(signOutAuthServiceMock).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it('variant がどちらでもない場合に signOutAuthService がエラーを投げる', async () => {
    const error = new Error('Sign out failed');
    signOutAuthServiceMock.mockRejectedValue(error);
    const onError = vi.fn();

    getCurrentVariantMock.mockReturnValue({ id: 'none' });

    const { result } = renderHook(() => useSignOutHandler());

    await act(async () => {
      await result.current.handleSignOut({ onError });
    });

    expect(signOutAuthServiceMock).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('isPending はバリアントに応じて正しく返される', () => {
    // Tanstack の isPending テスト
    getCurrentVariantMock.mockReturnValue({ id: 'tanstack' });
    const tanstackResult = renderHook(() => useSignOutHandler());
    expect(tanstackResult.result.current.isPending).toBe(false);

    // TRPC の isPending テスト
    getCurrentVariantMock.mockReturnValue({ id: 'trpc' });
    const trpcResult = renderHook(() => useSignOutHandler());
    expect(trpcResult.result.current.isPending).toBe(false);

    // その他のバリアント
    getCurrentVariantMock.mockReturnValue({ id: 'none' });
    const fallbackResult = renderHook(() => useSignOutHandler());
    expect(fallbackResult.result.current.isPending).toBe(false);
  });
});
