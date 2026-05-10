import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tayna Xavier Boutique | Moda Feminina Premium",
    template: "%s | Tayna Xavier Boutique",
  },
  description:
    "Boutique feminina premium com curadoria exclusiva de peças sofisticadas. Vestidos, conjuntos e looks que elevam seu estilo com elegância e personalidade.",
  keywords: [
    "boutique feminina",
    "moda feminina premium",
    "vestidos femininos",
    "loja feminina online",
    "roupas femininas premium",
    "moda feminina sofisticada",
    "tayna xavier boutique",
    "looks exclusivos",
    "moda editorial",
  ],
  openGraph: {
    title: "Tayna Xavier Boutique | Moda Feminina Premium",
    description:
      "Curadoria exclusiva de peças sofisticadas para mulheres que buscam elegância e personalidade.",
    type: "website",
    locale: "pt_BR",
    siteName: "Tayna Xavier Boutique",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayna Xavier Boutique | Moda Feminina Premium",
    description:
      "Curadoria exclusiva de peças sofisticadas para mulheres que buscam elegância e personalidade.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
