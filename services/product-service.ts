import { prisma } from '@/lib/prisma'

export class ProductService {
  static async getFeaturedProducts() {
    return await prisma.product.findMany({
      where: { featured: true, active: true },
      include: { category: true },
      take: 8,
    })
  }

  static async searchProducts(query: string) {
    return await prisma.product.findMany({
      where: {
        active: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { category: true },
    })
  }

  static async getRelatedProducts(productId: string, categoryId: string) {
    return await prisma.product.findMany({
      where: {
        active: true,
        categoryId,
        id: { not: productId },
      },
      include: { category: true },
      take: 4,
    })
  }

  static async updateStock(productId: string, quantity: number) {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        stock: { decrement: quantity },
      },
    })
  }

  static async checkStock(productId: string, quantity: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    })

    return product && product.stock >= quantity
  }
}
