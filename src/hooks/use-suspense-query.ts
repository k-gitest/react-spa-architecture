import { useEffect } from 'react';
import {
  QueryKey,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

/**
 * Suspense用のエフェクトオプション
 * 
 * 注意: onErrorは含まない
 * - エラーはErrorBoundaryで処理されるため
 * - ErrorBoundary内でerrorHandler()が呼ばれる
 */
interface UseSuspenseEffectOptions<TData> {
  onSuccess?: (data: TData) => void;
  onSettled?: (data: TData) => void;
}

/**
 * useSuspenseQueryカスタムフック
 * 
 * 使い方:
 * const { data } = useApiSuspenseQuery({
 *   queryKey: ['memos'],
 *   queryFn: () => getMemos(),
 * }, {
 *   onSuccess: (data) => console.log('取得成功:', data),
 *   onSettled: (data) => console.log('処理完了:', data),
 * });
 * 
 * @param queryOptions - useSuspenseQueryのオプション
 * @param effectsOptions - onSuccess, onSettledの設定
 * @returns UseSuspenseQueryの結果（dataは必ず存在）
 */
export const useApiSuspenseQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryOptions: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  effectsOptions?: UseSuspenseEffectOptions<TData>,
) => {
  const queryResult = useSuspenseQuery(queryOptions);
  return useSuspenseQueryEffect(queryResult, effectsOptions);
};

/**
 * Suspense用のエフェクトフック
 * 
 * onErrorは除外:
 * - エラーはErrorBoundaryが処理
 * - componentDidCatch内でerrorHandler()が実行される
 * - Toast通知もそこで行われる
 */
export const useSuspenseQueryEffect = <TData, TError>(
  queryResult: UseSuspenseQueryResult<TData, TError>,
  options?: UseSuspenseEffectOptions<TData>,
) => {
  // onSuccess: データ取得成功時
  // queryResult.data は必ず存在する（undefined チェック不要）
  useEffect(() => {
    if (queryResult.isSuccess) {
      options?.onSuccess?.(queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data, options]);

  // onSettled: 処理完了時
  // Suspenseの場合、成功時のみ到達する（エラーはErrorBoundaryへ）
  useEffect(() => {
    if (queryResult.isFetched) {
      options?.onSettled?.(queryResult.data);
    }
  }, [queryResult.isFetched, queryResult.data, options]);

  return queryResult;
};
