import type { Product, Category } from "@/types";

export const SAMPLE_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Vestidos", slug: "vestidos", image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-2", name: "Conjuntos", slug: "conjuntos", image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-3", name: "Blusas & Tops", slug: "blusas", image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-4", name: "Saias & Calças", slug: "saias-calcas", image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-5", name: "Acessórios", slug: "acessorios", image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-6", name: "Moda Praia", slug: "moda-praia", image: null, createdAt: new Date(), updatedAt: new Date() },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1", name: "Vestido Midi Floral Rosa", slug: "vestido-midi-floral-rosa",
    description: "Vestido midi com estampa floral delicada em tons de rosa. Tecido fluido e confortável, ideal para ocasiões especiais.",
    price: 289.90, comparePrice: 349.90, images: ["/images/products/vestido-1.jpg"],
    stock: 15, featured: true, categoryId: "cat-1",
    category: { id: "cat-1", name: "Vestidos", slug: "vestidos", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-2", name: "Conjunto Cropped + Saia Linho", slug: "conjunto-cropped-saia-linho",
    description: "Conjunto sofisticado em linho natural. Cropped com amarração e saia midi evasê.",
    price: 379.90, comparePrice: null, images: ["/images/products/conjunto-1.jpg"],
    stock: 10, featured: true, categoryId: "cat-2",
    category: { id: "cat-2", name: "Conjuntos", slug: "conjuntos", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-3", name: "Blusa Cetim Off-White", slug: "blusa-cetim-off-white",
    description: "Blusa em cetim premium com caimento impecável. Decote V delicado e mangas bufantes.",
    price: 189.90, comparePrice: 229.90, images: ["/images/products/blusa-1.jpg"],
    stock: 20, featured: false, categoryId: "cat-3",
    category: { id: "cat-3", name: "Blusas & Tops", slug: "blusas", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-4", name: "Calça Wide Leg Alfaiataria", slug: "calca-wide-leg-alfaiataria",
    description: "Calça wide leg em tecido de alfaiataria premium. Cintura alta com pregas frontais.",
    price: 259.90, comparePrice: null, images: ["/images/products/calca-1.jpg"],
    stock: 12, featured: true, categoryId: "cat-4",
    category: { id: "cat-4", name: "Saias & Calças", slug: "saias-calcas", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-5", name: "Vestido Longo Festa Preto", slug: "vestido-longo-festa-preto",
    description: "Vestido longo elegante em crepe preto. Fenda lateral e decote nas costas.",
    price: 459.90, comparePrice: 559.90, images: ["/images/products/vestido-2.jpg"],
    stock: 8, featured: true, categoryId: "cat-1",
    category: { id: "cat-1", name: "Vestidos", slug: "vestidos", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-6", name: "Conjunto Blazer + Short", slug: "conjunto-blazer-short",
    description: "Conjunto power feminino com blazer estruturado e short alfaiataria.",
    price: 429.90, comparePrice: null, images: ["/images/products/conjunto-2.jpg"],
    stock: 7, featured: false, categoryId: "cat-2",
    category: { id: "cat-2", name: "Conjuntos", slug: "conjuntos", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-7", name: "Top Cropped Tricot Rosa", slug: "top-cropped-tricot-rosa",
    description: "Cropped em tricot com detalhes em rosa. Peça versátil e feminina.",
    price: 149.90, comparePrice: 179.90, images: ["/images/products/top-1.jpg"],
    stock: 25, featured: false, categoryId: "cat-3",
    category: { id: "cat-3", name: "Blusas & Tops", slug: "blusas", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "prod-8", name: "Saia Midi Plissada Dourada", slug: "saia-midi-plissada-dourada",
    description: "Saia midi plissada com brilho sutil dourado. Elegância e movimento.",
    price: 219.90, comparePrice: null, images: ["/images/products/saia-1.jpg"],
    stock: 14, featured: true, categoryId: "cat-4",
    category: { id: "cat-4", name: "Saias & Calças", slug: "saias-calcas", image: null, createdAt: new Date(), updatedAt: new Date() },
    createdAt: new Date(), updatedAt: new Date(),
  },
];
