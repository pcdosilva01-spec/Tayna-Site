import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/utils/helpers'
import { ProductService } from './product-service'

export class OrderService {
  static async createOrder(data: {
    userId?: string
    customerName: string
    customerEmail: string
    customerPhone: string
    items: Array<{ productId: string; quantity: number; price: number }>
    total: number
    addressId?: string
    couponId?: string
  }) {
    // Verificar estoque
    for (const item of data.items) {
      const hasStock = await ProductService.checkStock(item.productId, item.quantity)
      if (!hasStock) {
        throw new Error('Produto sem estoque suficiente')
      }
    }

    const orderNumber = generateOrderNumber()

    // Criar pedido com itens
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: data.userId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        total: data.total,
        addressId: data.addressId,
        couponId: data.couponId,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    // Atualizar estoque
    for (const item of data.items) {
      await ProductService.updateStock(item.productId, item.quantity)
    }

    return order
  }

  static async updateOrderStatus(orderId: string, status: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })
  }

  static async updatePaymentStatus(orderId: string, status: string) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: status },
    })
  }

  static async getOrderStats(startDate?: Date, endDate?: Date) {
    const where: any = {}

    if (startDate && endDate) {
      where.createdAt = {
        gte: startDate,
        lte: endDate,
      }
    }

    const [totalOrders, totalRevenue, avgOrderValue] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.aggregate({
        where: { ...where, paymentStatus: 'PAID' },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: { ...where, paymentStatus: 'PAID' },
        _avg: { total: true },
      }),
    ])

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      avgOrderValue: avgOrderValue._avg.total || 0,
    }
  }
}
