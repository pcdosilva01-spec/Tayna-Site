import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  })

  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true },
  })

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: product.updatedAt,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/produtos?categoria=${category.slug}`,
    lastModified: category.updatedAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...productUrls,
    ...categoryUrls,
  ]
}
