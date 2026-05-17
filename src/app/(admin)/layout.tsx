"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, Image, Settings, LogOut,
  Menu, X, ChevronRight, Bell,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: Package },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { label: "Clientes", href: "/admin/clientes", icon: Users },
  { label: "Categorias", href: "/admin/categorias", icon: Tag },
  { label: "Cupons", href: "/admin/cupons", icon: Tag },
  { label: "Banners", href: "/admin/banners", icon: Image },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {pathname === "/admin/login" ? (
        <main className="flex-1 min-w-0">{children}</main>
      ) : (
        <>
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="block">
            <h1 className="font-heading text-lg font-bold tracking-tight">TAYNA XAVIER</h1>
            <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Admin Dashboard</p>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive ? "bg-brand text-white font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}>
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ChevronRight className="w-4 h-4" /> Ver Loja
          </Link>
          <button onClick={async () => {
            const { adminLogout } = await import("@/actions/admin");
            await adminLogout();
            window.location.href = "/admin/login";
          }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
            <LogOut className="w-4 h-4" /> Sair do Admin
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-card shadow-2xl lg:hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h1 className="font-heading text-lg font-bold">Admin</h1>
              <button onClick={() => setSidebarOpen(false)} className="p-2"><X className="w-5 h-5" /></button>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive ? "bg-brand text-white font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}>
                    <link.icon className="w-4 h-4" /> {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-secondary rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden lg:block">
                <h2 className="text-sm font-semibold">Admin</h2>
                <p className="text-[10px] text-muted-foreground">Gerencie sua loja</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-secondary rounded-lg relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-semibold">TX</div>
            </div>
          </div>
        </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
        </>
      )}
    </div>
  );
}
