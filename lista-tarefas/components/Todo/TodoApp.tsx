"use client";

import React from "react";
import TodoForm from "@/components/Todo/TodoForm";
import TodoList from "@/components/Todo/TodoList";
import { useEstadoPersistente } from "@/lib/usePersistedState";
import type { Tarefa } from "@/components/Todo/types";

export default function TodoApp() {
  const [tarefas, setTarefas] = useEstadoPersistente<Tarefa[]>("tarefas", []);

  const adicionarTarefa = (texto: string) => {
    if (!texto.trim()) return;
    const t: Tarefa = { id: String(Date.now()), texto: texto.trim(), concluida: false };
    setTarefas((prev: Tarefa[]) => [t, ...prev]);
  };

  const alternarConcluida = (id: string) => {
    setTarefas((prev: Tarefa[]) => prev.map((t: Tarefa) => (t.id === id ? { ...t, concluida: !t.concluida } : t)));
  };

  const removerTarefa = (id: string) => {
    setTarefas((prev: Tarefa[]) => prev.filter((t: Tarefa) => t.id !== id));
  };

  const pendentes = tarefas.filter((t: Tarefa) => !t.concluida).length;
  const concluidas = tarefas.length - pendentes;

  return (
    <section className="bg-white dark:bg-[#0b0b0b] rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Lista de Tarefas</h1>

      <div className="mb-4">
        <TodoForm aoAdicionar={adicionarTarefa} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span>Tarefas pendentes: <strong className="ml-1 text-zinc-900 dark:text-zinc-50">{pendentes}</strong></span>
          <span>Concluídas: <strong className="ml-1 text-zinc-900 dark:text-zinc-50">{concluidas}</strong></span>
        </div>
      </div>

      <TodoList tarefas={tarefas} aoAlternar={alternarConcluida} aoRemover={removerTarefa} />
    </section>
  );
}
