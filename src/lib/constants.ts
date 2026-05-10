// ===== TAYNA XAVIER BOUTIQUE — CONSTANTS =====

import type { NavLink, HeroSlide, SortOption } from "@/types";

export const STORE_NAME = "Tayna Xavier Boutique";
export const STORE_DESCRIPTION = "Moda Feminina Premium";
export const STORE_TAGLINE = "Elegância que define você";

export const INSTAGRAM_URL = "https://www.instagram.com/taynaxavier_boutique/";
export const WHATSAPP_URL = "https://wa.me/5500000000000";

export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Novidades", href: "/novidades" },
  { label: "Vestidos", href: "/categoria/vestidos" },
  { label: "Conjuntos", href: "/categoria/conjuntos" },
  { label: "Blusas", href: "/categoria/blusas" },
  { label: "Saias & Calças", href: "/categoria/saias-calcas" },
  { label: "Acessórios", href: "/categoria/acessorios" },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    title: "Nova Coleção",
    subtitle: "Peças exclusivas que traduzem sofisticação e feminilidade em cada detalhe",
    image: "/images/hero/hero-1.jpg",
    cta: "Explorar Coleção",
    href: "/novidades",
  },
  {
    id: "2",
    title: "Elegância Atemporal",
    subtitle: "Vestidos que contam histórias e celebram a mulher moderna",
    image: "/images/hero/hero-2.jpg",
    cta: "Ver Vestidos",
    href: "/categoria/vestidos",
  },
  {
    id: "3",
    title: "Curadoria Premium",
    subtitle: "Cada peça selecionada com cuidado para elevar seu guarda-roupa",
    image: "/images/hero/hero-3.jpg",
    cta: "Descobrir",
    href: "/novidades",
  },
];

export const SORT_OPTIONS: SortOption[] = [
  { label: "Mais Recentes", value: "newest" },
  { label: "Menor Preço", value: "price-asc" },
  { label: "Maior Preço", value: "price-desc" },
  { label: "Mais Vendidos", value: "bestselling" },
  { label: "Nome A-Z", value: "name-asc" },
];

export const SIZES = ["PP", "P", "M", "G", "GG"] as const;
export const COLORS = [
  { name: "Preto", value: "#1A1412" },
  { name: "Branco", value: "#FFFFFF" },
  { name: "Nude", value: "#E8CCAF" },
  { name: "Rosa", value: "#F2D7D5" },
  { name: "Vermelho", value: "#DC3545" },
  { name: "Azul", value: "#2E4057" },
  { name: "Verde", value: "#3D5A40" },
  { name: "Dourado", value: "#C4A882" },
] as const;

export const BRAZIL_STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO",
] as const;

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  FAILED: "Falhou",
  REFUNDED: "Reembolsado",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PROCESSING: "Processando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export const CURRENCY = {
  code: "BRL",
  symbol: "R$",
  locale: "pt-BR",
};
