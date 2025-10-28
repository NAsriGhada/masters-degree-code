import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post("/api/todos", { text: text.trim() });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1>📝 MERN Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
