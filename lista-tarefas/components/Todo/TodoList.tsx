"use client";

import React from "react";
import type { Todo } from "@/components/Todo/types";
import TodoItem from "@/components/Todo/TodoItem";

export default function TodoList({
  todos,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  if (todos.length === 0)
    return <p className="text-center text-zinc-500">Nenhuma tarefa. Adicione uma acima.</p>;

  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
