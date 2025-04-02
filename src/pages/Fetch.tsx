import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchClient } from '@/lib/fetchClient';
import { trpc as trpcClient } from '@/lib/trpc';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const http = new FetchClient();

const fetchTodo = async (): Promise<Todo[]> => {
  return http.get<Todo[]>('/todos');
};

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Fetch = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todo'],
    queryFn: fetchTodo,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await http.get<Todo[]>('/todos');
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleFetch = () => {
    return queryClient.invalidateQueries({ queryKey: ['todo'] });
  };

  // createTRPCOptionsProxyの場合
  const helloQuery = useQuery(trpcClient.hello.queryOptions());
  const greetQuery = useQuery(trpcClient.greet.queryOptions('hoge'));
  const getMemosQuery = useQuery(trpcClient.getMemos.queryOptions());
  const memosKey = trpcClient.getMemos.queryKey();

  const invalidateMemoKey = () => {
    return queryClient.invalidateQueries({ queryKey: memosKey });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users: {error?.message}</p>;

  return (
    <MainWrapper>
      <Helmet>
        <title>Fetchページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリで使用するFetchの種類を見る事ができます" />
      </Helmet>
      <h2>tRPCによるフェッチ</h2>
      <p>{helloQuery.data?.message}</p>
      <p>{greetQuery.data?.greeting}</p>
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
