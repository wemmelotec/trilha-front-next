# 💡 Exemplos de Uso - SistemBank

## 🔐 Autenticação

### Login

```typescript
// O sistema usa o AuthContext para gerenciar autenticação
const { login } = useAuth();

await login({
  username: "seu_usuario",
  password: "sua_senha",
});
// Redireciona automaticamente para /home após login bem-sucedido
```

### Verificar se está autenticado

```typescript
const { isAuthenticated } = useAuth();

if (isAuthenticated) {
  // Usuário está logado
}
```

### Logout

```typescript
const { logout } = useAuth();
logout(); // Remove tokens e redireciona para /auth/login
```

---

## 👥 Clientes

### Listar Clientes

```typescript
import { clienteService } from "@/services/cliente.service";

const clientes = await clienteService.getClientes();
// Retorna: ClienteModel[]
```

### Buscar Cliente por ID

```typescript
const cliente = await clienteService.getClienteById(1);
// Retorna: ClienteModel
```

### Criar Cliente

```typescript
const novoCliente = {
  nome: "João Silva",
  cpf: "12345678900",
  email: "joao@email.com",
  senha: "senha123",
  ativo: true,
  observacoes: "Cliente VIP",
};

const clienteCriado = await clienteService.createCliente(novoCliente);
```

### Atualizar Cliente

```typescript
const clienteAtualizado = {
  id: 1,
  nome: "João Silva Santos",
  cpf: "12345678900",
  email: "joao.santos@email.com",
  senha: "senha123",
  ativo: true,
  observacoes: "Cliente VIP - Atualizado",
};

await clienteService.updateCliente(1, clienteAtualizado);
```

### Deletar Cliente

```typescript
await clienteService.deleteCliente(1);
```

---

## 💰 Contas

### Listar Contas

```typescript
import { contaService } from "@/services/conta.service";

const contas = await contaService.getContas();
// Retorna: ContaModel[]
```

### Buscar Conta por ID

```typescript
const conta = await contaService.getContaById(1);
// Retorna: ContaModel
```

### Criar Conta

```typescript
const novaConta = {
  numero: "12345-6",
  agencia: "0001",
  saldo: "1000.00",
  cliente: 1, // ID do cliente
};

const contaCriada = await contaService.createConta(novaConta);
```

### Atualizar Conta

```typescript
const contaAtualizada = {
  id: 1,
  numero: "12345-6",
  agencia: "0001",
  saldo: "1500.00",
  cliente: 1,
};

await contaService.updateConta(1, contaAtualizada);
```

### Deletar Conta

```typescript
await contaService.deleteConta(1);
```

---

## 💵 Operações Bancárias

### Realizar Depósito

```typescript
const deposito = {
  conta: 1, // ID da conta
  valor: "500.00",
};

const contaAtualizada = await contaService.realizarDeposito(deposito);
// Retorna a conta com o saldo atualizado
```

### Realizar Saque

```typescript
const saque = {
  conta: 1, // ID da conta
  valor: "200.00",
};

try {
  const contaAtualizada = await contaService.realizarSaque(saque);
  // Retorna a conta com o saldo atualizado
} catch (error) {
  // Erro: Saldo insuficiente
  console.error(error.message);
}
```

---

## 🎨 Componentes UI

### Button

```tsx
import Button from '@/components/Button';

// Variantes: primary, secondary, danger, success
<Button variant="primary" onClick={handleClick}>
  Clique aqui
</Button>

<Button variant="danger" disabled={isLoading}>
  {isLoading ? 'Carregando...' : 'Deletar'}
</Button>
```

### Card

```tsx
import Card from '@/components/Card';

<Card title="Título do Card">
  <p>Conteúdo do card</p>
</Card>

<Card className="bg-blue-50">
  <p>Card com cor customizada</p>
</Card>
```

### Loading

```tsx
import Loading from "@/components/Loading";

{
  isLoading && <Loading />;
}
```

### Navbar

```tsx
// Navbar é adicionado automaticamente no layout
// Não mostra na página de login
// Possui links: Home, Clientes, Contas, Sair
```

---

## 🔧 Utilitários

### Formatar Saldo

```typescript
const formatarSaldo = (saldo: string) => {
  const valor = parseFloat(saldo);
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

formatarSaldo("1500.00"); // R$ 1.500,00
```

### Validar CPF (exemplo)

```typescript
const validarCPF = (cpf: string) => {
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  return cpfLimpo.length === 11;
};
```

---

## 📱 Navegação

### Programática

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

// Navegar para outra página
router.push("/clientes");

// Voltar
router.back();

// Atualizar página atual
router.refresh();
```

### Com Link

```tsx
import Link from "next/link";

<Link href="/clientes" className="text-blue-600">
  Ver Clientes
</Link>;
```

---

## 🎯 Hooks Personalizados

### useAuth

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) {
    return <p>Faça login para continuar</p>;
  }

  return (
    <div>
      <p>Bem-vindo!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## 🚀 Fluxos Completos

### Fluxo de Login

```
1. Usuário acessa /
2. Sistema verifica autenticação
3. Se não autenticado → /auth/login
4. Usuário preenche credenciais
5. Sistema envia para API
6. API retorna tokens
7. Tokens salvos no localStorage
8. Redirecionamento para /home
```

### Fluxo de CRUD Cliente

```
1. Acessa /clientes (listagem)
2. Clica "Novo Cliente"
3. Preenche formulário em /clientes/cadastro
4. Submete formulário
5. API cria cliente
6. Redirecionamento para /clientes
7. Lista atualizada com novo cliente
```

### Fluxo de Depósito

```
1. Acessa /contas/deposito
2. Seleciona conta
3. Sistema mostra saldo atual
4. Usuário informa valor
5. Sistema calcula novo saldo (preview)
6. Usuário confirma
7. API atualiza conta
8. Redirecionamento para /contas
9. Saldo atualizado na listagem
```

---

## 🐛 Tratamento de Erros

### Erros de API

```typescript
try {
  await clienteService.createCliente(dados);
} catch (error) {
  console.error("Erro ao criar cliente:", error);
  alert("Erro ao criar cliente!");
}
```

### Erros de Autenticação

```typescript
// O interceptor trata automaticamente
// - 401: Tenta refresh do token
// - Se refresh falhar: Logout automático
// - Outros erros: Propaga para o catch
```

---

## 💾 LocalStorage

```typescript
// Access Token
localStorage.getItem("access_token");
localStorage.setItem("access_token", token);
localStorage.removeItem("access_token");

// Refresh Token
localStorage.getItem("refresh_token");
localStorage.setItem("refresh_token", token);
localStorage.removeItem("refresh_token");
```

---

## 🎨 Estilização com Tailwind

### Classes Úteis

```tsx
// Layout
className = "flex items-center justify-center";
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

// Responsividade
className = "hidden md:block"; // Mostra apenas em desktop
className = "md:hidden"; // Mostra apenas em mobile

// Cores
className = "bg-blue-600 text-white";
className = "bg-green-100 text-green-800";

// Espaçamento
className = "px-4 py-2 mt-4 mb-6";

// Bordas
className = "rounded-lg border border-gray-300";

// Hover e Transições
className = "hover:bg-blue-700 transition-colors";
```

---

Este guia cobre os principais casos de uso do SistemBank! 🚀
