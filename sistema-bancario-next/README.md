# 🏦 SistemBank - Sistema Bancário Next.js

Sistema de gerenciamento bancário desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS**.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utility-first
- **React Compiler** - Otimização automática de performance

## 📋 Funcionalidades

### ✅ Autenticação

- Login com JWT (JSON Web Token)
- Refresh automático de token
- Proteção de rotas
- Logout

### 👥 Gestão de Clientes

- Listagem de clientes com paginação
- Cadastro de novos clientes
- Edição de clientes existentes
- Exclusão de clientes
- Campos: nome, CPF, email, senha, status (ativo/inativo), observações

### 💰 Gestão de Contas

- Listagem de contas com informações do cliente
- Cadastro de contas vinculadas a clientes
- Edição de contas
- Exclusão de contas
- Exibição de saldo formatado
- Campos: número, agência, saldo, cliente (relacionamento)

### 💵 Operações Bancárias

- **Depósito**: Adicionar valores à conta
- **Saque**: Retirar valores da conta com validação de saldo
- Cálculo automático de novo saldo
- Validações de saldo insuficiente

## 🎨 Interface

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tabelas Desktop**: Visualização em tabela para telas grandes
- **Cards Mobile**: Cards otimizados para dispositivos móveis
- **Navegação Intuitiva**: Navbar com links para todas as seções
- **Feedback Visual**: Alertas, loading spinners e mensagens de status

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
# ou
yarn install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

## 🔑 API Backend

O sistema está integrado com a API:

```
https://aula-angular.bcorp.tec.br/api
```

### Endpoints principais:

- `POST /token/` - Login
- `POST /token/refresh/` - Refresh token
- `GET/POST/PUT/DELETE /clientes/` - CRUD de clientes
- `GET/POST/PUT/DELETE /contas/` - CRUD de contas

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── auth/login/        # Página de login
│   ├── home/              # Dashboard
│   ├── clientes/          # CRUD de clientes
│   │   ├── cadastro/
│   │   └── editar/[id]/
│   └── contas/            # CRUD de contas e operações
│       ├── cadastro/
│       ├── editar/[id]/
│       ├── deposito/
│       └── saque/
├── components/            # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Loading.tsx
├── contexts/              # Contexts (AuthContext)
│   └── AuthContext.tsx
├── services/              # Serviços de API
│   ├── auth.service.ts
│   ├── cliente.service.ts
│   └── conta.service.ts
├── lib/                   # Utilitários
│   └── api.ts            # Cliente HTTP com interceptor JWT
└── types/                 # Tipos TypeScript
    └── index.ts
```

## 🔐 Autenticação

O sistema utiliza autenticação JWT com:

- **Access Token**: Armazenado no localStorage
- **Refresh Token**: Renovação automática quando access token expira
- **Interceptor HTTP**: Adiciona token automaticamente nas requisições
- **Proteção de Rotas**: Redirecionamento para login se não autenticado

## 💡 Recursos Avançados

### React Compiler

Ativado no `next.config.ts`, proporciona:

- Memoização automática de componentes
- Melhor performance sem `useMemo`/`useCallback` manual

### Tailwind CSS 4

- Nova sintaxe de importação
- Temas inline com `@theme`
- Dark mode suportado

### TypeScript Strict Mode

- Tipagem rigorosa para maior segurança
- Interfaces bem definidas para todos os modelos

## 📱 Responsividade

O sistema é totalmente responsivo:

- **Desktop**: Tabelas completas com todas as colunas
- **Mobile**: Cards otimizados com informações essenciais
- **Navegação Mobile**: Menu hamburguer responsivo

## 🎯 Próximas Melhorias

- [ ] Adicionar testes unitários (Jest/React Testing Library)
- [ ] Implementar transferências entre contas
- [ ] Dashboard com gráficos e estatísticas
- [ ] Histórico de transações
- [ ] Exportação de relatórios
- [ ] Validações avançadas de CPF
- [ ] Máscara de inputs (CPF, valores monetários)

## 📄 Licença

Este projeto é de uso educacional.

## 👨‍💻 Desenvolvimento

Desenvolvido como migração do projeto Angular `sistem-bank` para Next.js, mantendo todas as funcionalidades e melhorando a experiência do usuário com React Server Components e o novo App Router do Next.js.
