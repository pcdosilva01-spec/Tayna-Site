# Tayna Xavier Boutique - E-commerce Premium

E-commerce completo de moda feminina premium desenvolvido com Next.js 15, TypeScript, Prisma e PostgreSQL.

## 🚀 Stack Tecnológica

- **Next.js 15** - App Router
- **TypeScript** - Tipagem estática
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **Supabase** - Backend as a Service (opcional)
- **Stripe** - Pagamentos (Cartão e Pix)
- **NextAuth.js v5** - Autenticação
- **Resend** - Envio de emails
- **Zustand** - Gerenciamento de estado
- **Zod** - Validação de dados

## 📦 Funcionalidades

### E-commerce
- ✅ Catálogo de produtos com filtros
- ✅ Carrinho de compras persistente
- ✅ Sistema de favoritos
- ✅ Busca de produtos
- ✅ Categorias dinâmicas
- ✅ Cupons de desconto
- ✅ Checkout completo

### Pagamentos
- ✅ Integração com Stripe
- ✅ Pagamento via cartão
- ✅ Pagamento via Pix
- ✅ Webhooks para confirmação

### Pedidos
- ✅ Criação de pedidos
- ✅ Rastreamento de status
- ✅ Histórico de pedidos
- ✅ Emails automáticos

### Autenticação
- ✅ Login/Cadastro
- ✅ Login com Google
- ✅ Proteção de rotas
- ✅ Roles (USER/ADMIN)

### Painel Admin
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de pedidos
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de cupons
- ✅ Produtos mais vendidos

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd tayna-site
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha as variáveis:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tayna_boutique"

# Auth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@taynaboutique.com"
```

### 4. Configure o banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas
npx prisma db push

# Popular banco com dados de exemplo
npm run db:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 👤 Credenciais de Teste

**Admin:**
- Email: admin@taynaboutique.com
- Senha: admin123

## 📁 Estrutura do Projeto

```
tayna-site/
├── app/                    # App Router do Next.js
│   ├── (auth)/            # Rotas de autenticação
│   ├── admin/             # Painel administrativo
│   ├── produtos/          # Páginas de produtos
│   ├── api/               # API Routes
│   └── layout.tsx         # Layout raiz
├── actions/               # Server Actions
├── components/            # Componentes React
├── lib/                   # Configurações e utilitários
├── prisma/                # Schema e migrations
├── types/                 # Tipos TypeScript
├── hooks/                 # Custom hooks
├── utils/                 # Funções auxiliares
└── middleware.ts          # Middleware de autenticação
```

## 🗄️ Modelos do Banco de Dados

- **User** - Usuários e admins
- **Product** - Produtos da loja
- **Category** - Categorias de produtos
- **Order** - Pedidos
- **OrderItem** - Itens dos pedidos
- **Address** - Endereços de entrega
- **Coupon** - Cupons de desconto
- **Favorite** - Produtos favoritos
- **Banner** - Banners promocionais
- **Settings** - Configurações da loja

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Proteção de rotas com middleware
- ✅ Validação de dados com Zod
- ✅ CSRF protection
- ✅ SQL injection protection (Prisma)

## 📧 Emails Automáticos

- Confirmação de pedido
- Pagamento confirmado
- Pedido enviado
- Recuperação de carrinho (futuro)

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push para GitHub
2. Conecte no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 15.

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Lint do código
npm run db:push      # Atualizar schema do banco
npm run db:migrate   # Criar migration
npm run db:seed      # Popular banco de dados
```

## 🎨 Próximos Passos (UI/UX)

O backend está completo e funcional. Os próximos passos incluem:

- Design visual premium
- Animações e transições
- Otimização mobile
- Galeria de imagens
- Reviews de produtos
- Sistema de notificações

## 📄 Licença

Todos os direitos reservados - Tayna Xavier Boutique

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato através do Instagram: [@taynaxavier_boutique](https://instagram.com/taynaxavier_boutique)
