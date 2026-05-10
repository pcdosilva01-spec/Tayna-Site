# Tayna Xavier Boutique 🛍️

Loja online premium de moda feminina construída com Next.js 15, TypeScript, TailwindCSS, Prisma e Supabase.

## Stack

- **Frontend:** Next.js 15 App Router, TypeScript, TailwindCSS, Shadcn UI, Framer Motion
- **Backend:** Prisma ORM, PostgreSQL (Supabase), Server Actions
- **Auth:** Auth.js (NextAuth v5)
- **Pagamentos:** Stripe (Cartão + Pix)
- **Emails:** Resend
- **Validação:** Zod

## Início Rápido

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Seed do banco
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

## Estrutura

```
src/
├── app/
│   ├── (shop)/          # Páginas da loja
│   ├── (admin)/         # Dashboard admin
│   └── api/             # API routes
├── components/
│   ├── layout/          # Header, Footer
│   ├── shop/            # Componentes da loja
│   ├── admin/           # Componentes admin
│   ├── shared/          # Providers, shared
│   └── ui/              # Shadcn UI
├── lib/                 # Config, constants, utils
├── actions/             # Server Actions
├── hooks/               # React hooks
├── services/            # Email, Payment
├── types/               # TypeScript types
├── utils/               # Formatting helpers
└── emails/              # Email templates
```

## Documentação

- [Setup Completo](docs/SETUP.md)
- [Deploy](docs/DEPLOY.md)
- [APIs Externas](docs/EXTERNAL_APIS_SETUP.md)
- [Checklist de Deploy](docs/DEPLOY_CHECKLIST.md)
