import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/services/email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Assinatura ausente" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret === "whsec_...") {
    // Em dev sem webhook configurado, apenas retorna ok
    return NextResponse.json({ received: true });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Assinatura inválida" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as any;
    const meta = paymentIntent.metadata || {};

    try {
      // Atualiza status do pedido se tiver orderId no metadata
      if (meta.orderId) {
        await prisma.order.update({
          where: { id: meta.orderId },
          data: { paymentStatus: "PAID", orderStatus: "PROCESSING" },
        });
      }

      // Envia e-mail de confirmação
      if (meta.customerEmail && meta.customerName) {
        await sendOrderConfirmationEmail({
          id: meta.orderId || paymentIntent.id,
          customerName: meta.customerName,
          customerEmail: meta.customerEmail,
          total: paymentIntent.amount / 100,
        });
      }
    } catch (err) {
      console.error("Erro ao processar payment_intent.succeeded:", err);
    }
  }

  return NextResponse.json({ received: true });
}
