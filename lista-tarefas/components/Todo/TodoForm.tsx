"use client";

import React, { useState } from "react";

export default function TodoForm({ aoAdicionar }: { aoAdicionar: (texto: string) => void }) {
  const [texto, setTexto] = useState("");

  const submeter = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!texto.trim()) return;
    aoAdicionar(texto.trim());
    setTexto("");
  };

  return (
    <form onSubmit={submeter} className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 border rounded-md bg-transparent outline-none"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Adicionar nova tarefa"
        aria-label="Nova tarefa"
      />
      <button type="submit" className="px-4 py-2 bg-foreground text-background rounded-md font-semibold">Adicionar</button>
    </form>
  );
}
