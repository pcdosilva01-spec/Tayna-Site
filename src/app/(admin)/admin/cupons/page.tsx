"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, ToggleLeft, ToggleRight, X } from "lucide-react";
import { getCoupons, createCoupon, deleteCoupon, toggleCoupon } from "@/actions/admin";
import { formatDateShort } from "@/utils/format";

type Coupon = { id: string; code: string; discount: number; expiresAt: string | null; isActive: boolean; uses: number };

const emptyForm = { code: "", discount: "", expiresAt: "", isActive: true };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    const res = await getCoupons();
    if (res.success && res.data) setCoupons(res.data as Coupon[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const handleCreate = async () => {
    if (!form.code || !form.discount) { setError("Código e desconto são obrigatórios"); return; }
    setSaving(true);
    setError("");
    const res = await createCoupon({
      code: form.code,
      discount: Number(form.discount),
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      isActive: form.isActive,
    });
    if (res.success) {
      setShowModal(false);
      setForm(emptyForm);
      await loadData();
    } else {
      setError(res.message || "Erro ao criar cupom");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este cupom?")) return;
    const res = await deleteCoupon(id);
    if (res.success) await loadData();
    else alert(res.message);
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleCoupon(id, !current);
    await loadData();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando cupons...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Cupons</h1>
          <p className="text-sm text-muted-foreground">{coupons.length} cupom{coupons.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setError(""); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Cupom
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {coupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Tag className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-muted-foreground">Nenhum cupom cadastrado</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Código</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Desconto</th>
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
                  <td className="px-4 py-3 text-muted-foreground">{coupon.expiresAt ? formatDateShort(coupon.expiresAt) : "Sem prazo"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${coupon.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {coupon.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleToggle(coupon.id, coupon.isActive)}
                        className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                        title={coupon.isActive ? "Desativar" : "Ativar"}
                      >
                        {coupon.isActive
                          ? <ToggleRight className="w-4 h-4 text-brand" />
                          : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">Novo Cupom</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Código *</label>
                <input
                  type="text" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                  placeholder="EX: PROMO10"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Desconto (%) *</label>
                <input
                  type="number" min="1" max="100" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
                  placeholder="Ex: 10"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Data de expiração (opcional)</label>
                <input
                  type="date" value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-background"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="couponActive" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="couponActive" className="text-sm">Ativar cupom imediatamente</label>
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Criando..." : "Criar Cupom"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
