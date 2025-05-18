import { renderHook, waitFor } from '@testing-library/react';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-trpc';
import { QueryClient, QueryClientProvider, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { MemoFormData } from '@/features/memo/types/memo-form-data';

// tRPCのモック
vi.mock('@/lib/trpc', () => {
  return {
    trpc: {
      memo: {
        getMemos: {
          queryKey: vi.fn().mockReturnValue(['memos']),
          queryOptions: vi.fn().mockReturnValue({}),
        },
        getMemo: {
          queryOptions: vi.fn((input) => ({
            queryKey: ['memo', input?.id],
            enabled: !!input?.id,
          })),
        },
        addMemo: {
          mutationOptions: vi.fn(),
        },
        updateMemo: {
          mutationOptions: vi.fn(),
        },
        deleteMemo: {
          mutationOptions: vi.fn(),
        },
        getCategories: {
          queryKey: vi.fn().mockReturnValue(['categories']),
          queryOptions: vi.fn().mockReturnValue({}),
        },
        getCategory: {
          queryOptions: vi.fn((input) => ({
            queryKey: ['category', input?.id],
            enabled: !!input?.id,
          })),
        },
        getTags: {
          queryKey: vi.fn().mockReturnValue(['tags']),
          queryOptions: vi.fn().mockReturnValue({}),
        },
        getTag: {
          queryOptions: vi.fn((input) => ({
            queryKey: ['tag', input?.id],
            enabled: !!input?.id,
          })),
        },
        addCategory: { mutationOptions: vi.fn() },
        updateCategory: { mutationOptions: vi.fn() },
        deleteCategory: { mutationOptions: vi.fn() },
        addTag: { mutationOptions: vi.fn() },
        updateTag: { mutationOptions: vi.fn() },
        deleteTag: { mutationOptions: vi.fn() },
      },
    },
  };
});

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

    // デフォルトのモック実装をセット
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
    const mockMemos = [
      { id: '1', title: 'テストメモ1', content: '内容1' },
      { id: '2', title: 'テストメモ2', content: '内容2' },
    ];

    useApiQuery.mockReturnValue({
      data: mockMemos,
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
    } as unknown as UseQueryResult);

    const { result } = renderHook(() => useMemos(), { wrapper });

    expect(result.current.isMemosLoading).toBe(false);
    expect(result.current.memos).toEqual(mockMemos);
  });

  it('memos クエリがエラー状態を返すこと', () => {
    const mockError = new Error('Failed to fetch memos');
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
    } as unknown as UseQueryResult);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.memosError).toEqual(mockError);
  });

  it('useGetMemo が指定されたIDのメモを返すこと', async () => {
    const mockMemo = { id: '123', title: '単一メモ', content: 'テスト内容' };

    // モックをリセット
    useApiQuery.mockReset();

    // メモ一覧のクエリと個別メモのクエリの両方に対するモックを設定
    useApiQuery.mockReturnValue({
      data: mockMemo,
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
    } as unknown as UseQueryResult);

    const { result } = renderHook(
      () => {
        const memosHook = useMemos();
        return memosHook.useGetMemo('123');
      },
      { wrapper }
    );

    // act内でawaitを使用して非同期処理の完了を待つ
    await waitFor(() => {
      expect(result.current.data).toEqual(mockMemo);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('id が null の場合、useGetMemoクエリを無効にすること', () => {
    renderHook(() => useMemos().useGetMemo(null), { wrapper });
    // 引数に{ enabled: false }が含まれていることを確認する
    expect(useApiQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
  });

  it('addMemo が正しいパラメータで呼び出され、成功時にクエリを無効化すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ id: 'new-memo-id' });
    
    useApiMutation.mockImplementation((options) => ({
      mutateAsync: mockMutateAsync,
      mutate: vi.fn(),
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      // onSuccessコールバックを保存して後で呼び出せるようにする
      _onSuccess: options?.onSuccess,
    } as unknown as UseMutationResult));

    const { result } = renderHook(() => useMemos(), { wrapper });

    const mockMemoData: MemoFormData = {
      title: 'テストメモ',
      content: 'テスト内容',
      importance: 'high',
      category: 'メモ',
      tags: [],
    };

    await result.current.addMemo(mockMemoData, 'user_id');

    // mutateAsyncの呼び出し引数を確認 
    expect(mockMutateAsync).toHaveBeenCalledWith({
      title: 'テストメモ',
      content: 'テスト内容',
      importance: 'high',
      category: 'メモ',
      tags: [],
      user_id: 'user_id',
    });
    
    // _onSuccessを使用して保存されたコールバックを手動で呼び出す
    const mutation = useApiMutation.mock.results[0].value;
    if (mutation._onSuccess) {
      await mutation._onSuccess();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
    }

  });

  it('updateMemo が正しいパラメータで呼び出され、成功時にクエリを無効化すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ id: 'updated-memo-id' });
    
    // すべての mutation に対して同じ mock 実装を使用
    useApiMutation.mockImplementation((options) => ({
      mutateAsync: mockMutateAsync,
      mutate: vi.fn(),
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      _onSuccess: options?.onSuccess,
    } as unknown as UseMutationResult));

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

    // 実装に合わせて引数構造を確認
    expect(mockMutateAsync).toHaveBeenCalledWith({
      id: mockId,
      data: mockUpdates,
    });
    
    // updateMemo用の mutation は2番目の結果オブジェクトに保存されている
    const updateMutation = useApiMutation.mock.results[1].value;
    if (updateMutation._onSuccess) {
      await updateMutation._onSuccess();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
    }
  });

  it('deleteMemo が正しいパラメータで呼び出され、成功時にクエリを無効化すること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ id: 'deleted-memo-id' });
    
    // すべての mutation に対して同じ mock 実装を使用
    useApiMutation.mockImplementation((options) => ({
      mutateAsync: mockMutateAsync,
      mutate: vi.fn(),
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      _onSuccess: options?.onSuccess,
    } as unknown as UseMutationResult));

    const { result } = renderHook(() => useMemos(), { wrapper });

    const mockId = '123';

    await result.current.deleteMemo(mockId);

    expect(mockMutateAsync).toHaveBeenCalledWith(mockId);
    
    // deleteMemo用の mutation は3番目の結果オブジェクトに保存されている
    const deleteMutation = useApiMutation.mock.results[2].value;
    if (deleteMutation._onSuccess) {
      await deleteMutation._onSuccess();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['memos'] });
    }
  });
  
});

