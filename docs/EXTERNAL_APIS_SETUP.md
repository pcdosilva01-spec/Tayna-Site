# APIs Externas — Setup Completo

## Supabase (Banco de Dados + Storage)

### Banco de Dados
1. Crie conta em [supabase.com](https://supabase.com)
2. Crie novo projeto (free tier disponível)
3. Aguarde provisionamento (~2 min)
4. Vá em **Settings > Database > Connection string > URI**
5. Copie e cole no `.env` como `DATABASE_URL`

### Storage (Imagens)
1. No painel Supabase, vá em **Storage**
2. Crie um bucket chamado `products`
3. Defina como **Public**
4. Copie a URL e Anon Key de **Settings > API**
5. Cole no `.env` como `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Google OAuth

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto
3. Vá em **APIs & Services > OAuth consent screen**
4. Configure como "External"
5. Preencha os dados obrigatórios
6. Vá em **Credentials > Create Credentials > OAuth 2.0 Client ID**
7. Tipo: **Web application**
8. Authorized redirect URIs:
   - Dev: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://seudominio.com.br/api/auth/callback/google`
9. Copie Client ID e Secret para `.env`

## Stripe

1. Crie conta em [stripe.com](https://stripe.com)
2. Vá em **Developers > API Keys**
3. Use as chaves de **Teste** para desenvolvimento
4. Para webhooks:
   - **Developers > Webhooks > Add endpoint**
   - URL: `https://seudominio.com/api/webhook/stripe`
   - Eventos: `checkout.session.completed`, `payment_intent.payment_failed`
5. Copie o Webhook Signing Secret para `.env`

### Stripe CLI (Desenvolvimento Local)
```bash
# Instalar
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Encaminhar webhooks para localhost
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Resend (Emails)

1. Crie conta em [resend.com](https://resend.com)
2. Vá em **API Keys > Create API Key**
3. Copie para `.env` como `RESEND_API_KEY`
4. Para envio em produção:
   - **Domains > Add Domain**
   - Configure DNS TXT records
   - Aguarde verificação

## Cloudinary (Alternativa para Imagens)

Se preferir Cloudinary ao Supabase Storage:
1. Crie conta em [cloudinary.com](https://cloudinary.com)
2. Copie Cloud Name, API Key e Secret
3. Use `next-cloudinary` para upload de imagens
