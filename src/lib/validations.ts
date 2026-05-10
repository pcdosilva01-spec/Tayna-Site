import { z } from "zod";

// Product validation
export const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  price: z.number().positive("Preço deve ser positivo"),
  comparePrice: z.number().positive().nullable().optional(),
  images: z.array(z.string().url()).min(1, "Pelo menos uma imagem é necessária"),
  stock: z.number().int().min(0, "Estoque não pode ser negativo"),
  featured: z.boolean().default(false),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

// Category validation
export const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  slug: z.string().min(2, "Slug deve ter no mínimo 2 caracteres"),
  image: z.string().url().nullable().optional(),
});

// Coupon validation
export const couponSchema = z.object({
  code: z.string().min(3, "Código deve ter no mínimo 3 caracteres").toUpperCase(),
  discount: z.number().min(1).max(100, "Desconto deve ser entre 1% e 100%"),
  expiresAt: z.string().datetime().nullable().optional(),
  isActive: z.boolean().default(true),
});

// Checkout validation
export const checkoutSchema = z.object({
  customerName: z.string().min(3, "Nome completo é obrigatório"),
  customerEmail: z.string().email("E-mail inválido"),
  customerPhone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido").max(14),
  address: z.object({
    street: z.string().min(5, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    city: z.string().min(2, "Cidade é obrigatória"),
    state: z.string().length(2, "Estado inválido"),
    zipCode: z.string().min(8, "CEP inválido").max(9),
  }),
  paymentMethod: z.enum(["card", "pix"]),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

// Register validation
export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  terms: z.boolean().refine((val) => val === true, { message: "Você deve aceitar os termos" }),
});

// Newsletter validation
export const newsletterSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

// Address validation
export const addressSchema = z.object({
  street: z.string().min(5, "Rua é obrigatória"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado inválido"),
  zipCode: z.string().min(8, "CEP inválido").max(9),
  isDefault: z.boolean().default(false),
});

// Settings validation
export const settingsSchema = z.object({
  storeName: z.string().min(3, "Nome da loja é obrigatório"),
  whatsapp: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  address: z.string().nullable().optional(),
});

// Types derived from schemas
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
