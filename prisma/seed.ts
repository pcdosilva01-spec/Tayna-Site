import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@taynaboutique.com' },
    update: {},
    create: {
      email: 'admin@taynaboutique.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin criado:', admin.email)

  // Categories
  const categories = [
    { name: 'Vestidos', slug: 'vestidos', order: 1 },
    { name: 'Conjuntos', slug: 'conjuntos', order: 2 },
    { name: 'Cropped', slug: 'cropped', order: 3 },
    { name: 'Jeans', slug: 'jeans', order: 4 },
    { name: 'Moda Feminina', slug: 'moda-feminina', order: 5 },
    { name: 'Acessórios', slug: 'acessorios', order: 6 },
    { name: 'Lançamentos', slug: 'lancamentos', order: 7 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log('✅ Categorias criadas')

  // Products
  const vestidosCategory = await prisma.category.findUnique({ where: { slug: 'vestidos' } })
  const conjuntosCategory = await prisma.category.findUnique({ where: { slug: 'conjuntos' } })
  const croppedCategory = await prisma.category.findUnique({ where: { slug: 'cropped' } })

  const products = [
    {
      name: 'Vestido Midi Floral',
      slug: 'vestido-midi-floral',
      description: 'Vestido midi com estampa floral delicada, perfeito para ocasiões especiais',
      price: 189.90,
      comparePrice: 249.90,
      images: ['/placeholder-product.jpg'],
      stock: 15,
      featured: true,
      categoryId: vestidosCategory!.id,
    },
    {
      name: 'Vestido Longo Festa',
      slug: 'vestido-longo-festa',
      description: 'Vestido longo elegante ideal para festas e eventos',
      price: 299.90,
      comparePrice: 399.90,
      images: ['/placeholder-product.jpg'],
      stock: 8,
      featured: true,
      categoryId: vestidosCategory!.id,
    },
    {
      name: 'Conjunto Alfaiataria',
      slug: 'conjunto-alfaiataria',
      description: 'Conjunto blazer e calça alfaiataria premium',
      price: 349.90,
      comparePrice: 449.90,
      images: ['/placeholder-product.jpg'],
      stock: 12,
      featured: true,
      categoryId: conjuntosCategory!.id,
    },
    {
      name: 'Conjunto Tricot',
      slug: 'conjunto-tricot',
      description: 'Conjunto em tricot macio e confortável',
      price: 219.90,
      images: ['/placeholder-product.jpg'],
      stock: 20,
      categoryId: conjuntosCategory!.id,
    },
    {
      name: 'Cropped Canelado',
      slug: 'cropped-canelado',
      description: 'Cropped canelado básico essencial',
      price: 79.90,
      images: ['/placeholder-product.jpg'],
      stock: 30,
      categoryId: croppedCategory!.id,
    },
    {
      name: 'Cropped Manga Longa',
      slug: 'cropped-manga-longa',
      description: 'Cropped manga longa em ribana',
      price: 89.90,
      images: ['/placeholder-product.jpg'],
      stock: 25,
      categoryId: croppedCategory!.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Produtos criados')

  // Settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      storeName: 'Tayna Xavier Boutique',
      whatsapp: '5511999999999',
      instagram: 'taynaxavier_boutique',
      email: 'contato@taynaboutique.com',
      description: 'Moda feminina premium com estilo e elegância',
    },
  })

  console.log('✅ Configurações criadas')

  // Coupons
  await prisma.coupon.create({
    data: {
      code: 'BEMVINDA10',
      discount: 10,
      type: 'PERCENTAGE',
      minPurchase: 100,
      maxUses: 100,
    },
  })

  console.log('✅ Cupons criados')
  console.log('🎉 Seed concluído!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
