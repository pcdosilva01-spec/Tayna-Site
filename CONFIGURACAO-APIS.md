# 🔑 Guia Completo de APIs e Configurações

Este documento explica TODAS as APIs e serviços que você precisa configurar, como obter as chaves e onde colocá-las.

---

## 📋 Checklist de APIs Necessárias

- ✅ **Obrigatório:** Banco de Dados (PostgreSQL ou Supabase)
- ✅ **Obrigatório:** Auth Secret (para autenticação)
- ⚠️ **Recomendado:** Stripe (para pagamentos)
- ⚠️ **Recomendado:** Resend (para emails)
- ⭐ **Opcional:** Google OAuth (login social)

---

## 1️⃣ BANCO DE DADOS (Obrigatório)

### Opção A: PostgreSQL Local (Desenvolvimento)

**O que é:** Banco de dados instalado na sua máquina.

**Como instalar:**

**Windows:**
1. Baixe: https://www.postgresql.org/download/windows/
2. Instale com senha padrão: `postgres`
3. Porta padrão: `5432`

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Criar banco de dados:**
```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco
CREATE DATABASE tayna_boutique;

# Saia
\q
```

**String de conexão no `.env`:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tayna_boutique?schema=public"
```

Formato: `postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO`

---

### Opção B: Supabase (Recomendado para Produção)

**O que é:** PostgreSQL na nuvem, gratuito até 500MB.

**Como configurar:**

1. **Criar conta:**
   - Acesse: https://supabase.com
   - Clique em "Start your project"
   - Faça login com GitHub

2. **Criar projeto:**
   - Clique em "New Project"
   - Nome: `tayna-boutique`
   - Database Password: Crie uma senha forte (ANOTE!)
   - Region: `South America (São Paulo)` (mais próximo do Brasil)
   - Clique em "Create new project"
   - Aguarde 2-3 minutos

3. **Pegar connection string:**
   - No menu lateral, clique em "Project Settings" (ícone de engrenagem)
   - Clique em "Database"
   - Role até "Connection string"
   - Selecione "URI" (não Pooling)
   - Copie a string que aparece
   - Substitua `[YOUR-PASSWORD]` pela senha que você criou

4. **Colocar no `.env`:**
```env
DATABASE_URL="postgresql://postgres.xxxxx:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

**Vantagens do Supabase:**
- ✅ Gratuito até 500MB
- ✅ Backups automáticos
- ✅ Interface visual para ver dados
- ✅ Funciona em produção
- ✅ Não precisa instalar nada

---

## 2️⃣ AUTH SECRET (Obrigatório)

**O que é:** Chave secreta para criptografar sessões de usuários.

**Como gerar:**

**Opção 1 - Terminal (Mac/Linux):**
```bash
openssl rand -base64 32
```

**Opção 2 - Online:**
- Acesse: https://generate-secret.vercel.app/32
- Copie a chave gerada

**Opção 3 - Qualquer string aleatória:**
```
tayna-boutique-super-secret-key-2024-change-in-production
```

**Colocar no `.env`:**
```env
AUTH_SECRET="sua-chave-secreta-aqui"
```

⚠️ **IMPORTANTE:** Nunca compartilhe essa chave! Mude em produção!

---

## 3️⃣ STRIPE (Pagamentos)

**O que é:** Plataforma de pagamentos (cartão e Pix).

**Como configurar:**

### Passo 1: Criar conta

1. Acesse: https://dashboard.stripe.com/register
2. Preencha seus dados
3. Confirme email
4. **NÃO precisa ativar conta** para testar (use modo test)

### Passo 2: Pegar chaves de API

1. No dashboard, clique em "Developers" (menu superior)
2. Clique em "API keys"
3. Você verá duas chaves:
   - **Publishable key** (começa com `pk_test_`)
   - **Secret key** (começa com `sk_test_`) - Clique em "Reveal test key"

4. Copie ambas

### Passo 3: Configurar Webhook

1. No menu "Developers", clique em "Webhooks"
2. Clique em "Add endpoint"
3. **Endpoint URL:** 
   - Desenvolvimento: `http://localhost:3000/api/webhook/stripe`
   - Produção: `https://seusite.com/api/webhook/stripe`
4. **Events to send:** Selecione `payment_intent.succeeded`
5. Clique em "Add endpoint"
6. Clique no webhook criado
7. Clique em "Reveal" no "Signing secret" (começa com `whsec_`)
8. Copie o secret

### Passo 4: Colocar no `.env`

```env
STRIPE_SECRET_KEY="sk_test_51Abc123..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51Abc123..."
STRIPE_WEBHOOK_SECRET="whsec_abc123..."
```

### Testar pagamentos:

