import React, { useState } from "react";

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = ({
  todos,
  setTodos,
}: {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}) => {
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

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
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
          className="btn"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>
      <ul className="w-full mt-4 space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center cursor-pointer`}
            onClick={() => toggleTodo(todo.id)}
          >
            <input type="checkbox" checked={todo.completed} className="mr-3" />
            <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
            <button
              className="ml-auto px-1 py-0.5 text-sm bg-red-50 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(todo.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function TodoPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  return (
    <div className="container min-h-screen pt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <div className="question my-12">
        Implement a todo list that:
        <ul className="list-inside list-disc mt-1 space-y-1">
          <li>Has a text input to add a new task, and field clears when a new task is added</li>
          <li>
            Able to create a task by pressing a button, and by pressing Enter on keyboard when
            typing
          </li>
          <li>Able to toggle a task by clicking on it</li>
          <li>Able to remove a task by clicking on the remove button</li>
        </ul>
      </div>
    </div>
  );
}
