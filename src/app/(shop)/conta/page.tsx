"use client";


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, ShoppingBag, Heart, LogOut, Package, ChevronRight, Loader2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserOrders } from "@/actions/index";
import { formatPrice } from "@/utils/format";

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING:    { label: "Pendente",    color: "bg-yellow-100 text-yellow-700" },
  PROCESSING: { label: "Em preparo",  color: "bg-blue-100 text-blue-700" },
  SHIPPED:    { label: "Enviado",     color: "bg-purple-100 text-purple-700" },
  DELIVERED:  { label: "Entregue",   color: "bg-green-100 text-green-700" },
  CANCELLED:  { label: "Cancelado",  color: "bg-red-100 text-red-700" },
};

export default function ContaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [activeTab, setActiveTab] = useState<"pedidos" | "perfil">("pedidos");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/conta/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setLoadingOrders(true);
      getUserOrders((session.user as any).id || session.user.email || "").then((res) => {
        if (res.success && res.data) setOrders(res.data);
        setLoadingOrders(false);
      });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-heading text-xl font-bold mb-4">Bem-vinda de volta</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/conta" className="px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand/90 transition-colors">Fazer Login</Link>
            <Link href="/cadastro" className="px-6 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-colors">Criar Conta</Link>
          </div>
        </div>
      </div>
    );
  }

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 p-6 bg-card border border-border rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl font-bold truncate">{session.user?.name}</h1>
            <p className="text-sm text-muted-foreground truncate">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-destructive border border-border rounded-xl hover:border-destructive transition-all"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "pedidos" ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-4 h-4" /> Meus Pedidos
          </button>
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "perfil" ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" /> Perfil
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "pedidos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {loadingOrders ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-brand" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border rounded-3xl">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-heading text-lg font-semibold mb-1">Nenhum pedido ainda</p>
                <p className="text-sm text-muted-foreground mb-6">Quando você fizer uma compra, aparecerá aqui.</p>
                <Link href="/novidades" className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-colors">
                  Explorar Produtos
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const statusInfo = statusLabels[order.orderStatus] || { label: order.orderStatus, color: "bg-secondary text-foreground" };
                return (
                  <div key={order.id} className="p-5 bg-card border border-border rounded-2xl space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Pedido</p>
                        <p className="font-mono text-sm font-semibold">#{order.id.substring(0, 8).toUpperCase()}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {order.items?.slice(0, 3).map((item: any) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground truncate mr-2">{item.product?.name} × {item.quantity}</span>
                          <span className="font-medium whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <p className="text-xs text-muted-foreground">+{order.items.length - 3} item(s)</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                      </p>
                      <p className="font-semibold text-sm">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === "perfil" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
              <h3 className="font-heading text-sm font-semibold">Informações da Conta</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Nome</p>
                  <p className="text-sm font-medium">{session.user?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">E-mail</p>
                  <p className="text-sm font-medium">{session.user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/favoritos" className="flex items-center justify-center gap-2 flex-1 py-3 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                <Heart className="w-4 h-4" /> Meus Favoritos
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center justify-center gap-2 flex-1 py-3 border border-destructive/30 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/5 transition-colors">
                <LogOut className="w-4 h-4" /> Sair da Conta
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
