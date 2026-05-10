export function orderConfirmationTemplate(order: {
  customerName: string;
  id: string;
  total: number;
}) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#111;padding:30px;text-align:center">
<h1 style="color:#fff;font-size:20px;margin:0;letter-spacing:2px">TAYNA XAVIER</h1>
<p style="color:#999;font-size:10px;letter-spacing:4px;margin:4px 0 0">BOUTIQUE</p>
</td></tr>
<tr><td style="padding:40px 30px;text-align:center">
<div style="width:60px;height:60px;border-radius:50%;background:#e8f5e9;margin:0 auto 20px;line-height:60px;font-size:24px">✓</div>
<h2 style="font-size:22px;color:#111;margin:0 0 8px">Pedido Confirmado!</h2>
<p style="color:#737373;font-size:14px;margin:0">Olá ${order.customerName}, seu pedido foi recebido.</p>
</td></tr>
<tr><td style="padding:0 30px 30px">
<table width="100%" style="background:#f5f5f5;border-radius:12px;padding:20px">
<tr><td style="font-size:13px;color:#737373">Pedido</td><td align="right" style="font-size:13px;font-weight:600">${order.id}</td></tr>
<tr><td style="font-size:13px;color:#737373;padding-top:8px">Total</td><td align="right" style="font-size:16px;font-weight:700;color:#E91E63;padding-top:8px">R$ ${order.total.toFixed(2)}</td></tr>
</table>
</td></tr>
<tr><td style="padding:0 30px 40px;text-align:center">
<a href="#" style="display:inline-block;padding:14px 32px;background:#E91E63;color:#fff;text-decoration:none;border-radius:12px;font-size:14px;font-weight:600">Acompanhar Pedido</a>
</td></tr>
<tr><td style="border-top:1px solid #eee;padding:20px 30px;text-align:center">
<p style="color:#999;font-size:11px;margin:0">© ${new Date().getFullYear()} Tayna Xavier Boutique</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function welcomeEmailTemplate(name: string) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,sans-serif;background:#f5f5f5">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#111;padding:30px;text-align:center">
<h1 style="color:#fff;font-size:20px;margin:0;letter-spacing:2px">TAYNA XAVIER</h1>
<p style="color:#999;font-size:10px;letter-spacing:4px;margin:4px 0 0">BOUTIQUE</p>
</td></tr>
<tr><td style="padding:40px 30px;text-align:center">
<h2 style="font-size:22px;color:#111;margin:0 0 8px">Bem-vinda, ${name}! 💕</h2>
<p style="color:#737373;font-size:14px;line-height:1.6">Estamos felizes em ter você conosco. Explore nossa curadoria de peças exclusivas.</p>
</td></tr>
<tr><td style="padding:0 30px 40px;text-align:center">
<a href="#" style="display:inline-block;padding:14px 32px;background:#E91E63;color:#fff;text-decoration:none;border-radius:12px;font-size:14px;font-weight:600">Explorar Loja</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
