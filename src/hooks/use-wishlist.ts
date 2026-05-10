"use client";

import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "tayna-boutique-wishlist";

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredWishlist(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWishlist(getStoredWishlist());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setStoredWishlist(wishlist);
    }
  }, [wishlist, mounted]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    totalItems: wishlist.length,
    mounted,
  };
}
