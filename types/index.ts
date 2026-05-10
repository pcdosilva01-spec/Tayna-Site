import { User, Product, Category, Order, OrderItem, Address, Coupon } from '@prisma/client'

export type { User, Product, Category, Order, OrderItem, Address, Coupon }

export type ProductWithCategory = Product & {
  category: Category
}

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product
  })[]
  address: Address | null
  user: User | null
}

export type CartItem = {
  product: Product
  quantity: number
}

export type CheckoutData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  address: {
    name: string
    street: string
    number: string
    complement?: string
    district: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: 'card' | 'pix'
  couponCode?: string
}
