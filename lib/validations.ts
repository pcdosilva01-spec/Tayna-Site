import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const addressSchema = z.object({
  name: z.string().min(2, 'Nome completo obrigatório'),
  street: z.string().min(3, 'Rua obrigatória'),
  number: z.string().min(1, 'Número obrigatório'),
  complement: z.string().optional(),
  district: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'UF deve ter 2 caracteres'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
})

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Nome obrigatório'),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().min(10, 'Telefone inválido'),
  address: addressSchema,
  paymentMethod: z.enum(['card', 'pix']),
  couponCode: z.string().optional(),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  slug: z.string().min(2, 'Slug obrigatório'),
  description: z.string().optional(),
  price: z.number().positive('Preço deve ser positivo'),
  comparePrice: z.number().positive().optional(),
  images: z.array(z.string()).min(1, 'Adicione pelo menos uma imagem'),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  categoryId: z.string().min(1, 'Categoria obrigatória'),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  slug: z.string().min(2, 'Slug obrigatório'),
  image: z.string().optional(),
  order: z.number().int().default(0),
})

export const couponSchema = z.object({
  code: z.string().min(3, 'Código deve ter no mínimo 3 caracteres').toUpperCase(),
  discount: z.number().positive('Desconto deve ser positivo'),
  type: z.enum(['PERCENTAGE', 'FIXED']).default('PERCENTAGE'),
  minPurchase: z.number().positive().optional(),
  maxUses: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
})
