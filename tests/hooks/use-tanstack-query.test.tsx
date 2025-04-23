import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';
import { createWrapper } from '../setup';

describe('useApiQuery', () => {
  it('クエリが成功したらonSuccessを呼び出す', async () => {
    const mockFn = vi.fn().mockResolvedValue('test-data');
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useApiQuery(
          {
            queryKey: ['test'],
            queryFn: mockFn,
          },
          {
            onSuccess,
          }
        ),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockFn).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith('test-data');
  });

  it('クエリが失敗した場合はonErrorを呼び出す', async () => {
    const mockFn = vi.fn().mockResolvedValue('test-data');
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useApiQuery(
          {
            queryKey: ['test'],
            queryFn: mockFn,
          },
          {
            onSuccess,
          }
        ),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockFn).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith('test-data');
  });
});

describe('useApiMutation', () => {
  it('mutateが成功したらonSuccessを呼び出す', async () => {
    const mutationFn = vi.fn().mockResolvedValue('success!');
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          onSuccess,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mutationFn).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith('success!', undefined, undefined);
  });

  it('mutateが失敗したらonErrorを呼び出す', async () => {
    const mutationFn = vi.fn().mockRejectedValue(new Error('fail'));
    const onError = vi.fn();

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          onError,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onError).toHaveBeenCalled();
  });
});