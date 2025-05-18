import { renderHook, waitFor } from '@testing-library/react';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { QueryClient, QueryClientProvider, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { Memo, MemoFormData, Category, Tag } from '@/features/memo/types/memo-form-data';

// モックをファイルの先頭で設定
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn((selector) => selector({ session: { user: { id: 'test-user-id' } } })),
}));

// vi.mockに外部変数を渡さないようにする
vi.mock('@/hooks/use-tanstack-query', () => ({
  useApiQuery: vi.fn(),
  useApiMutation: vi.fn(),
}));

// 実際のモジュールからモック関数を取得
const mockToast = vi.fn();
vi.mocked(await import('@/hooks/use-toast'), true).toast = mockToast;

const { useApiQuery, useApiMutation } = vi.mocked(await import('@/hooks/use-tanstack-query'));

// 実際のQueryClientを使用し、必要なメソッドをスパイする
const queryClient = new QueryClient();
const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

// Wrapper型を明示的に定義
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useMemos Hook', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    vi.clearAllMocks();

    // デフォルトのモック実装をセット - 型情報を追加
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
      isSuccess: false,
      isFetching: false,
      status: 'idle',
      fetchStatus: 'idle',
      isLoadingError: false,
      isRefetchError: false,
      refetch: vi.fn(),
    } as unknown as UseQueryResult);

    useApiMutation.mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue(undefined),
      mutate: vi.fn(),
      data: undefined,
      error: null,
      isError: false,
      isIdle: true,
      isPending: false,
      isSuccess: false,
      reset: vi.fn(),
      status: 'idle',
    } as unknown as UseMutationResult);
  });

  it('memos クエリがローディング状態を返すこと', () => {
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      isPending: true,
      isSuccess: false,
      isFetching: true,
      status: 'loading',
      fetchStatus: 'fetching',
      isLoadingError: false,
      isRefetchError: false,
      refetch: vi.fn(),
    } as unknown as UseQueryResult);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.isMemosLoading).toBe(true);
  });

  it('memos クエリがメモ一覧データを返すこと', () => {
    const mockData: Memo[] = [{ id: '1', title: 'テストメモ' } as Memo];
    useApiQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
      isSuccess: true,
      isFetching: false,
      status: 'success',
      fetchStatus: 'idle',
      isLoadingError: false,
      isRefetchError: false,
      refetch: vi.fn(),
    } as unknown as UseQueryResult<Memo[], Error>);

    const { result } = renderHook(() => useMemos(), { wrapper });

    expect(result.current.isMemosLoading).toBe(false);
    expect(result.current.memos).toEqual(mockData);
  });

  it('memos クエリがエラー状態を返すこと', async () => {
    const mockError = new Error('Failed to fetch');
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
      isPending: false,
      isSuccess: false,
      isFetching: false,
      status: 'error',
      fetchStatus: 'idle',
      isLoadingError: true,
      isRefetchError: false,
      refetch: vi.fn(),
    } as unknown as UseQueryResult<Memo[], Error>);

    const { result } = renderHook(() => useMemos(), { wrapper });
    await waitFor(() => expect(result.current.isMemosError).toBe(true));
    expect(result.current.memosError).toEqual(mockError);
  });

  it('クエリが個別メモデータを返すこと', async () => {
    const mockData = { id: '1', title: 'テストメモ' } as Memo;
    useApiQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
      isSuccess: true,
      isFetching: false,
      status: 'success',
      fetchStatus: 'idle',
      isLoadingError: false,
      isRefetchError: false,
      refetch: vi.fn(),
    } as unknown as UseQueryResult<Memo | undefined, Error>);

    const { result } = renderHook(() => useMemos().useGetMemo('1'), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual(mockData);
  });

  it('id が null の場合、useGetMemoクエリを実行しないこと', () => {
    renderHook(() => useMemos().useGetMemo(null), { wrapper });

    expect(useApiQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      }),
    );
  });

  it('addMemoService を呼び出し、成功時に toast と invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);

    // onSuccess コールバックを呼び出すように useApiMutation モックを設定
    useApiMutation.mockImplementation((options: any) => {
      return {
        mutateAsync: async (data: any) => {
          const result = await mockMutateAsync(data);
          if (options.onSuccess) {
            // 正しいパラメータで onSuccess を呼び出す
            await options.onSuccess(result, data, undefined);
          }
          return result;
        },
        mutate: vi.fn(),
        data: undefined,
        error: null,
        isError: false,
        isIdle: false,
        isPending: false,
        isSuccess: true,
        reset: vi.fn(),
        status: 'success',
      } as unknown as UseMutationResult;
    });

    const { result } = renderHook(() => useMemos(), { wrapper });

    const mockMemoData = {
      title: 'テストメモ',
      content: 'テスト内容',
      importance: 'high',
      category: 'メモ',
      tags: [],
      user_id: 'test-user-id',
    };

    await result.current.addMemo(mockMemoData);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockMemoData);

    // 成功時のtoast表示
    expect(mockToast).toHaveBeenCalledWith({ title: 'メモを追加しました' });

    // invalidateQueries が呼ばれることを確認
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
  });

  it('updateMemoService を呼び出し、成功時に toast と invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);

    useApiMutation.mockImplementation((options: any) => {
      return {
        mutateAsync: async (data: any) => {
          const result = await mockMutateAsync(data);
          if (options.onSuccess) {
            await options.onSuccess(result, data, undefined);
          }
          return result;
        },
        mutate: vi.fn(),
        data: undefined,
        error: null,
        isError: false,
        isIdle: false,
        isPending: false,
        isSuccess: true,
        reset: vi.fn(),
        status: 'success',
      } as unknown as UseMutationResult;
    });

    const { result } = renderHook(() => useMemos(), { wrapper });

    const mockId = '123';
    const mockUpdates = {
      title: '更新されたテストメモ',
      content: '更新された内容',
      importance: 'low',
      category: '更新',
      tags: ['test'],
    };

    await result.current.updateMemo(mockId, mockUpdates);

    expect(mockMutateAsync).toHaveBeenCalledWith({ id: mockId, updates: mockUpdates });
    expect(mockToast).toHaveBeenCalledWith({ title: 'メモを更新しました' });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
  });

  it('deleteMemoService を呼び出し、成功時に toast と invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);

    useApiMutation.mockImplementation((options: any) => {
      return {
        mutateAsync: async (data: any) => {
          const result = await mockMutateAsync(data);
          if (options.onSuccess) {
            await options.onSuccess(result, data, undefined);
          }
          return result;
        },
        mutate: vi.fn(),
        data: undefined,
        error: null,
        isError: false,
        isIdle: false,
        isPending: false,
        isSuccess: true,
        reset: vi.fn(),
        status: 'success',
      } as unknown as UseMutationResult;
    });

    const { result } = renderHook(() => useMemos(), { wrapper });

    const mockId = '123';

    await result.current.deleteMemo(mockId);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockId);
    expect(mockToast).toHaveBeenCalledWith({ title: 'メモを削除しました' });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
  });

  // カテゴリ関連のテスト
  it('fetchCategory クエリがカテゴリ一覧データを返すこと', () => {
    const mockCategories: Category[] = [{ name: 'テストカテゴリ' }];
    useApiQuery.mockReturnValue({
      data: mockCategories,
      isLoading: false,
      isError: false,
      status: 'success',
    } as unknown as UseQueryResult<Category[], Error>);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.fetchCategory.data).toEqual(mockCategories);
  });

  it('useGetCategory クエリが個別カテゴリデータを返すこと', async () => {
    const mockCategory = { id: 1, name: 'テストカテゴリ', user_id: 'test-user-id' };
    useApiQuery.mockReturnValue({
      data: mockCategory,
      isLoading: false,
      isError: false,
      status: 'success',
    } as unknown as UseQueryResult<Category | undefined, Error>);

    const { result } = renderHook(() => useMemos().useGetCategory(1), { wrapper });
    expect(result.current.data).toEqual(mockCategory);
  });

  it('addCategory を呼び出し、成功時に invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);
    useApiMutation.mockImplementation(
      (options: any) =>
        ({
          mutateAsync: async (data: any) => {
            const result = await mockMutateAsync(data);
            await options.onSuccess?.(result, data, undefined);
            return result;
          },
          status: 'success',
        }) as unknown as UseMutationResult,
    );

    const { result } = renderHook(() => useMemos(), { wrapper });
    const mockCategoryData = { name: 'テストカテゴリ', user_id: 'test-user-id' };

    await result.current.addCategory(mockCategoryData);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockCategoryData);
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['category'] });
  });

  // タグ関連のテスト
  it('fetchTags クエリがタグ一覧データを返すこと', () => {
    const mockTags: Tag[] = [{ name: 'テストタグ' }];
    useApiQuery.mockReturnValue({
      data: mockTags,
      isLoading: false,
      isError: false,
      status: 'success',
    } as unknown as UseQueryResult<Tag[], Error>);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.fetchTags.data).toEqual(mockTags);
  });

  it('useGetTag クエリが個別タグデータを返すこと', async () => {
    const mockTag = { id: 1, name: 'テストタグ', user_id: 'test-user-id' };
    useApiQuery.mockReturnValue({
      data: mockTag,
      isLoading: false,
      isError: false,
      status: 'success',
    } as unknown as UseQueryResult<Tag | undefined, Error>);

    const { result } = renderHook(() => useMemos().useGetTag(1), { wrapper });
    expect(result.current.data).toEqual(mockTag);
  });

  it('addTag を呼び出し、成功時に invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);
    useApiMutation.mockImplementation(
      (options: any) =>
        ({
          mutateAsync: async (data: any) => {
            const result = await mockMutateAsync(data);
            await options.onSuccess?.(result, data, undefined);
            return result;
          },
          status: 'success',
        }) as unknown as UseMutationResult,
    );

    const { result } = renderHook(() => useMemos(), { wrapper });
    const mockTagData = { name: 'テストタグ', user_id: 'test-user-id' };

    await result.current.addTag(mockTagData);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockTagData);
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['tag'] });
  });

  it('updateTag を呼び出し、成功時に invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);
    useApiMutation.mockImplementation(
      (options: any) =>
        ({
          mutateAsync: async (data: any) => {
            const result = await mockMutateAsync(data);
            await options.onSuccess?.(result, data, undefined);
            return result;
          },
          status: 'success',
        }) as unknown as UseMutationResult,
    );

    const { result } = renderHook(() => useMemos(), { wrapper });
    const mockTagData = { id: 1, name: 'テストタグ更新', user_id: 'test-user-id' };

    await result.current.updateTag(mockTagData);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockTagData);
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['tag'] });
  });

  it('deleteTag を呼び出し、成功時に invalidateQueries を実行すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);
    useApiMutation.mockImplementation(
      (options: any) =>
        ({
          mutateAsync: async (data: any) => {
            const result = await mockMutateAsync(data);
            await options.onSuccess?.(result, data, undefined);
            return result;
          },
          status: 'success',
        }) as unknown as UseMutationResult,
    );

    const { result } = renderHook(() => useMemos(), { wrapper });
    const tagId = 1;

    await result.current.deleteTag(tagId);

    expect(mockMutateAsync).toHaveBeenCalledWith(tagId);
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['tag'] });
  });
});
