"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatPrice, formatDateShort } from "@/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/constants";

import { useState, useEffect } from "react";
import { getDashboardData } from "@/actions/admin";

// We will fetch these from the server
// type definitions for the state
type StatsType = { label: string; value: string; change: string; up: boolean; icon: any }[];
type RecentOrderType = { id: string; customer: string; total: number; status: string; date: string }[];
type TopProductType = { name: string; sales: number; revenue: number }[];

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsType>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrderType>([]);
  const [topProducts, setTopProducts] = useState<TopProductType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getDashboardData();
      if (res.success && res.data) {
        setStats([
          { label: "Faturamento", value: formatPrice(res.data.stats.revenue), change: "", up: true, icon: DollarSign },
          { label: "Pedidos", value: res.data.stats.orders.toString(), change: "", up: true, icon: ShoppingCart },
          { label: "Produtos", value: res.data.stats.products.toString(), change: "", up: true, icon: Package },
          { label: "Clientes", value: res.data.stats.customers.toString(), change: "", up: true, icon: Users },
        ]);
        setRecentOrders(res.data.recentOrders as any);
        setTopProducts(res.data.topProducts);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando dashboard...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral da sua loja</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-card border border-border rounded-2xl">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-brand-subtle rounded-xl">
                <stat.icon className="w-4 h-4 text-brand" />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-heading text-sm font-semibold">Pedidos Recentes</h3>
            <Link href="/admin/pedidos" className="text-xs text-brand hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
                    {order.customer.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{order.customer}</p>
                    <p className="text-[10px] text-muted-foreground">{order.id} · {formatDateShort(order.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${ORDER_STATUS_COLORS[order.status] || ""}`}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                  <span className="text-sm font-semibold whitespace-nowrap">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-heading text-sm font-semibold">Mais Vendidos</h3>
            <Link href="/admin/produtos" className="text-xs text-brand hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <span className="w-6 h-6 rounded-full bg-secondary text-[10px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground">{product.sales} vendas · {formatPrice(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
