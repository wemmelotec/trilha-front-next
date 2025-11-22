# 🚀 Guia de Inicialização - SistemBank Next.js

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Acesso à internet (para conectar à API)

## 🔧 Instalação

1. **Instale as dependências:**

```bash
cd sistema-bancario-next
npm install
```

2. **Execute o projeto em modo de desenvolvimento:**

```bash
npm run dev
```

3. **Acesse a aplicação:**
   - Abra o navegador em: [http://localhost:3000](http://localhost:3000)
   - Você será redirecionado automaticamente para a página de login

## 🔐 Login de Teste

Para acessar o sistema, você precisa ter credenciais válidas na API:

```
API: https://aula-angular.bcorp.tec.br/api
```

**Obs:** Se você não tiver credenciais, solicite ao administrador ou crie uma conta através do backend.

## 📱 Navegação

Após o login, você terá acesso a:

1. **🏠 Home** - Dashboard com acesso rápido a todas as funcionalidades
2. **👥 Clientes** - Gerenciamento completo de clientes
3. **💰 Contas** - Gerenciamento de contas bancárias
4. **💵 Depósito** - Realizar depósitos em contas
5. **💸 Saque** - Realizar saques de contas

## 🎯 Funcionalidades Principais

### Clientes

- ✅ Listar todos os clientes (com paginação)
- ✅ Cadastrar novo cliente
- ✅ Editar cliente existente
- ✅ Deletar cliente
- ✅ Ativar/Desativar cliente

### Contas

- ✅ Listar todas as contas (com informações do cliente)
- ✅ Cadastrar nova conta
- ✅ Editar conta existente
- ✅ Deletar conta
- ✅ Visualizar saldo formatado em R$

### Operações

- ✅ Depósito com cálculo automático do novo saldo
- ✅ Saque com validação de saldo insuficiente
- ✅ Feedback visual durante as operações

## 🎨 Responsividade

O sistema é totalmente responsivo:

- **Desktop**: Tabelas completas
- **Mobile**: Cards otimizados
- **Tablet**: Layout híbrido

## 🔒 Segurança

- Autenticação JWT
- Refresh automático de token
- Proteção de rotas
- Logout seguro

## 🐛 Troubleshooting

### Erro de conexão com API

```
Verifique se a API está acessível:
https://aula-angular.bcorp.tec.br/api
```

### Token expirado

- O sistema renova automaticamente
- Se persistir, faça logout e login novamente

### Página em branco

- Limpe o cache do navegador
- Verifique o console do navegador (F12)
- Reinicie o servidor de desenvolvimento

## 📦 Build de Produção

```bash
# Criar build otimizado
npm run build

# Executar em produção
npm run start
```

## 🔄 Comparação com Angular

Este projeto Next.js é uma migração completa do `sistem-bank` Angular, mantendo:

- ✅ Todas as funcionalidades
- ✅ Mesma API backend
- ✅ Layout similar
- ✅ Mesmas validações

**Vantagens do Next.js:**

- ⚡ Performance superior
- 🎨 Tailwind CSS moderno
- 🔄 React Server Components
- 📦 Bundle size menor
- 🚀 Deploy mais simples

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique o console do navegador (F12)
2. Revise a documentação do Next.js
3. Consulte o README.md principal

---

**Desenvolvido com ❤️ usando Next.js 16 + React 19**
