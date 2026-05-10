"use client";

import { StoreProvider } from "@/components/shared/store-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </StoreProvider>
  );
}
