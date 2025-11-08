"use client";

import React from "react";
import type { Tarefa } from "@/components/Todo/types";
import TodoItem from "@/components/Todo/TodoItem";

export default function TodoList({
  tarefas,
  aoAlternar,
  aoRemover,
}: {
  tarefas: Tarefa[];
  aoAlternar: (id: string) => void;
  aoRemover: (id: string) => void;
}) {
  if (tarefas.length === 0)
    return <p className="text-center text-zinc-500">Nenhuma tarefa. Adicione uma acima.</p>;

  return (
    <ul className="space-y-2">
      {tarefas.map((t) => (
        <TodoItem key={t.id} tarefa={t} aoAlternar={aoAlternar} aoRemover={aoRemover} />
      ))}
    </ul>
  );
}
