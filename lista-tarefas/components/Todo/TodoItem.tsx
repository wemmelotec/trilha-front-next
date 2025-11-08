"use client";

import React from "react";
import type { Todo } from "@/components/Todo/types";

export default function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <li className="flex items-center justify-between p-3 rounded-md border border-solid border-black/[.05] dark:border-white/[.03]">
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <span className={`${todo.completed ? "line-through text-zinc-500" : ""}`}>{todo.text}</span>
      </label>
      <button onClick={() => onRemove(todo.id)} className="text-sm text-red-500">Remover</button>
    </li>
  );
}
