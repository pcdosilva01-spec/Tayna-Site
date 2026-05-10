'use server'

import { prisma } from '@/lib/prisma'
import { checkoutSchema } from '@/lib/validations'
import { generateOrderNumber } from '@/utils/helpers'
import { sendOrderConfirmation } from '@/lib/email'
import { revalidatePath } from 'next/cache'

export async function createOrder(data: any, userId?: string) {
  const validated = checkoutSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Dados inválidos' }
  }

  const { customerName, customerEmail, customerPhone, address, couponCode } = validated.data

  let discount = 0
  let couponId = undefined

  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: couponCode.toUpperCase(), active: true },
    })

    if (coupon) {
      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        return { error: 'Cupom expirado' }
      }

      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
        return { error: 'Cupom esgotado' }
      }

      discount = coupon.discount
      couponId = coupon.id
    }
  }

  const orderNumber = generateOrderNumber()

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId,
      customerName,
      customerEmail,
      customerPhone,
      total: 0, // será calculado depois
      couponId,
      address: {
        create: {
          userId: userId || '',
          ...address,
        },
      },
    },
  })

  await sendOrderConfirmation(customerEmail, orderNumber, order.total)

  if (couponId) {
    await prisma.coupon.update({
      where: { id: couponId },
      data: { usedCount: { increment: 1 } },
    })
  }

  revalidatePath('/admin/orders')

  return { success: true, orderId: order.id, orderNumber }
}

export async function getOrder(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
      address: true,
      user: true,
    },
  })
}

export async function getOrderByNumber(orderNumber: string) {
  return await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: { product: true },
      },
      address: true,
    },
  })
}

export async function getUserOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function validateCoupon(code: string, total: number) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase(), active: true },
  })

  if (!coupon) {
    return { error: 'Cupom inválido' }
  }

  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { error: 'Cupom expirado' }
  }

  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { error: 'Cupom esgotado' }
  }

  if (coupon.minPurchase && total < coupon.minPurchase) {
    return { error: `Compra mínima de R$ ${coupon.minPurchase.toFixed(2)}` }
  }

  const discountAmount = coupon.type === 'PERCENTAGE' 
    ? (total * coupon.discount) / 100
    : coupon.discount

  return {
    success: true,
    discount: coupon.discount,
    type: coupon.type,
    discountAmount,
  }
}
