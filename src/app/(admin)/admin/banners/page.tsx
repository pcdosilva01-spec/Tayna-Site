"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, ToggleLeft, ToggleRight, X } from "lucide-react";

type Banner = { id: string; title: string; subtitle: string; link: string; position: string; active: boolean };

const STORAGE_KEY = "tayna_banners";

function loadBanners(): Banner[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function saveBanners(banners: Banner[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
}

const emptyForm = { title: "", subtitle: "", link: "", position: "Hero" };

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setBanners(loadBanners()); }, []);

  const handleAdd = () => {
    setSaving(true);
    const newBanner: Banner = {
      id: Date.now().toString(),
      ...form,
      active: true,
    };
    const updated = [newBanner, ...banners];
    setBanners(updated);
    saveBanners(updated);
    setForm(emptyForm);
    setShowModal(false);
    setSaving(false);
  };

  const handleToggle = (id: string) => {
    const updated = banners.map(b => b.id === id ? { ...b, active: !b.active } : b);
    setBanners(updated);
    saveBanners(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Excluir este banner?")) return;
    const updated = banners.filter(b => b.id !== id);
    setBanners(updated);
    saveBanners(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Banners</h1>
          <p className="text-sm text-muted-foreground">{banners.length} banner{banners.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Banner
        </button>
      </div>

      {banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-border rounded-2xl">
          <ImageIcon className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">Nenhum banner cadastrado</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Clique em "Novo Banner" para adicionar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="p-5 bg-card border border-border rounded-2xl">
              <div className="w-full aspect-[3/1] rounded-xl bg-gradient-to-r from-brand-subtle to-secondary mb-4 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{banner.title}</h3>
                  {banner.subtitle && <p className="text-xs text-muted-foreground truncate">{banner.subtitle}</p>}
                  <p className="text-xs text-muted-foreground mt-0.5">Posição: {banner.position}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${banner.active ? "bg-green-100 text-green-700" : "bg-secondary text-muted-foreground"}`}>
                    {banner.active ? "Ativo" : "Inativo"}
                  </span>
                  <button
                    onClick={() => handleToggle(banner.id)}
                    className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                    title={banner.active ? "Desativar" : "Ativar"}
                  >
                    {banner.active
                      ? <ToggleRight className="w-4 h-4 text-brand" />
                      : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">Novo Banner</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Título *</label>
                <input
                  type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Ex: Nova Coleção Primavera"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subtítulo</label>
                <input
                  type="text" value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))}
                  placeholder="Ex: Descubra as tendências da temporada"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Link (URL)</label>
                <input
                  type="text" value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
                  placeholder="Ex: /novidades"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Posição</label>
                <select
                  value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-background"
                >
                  <option value="Hero">Hero (Topo)</option>
                  <option value="Seção">Seção</option>
                  <option value="Rodapé">Rodapé</option>
                </select>
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
                onClick={handleAdd}
                disabled={!form.title || saving}
                className="flex-1 px-4 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Salvando..." : "Adicionar Banner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
