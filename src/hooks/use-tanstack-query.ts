import { useEffect } from 'react';
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { errorHandler } from '@/errors/error-handler';

/* tanstack queryのカスタムフックと共通設定 */
/* useQueryApiの使い方（視覚的に分かり易いようにプロパティを明示的に書く）

   const { isLoading, data } = useApiQuery({
      queryKey: ['key'],
      queryFn:  () => getApiData(),
      enabled: false,
   },{
      onSuccess: () => console.log("success!"),
      onError: () => console.log("error!"),
      onSettled: () => console.log("finish!"),
   })
   
   // 引数を受け取る場合
   // 呼び出す場合はuseプレフィックスが必要
   const useGetData = (id: string) => {
      return useApiQuery({
        queryKey: ['key', id],
        queryFn:  () => getApiData(id),
        enabled: !!id,
      },{
        onSuccess: () => console.log("success!"),
        onError: () => console.log("error!"),
        onSettled: () => console.log("finish!"),
      })
   }
*/

interface UseEffectOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (arg: TData | TError | undefined | null) => void;
}

/**
 * useQueryカスタムフック
 * @param queryKey - クエリのキー
 * @param queryFn - データを取得する非同期関数
 * @param queryOptions - useQueryのオプション
 * @param effectsOptions - useQueryEffectに渡すonSuccess, onError, onSettledの設定
 * @returns UseQueryの結果
 */
export const useApiQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  effectsOptions?: UseEffectOptions<TData, TError>,
) => {
  const queryResult = useQuery(queryOptions);
  return useQueryEffect(queryResult, effectsOptions);
};

/*
   tanstack query v5からonSuccess, onError, onSettledが削除されたのでuseEffectで共通設定を行う
*/
export const useQueryEffect = <TData, TError>(
  queryResult: UseQueryResult<TData, TError>,
  options?: UseEffectOptions<TData, TError>,
) => {
  /*optionsはuseApiQueryが呼ばれるたびに参照が変わる可能性が高い
    useEffectの依存配列にoptions?onSuccessとしていたがeslintエラーでoptionsへ変更
    optionsを依存配列に含める場合、コールバック関数を呼び出し側でuseCallbackもしくはuseMemoを使用し再レンダリング対策をする
    optionsが動的変更しない前提であればuseRefを使用して依存配列から除外する
    useRefを使用する場合はカスタムRefを作成し共通フックとして利用する
  */
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data !== undefined) {
      options?.onSuccess?.(queryResult.data);
    }
  }, [queryResult.isSuccess, queryResult.data, options]);

  useEffect(() => {
    if (queryResult.isError && queryResult.error !== null) {
      //カスタムオプションのエラー
      options?.onError?.(queryResult.error);
      //共通エラーハンドラ
      errorHandler(queryResult.error);
    }
  }, [queryResult.isError, queryResult.error, options]);

  useEffect(() => {
    if (queryResult.isFetched) {
      options?.onSettled?.(queryResult.isSuccess ? queryResult.data : queryResult.error);
    }
  }, [queryResult.isFetched, queryResult.isSuccess, queryResult.data, queryResult.error, options]);

  return queryResult;
};

/* useMutationのカスタムフック
   OmitしているのはtrpcのmutationOptions用の型
   useApiMutationの書き方（useApiQueryに併せてプロパティを明示）

   const { isPending, data } = useApiMutation({
      mutationFn:  () => getApiData(),
      enabled: false,
      onSuccess: () => console.log("success!"),
      onError: () => console.log("error!"),
      onSettled: () => console.log("finish!"),
   })

   // trpcの場合mutationOptionsでmutationFnとmutationKeyが生成される
   const mutationOptions = trpc.hello.mutationOptions({
       onSuccess: (data) => {
         if (data) console.log(data);
       },
     });
     const mutation = useApiMutation(mutationOptions);
*/
/**
 * useMutationカスタムフック
 * @param mutationFn - 実行する非同期関数
 * @param options - useMutationのオプション
 * @returns UseMutationの結果
 */
export const useApiMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options:
    | (UseMutationOptions<TData, TError, TVariables, TContext> & {
        mutationFn: (variables: TVariables) => Promise<TData>;
      })
    | Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation<TData, TError, TVariables, TContext>({
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      errorHandler(error);
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
    ...options,
  });
};
