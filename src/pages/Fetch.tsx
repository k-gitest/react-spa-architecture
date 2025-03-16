import { FetchClient } from "@/lib/fetchClient"
import { useState, useEffect } from "react"

const http = new FetchClient()

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Fetch = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await http.get<Todo[]>("/todos")
        setTodos(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {todos && todos.map(todo => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.completed}</p>
        </div>
      ))}
    </div>
  )
}

export default Fetch