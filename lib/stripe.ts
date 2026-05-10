import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export async function createPaymentIntent(amount: number, metadata: any) {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'brl',
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

export async function createPixPayment(amount: number, metadata: any) {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'brl',
    payment_method_types: ['pix'],
    metadata,
  })
}
