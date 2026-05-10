"use client";

import { Search, Eye, ChevronDown } from "lucide-react";
import { formatPrice, formatDateShort } from "@/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";

import { useState, useEffect } from "react";
import { getOrders } from "@/actions/admin";

type OrderType = { id: string; customer: string; email: string; total: number; payment: string; status: string; date: string; items: number }[];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getOrders();
      if (res.success && res.data) {
        setOrders(res.data as any);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando pedidos...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Pedidos</h1>
        <p className="text-sm text-muted-foreground">{orders.length} pedidos</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Buscar pedido..."
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
        </div>
        <select className="px-4 py-2.5 border border-border rounded-xl text-sm bg-card focus:outline-none focus:ring-2 focus:ring-brand/30">
          <option>Todos os Status</option>
          <option>Pendente</option>
          <option>Processando</option>
          <option>Enviado</option>
          <option>Entregue</option>
          <option>Cancelado</option>
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Data</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Pagamento</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Total</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-brand">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDateShort(order.date)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${order.payment === "PAID" ? "text-green-600" : "text-amber-600"}`}>
                      {PAYMENT_STATUS_LABELS[order.payment]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${ORDER_STATUS_COLORS[order.status] || ""}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors" title="Ver detalhes">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
