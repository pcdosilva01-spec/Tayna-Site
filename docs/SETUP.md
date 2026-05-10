# Setup Completo — Tayna Xavier Boutique

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Supabase (gratuita)
- Conta Stripe (gratuita para teste)
- Conta Resend (gratuita)
- Conta Google Cloud (para OAuth)

## 1. Clonar e Instalar

```bash
git clone <repo-url>
cd tayna-site
npm install
```

## 2. Supabase (Banco de Dados)

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá em **Project Settings > Database**
3. Copie a **Connection String (URI)**
4. Cole no `.env` como `DATABASE_URL`

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.SEU_PROJETO.supabase.co:5432/postgres"
```

## 3. Prisma

```bash
# Gerar client
npx prisma generate

# Criar tabelas
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npx prisma db seed

# Visualizar banco (opcional)
npx prisma studio
```

## 4. Auth.js (Autenticação)

### Gerar Secret

```bash
openssl rand -base64 32
```

Cole no `.env`:
```env
NEXTAUTH_SECRET="seu-secret-gerado"
NEXTAUTH_URL="http://localhost:3000"
```

### Google OAuth

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto
3. Vá em **APIs & Services > Credentials**
4. Crie **OAuth 2.0 Client ID**
5. Configure **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. Copie Client ID e Client Secret para `.env`

## 5. Stripe (Pagamentos)

1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. Vá em **Developers > API Keys**
3. Copie as chaves de teste para `.env`
4. Configure webhook em **Developers > Webhooks**
5. URL do webhook: `https://seu-dominio.com/api/webhook/stripe`
6. Eventos para escutar: `checkout.session.completed`, `payment_intent.payment_failed`

## 6. Resend (Emails)

1. Acesse [resend.com](https://resend.com)
2. Crie uma API Key
3. Cole no `.env` como `RESEND_API_KEY`
4. Configure seu domínio para envio de emails

## 7. Executar

```bash
npm run dev
```

Acesse:
- Loja: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Prisma Studio: `npx prisma studio`
