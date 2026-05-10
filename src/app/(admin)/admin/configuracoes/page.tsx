"use client";

import { useState, useEffect } from "react";
import { Save, Store, Phone, Mail, MapPin } from "lucide-react";
import { getSettings, updateSettings } from "@/actions/index";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "Tayna Xavier Boutique",
    whatsapp: "",
    instagram: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    async function loadData() {
      const res = await getSettings();
      if (res.success && res.data) {
        setFormData({
          storeName: res.data.storeName || "",
          whatsapp: res.data.whatsapp || "",
          instagram: res.data.instagram || "",
          email: res.data.email || "",
          address: res.data.address || ""
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await updateSettings(formData);
    if (res.success) {
      alert("Configurações salvas com sucesso!");
    } else {
      alert("Erro ao salvar configurações.");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><p className="text-muted-foreground">Carregando configurações...</p></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Configurações gerais da loja</p>
      </div>
      <div className="space-y-6">
        <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h3 className="font-heading text-sm font-semibold flex items-center gap-2"><Store className="w-4 h-4 text-brand" /> Informações da Loja</h3>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome da Loja</label>
            <input type="text" name="storeName" value={formData.storeName} onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h3 className="font-heading text-sm font-semibold flex items-center gap-2"><Phone className="w-4 h-4 text-brand" /> Contato</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">WhatsApp</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="(00) 00000-0000"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contato@loja.com"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Instagram</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@taynaxavier_boutique"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Endereço</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Endereço da loja"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Save className="w-4 h-4" /> {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
