"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, FolderOpen, X } from "lucide-react";
import { getCategoriesAdmin, createCategory, deleteCategory } from "@/actions/admin";

type Category = { id: string; name: string; slug: string; image: string | null; _count: { products: number } };

function slugify(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const emptyForm = { name: "", slug: "" };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    const res = await getCategoriesAdmin();
    if (res.success && res.data) setCategories(res.data as Category[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const handleNameChange = (name: string) => {
    setForm(p => ({ ...p, name, slug: slugify(name) }));
  };

  const handleCreate = async () => {
    if (!form.name || !form.slug) { setError("Nome e slug são obrigatórios"); return; }
    setSaving(true);
    setError("");
    const res = await createCategory({ name: form.name, slug: form.slug });
    if (res.success) {
      setShowModal(false);
      setForm(emptyForm);
      await loadData();
    } else {
      setError(res.message || "Erro ao criar categoria");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, count: number) => {
    if (count > 0) { alert(`Essa categoria tem ${count} produto(s). Remova os produtos antes de excluir.`); return; }
    if (!confirm("Excluir esta categoria?")) return;
    const res = await deleteCategory(id);
    if (res.success) await loadData();
    else alert(res.message);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando categorias...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground">{categories.length} categoria{categories.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setError(""); setForm(emptyForm); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-2xl text-center">
          <FolderOpen className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground font-medium">Nenhuma categoria cadastrada</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Clique em "Nova Categoria" para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="p-5 bg-card border border-border rounded-2xl group">
              <div className="w-full aspect-[2/1] rounded-xl bg-gradient-to-br from-brand-subtle to-secondary mb-4 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-muted-foreground/20" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat._count.products} produto{cat._count.products !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => handleDelete(cat.id, cat._count.products)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
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
              <h2 className="font-heading font-bold text-lg">Nova Categoria</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome *</label>
                <input
                  type="text" value={form.name} onChange={e => handleNameChange(e.target.value)}
                  placeholder="Ex: Vestidos"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Slug (URL)</label>
                <input
                  type="text" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                  placeholder="Ex: vestidos"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
                <p className="text-xs text-muted-foreground mt-1">Gerado automaticamente pelo nome</p>
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
                {saving ? "Criando..." : "Criar Categoria"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
