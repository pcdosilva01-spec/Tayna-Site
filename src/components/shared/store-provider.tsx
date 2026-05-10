"use client";

import React, { createContext, useContext } from "react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

type CartContextType = ReturnType<typeof useCart>;
type WishlistContextType = ReturnType<typeof useWishlist>;

const CartContext = createContext<CartContextType | null>(null);
const WishlistContext = createContext<WishlistContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const wishlist = useWishlist();

  return (
    <CartContext.Provider value={cart}>
      <WishlistContext.Provider value={wishlist}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within StoreProvider");
  }
  return context;
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within StoreProvider");
  }
  return context;
}