// カテゴリ関連のテスト
describe('Category Operations', () => {
  it('カテゴリ一覧を取得できること', () => {
    const mockCategories = [
      { id: 1, name: 'カテゴリ1', user_id: 'test-user-id' },
      { id: 2, name: 'カテゴリ2', user_id: 'test-user-id' },
    ];

    useApiQuery.mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.fetchCategory.data).toEqual(mockCategories);
  });

  it('カテゴリを追加できること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ id: 1, name: '新規カテゴリ' });
    useApiMutation.mockImplementation((options) => ({
      mutateAsync: mockMutateAsync,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      _onSuccess: options?.onSuccess,
    } as unknown as UseMutationResult));

    const { result } = renderHook(() => useMemos(), { wrapper });

    const newCategory = { name: '新規カテゴリ', user_id: 'test-user-id' };
    await result.current.addCategory(newCategory);

    expect(mockMutateAsync).toHaveBeenCalledWith(newCategory);
    
    const mutation = useApiMutation.mock.results[3].value;
    if (mutation._onSuccess) {
      await mutation._onSuccess();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['categories'] });
    }
  });
});

// タグ関連のテスト
describe('Tag Operations', () => {
  it('タグ一覧を取得できること', () => {
    const mockTags = [
      { id: 1, name: 'タグ1', user_id: 'test-user-id' },
      { id: 2, name: 'タグ2', user_id: 'test-user-id' },
    ];

    useApiQuery.mockReturnValue({
      data: mockTags,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult);

    const { result } = renderHook(() => useMemos(), { wrapper });
    expect(result.current.fetchTags.data).toEqual(mockTags);
  });

  it('タグを追加できること', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ id: 1, name: '新規タグ' });
    useApiMutation.mockImplementation((options) => ({
      mutateAsync: mockMutateAsync,
      isError: false,
      isPending: false,
      isSuccess: true,
      error: null,
      _onSuccess: options?.onSuccess,
    } as unknown as UseMutationResult));

    const { result } = renderHook(() => useMemos(), { wrapper });

    const newTag = { name: '新規タグ', user_id: 'test-user-id' };
    await result.current.addTag(newTag);

    expect(mockMutateAsync).toHaveBeenCalledWith(newTag);
    
    const mutation = useApiMutation.mock.results[6].value;
    if (mutation._onSuccess) {
      await mutation._onSuccess();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['tags'] });
    }
  });
});
