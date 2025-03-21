import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FetchClient } from '@/lib/fetchClient';

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

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users: {error?.message}</p>;

  return (
    <div>
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
