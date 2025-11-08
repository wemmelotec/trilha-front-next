# Guia de Consulta: Next.js (App Router) ↔ Angular

Este README é uma documentação para quem está começando com Next.js e quer entender como os projetos que você tem neste workspace se comparam com a forma de estruturar e implementar as mesmas funcionalidades em Angular.

Aqui estão os projetos analisados como base:
- calculadora/ — app Next.js com um `contador` (Client Component usando `useState`).
- lista-tarefas/ — app Next.js com uma To‑Do List (componentes React client, persistência em localStorage).

Objetivo deste guia
- Mapear os arquivos e conceitos que aparecem nos projetos Next.js.
- Mostrar equivalentes diretos em Angular (arquivos, sintaxe, padrões).
- Incluir exemplos curtos de código (Next.js ↔ Angular) para as peças principais: página/rota, componente cliente, formulário, serviço de persistência.

---

## 1) Rápido mapeamento de conceitos

- Página / Rota
  - Next.js (App Router): arquivos em `app/<segment>/page.tsx` são rotas. Ex.: `app/tarefas/page.tsx` é acessível em `/tarefas`.
  - Angular: rotas definidas em um `RouterModule` (arquivo de rotas) e componentes associados. Ex.: `{ path: 'tarefas', component: TarefasComponent }`.

- Layout / Root
  - Next.js: `app/layout.tsx` descreve o layout raiz (metadata, fontes, css global).
  - Angular: `app.component.html` e `app.module.ts` + `index.html` (o `AppComponent` é raiz). Você pode criar `SharedModule`/`CoreModule` para layout compartilhado.

- Componentes Interativos
  - Next.js: Client Components (coloque `"use client"` no topo). Hooks como `useState`, `useEffect` são usados.
  - Angular: Componentes com decorator `@Component`, usam propriedades, `@Input()` / `@Output()` e ciclo de vida (`ngOnInit`, `ngOnDestroy`). Estado local é simples em propriedades da classe.

- Estado e Persistência
  - Next.js: `useState` + hooks customizados. Ex.: `usePersistedState` salva em `localStorage` no client.
  - Angular: geralmente criar `@Injectable()` services (singleton) para gerenciar estado e persistência. Para persistência local, usar `localStorage` dentro do service.

- Estilos
  - Next.js: tailwind importado via `postcss` e `globals.css`. Também é comum usar CSS Modules ou styled-components.
  - Angular: pode usar Tailwind, CSS global em `styles.css`, ou estilos por componente (`.component.css`) — o Angular encapsula estilos por padrão.

---

## 2) Exemplo: Componente Contador

Next.js (arquivo `app/contador/page.tsx` — Client Component):

```tsx
"use client"
import { useState } from 'react'

export default function Contador() {
  const [contagem, setContagem] = useState(0)
  return (
    <div>
      <h1>Contador</h1>
      <p>{contagem}</p>
      <button onClick={() => setContagem(c => c + 1)}>Incrementar</button>
    </div>
  )
}
```

Equivalente em Angular (component):

```ts
// contador.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent {
  contagem = 0;
  incrementar() { this.contagem += 1; }
}
```

```html
<!-- contador.component.html -->
<div>
  <h1>Contador</h1>
  <p>{{ contagem }}</p>
  <button (click)="incrementar()">Incrementar</button>
</div>
```

Observações:
- No React (Next.js) usamos função e hooks. No Angular usamos classes e data binding `{{ }}` + event bindings `(click)`.

---

## 3) Exemplo: To‑Do List (arquitetura básica)

Next.js (implementação no projeto `lista-tarefas`):
- `app/tarefas/page.tsx` — Server Component que importa e renderiza `TodoApp` (Client Component).
- `components/Todo/TodoApp.tsx` — gerencia estado `tarefas` com `useEstadoPersistente` (localStorage).
- `TodoForm.tsx`, `TodoList.tsx`, `TodoItem.tsx` — componentes filhos que recebem props e disparam callbacks.

Trecho simplificado (Next.js):

```tsx
// TodoApp.tsx (client)
"use client"
import { useEstadoPersistente } from '@/lib/usePersistedState'

function TodoApp() {
  const [tarefas, setTarefas] = useEstadoPersistente('tarefas', [])
  const adicionar = (texto: string) => setTarefas(prev => [{ id: Date.now(), texto, concluida: false }, ...prev])
  // ...alternar, remover
}
```

Equivalente em Angular: componente + service

1) Service para gerenciar tarefas (persistência local):

```ts
// tarefas.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TarefasService {
  private key = 'tarefas'
  listar() {
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : []
  }
  salvar(tarefas: any[]) { localStorage.setItem(this.key, JSON.stringify(tarefas)) }
}
```

2) Component que usa o service:

