"use client";

import React from "react";
import type { Tarefa } from "@/components/Todo/types";

export default function TodoItem({
  tarefa,
  aoAlternar,
  aoRemover,
}: {
  tarefa: Tarefa;
  aoAlternar: (id: string) => void;
  aoRemover: (id: string) => void;
}) {
  return (
    <li className="flex items-center justify-between p-3 rounded-md border border-solid border-black/[.05] dark:border-white/[.03]">
      <label className="flex items-center gap-3">
        <input type="checkbox" checked={tarefa.concluida} onChange={() => aoAlternar(tarefa.id)} />
        <span className={`${tarefa.concluida ? "line-through text-zinc-500" : ""}`}>{tarefa.texto}</span>
      </label>
      <button onClick={() => aoRemover(tarefa.id)} className="text-sm text-red-500">Remover</button>
    </li>
  );
}
