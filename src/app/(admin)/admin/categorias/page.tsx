"use client";

import { Plus, Edit, Trash2 } from "lucide-react";
import { SAMPLE_CATEGORIES } from "@/lib/sample-data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground">{SAMPLE_CATEGORIES.length} categorias</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAMPLE_CATEGORIES.map((cat) => (
          <div key={cat.id} className="p-5 bg-card border border-border rounded-2xl">
            <div className="w-full aspect-[2/1] rounded-xl bg-gradient-to-br from-brand-subtle to-secondary mb-4" />
            <h3 className="font-semibold mb-1">{cat.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">/{cat.slug}</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs hover:bg-secondary transition-colors">
                <Edit className="w-3 h-3" /> Editar
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                <Trash2 className="w-3 h-3" /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
