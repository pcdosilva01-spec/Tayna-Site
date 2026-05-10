"use client";

import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { formatDateShort } from "@/utils/format";

import { useState, useEffect } from "react";
import { getCoupons } from "@/actions/admin";

type CouponType = { id: string; code: string; discount: number; expiresAt: string | null; isActive: boolean; uses: number }[];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getCoupons();
      if (res.success && res.data) {
        setCoupons(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando cupons...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Cupons</h1>
          <p className="text-sm text-muted-foreground">{coupons.length} cupons</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Cupom
        </button>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Código</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Desconto</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Usos</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Expira</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-brand" />
                    <span className="font-mono font-semibold">{coupon.code}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{coupon.discount}%</td>
                <td className="px-4 py-3 text-muted-foreground">{coupon.uses}</td>
                <td className="px-4 py-3 text-muted-foreground">{coupon.expiresAt ? formatDateShort(coupon.expiresAt) : "Sem prazo"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${coupon.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {coupon.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 hover:bg-secondary rounded-lg"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
