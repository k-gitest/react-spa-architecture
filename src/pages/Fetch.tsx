import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchClient } from '@/lib/fetchClient';
import { trpc as trpcClient } from '@/lib/trpc';
import { useTRPC } from '@/lib/trpc';
import { useMemos } from '@/hooks/use-memos'
import { getQueryKey } from '@trpc/react-query';
import MemoList from '@/components/memo-list';

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
  const trpc = useTRPC();

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

  // createTRPCReactの場合
  const helloRectQuery = trpcClient.hello.useQuery();
  const greetReactQuery = trpcClient.greet.useQuery("hoge");
  const getMemosReactQuery = trpcClient.getMemos.useQuery();
  const getMemosKey = getQueryKey(trpcClient.getMemos, undefined, 'query');
  const invalidateReactMemoKey = () => {
    return queryClient.invalidateQueries({ queryKey: getMemosKey });
  }

  // createTRPCContextの場合
  const helloQuery = useQuery(trpc.hello.queryOptions());
  const greetQuery = useQuery(trpc.greet.queryOptions("hoge"));
  const getMemosQuery = useQuery(trpc.getMemos.queryOptions());
  const memosKey = trpc.getMemos.queryKey();

  const invalidateMemoKey = () => {
    return queryClient.invalidateQueries({ queryKey: memosKey });
  }

  const {memos, isMemosLoading, memosError} = useMemos();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users: {error?.message}</p>;

  return (
    <div>
      {isMemosLoading && <p>memosのLoading...</p>}
      {memosError && <p>{memosError.message}</p>}
      {memos && <div>{memos[0]}</div>}
      {memos?.length === 0 && <p>データがなかったですよ</p>}
      <hr className="my-3" />
      <p>{helloRectQuery.data?.message}</p>
      <p>{greetReactQuery.data?.greeting}</p>
      <div>
        {getMemosReactQuery.isLoading && <p>Loading...</p>}
        {getMemosReactQuery.isError && <p className='color-red-600'>{getMemosReactQuery.error.message}</p>}
        {getMemosReactQuery.data?.map((chunk, index) => <div key={index}>{chunk}</div>)}
        {getMemosReactQuery.data?.length === 0 && <p>データがありません</p>}
        <button type="button" onClick={() => getMemosReactQuery.refetch()}>更新</button>
        <button type="button" onClick={invalidateReactMemoKey}>キー更新</button>
      </div>
      <hr className="my-3" />
      <p>{helloQuery.data?.message}</p>
      <p>{greetQuery.data?.greeting}</p>
      <div>
        {getMemosQuery.isLoading && <p>Loading...</p>}
        {getMemosQuery.isError && <p className='color-red-600'>{getMemosQuery.error.message}</p>}
        {getMemosQuery.data?.map((chunk, index) => <div key={index}>{chunk}</div>)}
        {getMemosQuery.data?.length === 0 && <p>データがありません</p>}
        <button type="button" onClick={() => getMemosQuery.refetch()}>更新</button>
        <button type="button" onClick={invalidateMemoKey}>キー更新</button>
      </div>

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
    </div>
  );
};

export default Fetch;
