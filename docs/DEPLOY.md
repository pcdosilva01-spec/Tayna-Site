# Deploy — Tayna Xavier Boutique

## Vercel (Recomendado)

### 1. Preparar

```bash
npm run build  # Verificar se não há erros
```

### 2. Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório Git
3. Configure as **Environment Variables** (copie do `.env`)
4. Framework Preset: **Next.js**
5. Click **Deploy**

### 3. Domínio Customizado

1. Vá em **Settings > Domains**
2. Adicione seu domínio (ex: `taynaxavier.com.br`)
3. Configure os DNS do seu domínio:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### 4. Pós-Deploy

- [ ] Atualizar `NEXTAUTH_URL` para URL de produção
- [ ] Atualizar `NEXT_PUBLIC_URL` para URL de produção
- [ ] Atualizar redirect URI do Google OAuth
- [ ] Configurar webhook Stripe com URL de produção
- [ ] Testar pagamentos em modo de produção
- [ ] Configurar domínio no Resend

## Variáveis de Ambiente Obrigatórias

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL do PostgreSQL (Supabase) |
| `NEXTAUTH_URL` | URL da aplicação |
| `NEXTAUTH_SECRET` | Secret para Auth.js |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |
| `STRIPE_SECRET_KEY` | Stripe Secret Key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret |
| `RESEND_API_KEY` | Resend API Key |
| `NEXT_PUBLIC_URL` | URL pública da aplicação |
