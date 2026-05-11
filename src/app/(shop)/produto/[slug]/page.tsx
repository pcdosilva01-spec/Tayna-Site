"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/actions/index";
import { ProductCard } from "@/components/shop/product-card";
import { useCartContext, useWishlistContext } from "@/components/shared/store-provider";
import { formatPrice, calculateDiscount } from "@/utils/format";
import { SIZES } from "@/lib/constants";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug).then((res) => {
      if (res.success && res.data) {
        setProduct(res.data);
        getProducts(res.data.category?.slug).then((relRes) => {
          if (relRes.success && relRes.data) {
            setRelated(relRes.data.filter((p: any) => p.id !== res.data.id).slice(0, 4));
          }
        });
      }
      setLoading(false);
    });
  }, [slug]);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");

  const { addItem } = useCartContext();
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const discount = product?.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;

  const handleAddToCart = () => {
    if (product) addItem(product, quantity, selectedSize);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando produto...</p></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Produto não encontrado.</p></div>;
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          {product.category && (
            <>
              <Link href={`/categoria/${product.category.slug}`} className="hover:text-foreground transition-colors">
                {product.category.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-subtle to-secondary relative">
              <div className="w-full h-full flex items-center justify-center">
                {product.images && product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ShoppingBag className="w-20 h-20 text-muted-foreground/15" />
                )}
              </div>
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-brand text-white text-xs font-semibold rounded-xl">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.map((img: string, i: number) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-brand transition-colors">
                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:py-4">
            {product.category && (
              <p className="text-xs tracking-[0.2em] uppercase text-brand mb-2 font-medium">{product.category.name}</p>
            )}
            <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(12 avaliações)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl lg:text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              até <strong>6x de {formatPrice(product.price / 6)}</strong> sem juros no cartão
            </p>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Tamanho</label>
                <button className="text-xs text-brand hover:underline">Guia de tamanhos</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? "border-brand bg-brand text-white"
                        : "border-border hover:border-foreground/30"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Quantidade</label>
              <div className="flex items-center border border-border rounded-xl w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand text-white rounded-2xl font-semibold text-sm hover:bg-brand/90 transition-colors">
                <ShoppingBag className="w-4 h-4" /> Adicionar à Sacola
              </button>
              <button onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  isInWishlist(product.id) ? "bg-brand border-brand text-white" : "border-border hover:border-brand hover:text-brand"
                }`}>
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 p-5 bg-secondary/50 rounded-2xl">
              {[
                { icon: Truck, text: "Frete grátis para compras acima de R$ 299" },
                { icon: RotateCcw, text: "Troca e devolução em até 30 dias" },
                { icon: Shield, text: "Compra 100% segura" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-brand flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-8 border-t border-border pt-8">
              <div className="flex gap-6 mb-6">
                {(["description", "details", "reviews"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                      activeTab === tab ? "border-brand text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}>
                    {tab === "description" ? "Descrição" : tab === "details" ? "Detalhes" : "Avaliações (12)"}
                  </button>
                ))}
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "details" && (
                  <ul className="space-y-2">
                    <li>• Material premium de alta qualidade</li>
                    <li>• Tecido macio e confortável</li>
                    <li>• Caimento impecável</li>
                    <li>• Lavável à máquina</li>
                  </ul>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                        </div>
                        <span className="text-xs font-medium">Maria S.</span>
                      </div>
                      <p className="text-xs">Peça linda! O caimento é perfeito e a qualidade surpreendeu.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <section className="mt-20 pt-16 border-t border-border">
          <h2 className="font-heading text-2xl font-bold mb-8">Você Também Vai Amar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
