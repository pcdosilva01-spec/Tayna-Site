# APIs — Tayna Xavier Boutique

## Server Actions

Todas as operações de dados são feitas via Server Actions em `src/actions/index.ts`.

### Produtos
- `getProducts(categorySlug?)` — Lista produtos, opcionalmente filtrados por categoria
- `getProductBySlug(slug)` — Busca produto por slug
- `createProduct(data)` — Cria produto (admin)
- `updateProduct(id, data)` — Atualiza produto (admin)
- `deleteProduct(id)` — Remove produto (admin)

### Pedidos
- `createOrder(data)` — Cria pedido no checkout
- `updateOrderStatus(id, status)` — Atualiza status do pedido (admin)

### Categorias
- `createCategory(data)` — Cria categoria (admin)
- `deleteCategory(id)` — Remove categoria (admin)

### Cupons
- `validateCoupon(code)` — Valida cupom no checkout

### Newsletter
- `subscribeNewsletter(email)` — Inscreve e-mail na newsletter

### Configurações
- `getSettings()` — Busca configurações da loja
- `updateSettings(data)` — Atualiza configurações (admin)

## API Routes

### `POST /api/webhook/stripe`
Webhook para processar eventos do Stripe (pagamentos).

### `POST /api/newsletter`
Inscrição na newsletter via form.

## Validação

Todos os inputs são validados com Zod. Schemas em `src/lib/validations.ts`:
- `productSchema`
- `categorySchema`
- `couponSchema`
- `checkoutSchema`
- `loginSchema`
- `registerSchema`
- `newsletterSchema`
- `addressSchema`
- `settingsSchema`
