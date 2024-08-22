import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [todoCount, setTodoCount] = useState<number | undefined>(undefined);
  const [todoCountAlt, setTodoCountAlt] = useState<number | undefined>(undefined);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos([...data.items])
        updateCount();
      }
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  async function updateCount() {
    console.time('updateCount');
    const count = (await client.queries.todoCount({})).data
    console.timeEnd('updateCount');
    setTodoCount(count === null ? undefined : count)
  }

  async function updateCountAlt() {
    console.time('updateCountAlt');
    const count = (await client.queries.todoCount({})).data
    console.timeEnd('updateCountAlt');
    setTodoCountAlt(count === null ? undefined : count)
  }

  return (
    <main>
      <h1>My todos ({todoCount || 'Unknown'}) ({todoCountAlt || 'Unknown'})</h1>
      <button onClick={() => {
        updateCount();
        updateCountAlt();
      }}>
          Update Count
        </button>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
