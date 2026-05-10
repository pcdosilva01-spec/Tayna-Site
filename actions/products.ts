'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Mock Data Fallback
const MOCK_CATEGORIES = [
  { id: '1', name: 'Vestidos', slug: 'vestidos' },
  { id: '2', name: 'Conjuntos', slug: 'conjuntos' },
  { id: '3', name: 'Alfaiataria', slug: 'alfaiataria' },
  { id: '4', name: 'Lançamentos', slug: 'lancamentos' }
]

const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Vestido Seda Nude', slug: 'vestido-seda-nude', price: 599.90, comparePrice: 799.90, category: MOCK_CATEGORIES[0], description: 'Vestido premium em seda pura com caimento perfeito.', stock: 10 },
  { id: 'p2', name: 'Conjunto Linho Off-White', slug: 'conjunto-linho', price: 899.90, category: MOCK_CATEGORIES[1], description: 'Conjunto elegante de alfaiataria em linho.', stock: 5 },
  { id: 'p3', name: 'Blazer Minimal', slug: 'blazer-minimal', price: 1299.90, comparePrice: null, category: MOCK_CATEGORIES[2], description: 'Blazer estruturado com corte impecável.', stock: 3 },
  { id: 'p4', name: 'Calça Pantalona', slug: 'calca-pantalona', price: 459.90, category: MOCK_CATEGORIES[2], description: 'Calça pantalona fluida.', stock: 15 },
]

export async function getProducts(params?: {
  categoryId?: string
  featured?: boolean
  search?: string
}) {
  try {
    const where: any = { active: true }

    if (params?.categoryId) {
      where.categoryId = params.categoryId
    }

    if (params?.featured) {
      where.featured = true
    }

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ]
    }

    return await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.warn("Database connection failed. Using mock products.")
    return MOCK_PRODUCTS
  }
}

export async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
  } catch (error) {
    console.warn("Database connection failed. Using mock product.")
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0]
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { order: 'asc' },
    })
  } catch (error) {
    console.warn("Database connection failed. Using mock categories.")
    return MOCK_CATEGORIES
  }
}

export async function toggleFavorite(userId: string, productId: string) {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    })
    return { favorited: false }
  } else {
    await prisma.favorite.create({
      data: { userId, productId },
    })
    return { favorited: true }
  }
}

export async function getFavorites(userId: string) {
  return await prisma.favorite.findMany({
    where: { userId },
    include: {
      product: {
        include: { category: true },
      },
    },
  })
}
