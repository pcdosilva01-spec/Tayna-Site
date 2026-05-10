# API Documentation - Tayna Xavier Boutique

## Server Actions

### Authentication (`actions/auth.ts`)

#### `login(formData: FormData)`
Autentica usuário com email e senha.

**Parâmetros:**
- `email`: string
- `password`: string

**Retorno:**
- `{ error?: string }`

#### `register(formData: FormData)`
Registra novo usuário.

**Parâmetros:**
- `name`: string
- `email`: string
- `password`: string

**Retorno:**
- `{ error?: string }`

#### `logout()`
Desloga usuário atual.

---

### Products (`actions/products.ts`)

#### `getProducts(params?)`
Lista produtos com filtros opcionais.

**Parâmetros:**
- `categoryId?`: string
- `featured?`: boolean
- `search?`: string

**Retorno:**
- `Product[]` com categoria incluída

#### `getProduct(slug: string)`
Busca produto por slug.

**Retorno:**
- `Product | null` com categoria incluída

#### `getCategories()`
Lista todas as categorias.

**Retorno:**
- `Category[]`

#### `toggleFavorite(userId: string, productId: string)`
Adiciona/remove produto dos favoritos.

**Retorno:**
- `{ favorited: boolean }`

#### `getFavorites(userId: string)`
Lista favoritos do usuário.

**Retorno:**
- `Favorite[]` com produto e categoria

---

### Orders (`actions/orders.ts`)

#### `createOrder(data, userId?)`
Cria novo pedido.

**Parâmetros:**
- `customerName`: string
- `customerEmail`: string
- `customerPhone`: string
- `address`: Address
- `couponCode?`: string

**Retorno:**
- `{ success: true, orderId: string, orderNumber: string }` ou `{ error: string }`

#### `getOrder(orderId: string)`
Busca pedido por ID.

**Retorno:**
- `Order` com itens, endereço e usuário

#### `getOrderByNumber(orderNumber: string)`
Busca pedido por número.

**Retorno:**
- `Order` com itens e endereço

#### `getUserOrders(userId: string)`
Lista pedidos do usuário.

**Retorno:**
- `Order[]` com itens

#### `validateCoupon(code: string, total: number)`
Valida cupom de desconto.

**Retorno:**
- `{ success: true, discount: number, type: string, discountAmount: number }` ou `{ error: string }`

---

### Admin (`actions/admin.ts`)

Todas as actions de admin requerem autenticação e role ADMIN.

#### Products

- `createProduct(data)` - Cria produto
- `updateProduct(id, data)` - Atualiza produto
- `deleteProduct(id)` - Deleta produto

#### Categories

- `createCategory(data)` - Cria categoria
- `updateCategory(id, data)` - Atualiza categoria
- `deleteCategory(id)` - Deleta categoria

#### Orders

- `updateOrderStatus(orderId, status)` - Atualiza status do pedido
- `updatePaymentStatus(orderId, status)` - Atualiza status de pagamento
- `getAdminOrders()` - Lista todos os pedidos

#### Coupons

- `createCoupon(data)` - Cria cupom
- `updateCoupon(id, data)` - Atualiza cupom
- `deleteCoupon(id)` - Deleta cupom

#### Dashboard

- `getDashboardStats()` - Retorna estatísticas gerais
- `getTopProducts()` - Retorna produtos mais vendidos

---

## API Routes

### Authentication

**POST** `/api/auth/[...nextauth]`
- Gerenciado pelo NextAuth.js
- Suporta credentials e Google OAuth

### Webhooks

**POST** `/api/webhook/stripe`
- Recebe eventos do Stripe
- Atualiza status de pagamento
- Envia emails de confirmação

---

## Services

### ProductService (`services/product-service.ts`)

- `getFeaturedProducts()` - Produtos em destaque
- `searchProducts(query)` - Busca produtos
- `getRelatedProducts(productId, categoryId)` - Produtos relacionados
- `updateStock(productId, quantity)` - Atualiza estoque
- `checkStock(productId, quantity)` - Verifica disponibilidade

### OrderService (`services/order-service.ts`)

- `createOrder(data)` - Cria pedido completo
- `updateOrderStatus(orderId, status)` - Atualiza status
- `updatePaymentStatus(orderId, status)` - Atualiza pagamento
- `getOrderStats(startDate?, endDate?)` - Estatísticas de pedidos

---

## Validations (Zod Schemas)

### `loginSchema`
```typescript
{
  email: string (email),
  password: string (min 6)
}
```

### `registerSchema`
```typescript
{
  name: string (min 2),
  email: string (email),
  password: string (min 6)
}
```

### `addressSchema`
```typescript
{
  name: string (min 2),
  street: string (min 3),
  number: string (min 1),
  complement?: string,
  district: string (min 2),
  city: string (min 2),
  state: string (length 2),
  zipCode: string (regex CEP)
}
```

### `productSchema`
```typescript
{
  name: string (min 2),
  slug: string (min 2),
  description?: string,
  price: number (positive),
  comparePrice?: number (positive),
  images: string[] (min 1),
  stock: number (int, min 0),
  featured: boolean,
  active: boolean,
  categoryId: string
}
```

### `couponSchema`
```typescript
{
  code: string (min 3, uppercase),
  discount: number (positive),
  type: 'PERCENTAGE' | 'FIXED',
  minPurchase?: number (positive),
  maxUses?: number (int, positive),
  expiresAt?: Date
}
```

---

## Helpers (`utils/helpers.ts`)

- `formatPrice(price: number)` - Formata para BRL
- `formatDate(date: Date)` - Formata data BR
- `generateOrderNumber()` - Gera número único
- `slugify(text: string)` - Converte para slug
- `calculateDiscount(price, comparePrice)` - Calcula desconto %
- `formatPhone(phone: string)` - Formata telefone
- `formatCEP(cep: string)` - Formata CEP

---

## Hooks

### `useCart` (Zustand)

```typescript
{
  items: CartItem[],
  addItem: (product: Product) => void,
  removeItem: (productId: string) => void,
  updateQuantity: (productId: string, quantity: number) => void,
  clearCart: () => void,
  getTotal: () => number,
  getItemCount: () => number
}
```

---

## Email Templates (Resend)

- `sendOrderConfirmation(email, orderNumber, total)` - Confirmação de pedido
- `sendOrderShipped(email, orderNumber, trackingCode?)` - Pedido enviado
- `sendPaymentConfirmed(email, orderNumber)` - Pagamento confirmado

---

## Stripe Integration

### `createPaymentIntent(amount, metadata)`
Cria intenção de pagamento com cartão.

### `createPixPayment(amount, metadata)`
Cria pagamento via Pix.

---

## Middleware

Protege rotas:
- `/admin/*` - Requer autenticação e role ADMIN
- `/login`, `/register` - Redireciona se já autenticado

---

## Database Models

Ver `prisma/schema.prisma` para estrutura completa.

Principais models:
- User
- Product
- Category
- Order
- OrderItem
- Address
- Coupon
- Favorite
- Banner
- Settings
