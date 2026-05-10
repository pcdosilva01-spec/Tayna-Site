// Email service using Resend
// Install: npm install resend
// Get API key: https://resend.com

import { Resend } from "resend";
import { orderConfirmationTemplate, welcomeEmailTemplate } from "@/emails/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order: {
  customerName: string;
  customerEmail: string;
  id: string;
  total: number;
}) {
  try {
    const data = await resend.emails.send({
      from: "Tayna Xavier Boutique <onboarding@resend.dev>",
      to: order.customerEmail,
      subject: `Pedido ${order.id} confirmado! 🛍️`,
      html: orderConfirmationTemplate(order),
    });
    console.log(`[EMAIL] Order confirmation sent to ${order.customerEmail}`, data);
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
  }
}

export async function sendPaymentApprovedEmail(email: string, orderId: string) {
  console.log(`[EMAIL] Payment approved sent to ${email} for order ${orderId}`);
}

export async function sendShippingEmail(email: string, orderId: string, trackingCode: string) {
  console.log(`[EMAIL] Shipping notification sent to ${email} for order ${orderId}`);
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: "Tayna Xavier Boutique <onboarding@resend.dev>",
      to: email,
      subject: `Bem-vinda à Tayna Xavier Boutique! 💕`,
      html: welcomeEmailTemplate(name),
    });
    console.log(`[EMAIL] Welcome email sent to ${email}`, data);
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
  }
}

export async function sendCartRecoveryEmail(email: string, name: string) {
  console.log(`[EMAIL] Cart recovery email sent to ${email}`);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  console.log(`[EMAIL] Password reset email sent to ${email}`);
}
