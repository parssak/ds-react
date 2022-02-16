import React, { useState } from "react";

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim().length === 0) return;
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return (
    <div className="container min-h-screen pt-8">
      <div className="flex space-x-3">
        <input
          className="p-4 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          type="text"
          placeholder="Add a todo"
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>
      <ul className="w-full md:w-1/2 mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`cursor-pointer space-x-3 ${todo.completed ? "line-through" : ""}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
