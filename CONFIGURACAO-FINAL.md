# 🎯 Configuração Final - Suas Credenciais

## ✅ Status das APIs

- ✅ **Supabase:** Configurado
- ✅ **Google OAuth:** Configurado
- ⚠️ **Resend:** Token incompleto (precisa do token completo)
- ❌ **Stripe:** Não configurado (opcional)

---

## 📝 Próximos Passos

### 1. Completar Token do Resend

O token que você forneceu está incompleto: `re_2fuuGmzj...`

**Como pegar o token completo:**

1. Acesse: https://resend.com/api-keys
2. Se você já criou a chave "Onboarding", ela não pode ser vista novamente
3. **Crie uma nova chave:**
   - Clique em "Create API Key"
   - Nome: `Tayna Boutique Production`
   - Permission: `Sending access`
   - Clique em "Add"
   - **COPIE O TOKEN COMPLETO AGORA** (começa com `re_`)
   - Cole no `.env`:

```env
RESEND_API_KEY="re_SEU_TOKEN_COMPLETO_AQUI"
```

### 2. Pegar a Senha do Supabase

Você precisa da senha do banco de dados que você criou no Supabase.

**Onde encontrar:**

1. Acesse: https://supabase.com/dashboard/project/ybsdjcqsyqknbgiynoei
2. Vá em **Settings** (ícone de engrenagem)
3. Clique em **Database**
4. Role até **Connection string**
5. Selecione **URI**
6. Copie a string completa
7. Substitua `[YOUR-PASSWORD]` pela sua senha

**Ou use a connection string direta:**

```env
DATABASE_URL="postgresql://postgres.ybsdjcqsyqknbgiynoei:[SUA-SENHA-AQUI]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

⚠️ **IMPORTANTE:** Substitua `[SUA-SENHA-AQUI]` pela senha que você criou ao criar o projeto no Supabase.

### 3. Configurar Stripe (Opcional)

Se quiser aceitar pagamentos:

1. Acesse: https://dashboard.stripe.com/register
2. Crie uma conta
3. Vá em **Developers** > **API keys**
4. Copie as chaves de teste
5. Configure no `.env`:

```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🚀 Iniciar o Projeto

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Gerar Prisma Client

```bash
npx prisma generate
```

### Passo 3: Criar tabelas no banco

```bash
npx prisma db push
```

Se der erro de conexão, verifique a senha do Supabase no `.env`.

### Passo 4: Popular banco com dados de exemplo

```bash
npm run db:seed
```

Isso vai criar:
- ✅ Admin: `admin@taynaboutique.com` / `admin123`
- ✅ 7 categorias de produtos
- ✅ 6 produtos de exemplo
- ✅ 1 cupom de desconto: `BEMVINDA10`

### Passo 5: Iniciar servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🧪 Testar Funcionalidades

### 1. Homepage
- Acesse: http://localhost:3000
- Deve mostrar produtos em destaque
- Deve mostrar categorias

### 2. Login Normal
- Acesse: http://localhost:3000/login
- Email: `admin@taynaboutique.com`
- Senha: `admin123`
- Deve redirecionar para home logado

### 3. Login com Google
- Acesse: http://localhost:3000/login
- Clique em "Login com Google" (se tiver o botão)
- Selecione sua conta Google
- Deve redirecionar para home logado

### 4. Painel Admin
- Faça login como admin
- Acesse: http://localhost:3000/admin
- Deve mostrar dashboard com estatísticas

### 5. Produtos
- Acesse: http://localhost:3000/produtos
- Deve listar 6 produtos
- Clique em um produto
- Deve abrir página de detalhes

---

## 📊 Verificar Banco de Dados

### Opção 1: Prisma Studio (Local)

```bash
npx prisma studio
```

Abre interface visual em: http://localhost:5555

### Opção 2: Supabase Dashboard (Online)

1. Acesse: https://supabase.com/dashboard/project/ybsdjcqsyqknbgiynoei
2. Clique em **Table Editor**
3. Veja todas as tabelas criadas

---

## 🔍 Verificar se Tudo Está Funcionando

### Checklist Completo

