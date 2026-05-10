"use client";

import { Search, Mail, ShoppingCart } from "lucide-react";
import { formatPrice, formatDateShort } from "@/utils/format";

import { useState, useEffect } from "react";
import { getCustomers } from "@/actions/admin";

type CustomerType = { id: string; name: string; email: string; orders: number; spent: number; joined: string }[];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getCustomers();
      if (res.success && res.data) {
        setCustomers(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando clientes...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Clientes</h1>
        <p className="text-sm text-muted-foreground">{customers.length} clientes cadastrados</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar cliente..."
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Pedidos</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Total Gasto</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Desde</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-subtle text-brand flex items-center justify-center text-xs font-semibold">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-[10px] text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{customer.orders}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(customer.spent)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDateShort(customer.joined)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-secondary rounded-lg" title="Enviar e-mail"><Mail className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg" title="Ver pedidos"><ShoppingCart className="w-4 h-4 text-muted-foreground" /></button>
                    </div>
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