**Cartões de teste:**
- Sucesso: `4242 4242 4242 4242`
- Falha: `4000 0000 0000 0002`
- Data: Qualquer data futura
- CVV: Qualquer 3 números
- CEP: Qualquer

**Pix de teste:**
- Será gerado QR Code fake
- Não precisa pagar de verdade

### Ativar Pix:

1. No dashboard Stripe, vá em "Settings"
2. Clique em "Payment methods"
3. Ative "Pix"
4. Preencha dados da empresa (pode ser dados de teste)

---

## 4️⃣ RESEND (Emails)

**O que é:** Serviço para enviar emails transacionais.

**Como configurar:**

### Passo 1: Criar conta

1. Acesse: https://resend.com
2. Clique em "Sign Up"
3. Faça login com GitHub ou email
4. Confirme email

### Passo 2: Pegar API Key

1. No dashboard, clique em "API Keys"
2. Clique em "Create API Key"
3. Nome: `Tayna Boutique`
4. Permission: `Sending access`
5. Clique em "Add"
6. **COPIE A CHAVE AGORA** (só aparece uma vez!)
7. Começa com `re_`

### Passo 3: Configurar domínio (Opcional para teste)

**Para testar (sem domínio próprio):**
- Use o email padrão: `onboarding@resend.dev`
- Só envia para seu próprio email

**Para produção (com domínio próprio):**
1. Clique em "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio: `taynaboutique.com`
4. Adicione os registros DNS que aparecerem
5. Aguarde verificação (até 48h)

### Passo 4: Colocar no `.env`

```env
RESEND_API_KEY="re_abc123..."
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

**Em produção (com domínio verificado):**
```env
RESEND_FROM_EMAIL="noreply@taynaboutique.com"
```

### Testar emails:

```bash
# Os emails serão enviados quando:
# - Pedido for criado
# - Pagamento for confirmado
# - Pedido for enviado
```

---

## 5️⃣ GOOGLE OAUTH (Opcional)

**O que é:** Login com conta Google.

**Como configurar:**

### Passo 1: Criar projeto no Google Cloud

1. Acesse: https://console.cloud.google.com
2. Clique em "Select a project" (topo)
3. Clique em "New Project"
4. Nome: `Tayna Boutique`
5. Clique em "Create"
6. Aguarde criação

### Passo 2: Configurar OAuth

1. No menu lateral, vá em "APIs & Services" > "OAuth consent screen"
2. Selecione "External"
3. Clique em "Create"
4. Preencha:
   - App name: `Tayna Xavier Boutique`
   - User support email: seu email
   - Developer contact: seu email
5. Clique em "Save and Continue"
6. Clique em "Save and Continue" (Scopes)
7. Clique em "Save and Continue" (Test users)
8. Clique em "Back to Dashboard"

### Passo 3: Criar credenciais

1. No menu lateral, clique em "Credentials"
2. Clique em "Create Credentials" > "OAuth client ID"
3. Application type: `Web application`
4. Name: `Tayna Boutique Web`
5. **Authorized JavaScript origins:**
   - Desenvolvimento: `http://localhost:3000`
   - Produção: `https://seusite.com`
   - ⚠️ **IMPORTANTE:** NÃO coloque `/` no final!
6. **Authorized redirect URIs:**
   - Desenvolvimento: `http://localhost:3000/api/auth/callback/google`
   - Produção: `https://seusite.com/api/auth/callback/google`
   - ⚠️ **IMPORTANTE:** NÃO coloque `/` no final!
7. Clique em "Create"
8. **COPIE:**
   - Client ID (começa com números)
   - Client Secret

### Passo 4: Colocar no `.env`

```env
GOOGLE_CLIENT_ID="123456789-abc.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123..."
```

---

## 📝 ARQUIVO .env COMPLETO

Crie o arquivo `.env` na raiz do projeto:

```env
# ============================================
# DATABASE (Obrigatório)
# ============================================
# Opção 1: PostgreSQL Local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tayna_boutique?schema=public"

# Opção 2: Supabase (Recomendado)
# DATABASE_URL="postgresql://postgres.xxxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

# ============================================
# AUTH (Obrigatório)
# ============================================
AUTH_SECRET="sua-chave-secreta-gerada-com-openssl"
AUTH_URL="http://localhost:3000"

# ============================================
# STRIPE (Recomendado)
# ============================================
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ============================================
# RESEND (Recomendado)
# ============================================
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="onboarding@resend.dev"

# ============================================
# GOOGLE OAUTH (Opcional)
# ============================================
GOOGLE_CLIENT_ID="123456789-abc.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123..."

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Tayna Xavier Boutique"
NEXT_PUBLIC_WHATSAPP="5511999999999"
NEXT_PUBLIC_INSTAGRAM="taynaxavier_boutique"
```

