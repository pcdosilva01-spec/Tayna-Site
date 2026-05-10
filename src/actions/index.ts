"use server";

import prisma from "@/lib/prisma";
import { productSchema, categorySchema, couponSchema, checkoutSchema, settingsSchema } from "@/lib/validations";

// Product actions
export async function getProducts(categorySlug?: string) {
  try {
    const products = await prisma.product.findMany({
      where: categorySlug ? { category: { slug: categorySlug } } : undefined,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao buscar produtos" };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!product) return { success: false, message: "Produto não encontrado" };
    return { success: true, data: product };
  } catch (error) {
    return { success: false, message: "Erro ao buscar produto" };
  }
}

export async function createProduct(data: unknown) {
  try {
    const validated = productSchema.parse(data);
    const product = await prisma.product.create({ data: validated });
    return { success: true, message: "Produto criado com sucesso", data: product };
  } catch (error) {
    return { success: false, message: "Erro de validação ou criação" };
  }
}

export async function updateProduct(id: string, data: unknown) {
  try {
    const validated = productSchema.parse(data);
    const product = await prisma.product.update({ where: { id }, data: validated });
    return { success: true, message: "Produto atualizado", data: product };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar produto" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    return { success: true, message: "Produto excluído" };
  } catch (error) {
    return { success: false, message: "Erro ao excluir produto" };
  }
}

import { sendOrderConfirmationEmail } from "@/services/email";

// Order actions
export async function createOrder(data: any) {
  try {
    // Basic stub, real implementation needs line items
    await sendOrderConfirmationEmail({
      id: Math.random().toString(36).substring(7).toUpperCase(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      total: data.total
    });
    return { success: true, message: "Pedido criado com sucesso" };
  } catch (error) {
    return { success: false, message: "Erro ao criar pedido" };
  }
}

export async function updateOrderStatus(id: string, status: any) {
  try {
    await prisma.order.update({ where: { id }, data: { orderStatus: status } });
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar status" };
  }
}

// Category actions
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, message: "Erro ao buscar categorias" };
  }
}

export async function createCategory(data: unknown) {
  try {
    const validated = categorySchema.parse(data);
    const category = await prisma.category.create({ data: validated });
    return { success: true, message: "Categoria criada", data: category };
  } catch (error) {
    return { success: false, message: "Erro ao criar categoria" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    return { success: true, message: "Categoria excluída" };
  } catch (error) {
    return { success: false, message: "Erro ao excluir categoria" };
  }
}

// Coupon actions
export async function validateCoupon(code: string) {
  try {
    const coupon = await prisma.coupon.findUnique({ where: { code, isActive: true } });
    if (!coupon || (coupon.expiresAt && coupon.expiresAt < new Date())) {
      return { success: false, message: "Cupom inválido ou expirado" };
    }
    return { success: true, data: coupon };
  } catch (error) {
    return { success: false, message: "Erro ao validar cupom" };
  }
}

// Newsletter action
export async function subscribeNewsletter(email: string) {
  return { success: true, message: "Inscrito com sucesso!" };
}

// Settings actions
export async function getSettings() {
  try {
    const settings = await prisma.settings.findFirst();
    return { success: true, data: settings };
  } catch (error) {
    return { success: false, message: "Erro ao buscar configurações" };
  }
}

export async function updateSettings(data: unknown) {
  try {
    const validated = settingsSchema.parse(data);
    // Convert empty strings to null for optional fields
    const sanitized = {
      ...validated,
      email: validated.email === "" ? null : validated.email,
      whatsapp: validated.whatsapp === "" ? null : validated.whatsapp,
      instagram: validated.instagram === "" ? null : validated.instagram,
      address: validated.address === "" ? null : validated.address,
    };
    const first = await prisma.settings.findFirst();
    if (first) {
      await prisma.settings.update({ where: { id: first.id }, data: sanitized });
    } else {
      await prisma.settings.create({ data: sanitized as any });
    }
    return { success: true, message: "Configurações salvas" };
  } catch (error: any) {
    console.error("updateSettings error:", error);
    const msg = error?.issues?.[0]?.message || error?.message || "Erro ao salvar configurações";
    return { success: false, message: `Erro: ${msg}` };
  }
}
