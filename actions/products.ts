'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts(params?: {
  categoryId?: string
  featured?: boolean
  search?: string
}) {
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
}

export async function getProduct(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { order: 'asc' },
  })
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
