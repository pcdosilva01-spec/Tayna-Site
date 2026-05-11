"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/shop/hero-section";
import { ProductCard } from "@/components/shop/product-card";
import { getProducts, getCategories } from "@/actions/index";
import { useState, useEffect } from "react";

const fadeUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data || []));
    getCategories().then((res) => setCategories(res.data || []));
  }, []);

  const featuredProducts = products.filter((p) => p.featured);
  const newArrivals = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Trust Bar */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: "Frete Grátis", sub: "Acima de R$ 299" },
              { icon: Shield, text: "Compra Segura", sub: "Dados protegidos" },
              { icon: RotateCcw, text: "Troca Fácil", sub: "Até 30 dias" },
              { icon: Sparkles, text: "Peças Exclusivas", sub: "Curadoria premium" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 bg-brand-subtle rounded-xl">
                  <item.icon className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <p className="text-xs font-semibold">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24" id="novidades-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-brand mb-2 font-medium">Recém Chegados</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold">Novidades</h2>
            </div>
            <Link href="/novidades" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors group">
              Ver Todos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/novidades" className="inline-flex items-center gap-2 text-sm font-medium text-brand">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-secondary/50" id="categorias-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-brand mb-2 font-medium">Explore</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold">Categorias</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {categories.slice(0, 6).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/categoria/${cat.slug}`}
                  className="group block relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-subtle to-accent">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                      Explorar <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-24" id="bestsellers-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-brand mb-2 font-medium">Mais Amados</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold">Best Sellers</h2>
            </div>
            <Link href="/mais-vendidos" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors group">
              Ver Todos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook / Editorial Banner */}
      <section className="py-16 lg:py-24" id="lookbook-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-brand aspect-[2/1] lg:aspect-[3/1]">
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                <div className="text-center lg:text-left lg:pl-16 xl:pl-24 text-white max-w-lg px-6">
                  <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">Lookbook 2025</p>
                  <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                    Coleção<br />Primavera
                  </h2>
                  <p className="text-sm lg:text-base text-white/70 mb-6">
                    Peças que celebram a feminilidade com elegância e autenticidade.
                  </p>
                  <Link href="/novidades"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground rounded-2xl text-sm font-semibold hover:bg-brand-muted transition-colors group">
                    Ver Coleção <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed CTA */}
      <section className="py-16 lg:py-24 bg-secondary/50" id="instagram-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <p className="text-xs tracking-[0.3em] uppercase text-brand mb-2 font-medium">@taynaxavier_boutique</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-3">Siga no Instagram</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
              Acompanhe as novidades, bastidores e inspirações de looks diretamente no nosso perfil.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gradient-to-br from-brand-subtle to-brand-muted overflow-hidden group cursor-pointer">
                  <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand/20">
                    <Sparkles className="w-6 h-6 text-brand" />
                  </div>
                </div>
              ))}
            </div>
            <a href="https://www.instagram.com/taynaxavier_boutique/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary text-primary rounded-2xl text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Seguir @taynaxavier_boutique
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
