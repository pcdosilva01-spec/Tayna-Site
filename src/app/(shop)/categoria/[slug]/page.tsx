"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from "@/lib/sample-data";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = SAMPLE_CATEGORIES.find((c) => c.slug === slug);
  const products = category
    ? SAMPLE_PRODUCTS.filter((p) => p.categoryId === category.id)
    : SAMPLE_PRODUCTS;

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{category?.name || "Todos os Produtos"}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-2">
            {category?.name || "Todos os Produtos"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "produto" : "produtos"}
          </p>
        </motion.div>
      </div>

      {/* Filters Bar */}
      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filtros
          </button>
          <select className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none cursor-pointer">
            <option>Mais Recentes</option>
            <option>Menor Preço</option>
            <option>Maior Preço</option>
            <option>Mais Vendidos</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-heading font-semibold mb-2">Nenhum produto encontrado</p>
            <p className="text-sm text-muted-foreground mb-6">Tente outra categoria ou volte em breve.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-medium">
              Ver Todos os Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
