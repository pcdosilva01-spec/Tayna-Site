# 🚀 Setup Completo - Tayna Xavier Boutique

## Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- Conta no Stripe (para pagamentos)
- Conta no Resend (para emails)
- Conta no Google Cloud (para login social - opcional)

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

#### Opção A: PostgreSQL Local

1. Instale o PostgreSQL
2. Crie um banco de dados:

```sql
CREATE DATABASE tayna_boutique;
```

3. Configure a URL no `.env`:

```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/tayna_boutique?schema=public"
```

#### Opção B: Supabase (Recomendado)

1. Crie uma conta em https://supabase.com
2. Crie um novo projeto
3. Copie a connection string do Supabase
4. Configure no `.env`:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?pgbouncer=true"
```

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
# Database
DATABASE_URL="sua-connection-string"

# Auth Secret (gere com: openssl rand -base64 32)
AUTH_SECRET="sua-chave-secreta-aqui"
AUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@seudominio.com"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 4. Configurar Stripe

1. Acesse https://dashboard.stripe.com
2. Copie as chaves de API (test mode)
3. Configure webhook:
   - URL: `http://localhost:3000/api/webhook/stripe`
   - Eventos: `payment_intent.succeeded`
   - Copie o webhook secret

### 5. Configurar Resend

1. Acesse https://resend.com
2. Crie uma API key
3. Verifique seu domínio de email
4. Configure no `.env`

### 6. Configurar Google OAuth (Opcional)

1. Acesse https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copie Client ID e Secret

### 7. Inicializar Banco de Dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas
npx prisma db push

# Popular com dados de exemplo
npm run db:seed
```

### 8. Iniciar Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### 9. Testar Admin

1. Acesse: http://localhost:3000/login
2. Use as credenciais:
   - Email: admin@taynaboutique.com
   - Senha: admin123
3. Acesse: http://localhost:3000/admin

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (visualizar banco)
npx prisma studio

# Resetar banco de dados
npx prisma db push --force-reset
npm run db:seed

# Criar migration
npx prisma migrate dev --name nome_da_migration

# Ver logs do Prisma
npx prisma db push --help
```

## Estrutura de Pastas Criadas

```
✅ app/                    - Páginas e rotas
✅ actions/                - Server Actions
✅ components/             - Componentes React
✅ lib/                    - Configurações
✅ prisma/                 - Schema e seeds
✅ types/                  - Tipos TypeScript
✅ hooks/                  - Custom hooks
✅ services/               - Lógica de negócio
✅ utils/                  - Funções auxiliares
✅ middleware.ts           - Proteção de rotas
```

## Verificação de Funcionamento

### ✅ Checklist

- [ ] `npm install` sem erros
- [ ] `npx prisma generate` sem erros
- [ ] `npx prisma db push` sem erros
- [ ] `npm run db:seed` sem erros
- [ ] `npm run dev` inicia sem erros
- [ ] Homepage carrega (http://localhost:3000)
- [ ] Produtos aparecem na home
- [ ] Login funciona
- [ ] Admin acessível após login
- [ ] Dashboard mostra estatísticas

## Troubleshooting

### Erro: "Can't reach database server"

- Verifique se PostgreSQL está rodando
- Verifique a connection string no `.env`
- Teste conexão: `npx prisma db pull`

### Erro: "Invalid `prisma.xxx()` invocation"

- Execute: `npx prisma generate`
- Reinicie o servidor

### Erro: "Module not found"

- Execute: `npm install`
- Delete `node_modules` e `.next`, depois `npm install`

### Erro no build

- Verifique tipos TypeScript: `npx tsc --noEmit`
- Verifique lint: `npm run lint`

## Próximos Passos

1. ✅ Backend completo e funcional
2. 🎨 Implementar design UI/UX premium
3. 📱 Otimizar para mobile
4. 🖼️ Adicionar upload de imagens
5. 📊 Implementar analytics
6. 🚀 Deploy em produção

## Suporte

Para dúvidas:
- Verifique o README.md
- Consulte a documentação do Next.js
- Consulte a documentação do Prisma

## Status do Projeto

✅ Estrutura completa
✅ Banco de dados configurado
✅ Autenticação funcionando
✅ CRUD de produtos
✅ Sistema de pedidos
✅ Painel admin
✅ Integração Stripe
✅ Envio de emails
✅ SEO básico

🎨 Pendente: Design UI/UX (próxima fase)
