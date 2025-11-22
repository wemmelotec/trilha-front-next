# Refatoração para Server Actions

## Mudanças Realizadas

O projeto foi completamente refatorado para usar **Server Actions** do Next.js 14+ em vez de client-side services, seguindo as melhores práticas modernas.

### 🔐 Principais Melhorias de Segurança

#### Antes (Client-side)

- ❌ Tokens JWT armazenados em `localStorage` (acessível por JavaScript)
- ❌ Requisições API feitas diretamente do navegador
- ❌ Tokens expostos no código do cliente

#### Depois (Server-side)

- ✅ Tokens JWT em **cookies HTTP-only** (não acessíveis por JavaScript)
- ✅ Requisições API processadas no servidor Next.js
- ✅ Tokens nunca expostos ao cliente
- ✅ Proteção contra ataques XSS

### 📁 Estrutura Nova

```
src/
├── actions/              # ← NOVO: Server Actions
│   ├── authActions.ts
│   ├── clientesActions.ts
│   └── contasActions.ts
├── app/
│   └── api/             # ← NOVO: Route Handlers
│       └── auth/
│           └── check/
│               └── route.ts
└── contexts/
    └── AuthContext.tsx  # ← ATUALIZADO
```

### 🗑️ Arquivos Removidos

```
src/
├── services/           # ← REMOVIDO
│   ├── auth.service.ts
│   ├── cliente.service.ts
│   └── conta.service.ts
└── lib/
    └── api.ts         # ← REMOVIDO
```

## 🔧 Server Actions Criadas

### authActions.ts

- `login()` - Faz login e armazena tokens em cookies
- `logout()` - Remove cookies de autenticação
- `isAuthenticated()` - Verifica se usuário está autenticado
- `getAccessToken()` - Retorna token de acesso (server-only)
- `refreshAccessToken()` - Renova token expirado

### clientesActions.ts

- `getClientes()` - Lista todos os clientes
- `getClienteById()` - Busca cliente por ID
- `createCliente()` - Cria novo cliente
- `updateCliente()` - Atualiza cliente existente
- `deleteCliente()` - Remove cliente

### contasActions.ts

- `getContas()` - Lista todas as contas
- `getContaById()` - Busca conta por ID
- `createConta()` - Cria nova conta
- `updateConta()` - Atualiza conta existente
- `deleteConta()` - Remove conta
- `realizarDeposito()` - Processa depósito
- `realizarSaque()` - Processa saque

## 🔄 Como Usar Server Actions

### Exemplo: Login

```typescript
// Antes (Client Service)
import { authService } from "@/services/auth.service";
await authService.login({ username, password });

// Depois (Server Action)
import { login } from "@/actions/authActions";
const result = await login(username, password);
if (result.success) {
  // Login bem-sucedido
}
```

### Exemplo: Criar Cliente

```typescript
// Antes (Client Service)
import { clienteService } from "@/services/cliente.service";
await clienteService.createCliente(cliente);

// Depois (Server Action)
import { createCliente } from "@/actions/clientesActions";
const result = await createCliente(cliente);
if (result.success) {
  // Cliente criado com sucesso
}
```

## 🍪 Cookies HTTP-Only

Os tokens são armazenados em cookies seguros:

```typescript
cookies().set("access_token", token, {
  httpOnly: true, // Não acessível por JavaScript
  secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
  sameSite: "lax", // Proteção CSRF
  maxAge: 60 * 60, // 1 hora
});
```

## 🔄 Refresh Automático de Token

O sistema automaticamente renova tokens expirados:

```typescript
// Se receber 401, tenta refresh
if (response.status === 401) {
  const refreshed = await refreshAccessToken();
  if (refreshed) {
    // Tenta novamente com novo token
  }
}
```

## 📝 Revalidação de Cache

As actions usam `revalidatePath()` para atualizar o cache do Next.js:

```typescript
await createCliente(cliente);
revalidatePath("/clientes"); // Atualiza cache da listagem
```

## ✅ Benefícios

1. **Segurança**: Cookies HTTP-only protegem contra XSS
2. **Performance**: Server Components reduzem JavaScript no cliente
3. **Simplicidade**: Actions são funções assíncronas simples
4. **Type-Safety**: TypeScript end-to-end
5. **Cache Inteligente**: Next.js gerencia cache automaticamente
6. **Melhor UX**: Menos código no cliente = carregamento mais rápido

## 🚀 Próximos Passos

- Adicionar loading states otimizados
- Implementar revalidação em tempo real
- Adicionar tratamento de erro global
- Configurar rate limiting nas actions
