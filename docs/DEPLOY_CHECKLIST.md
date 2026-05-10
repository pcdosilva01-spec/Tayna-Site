# Deploy Checklist — Tayna Xavier Boutique

## Pré-Deploy

- [ ] `npm run build` sem erros
- [ ] Todas as páginas funcionando
- [ ] Responsividade mobile testada
- [ ] Lighthouse score > 90

## Variáveis de Ambiente

- [ ] `DATABASE_URL` configurado (Supabase produção)
- [ ] `NEXTAUTH_URL` = URL de produção
- [ ] `NEXTAUTH_SECRET` gerado com `openssl rand -base64 32`
- [ ] `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` configurados
- [ ] `STRIPE_SECRET_KEY` (chave LIVE, não teste)
- [ ] `STRIPE_WEBHOOK_SECRET` configurado
- [ ] `RESEND_API_KEY` configurado
- [ ] `NEXT_PUBLIC_URL` = URL de produção

## Banco de Dados

- [ ] Migrations rodadas em produção
- [ ] Seed executado
- [ ] Backup configurado

## Stripe

- [ ] Chaves de produção configuradas
- [ ] Webhook de produção configurado
- [ ] Testado com cartão real
- [ ] PIX configurado

## Auth

- [ ] Google OAuth redirect URI de produção configurado
- [ ] Usuário admin criado
- [ ] Login/cadastro testados

## Emails

- [ ] Domínio verificado no Resend
- [ ] Templates testados
- [ ] E-mail de confirmação funcionando

## SEO

- [ ] Títulos e meta descriptions em todas as páginas
- [ ] Open Graph configurado
- [ ] Sitemap gerado
- [ ] robots.txt configurado
- [ ] Google Search Console configurado

## Performance

- [ ] Imagens otimizadas
- [ ] Lazy loading implementado
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse SEO > 90

## Segurança

- [ ] Headers de segurança configurados
- [ ] Admin protegido
- [ ] HTTPS ativo
- [ ] CSP configurado

## Domínio

- [ ] DNS configurado
- [ ] SSL/HTTPS ativo
- [ ] WWW redirect configurado
