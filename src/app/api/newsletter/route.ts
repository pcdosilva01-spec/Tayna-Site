import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/services/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    // Call Resend to send the welcome email
    await sendWelcomeEmail(email, "Cliente Especial");

    return NextResponse.json({ success: true, message: "Inscrito com sucesso!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Erro ao inscrever" }, { status: 500 });
  }
}
