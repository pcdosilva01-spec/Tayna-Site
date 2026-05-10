"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import { NAV_LINKS, STORE_NAME } from "@/lib/constants";
import { useCartContext, useWishlistContext } from "@/components/shared/store-provider";
import { CartDrawer } from "@/components/shop/cart-drawer";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, isOpen, setIsOpen } = useCartContext();
  const { totalItems: wishlistCount } = useWishlistContext();
  const [storeName, setStoreName] = useState(STORE_NAME);

  useEffect(() => {
    import("@/actions/index").then((mod) => {
      mod.getSettings().then((res) => {
        if (res.success && res.data?.storeName) {
          setStoreName(res.data.storeName);
        }
      });
    });
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-xs tracking-[0.2em] uppercase font-medium">
        Frete grátis para compras acima de R$ 299 ✦ Parcele em até 6x sem juros
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass border-b border-border/50 shadow-sm"
            : "bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Abrir menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group" id="header-logo">
              <div className="text-center">
                <h1 className="font-heading text-xl lg:text-2xl font-semibold tracking-tight text-foreground group-hover:text-brand transition-colors duration-300">
                  {storeName}
                </h1>
                <p className="text-[10px] lg:text-xs tracking-[0.35em] uppercase text-muted-foreground -mt-0.5">
                  Boutique
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide relative group"
                  id={`nav-${link.href.replace(/\//g, "-")}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Buscar"
                id="search-btn"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/conta"
                className="hidden sm:flex p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Minha conta"
                id="account-btn"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/favoritos"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors relative"
                aria-label="Favoritos"
                id="wishlist-btn"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand text-brand-foreground text-[10px] font-medium flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors relative"
                aria-label="Carrinho"
                id="cart-btn"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand text-brand-foreground text-[10px] font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border/50"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Buscar produtos, categorias..."
                    className="w-full pl-11 pr-10 py-3 bg-secondary/50 border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    autoFocus
                    id="search-input"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Fechar busca"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm z-[70] bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="font-heading text-lg font-semibold tracking-tight">
                    {storeName}
                  </h2>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                    Boutique
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-base text-foreground/80 hover:text-foreground hover:pl-2 transition-all duration-200 border-b border-border/30"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 -rotate-90 text-muted-foreground" />
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border space-y-3">
                <Link
                  href="/conta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <User className="w-4 h-4" />
                  Minha Conta
                </Link>
                <Link
                  href="/favoritos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Favoritos ({wishlistCount})
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
