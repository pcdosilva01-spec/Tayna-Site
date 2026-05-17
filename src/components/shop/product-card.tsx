"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/utils/format";
import { useCartContext, useWishlistContext } from "@/components/shared/store-provider";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Image */}
        <Link href={`/produto/${product.slug}`} className="block">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary relative">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0] as string}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/20" />
              </div>
            )}
            {/* Hover overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/10 flex items-end justify-center pb-6"
            >
              <motion.div
                initial={false}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex items-center gap-2 px-5 py-2.5 bg-white text-foreground rounded-2xl text-xs font-medium shadow-lg">
                  <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                </span>
              </motion.div>
            </motion.div>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-brand text-white text-[10px] font-semibold rounded-xl tracking-wide">
              -{discount}%
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-xl tracking-wide">
              DESTAQUE
            </span>
          )}
        </div>

        {/* Wishlist & Quick Add */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-xl shadow-sm transition-all duration-200 ${
              wishlisted ? "bg-brand text-white" : "bg-white/90 text-foreground/60 hover:text-brand"
            }`}
            aria-label="Favoritar"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Quick Add */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          className="absolute bottom-3 right-3"
        >
          <button
            onClick={() => addItem(product)}
            className="p-2.5 bg-primary text-primary-foreground rounded-xl shadow-lg hover:bg-brand transition-colors"
            aria-label="Adicionar à sacola"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        {product.category && (
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            {product.category.name}
          </p>
        )}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground group-hover:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground">
          até 6x de {formatPrice(product.price / 6)} sem juros
        </p>
      </div>
    </motion.div>
  );
}