- [ ] `npm install` sem erros
- [ ] `npx prisma generate` sem erros
- [ ] `npx prisma db push` criou as tabelas
- [ ] `npm run db:seed` populou o banco
- [ ] `npm run dev` iniciou sem erros
- [ ] http://localhost:3000 abre
- [ ] Homepage mostra produtos
- [ ] Login funciona
- [ ] Login com Google funciona
- [ ] Admin acessível
- [ ] Prisma Studio mostra dados

---

## ⚠️ Problemas Comuns

### "Can't reach database server"

**Causa:** Senha do Supabase incorreta no `.env`

**Solução:**
1. Vá no Supabase Dashboard
2. Settings > Database > Connection string
3. Copie a string completa com a senha correta
4. Cole no `.env`
5. Reinicie: `npm run dev`

### "Invalid API key" (Resend)

**Causa:** Token do Resend incompleto

**Solução:**
1. Crie nova API key no Resend
2. Copie o token completo
3. Cole no `.env`
4. Reinicie: `npm run dev`

### "redirect_uri_mismatch" (Google)

**Causa:** URL de callback não cadastrada

**Solução:**
1. Acesse: https://console.cloud.google.com
2. APIs & Services > Credentials
3. Clique no OAuth Client ID
4. Verifique se tem: `http://localhost:3000/api/auth/callback/google`
5. Salve e aguarde 5 minutos

### Erro no Prisma

**Causa:** Schema não sincronizado

**Solução:**
```bash
npx prisma generate
npx prisma db push --force-reset
npm run db:seed
```

---

## 📁 Estrutura Criada

```
✅ app/                    - Páginas Next.js
✅ actions/                - Server Actions
✅ components/             - Componentes React
✅ lib/                    - Configurações
✅ prisma/                 - Schema e seeds
✅ types/                  - Tipos TypeScript
✅ hooks/                  - Custom hooks
✅ services/               - Lógica de negócio
✅ utils/                  - Funções auxiliares
✅ middleware.ts           - Proteção de rotas
✅ .env                    - Variáveis configuradas
```

---

## 🎨 Próximos Passos

Agora que o backend está funcionando:

1. ✅ Testar todas as funcionalidades
2. ✅ Adicionar mais produtos no admin
3. ✅ Configurar Stripe (se quiser pagamentos)
4. 🎨 Implementar design UI/UX premium
5. 📱 Otimizar para mobile
6. 🖼️ Adicionar upload de imagens
7. 🚀 Deploy em produção

---

## 🆘 Precisa de Ajuda?

### Logs Úteis

```bash
# Ver logs do servidor
npm run dev

# Ver logs do Prisma
npx prisma studio

# Ver estrutura do banco
npx prisma db pull
```

### Comandos de Reset

```bash
# Resetar banco de dados
npx prisma db push --force-reset

# Recriar dados
npm run db:seed

# Limpar cache do Next.js
rm -rf .next
npm run dev
```

---

## ✅ Arquivo .env Final

Seu arquivo `.env` deve estar assim:

```env
# DATABASE - SUPABASE
DATABASE_URL="postgresql://postgres.[REDACTED]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase Config
NEXT_PUBLIC_SUPABASE_URL="https://[REDACTED].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[REDACTED]"
SUPABASE_SERVICE_ROLE_KEY="[REDACTED]"

# AUTH
AUTH_SECRET="tayna-boutique-super-secret-key-2024-production"
AUTH_URL="http://localhost:3000"

# GOOGLE OAUTH
GOOGLE_CLIENT_ID="[REDACTED]"
GOOGLE_CLIENT_SECRET="[REDACTED]"

# RESEND (Email)
RESEND_API_KEY="re_SEU_TOKEN_COMPLETO_AQUI"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# STRIPE (Opcional)
# STRIPE_SECRET_KEY="sk_test_..."
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."

# APP CONFIG
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Tayna Xavier Boutique"
NEXT_PUBLIC_WHATSAPP="5511999999999"
NEXT_PUBLIC_INSTAGRAM="taynaxavier_boutique"
```

---

## 🎉 Tudo Pronto!

Agora você tem:

✅ Backend completo e funcional
✅ Banco de dados na nuvem (Supabase)
✅ Autenticação com email e Google
✅ Painel admin completo
✅ Sistema de produtos e categorias
✅ Sistema de pedidos
✅ Envio de emails (quando completar token Resend)

**Próximo passo:** Completar o token do Resend e começar a desenvolver! 🚀
