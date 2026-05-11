"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Lock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "@/components/shared/store-provider";
import { formatPrice } from "@/utils/format";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCartContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleCheckout = () => {
    if (!session) {
      setShowLoginPrompt(true);
    } else {
      setIsOpen(false);
      router.push("/checkout");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[90] bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-heading text-lg font-semibold">Sacola</h2>
                <span className="text-sm text-muted-foreground">({totalItems})</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-xl transition-colors" aria-label="Fechar sacola">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="font-heading text-lg font-semibold mb-1">Sua sacola está vazia</p>
                  <p className="text-sm text-muted-foreground mb-6">Adicione peças para começar</p>
                  <button onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-medium hover:opacity-90 transition-opacity">
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }} className="flex gap-4">
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0 relative">
                      <div className="w-full h-full bg-gradient-to-br from-brand-muted to-brand-subtle flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-brand/40" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      {item.size && <p className="text-xs text-muted-foreground mt-0.5">Tam: {item.size}</p>}
                      <p className="text-sm font-semibold mt-1">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-xl">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-secondary transition-colors" disabled={item.quantity <= 1}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-secondary transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                          Remover
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Frete calculado no checkout</p>
                <button onClick={handleCheckout}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand text-white rounded-2xl font-medium text-sm hover:bg-brand/90 transition-colors">
                  Finalizar Compra <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* D - Login Prompt Modal */}
    <AnimatePresence>
      {showLoginPrompt && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginPrompt(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div className="bg-background border border-border rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Faça Login para Comprar</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Acesse sua conta ou crie uma nova para finalizar sua compra com segurança.
              </p>
              <div className="space-y-3">
                <Link href="/conta" onClick={() => { setShowLoginPrompt(false); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-brand/90 transition-colors">
                  <User className="w-4 h-4" /> Fazer Login
                </Link>
                <Link href="/cadastro" onClick={() => { setShowLoginPrompt(false); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-secondary text-foreground rounded-xl font-semibold text-sm hover:bg-secondary/80 transition-colors">
                  Criar Conta Grátis
                </Link>
                <button onClick={() => setShowLoginPrompt(false)}
                  className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Continuar navegando
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>);
}
