"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── Dashboard ───────────────────────────────────────────────────────────────

export async function getDashboardData() {
  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    const totalCustomers = await prisma.user.count({ where: { role: "USER" } });

    const orders = await prisma.order.findMany({
      where: { paymentStatus: "PAID" },
      select: { total: true },
    });

    const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 4,
    });

    const topProducts = await Promise.all(
      topProductsRaw.map(async (item) => {
        const product = await prisma.product.findUnique({ where: { id: item.productId } });
        return {
          name: product?.name || "Produto excluído",
          sales: item._sum.quantity || 0,
          revenue: (item._sum.price || 0) * (item._sum.quantity || 0),
        };
      })
    );

    return {
      success: true,
      data: {
        stats: { revenue: totalRevenue, orders: totalOrders, products: totalProducts, customers: totalCustomers },
        recentOrders: recentOrders.map((o) => ({
          id: "ORD-" + o.id.substring(0, 5).toUpperCase(),
          customer: o.customerName || "Cliente",
          total: o.total,
          status: o.orderStatus,
          date: o.createdAt.toISOString(),
        })),
        topProducts,
      },
    };
  } catch (error) {
    console.error("getDashboardData error:", error);
    return { success: false, message: "Erro ao buscar dados do dashboard" };
  }
}

// ─── Customers ────────────────────────────────────────────────────────────────

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: { role: "USER" },
      include: { orders: { select: { total: true } } },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: customers.map((c) => ({
        id: c.id,
        name: c.name || "Cliente sem nome",
        email: c.email || "Sem email",
        orders: c.orders.length,
        spent: c.orders.reduce((acc, o) => acc + o.total, 0),
        joined: c.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("getCustomers error:", error);
    return { success: false, message: "Erro ao buscar clientes" };
  }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { items: true } } },
    });

    return {
      success: true,
      data: orders.map((o) => ({
        id: "ORD-" + o.id.substring(0, 5).toUpperCase(),
        rawId: o.id,
        customer: o.customerName || "Cliente",
        email: o.customerEmail || "",
        total: o.total,
        status: o.orderStatus,
        payment: o.paymentStatus,
        date: o.createdAt.toISOString(),
        items: o._count.items,
      })),
    };
  } catch (error) {
    console.error("getOrders error:", error);
    return { success: false, message: "Erro ao buscar pedidos" };
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    await prisma.order.update({ where: { id }, data: { orderStatus: status as any } });
    revalidatePath("/admin/pedidos");
    return { success: true, message: "Status atualizado" };
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return { success: false, message: "Erro ao atualizar status" };
  }
}

// ─── Coupons ──────────────────────────────────────────────────────────────────

export async function getCoupons() {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return {
      success: true,
      data: coupons.map((c) => ({
        id: c.id,
        code: c.code,
        discount: c.discount,
        expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
        isActive: c.isActive,
        firstPurchaseOnly: c.firstPurchaseOnly,
        associatedEmail: c.associatedEmail,
        associatedCpf: c.associatedCpf,
        associatedPhone: c.associatedPhone,
        uses: 0,
      })),
    };
  } catch (error) {
    console.error("getCoupons error:", error);
    return { success: false, message: "Erro ao buscar cupons" };
  }
}

export async function createCoupon(data: {
  code: string;
  discount: number;
  expiresAt: string | null;
  isActive: boolean;
  firstPurchaseOnly?: boolean;
  associatedEmail?: string;
  associatedCpf?: string;
  associatedPhone?: string;
}) {
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase().trim(),
        discount: data.discount,
        isActive: data.isActive,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        firstPurchaseOnly: data.firstPurchaseOnly || false,
        associatedEmail: data.associatedEmail || null,
        associatedCpf: data.associatedCpf || null,
        associatedPhone: data.associatedPhone || null,
      },
    });
    revalidatePath("/admin/cupons");
    return { success: true, data: coupon };
  } catch (error: any) {
    console.error("createCoupon error:", error);
    if (error?.code === "P2002") return { success: false, message: "Código de cupom já existe" };
    return { success: false, message: "Erro ao criar cupom" };
  }
}

export async function toggleCoupon(id: string, isActive: boolean) {
  try {
    await prisma.coupon.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/cupons");
    return { success: true };
  } catch (error) {
    console.error("toggleCoupon error:", error);
    return { success: false, message: "Erro ao atualizar cupom" };
  }
}

export async function deleteCoupon(id: string) {
  try {
    await prisma.coupon.delete({ where: { id } });
    revalidatePath("/admin/cupons");
    return { success: true };
  } catch (error) {
    console.error("deleteCoupon error:", error);
    return { success: false, message: "Erro ao excluir cupom" };
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategoriesAdmin() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("getCategoriesAdmin error:", error);
    return { success: false, message: "Erro ao buscar categorias" };
  }
}

export async function createCategory(data: { name: string; slug: string; image?: string }) {
  try {
    const category = await prisma.category.create({
      data: { name: data.name.trim(), slug: data.slug.trim().toLowerCase(), image: data.image || null },
    });
    revalidatePath("/admin/categorias");
    return { success: true, data: category };
  } catch (error: any) {
    console.error("createCategory error:", error);
    if (error?.code === "P2002") return { success: false, message: "Slug já existe" };
    return { success: false, message: "Erro ao criar categoria" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categorias");
    return { success: true };
  } catch (error: any) {
    console.error("deleteCategory error:", error);
    if (error?.code === "P2003") return { success: false, message: "Categoria possui produtos. Remova os produtos antes." };
    return { success: false, message: "Erro ao excluir categoria" };
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/produtos");
    return { success: true };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return { success: false, message: "Erro ao excluir produto" };
  }
}

// ─── Banners ──────────────────────────────────────────────────────────────────

export async function getBanners() {
  try {
    const banners = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
    return { success: true, data: banners };
  } catch (error) {
    console.error("getBanners error:", error);
    return { success: false, message: "Erro ao buscar banners" };
  }
}

export async function createBanner(data: {
  title: string;
  subtitle?: string;
  link?: string;
  position: string;
  active: boolean;
}) {
  try {
    const banner = await prisma.banner.create({ data });
    revalidatePath("/admin/banners");
    return { success: true, data: banner };
  } catch (error) {
    console.error("createBanner error:", error);
    return { success: false, message: "Erro ao criar banner" };
  }
}

export async function toggleBanner(id: string, active: boolean) {
  try {
    await prisma.banner.update({ where: { id }, data: { active } });
    revalidatePath("/admin/banners");
    return { success: true };
  } catch (error) {
    console.error("toggleBanner error:", error);
    return { success: false, message: "Erro ao atualizar banner" };
  }
}

export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({ where: { id } });
    revalidatePath("/admin/banners");
    return { success: true };
  } catch (error) {
    console.error("deleteBanner error:", error);
    return { success: false, message: "Erro ao excluir banner" };
  }
}
