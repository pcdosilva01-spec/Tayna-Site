"use client";

import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const banners = [
  { id: "1", title: "Nova Coleção Primavera", position: "Hero", active: true },
  { id: "2", title: "Promoção de Verão", position: "Hero", active: false },
  { id: "3", title: "Lookbook 2025", position: "Seção", active: true },
];

export default function AdminBannersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Banners</h1>
          <p className="text-sm text-muted-foreground">{banners.length} banners</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Banner
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="p-5 bg-card border border-border rounded-2xl">
            <div className="w-full aspect-[3/1] rounded-xl bg-gradient-to-r from-brand-subtle to-secondary mb-4 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{banner.title}</h3>
                <p className="text-xs text-muted-foreground">Posição: {banner.position}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${banner.active ? "bg-green-100 text-green-700" : "bg-secondary text-muted-foreground"}`}>
                  {banner.active ? "Ativo" : "Inativo"}
                </span>
                <button className="p-1.5 hover:bg-secondary rounded-lg"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
