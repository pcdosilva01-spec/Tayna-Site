"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Eye, Package, X, Upload } from "lucide-react";
import { getProducts } from "@/actions/index";
import { deleteProduct, createProduct, getCategoriesAdmin } from "@/actions/admin";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", price: "", comparePrice: "", stock: "0", categoryId: "", featured: false, images: "" });

  async function loadData() {
    setLoading(true);
    const [resProd, resCat] = await Promise.all([getProducts(), getCategoriesAdmin()]);
    if (resProd.success && resProd.data) setAllProducts(resProd.data);
    if (resCat.success && resCat.data) setCategories(resCat.data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const products = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir o produto "${name}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    const res = await deleteProduct(id);
    if (res.success) {
      await loadData();
    } else {
      alert(res.message);
    }
    setDeletingId(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.slug || !form.price || !form.categoryId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    setSaving(true);
    const res = await createProduct({
      name: form.name,
      slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      description: form.description || "Descrição do produto",
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
      stock: parseInt(form.stock) || 0,
      featured: form.featured,
      categoryId: form.categoryId,
      images: form.images ? [form.images] : ["/images/products/placeholder.jpg"],
    });

    if (res.success) {
      toast.success("Produto criado com sucesso!");
      setShowModal(false);
      setForm({ name: "", slug: "", description: "", price: "", comparePrice: "", stock: "0", categoryId: "", featured: false, images: "" });
      loadData();
    } else {
      toast.error(res.message);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando produtos...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">{allProducts.length} produto{allProducts.length !== 1 ? "s" : ""} cadastrado{allProducts.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text" placeholder="Buscar produto ou categoria..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Package className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-muted-foreground">
              {search ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
            </p>
          </div>
        ) : (
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
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.images?.[0]
                            ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            : <Package className="w-4 h-4 text-muted-foreground/40" />}
                        </div>
                        <span className="font-medium truncate max-w-[180px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{product.category?.name || "—"}</td>
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
                        <Link
                          href={`/produto/${product.slug}`}
                          target="_blank"
                          className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                          title="Ver na loja"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deletingId === product.id}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading font-bold text-lg">Novo Produto</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome do Produto *</label>
                  <input type="text" value={form.name} onChange={e => {
                      setForm(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
                    }}
                    placeholder="Ex: Vestido Midi Floral" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Slug da URL *</label>
                  <input type="text" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                    placeholder="vestido-midi-floral" className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-secondary" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preço (R$) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                    placeholder="299.90" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Preço Antigo (Opcional)</label>
                  <input type="number" step="0.01" value={form.comparePrice} onChange={e => setForm(p => ({ ...p, comparePrice: e.target.value }))}
                    placeholder="349.90" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Estoque *</label>
                  <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Categoria *</label>
                  <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30 bg-background">
                    <option value="">Selecione...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 rounded text-brand focus:ring-brand" />
                    <span className="text-sm font-medium">Produto em Destaque</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">URL da Imagem (Provisório)</label>
                <input type="text" value={form.images} onChange={e => setForm(p => ({ ...p, images: e.target.value }))}
                  placeholder="/images/products/placeholder.jpg" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  rows={3} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/30" />
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0 mt-4 border-t border-border">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
                Cancelar
              </button>
              <button onClick={handleCreate} disabled={saving || !form.name || !form.price || !form.categoryId} className="flex-1 px-4 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Criar Produto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
