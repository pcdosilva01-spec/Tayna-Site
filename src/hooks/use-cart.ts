"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "tayna-boutique-cart";

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getStoredCart());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setStoredCart(items);
    }
  }, [items, mounted]);

  const addItem = useCallback(
    (product: Product, quantity = 1, size?: string, color?: string) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        return [
          ...prev,
          {
            id: `${product.id}-${size || "default"}-${color || "default"}-${Date.now()}`,
            product,
            quantity,
            size,
            color,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    mounted,
  };
}
