"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { formatPrice, formatDateShort } from "@/utils/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/constants";
import { getOrders, updateOrderStatus } from "@/actions/admin";

type Order = { id: string; rawId: string; customer: string; email: string; total: number; payment: string; status: string; date: string; items: number };

const STATUS_OPTIONS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    const res = await getOrders();
    if (res.success && res.data) setOrders(res.data as Order[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (rawId: string, newStatus: string) => {
    setUpdatingId(rawId);
    const res = await updateOrderStatus(rawId, newStatus);
    if (res.success) await loadData();
    else alert(res.message);
    setUpdatingId(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando pedidos...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Pedidos</h1>
        <p className="text-sm text-muted-foreground">{orders.length} pedido{orders.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text" placeholder="Buscar cliente ou pedido..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <select
          value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl text-sm bg-card focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          <option value="all">Todos os Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-muted-foreground">{search || filterStatus !== "all" ? "Nenhum pedido encontrado" : "Nenhum pedido ainda"}</p>
          </div>
        ) : (
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order) => (
                  <tr key={order.rawId} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-brand">{order.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-[10px] text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDateShort(order.date)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${order.payment === "PAID" ? "text-green-600" : order.payment === "FAILED" ? "text-red-600" : "text-amber-600"}`}>
                        {PAYMENT_STATUS_LABELS[order.payment] || order.payment}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order.rawId}
                        onChange={e => handleStatusChange(order.rawId, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-medium border-0 focus:outline-none focus:ring-1 focus:ring-brand/30 cursor-pointer disabled:opacity-50 ${ORDER_STATUS_COLORS[order.status] || "bg-secondary text-muted-foreground"}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
