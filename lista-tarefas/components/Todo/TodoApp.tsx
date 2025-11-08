"use client";

import React from "react";
import TodoForm from "@/components/Todo/TodoForm";
import TodoList from "@/components/Todo/TodoList";
import { usePersistedState } from "@/lib/usePersistedState";
import type { Todo } from "@/components/Todo/types";

export default function TodoApp() {
  const [todos, setTodos] = usePersistedState<Todo[]>("todos", []);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const t: Todo = { id: String(Date.now()), text: text.trim(), completed: false };
    setTodos((prev: Todo[]) => [t, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev: Todo[]) => prev.map((t: Todo) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTodo = (id: string) => {
    setTodos((prev: Todo[]) => prev.filter((t: Todo) => t.id !== id));
  };

  const pending = todos.filter((t: Todo) => !t.completed).length;
  const done = todos.length - pending;

  return (
    <section className="bg-white dark:bg-[#0b0b0b] rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Lista de Tarefas</h1>

      <div className="mb-4">
        <TodoForm onAdd={addTodo} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span>Tarefas pendentes: <strong className="ml-1 text-zinc-900 dark:text-zinc-50">{pending}</strong></span>
          <span>Concluídas: <strong className="ml-1 text-zinc-900 dark:text-zinc-50">{done}</strong></span>
        </div>
      </div>

      <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
    </section>
  );
}
