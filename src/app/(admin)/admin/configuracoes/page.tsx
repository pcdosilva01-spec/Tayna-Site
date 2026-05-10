"use client";

import { Save, Store, Phone, Mail, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
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
            <input type="text" defaultValue="Tayna Xavier Boutique"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
            <textarea rows={3} defaultValue="Boutique feminina premium com curadoria exclusiva"
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none" />
          </div>
        </div>
        <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h3 className="font-heading text-sm font-semibold flex items-center gap-2"><Phone className="w-4 h-4 text-brand" /> Contato</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">WhatsApp</label>
              <input type="text" placeholder="(00) 00000-0000"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">E-mail</label>
              <input type="email" placeholder="contato@loja.com"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Instagram</label>
              <input type="text" defaultValue="@taynaxavier_boutique"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Endereço</label>
              <input type="text" placeholder="Endereço da loja"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
          <Save className="w-4 h-4" /> Salvar Alterações
        </button>
      </div>
    </div>
  );
}
