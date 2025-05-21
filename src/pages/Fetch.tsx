import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchClient } from '@/lib/fetchClient';
import { trpc as trpcClient } from '@/lib/trpc';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';
import { TRPCClientError } from '@trpc/client';
import { SUPABASE_ANON_KEY } from '@/lib/constants';
import { useSessionStore } from '@/hooks/use-session-store';
import { EDGE_REST_URI } from '@/lib/constants';

const http = new FetchClient();
const edge = new FetchClient({
  baseUrl: EDGE_REST_URI,
  timeout: 5000,
  maxRetry: 2,
});

const fetchTodo = async (): Promise<Todo[]> => {
  console.log('fetch!!');
  return http.get<Todo[]>('/todos');
};

type ZodErrorData = {
  zodError?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
};

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Fetch = () => {
  const session = useSessionStore((state) => state.session);
  const [todos, setTodos] = useState<Todo[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodo,
    enabled: false,
  });

  const fetchEdge = useCallback(
    async (id: string) => {
      try {
        const result = await edge.post('/save-memo/drizzle', {
          headers: {
            Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ name: 'test', user_id: id }),
        });
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    },
    [session?.access_token],
  );

  const fetchData = useCallback(async () => {
    try {
      const data = await http.get<Todo[]>('/todos');
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchEdge(session.user.id);
    }
  }, [session?.user?.id, fetchEdge]);

  const handleFetch = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: ['todo'] });
  }, [queryClient]);

  const helloQuery = useQuery(trpcClient.util.hello.queryOptions());
  const greetQuery = useQuery(trpcClient.util.greet.queryOptions('hoge'));
  const getMemosQuery = useQuery(trpcClient.memo.getMemos.queryOptions());
  const memosKey = useMemo(() => trpcClient.memo.getMemos.queryKey(), []);

  useEffect(() => {
    if (getMemosQuery.error instanceof TRPCClientError) {
      console.log(getMemosQuery.error?.data);
    }
  }, [getMemosQuery.error]);

  useEffect(() => {
    if ((greetQuery.error?.data as ZodErrorData | undefined)?.zodError) {
      console.log((greetQuery.error?.data as ZodErrorData | undefined)?.zodError);
    }
  }, [greetQuery.error?.data]);

  const invalidateMemoKey = useCallback(() => {
    return queryClient.invalidateQueries({ queryKey: memosKey });
  }, [queryClient, memosKey]);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users: {error?.message}</p>;

  const zodError = (greetQuery.error?.data as ZodErrorData | undefined)?.zodError;

  return (
    <MainWrapper>
      <Helmet>
        <title>Fetchページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリで使用するFetchの種類を見る事ができます" />
      </Helmet>
      <h2>tRPCによるフェッチ</h2>
      <p>{helloQuery.data?.message}</p>
      <p>{greetQuery.data?.greeting}</p>

      <p>{zodError?.formErrors && <div>{zodError.formErrors.join(', ')}</div>}</p>
      <p>{zodError?.fieldErrors?.title && <div>{zodError.fieldErrors.title.join(', ')}</div>}</p>
      <div>
        {getMemosQuery.isLoading && <p>Loading...</p>}
        {getMemosQuery.isError && <p className="color-red-600">{getMemosQuery.error.message}</p>}
        {getMemosQuery.data?.map((chunk, index) => <div key={index}>{chunk.title}</div>)}
        {getMemosQuery.data?.length === 0 && <p>データがありません</p>}
        <button type="button" onClick={() => getMemosQuery.refetch()}>
          更新
        </button>
        <button type="button" onClick={invalidateMemoKey}>
          キー更新
        </button>
      </div>
      <hr className="my-3" />
      <h2 className="text-2xl font-bold">tanstackQueryでのフェッチ</h2>
      <button onClick={handleFetch}>再フェッチ</button>
      {data?.map((todo) => (
        <ul key={todo.id}>
          <li>{todo.title}</li>
          <li>{todo.completed}</li>
        </ul>
      ))}
      <h2 className="text-2xl font-bold">fetchClientでのフェッチ</h2>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.completed}</p>
          </div>
        ))}
    </MainWrapper>
  );
};

export default Fetch;
