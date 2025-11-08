"use client"

//o use client é necessário para usar o useState
//o controle de estado é feito no lado do cliente desta forma
//o padrão do Next.js é o uso do lado do servidor (server side)

import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);

  const incrementar = () => {
    setCount((c) => c + 1);
  }

  const decrementar = () => {
    setCount((c) => c - 1);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "24px", borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", background: "var(--background, #fff)" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Contador</h1>
        <p style={{ margin: "12px 0", fontSize: "2rem", fontWeight: 600 }}>{count}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={incrementar} style={{ padding: "8px 16px", borderRadius: 6 }}>Incrementar</button>
          <button onClick={decrementar} style={{ padding: "8px 16px", borderRadius: 6 }}>Decrementar</button>
        </div>
      </div>
    </div>
  );
}
export default Contador;