```ts
// tarefas.component.ts
import { Component, OnInit } from '@angular/core';
import { TarefasService } from './tarefas.service';

@Component({ selector: 'app-tarefas', templateUrl: './tarefas.component.html' })
export class TarefasComponent implements OnInit {
  tarefas: any[] = [];
  constructor(private svc: TarefasService) {}
  ngOnInit() { this.tarefas = this.svc.listar() }
  adicionar(texto: string) {
    const t = { id: Date.now(), texto, concluida: false };
    this.tarefas = [t, ...this.tarefas];
    this.svc.salvar(this.tarefas);
  }
  alternar(id: number) { /* atualizar e salvar */ }
}
```

```html
<!-- tarefas.component.html -->
<app-todo-form (aoAdicionar)="adicionar($event)"></app-todo-form>
<div *ngFor="let t of tarefas">
  <input type="checkbox" [(ngModel)]="t.concluida" (change)="svc.salvar(tarefas)" />
  {{ t.texto }}
</div>
```

Observações:
- Em Angular é comum separar lógica de persistência em `Services` (injeção de dependência) e usar `ngOnInit` para carregar dados.
- Componentes filhos se comunicam via `@Input()` e `@Output()` (em Angular) — equivalente a passar props/callbacks em React.

---

## 4) Rotas e Arquitetura de Pastas

- Next.js (App Router):
  - `app/` corresponde a rota por pasta/arquivo: `app/tarefas/page.tsx` → `/tarefas`.
  - `app/layout.tsx` é aplicado automaticamente às rotas filhas.

- Angular:
  - Rotas centralizadas (ex.: `app-routing.module.ts`) mapeiam path → component.
  - Layouts são implementados com componentes compartilhados (ex.: `MainLayoutComponent` que contém `<router-outlet></router-outlet>`).

Exemplo Angular minimal de rotas:

```ts
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tarefas', component: TarefasComponent },
];
```

---

## 5) Ferramentas e Configuração (TS, Tailwind, ESLint)

- Ambos os projetos usam TypeScript. Em Next.js, `tsconfig.json` e `next` cuidam do bundling.
- Em Angular, `angular.json` e o CLI (`ng`) cuidam do build. A configuração de `tsconfig.json` é semelhante.
- Tailwind pode ser usado em ambos via PostCSS — em Angular você adicionaria a importação no `styles.css` e configura `postcss`/`tailwind.config.js`.

---

## 6) Ciclo de vida / Hooks

- Next.js / React: `useEffect`, `useMemo`, `useCallback`, etc. São funções chamadas dentro de Client Components.
- Angular: lifecycle hooks como `ngOnInit`, `ngOnChanges`, `ngOnDestroy` em componentes de classe.

Mapeamento rápido:
- `useEffect(() => {}, [])` → `ngOnInit()` (executa ao montar/componente iniciar)
- `useEffect(() => () => cleanup, [])` → `ngOnDestroy()` (limpeza)

---

## 7) Testes

- Next.js/React: `jest`/`vitest` + `react-testing-library` para componentes.
- Angular: `Karma` + `Jasmine` (ou `jest`), `TestBed` para configurar módulos e providers.

---

## 8) Comandos rápidos (PowerShell)

Next.js (dentro da pasta do app):
```powershell
npm install
npm run dev
# build
npm run build
npm run start
```

Angular (CLI):
```powershell
npm install -g @angular/cli
ng new meu-projeto
cd meu-projeto
ng serve
# build
ng build --prod
```

---

## 9) Checklist de migração conceitual (Next.js → Angular)

Se você precisar reescrever as features do Next.js em Angular, siga este fluxo:
1. Identifique rota (app/<seg>/page.tsx) → criar `Component` e rota em `app-routing.module.ts`.
2. Para state local: componente Angular com propriedades; para state compartilhado ou persistente: criar `Service` injetável.
3. Componentes filhos: converta props para `@Input()` e callbacks para `@Output()`.
4. Hooks React (`useEffect`) → lifecycle hooks (ngOnInit, ngOnDestroy).
5. Persistência local (localStorage): encapsular em service.

---

## 10) Recursos para estudo

- Next.js Docs: https://nextjs.org/docs
- React Hooks: https://reactjs.org/docs/hooks-intro.html
- Angular Docs: https://angular.io/docs
- Angular CLI: https://angular.io/cli

---

Se quiser, eu posso:
- Gerar snippets de código completos (arquivos Angular) para cada componente do seu projeto To‑Do e do Contador — prontos para colar em um projeto Angular.
- Adicionar o README gerado dentro de cada projeto (`calculadora/README.md` e `lista-tarefas/README.md`).

Diga qual desejo prefere que eu execute em seguida (ex.: gerar os arquivos Angular correspondentes).
