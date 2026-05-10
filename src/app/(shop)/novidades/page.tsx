"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/product-card";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";

export default function NovidadesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-brand mb-2 font-medium">Recém Chegados</p>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold">Novidades</h1>
          <p className="text-sm text-muted-foreground mt-2">{SAMPLE_PRODUCTS.length} produtos</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {SAMPLE_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
