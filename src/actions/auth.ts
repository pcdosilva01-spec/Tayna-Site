"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validations";

export async function registerUser(data: any) {
  try {
    const validated = registerSchema.parse(data);
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    
    if (existingUser) {
      return { success: false, message: "Este e-mail já está em uso" };
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: "USER",
      },
    });
    
    return { success: true, message: "Conta criada com sucesso" };
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, message: "Erro ao criar conta. Verifique os dados." };
  }
}
