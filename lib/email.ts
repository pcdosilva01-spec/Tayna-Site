import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  total: number
) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Pedido ${orderNumber} confirmado - Tayna Xavier Boutique`,
      html: `
        <h1>Pedido Confirmado!</h1>
        <p>Olá! Seu pedido foi confirmado com sucesso.</p>
        <p><strong>Número do pedido:</strong> ${orderNumber}</p>
        <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
        <p>Em breve você receberá atualizações sobre o envio.</p>
        <p>Obrigada por comprar na Tayna Xavier Boutique!</p>
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}

export async function sendOrderShipped(
  email: string,
  orderNumber: string,
  trackingCode?: string
) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Pedido ${orderNumber} enviado - Tayna Xavier Boutique`,
      html: `
        <h1>Pedido Enviado!</h1>
        <p>Seu pedido ${orderNumber} foi enviado.</p>
        ${trackingCode ? `<p><strong>Código de rastreio:</strong> ${trackingCode}</p>` : ''}
        <p>Obrigada por comprar na Tayna Xavier Boutique!</p>
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}

export async function sendPaymentConfirmed(
  email: string,
  orderNumber: string
) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: `Pagamento confirmado - Pedido ${orderNumber}`,
      html: `
        <h1>Pagamento Confirmado!</h1>
        <p>O pagamento do seu pedido ${orderNumber} foi confirmado.</p>
        <p>Estamos preparando seu pedido para envio.</p>
        <p>Obrigada por comprar na Tayna Xavier Boutique!</p>
      `,
    })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}
