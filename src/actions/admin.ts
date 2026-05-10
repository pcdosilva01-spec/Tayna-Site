"use server";

import prisma from "@/lib/prisma";

export async function getDashboardData() {
  try {
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    const totalCustomers = await prisma.user.count({ where: { role: "USER" } });
    
    const orders = await prisma.order.findMany({
      where: { paymentStatus: "PAID" },
      select: { total: true }
    });
    
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const topProductsRaw = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 4,
    });

    const topProducts = await Promise.all(topProductsRaw.map(async (item) => {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      return {
        name: product?.name || "Produto excluído",
        sales: item._sum.quantity || 0,
        revenue: (item._sum.price || 0) * (item._sum.quantity || 0)
      }
    }));

    return {
      success: true,
      data: {
        stats: {
          revenue: totalRevenue,
          orders: totalOrders,
          products: totalProducts,
          customers: totalCustomers,
        },
        recentOrders: recentOrders.map(o => ({
          id: "ORD-" + o.id.substring(0, 5).toUpperCase(),
          customer: o.customerName || "Cliente",
          total: o.total,
          status: o.orderStatus,
          date: o.createdAt.toISOString()
        })),
        topProducts
      }
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { success: false, message: "Erro ao buscar dados do dashboard" }
  }
}

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: { role: "USER" },
      include: {
        orders: {
          select: { total: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return {
      success: true,
      data: customers.map(c => ({
        id: c.id,
        name: c.name || "Cliente sem nome",
        email: c.email || "Sem email",
        orders: c.orders.length,
        spent: c.orders.reduce((acc, o) => acc + o.total, 0),
        joined: c.createdAt.toISOString()
      }))
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { success: false, message: "Erro ao buscar clientes" }
  }
}

export async function getCoupons() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { 
      success: true, 
      data: coupons.map(c => ({
        id: c.id,
        code: c.code,
        discount: c.discount,
        expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
        isActive: c.isActive,
        uses: 0 // Placeholder as we don't have usage tracking yet
      })) 
    };
  } catch(error) {
    console.error("Error fetching coupons:", error);
    return { success: false, message: "Erro ao buscar cupons" }
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { items: true }
        }
      }
    });
    return { 
      success: true, 
      data: orders.map(o => ({
        id: "ORD-" + o.id.substring(0, 5).toUpperCase(),
        customer: o.customerName || "Cliente",
        email: o.customerEmail || "",
        total: o.total,
        status: o.orderStatus,
        payment: o.paymentStatus,
        date: o.createdAt.toISOString(),
        items: o._count.items
      })) 
    };
  } catch(error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: "Erro ao buscar pedidos" }
  }
}
