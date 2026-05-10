"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlistContext, useCartContext } from "@/components/shared/store-provider";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { formatPrice } from "@/utils/format";

export default function FavoritosPage() {
  const { wishlist, toggleWishlist } = useWishlistContext();
  const { addItem } = useCartContext();
  const products = SAMPLE_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <Heart className="w-8 h-8 text-brand" /> Meus Favoritos
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{products.length} {products.length === 1 ? "item" : "itens"}</p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-heading text-xl font-semibold mb-2">Nenhum favorito ainda</p>
            <p className="text-sm text-muted-foreground mb-6">Explore nossos produtos e salve seus favoritos.</p>
            <Link href="/novidades" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-2xl text-sm font-medium">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <motion.div key={product.id} layout className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                <div className="w-24 h-28 rounded-xl bg-secondary flex-shrink-0 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-muted-foreground/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/produto/${product.slug}`} className="text-sm font-medium hover:text-brand transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.category?.name}</p>
                  <p className="text-sm font-semibold mt-2">{formatPrice(product.price)}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => addItem(product)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-xl text-xs font-medium hover:bg-brand/90 transition-colors">
                      <ShoppingBag className="w-3 h-3" /> Adicionar
                    </button>
                    <button onClick={() => toggleWishlist(product.id)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-xs text-muted-foreground hover:text-destructive hover:border-destructive transition-colors">
                      <Trash2 className="w-3 h-3" /> Remover
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
