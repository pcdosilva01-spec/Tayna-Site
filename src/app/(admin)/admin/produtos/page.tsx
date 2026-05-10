"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Package } from "lucide-react";
import Link from "next/link";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { formatPrice } from "@/utils/format";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const products = SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">{SAMPLE_PRODUCTS.length} produtos cadastrados</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar produto..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Produto</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Categoria</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Preço</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Estoque</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-muted-foreground/40" />
                      </div>
                      <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{product.category?.name}</td>
                  <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-medium ${product.featured ? "bg-brand-subtle text-brand" : "bg-secondary text-muted-foreground"}`}>
                      {product.featured ? "Destaque" : "Normal"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors" title="Ver"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors" title="Editar"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Excluir"><Trash2 className="w-4 h-4 text-red-400" /></button>
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
