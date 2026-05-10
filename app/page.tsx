import { getProducts, getCategories } from '@/actions/products'
import HomePageClient from '@/components/HomePageClient'

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ])

  return (
    <HomePageClient 
      featuredProducts={featuredProducts} 
      categories={categories} 
    />
  )
}
