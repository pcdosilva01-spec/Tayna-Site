// Prisma seed file
// Run: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Settings
  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "Tayna Xavier Boutique",
      whatsapp: "(00) 00000-0000",
      instagram: "@taynaxavier_boutique",
      email: "contato@taynaxavier.com.br",
      address: "Brasil",
    },
  });

  // Categories
  const categories = [
    { name: "Vestidos", slug: "vestidos" },
    { name: "Conjuntos", slug: "conjuntos" },
    { name: "Blusas & Tops", slug: "blusas" },
    { name: "Saias & Calças", slug: "saias-calcas" },
    { name: "Acessórios", slug: "acessorios" },
    { name: "Moda Praia", slug: "moda-praia" },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }

  // Products
  const products = [
    { name: "Vestido Midi Floral Rosa", slug: "vestido-midi-floral-rosa", description: "Vestido midi com estampa floral delicada em tons de rosa. Tecido fluido e confortável, ideal para ocasiões especiais.", price: 289.90, comparePrice: 349.90, images: ["/images/products/vestido-1.jpg"], stock: 15, featured: true, categoryId: createdCategories["vestidos"] },
    { name: "Conjunto Cropped + Saia Linho", slug: "conjunto-cropped-saia-linho", description: "Conjunto sofisticado em linho natural. Cropped com amarração e saia midi evasê.", price: 379.90, comparePrice: null, images: ["/images/products/conjunto-1.jpg"], stock: 10, featured: true, categoryId: createdCategories["conjuntos"] },
    { name: "Blusa Cetim Off-White", slug: "blusa-cetim-off-white", description: "Blusa em cetim premium com caimento impecável. Decote V delicado e mangas bufantes.", price: 189.90, comparePrice: 229.90, images: ["/images/products/blusa-1.jpg"], stock: 20, featured: false, categoryId: createdCategories["blusas"] },
    { name: "Calça Wide Leg Alfaiataria", slug: "calca-wide-leg-alfaiataria", description: "Calça wide leg em tecido de alfaiataria premium. Cintura alta com pregas frontais.", price: 259.90, comparePrice: null, images: ["/images/products/calca-1.jpg"], stock: 12, featured: true, categoryId: createdCategories["saias-calcas"] },
    { name: "Vestido Longo Festa Preto", slug: "vestido-longo-festa-preto", description: "Vestido longo elegante em crepe preto. Fenda lateral e decote nas costas.", price: 459.90, comparePrice: 559.90, images: ["/images/products/vestido-2.jpg"], stock: 8, featured: true, categoryId: createdCategories["vestidos"] },
    { name: "Conjunto Blazer + Short", slug: "conjunto-blazer-short", description: "Conjunto power feminino com blazer estruturado e short alfaiataria.", price: 429.90, comparePrice: null, images: ["/images/products/conjunto-2.jpg"], stock: 7, featured: false, categoryId: createdCategories["conjuntos"] },
    { name: "Top Cropped Tricot Rosa", slug: "top-cropped-tricot-rosa", description: "Cropped em tricot com detalhes em rosa. Peça versátil e feminina.", price: 149.90, comparePrice: 179.90, images: ["/images/products/top-1.jpg"], stock: 25, featured: false, categoryId: createdCategories["blusas"] },
    { name: "Saia Midi Plissada Dourada", slug: "saia-midi-plissada-dourada", description: "Saia midi plissada com brilho sutil dourado. Elegância e movimento.", price: 219.90, comparePrice: null, images: ["/images/products/saia-1.jpg"], stock: 14, featured: true, categoryId: createdCategories["saias-calcas"] },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, categoryId: product.categoryId as string },
      create: { ...product, categoryId: product.categoryId as string },
    });
  }

  // Coupons
  await prisma.coupon.upsert({
    where: { code: "BEMVINDA10" },
    update: {},
    create: { code: "BEMVINDA10", discount: 10, isActive: true },
  });
  await prisma.coupon.upsert({
    where: { code: "VERAO20" },
    update: {},
    create: { code: "VERAO20", discount: 20, isActive: true, expiresAt: new Date("2025-12-31") },
  });

  // Admin user
  // const bcrypt = require("bcryptjs");
  // await prisma.user.upsert({
  //   where: { email: "admin@taynaxavier.com.br" },
  //   update: {},
  //   create: {
  //     name: "Admin",
  //     email: "admin@taynaxavier.com.br",
  //     password: await bcrypt.hash("admin123", 12),
  //     role: "ADMIN",
  //   },
  // });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