---

## 🚀 ORDEM DE CONFIGURAÇÃO RECOMENDADA

### Mínimo para funcionar:

1. ✅ **Banco de Dados** (Supabase ou PostgreSQL)
2. ✅ **Auth Secret** (gerar com openssl)
3. ✅ Rodar `npm install`
4. ✅ Rodar `npx prisma generate`
5. ✅ Rodar `npx prisma db push`
6. ✅ Rodar `npm run db:seed`
7. ✅ Rodar `npm run dev`

### Para funcionalidade completa:

8. ⚠️ **Stripe** (pagamentos)
9. ⚠️ **Resend** (emails)
10. ⭐ **Google OAuth** (login social)

---

## ❓ FAQ

### Preciso de cartão de crédito?

- **Supabase:** Não (plano gratuito)
- **Stripe:** Não (modo test gratuito)
- **Resend:** Não (3.000 emails/mês grátis)
- **Google Cloud:** Não (OAuth é gratuito)

### Posso testar sem configurar tudo?

Sim! Configure apenas:
1. Banco de dados (Supabase)
2. Auth Secret
3. Deixe o resto comentado no `.env`

O site funcionará, mas sem:
- Pagamentos (Stripe)
- Emails (Resend)
- Login com Google

### Como sei se está funcionando?

```bash
# Teste 1: Banco conectado
npx prisma studio
# Deve abrir interface visual do banco

# Teste 2: Site rodando
npm run dev
# Acesse http://localhost:3000

# Teste 3: Login funcionando
# Acesse http://localhost:3000/login
# Use: admin@taynaboutique.com / admin123
```

### Onde guardo essas chaves?

- ✅ No arquivo `.env` (local)
- ✅ No Vercel/Netlify (produção)
- ❌ NUNCA no GitHub
- ❌ NUNCA compartilhe

### Preciso pagar algo?

**Desenvolvimento:** Tudo gratuito!

**Produção:**
- Supabase: Grátis até 500MB
- Stripe: 2.99% + R$0.39 por transação
- Resend: Grátis até 3.000 emails/mês
- Google OAuth: Gratuito
- Vercel: Gratuito para hobby

---

## 🆘 PROBLEMAS COMUNS

### "Can't reach database server"

❌ **Problema:** Banco não conecta

✅ **Solução:**
1. Verifique se PostgreSQL está rodando
2. Teste a connection string no Prisma Studio
3. Verifique senha e porta

### "Invalid API key"

❌ **Problema:** Chave do Stripe/Resend inválida

✅ **Solução:**
1. Verifique se copiou a chave completa
2. Verifique se não tem espaços extras
3. Gere nova chave se necessário

### "Webhook signature verification failed"

❌ **Problema:** Webhook do Stripe não funciona

✅ **Solução:**
1. Use Stripe CLI para desenvolvimento:
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
2. Copie o webhook secret que aparecer

### "Email not sent"

❌ **Problema:** Resend não envia email

✅ **Solução:**
1. Verifique API key
2. Use `onboarding@resend.dev` para testes
3. Verifique logs no dashboard Resend

### "Origem inválida" no Google OAuth

❌ **Problema:** Erro ao configurar Google OAuth

✅ **Solução:**
1. **NÃO coloque `/` no final das URLs**
2. Correto: `http://localhost:3000`
3. Errado: `http://localhost:3000/`
4. Verifique "Authorized JavaScript origins" E "Authorized redirect URIs"
5. Aguarde 5 minutos após salvar (propagação do Google)

---

## 📞 SUPORTE

**Documentações oficiais:**
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Resend: https://resend.com/docs
- Google OAuth: https://developers.google.com/identity

**Comunidades:**
- Next.js: https://github.com/vercel/next.js/discussions
- Prisma: https://www.prisma.io/community

---

## ✅ CHECKLIST FINAL

Antes de começar a desenvolver, verifique:

- [ ] Arquivo `.env` criado
- [ ] Banco de dados configurado (Supabase ou PostgreSQL)
- [ ] AUTH_SECRET gerado
- [ ] `npm install` executado
- [ ] `npx prisma generate` executado
- [ ] `npx prisma db push` executado
- [ ] `npm run db:seed` executado
- [ ] `npm run dev` funcionando
- [ ] http://localhost:3000 abrindo
- [ ] Login admin funcionando
- [ ] (Opcional) Stripe configurado
- [ ] (Opcional) Resend configurado
- [ ] (Opcional) Google OAuth configurado

---

🎉 **Pronto! Agora você tem tudo configurado para desenvolver!**
