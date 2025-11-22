# 🛠️ Comandos Úteis - SistemBank

## 📦 NPM/Yarn

### Instalação

```bash
# Instalar todas as dependências
npm install

# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Servidor em porta específica
npm run dev -- -p 3001

# Turbopack (experimental, mais rápido)
npm run dev -- --turbo
```

### Build e Produção

```bash
# Criar build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Build + Start
npm run build && npm run start
```

### Qualidade de Código

```bash
# Executar ESLint
npm run lint

# Executar ESLint e corrigir automaticamente
npm run lint -- --fix
```

---

## 🔍 Debug e Inspeção

### Ver estrutura do projeto

```bash
# Windows
tree /F src

# PowerShell
Get-ChildItem -Recurse src | Select-Object FullName

# Linux/Mac
tree src
```

### Verificar versões

```bash
node --version
npm --version
npx next --version
```

### Limpar build

```bash
# Windows
rmdir /s /q .next

# Linux/Mac
rm -rf .next
```

---

## 🌐 Navegação no Browser

### URLs principais

```
http://localhost:3000              → Raiz (redireciona)
http://localhost:3000/auth/login   → Login
http://localhost:3000/home         → Dashboard
http://localhost:3000/clientes     → Listagem de clientes
http://localhost:3000/contas       → Listagem de contas
```

### Developer Tools (F12)

```javascript
// Verificar tokens
localStorage.getItem("access_token");
localStorage.getItem("refresh_token");

// Limpar tokens
localStorage.clear();

// Verificar se há erros
console.log("Errors:", window.errors);
```

---

## 🔧 Comandos Git

### Iniciar repositório

```bash
git init
git add .
git commit -m "feat: migração completa do Angular para Next.js"
```

### Branches

```bash
# Criar branch
git checkout -b feature/nova-funcionalidade

# Listar branches
git branch -a

# Mudar de branch
git checkout main
```

### Commits convencionais

```bash
git commit -m "feat: adiciona nova funcionalidade"
git commit -m "fix: corrige bug no login"
git commit -m "docs: atualiza README"
git commit -m "style: formata código"
git commit -m "refactor: refatora componente"
git commit -m "test: adiciona testes"
git commit -m "chore: atualiza dependências"
```

---

## 📱 Mobile Testing

### Testar em dispositivos móveis

```bash
# 1. Descobrir IP local
ipconfig  # Windows
ifconfig  # Mac/Linux

# 2. Iniciar dev server
npm run dev

# 3. Acessar do celular
http://SEU_IP:3000
# Exemplo: http://192.168.1.100:3000
```

---

## 🐳 Docker (Opcional)

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### Comandos

```bash
# Build
docker build -t sistembank-next .

# Run
docker run -p 3000:3000 sistembank-next

# Com docker-compose
docker-compose up -d
```

---

## 🔄 Migrations e Updates

### Atualizar Next.js

```bash
npm install next@latest react@latest react-dom@latest
```

### Atualizar todas as dependências

```bash
npm update

# Verificar pacotes desatualizados
npm outdated

# Atualizar para latest (cuidado!)
npx npm-check-updates -u
npm install
```

---

## 📊 Análise de Bundle

### Ver tamanho do bundle

```bash
npm run build

# Análise detalhada (após instalar @next/bundle-analyzer)
npm install --save-dev @next/bundle-analyzer
```

### next.config.ts com analyzer

```typescript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // config
});
```

### Executar análise

```bash
ANALYZE=true npm run build
```

---

## 🧪 Testes (Setup futuro)

### Instalar Jest + Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jest-environment-jsdom
```

### Executar testes

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

### Build estático (se necessário)

```bash
# next.config.ts
module.exports = {
  output: 'export'
}

# Build
npm run build
# Resultado em: out/
```

---

## 🔒 Variáveis de Ambiente

### .env.local (criar manualmente)

```env
NEXT_PUBLIC_API_URL=https://aula-angular.bcorp.tec.br/api
```

### Usar no código

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 🛡️ Segurança

### Verificar vulnerabilidades

```bash
npm audit

# Corrigir automaticamente
npm audit fix

# Forçar correções (cuidado!)
npm audit fix --force
```

---

## 📝 Scripts Personalizados (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next out",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

## 🎯 Atalhos de Teclado

### VS Code

```
Ctrl + `: Terminal
Ctrl + P: Buscar arquivo
Ctrl + Shift + P: Paleta de comandos
Ctrl + B: Toggle sidebar
F5: Debug
```

### Browser DevTools

```
F12: Abrir DevTools
Ctrl + Shift + C: Inspetor de elementos
Ctrl + Shift + M: Toggle device mode (mobile)
Ctrl + Shift + I: DevTools
```

---

Estes comandos cobrem as principais operações do dia a dia! 🚀
