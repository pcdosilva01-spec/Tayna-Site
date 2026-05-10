// ===== TAYNA XAVIER BOUTIQUE — TYPE DEFINITIONS =====

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  images: string[];
  stock: number;
  featured: boolean;
  categoryId: string;
  category?: Category;
  sizes?: string[];
  colors?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  products?: Product[];
  _count?: { products: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: Date | null;
  isActive: boolean;
}

export interface Settings {
  id: string;
  storeName: string;
  whatsapp: string | null;
  instagram: string | null;
  email: string | null;
  address: string | null;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type UserRole = "USER" | "ADMIN";

// UI specific types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  label: string;
  value: string;
}

// Admin dashboard types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}
