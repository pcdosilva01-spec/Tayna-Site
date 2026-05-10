import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendPaymentConfirmed } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object

    const order = await prisma.order.findFirst({
      where: { stripeId: paymentIntent.id },
    })

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentStatus: 'PAID' },
      })

      await sendPaymentConfirmed(order.customerEmail, order.orderNumber)
    }
  }

  return NextResponse.json({ received: true })
}
