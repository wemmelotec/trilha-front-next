"use client";

import React, { useState } from "react";

export default function TodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 border rounded-md bg-transparent outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicionar nova tarefa"
        aria-label="Nova tarefa"
      />
      <button type="submit" className="px-4 py-2 bg-foreground text-background rounded-md font-semibold">Adicionar</button>
    </form>
  );
}
