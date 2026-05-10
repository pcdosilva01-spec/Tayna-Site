// Stripe payment service
// Install: npm install stripe
// Get API keys: https://dashboard.stripe.com

// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createStripeCheckoutSession(params: {
  items: Array<{ name: string; price: number; quantity: number }>;
  customerEmail: string;
  orderId: string;
}) {
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ["card"],
  //   line_items: params.items.map((item) => ({
  //     price_data: {
  //       currency: "brl",
  //       product_data: { name: item.name },
  //       unit_amount: Math.round(item.price * 100),
  //     },
  //     quantity: item.quantity,
  //   })),
  //   mode: "payment",
  //   customer_email: params.customerEmail,
  //   metadata: { orderId: params.orderId },
  //   success_url: `${process.env.NEXT_PUBLIC_URL}/checkout?status=success&orderId=${params.orderId}`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?status=cancelled`,
  // });
  // return session;
  console.log("[STRIPE] Checkout session created for order", params.orderId);
  return { url: "/checkout?status=success" };
}

export async function createPixPayment(params: {
  amount: number;
  customerEmail: string;
  orderId: string;
}) {
  // Generate PIX QR code using Stripe or another provider
  console.log("[PIX] Payment created for order", params.orderId);
  return { qrCode: "PIX_QR_CODE_PLACEHOLDER", copyPaste: "PIX_CODE" };
}

export async function handleStripeWebhook(body: string, signature: string) {
  // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  // switch (event.type) {
  //   case "checkout.session.completed":
  //     // Update order payment status
  //     break;
  //   case "payment_intent.payment_failed":
  //     // Handle failed payment
  //     break;
  // }
  console.log("[STRIPE] Webhook received");
}
