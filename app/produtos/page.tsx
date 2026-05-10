import { getProducts, getCategories } from '@/actions/products'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const categoria = typeof searchParams.categoria === 'string' ? searchParams.categoria : undefined
  const busca = typeof searchParams.busca === 'string' ? searchParams.busca : undefined

  const [products, categories] = await Promise.all([
    getProducts({
      categoryId: categoria,
      search: busca,
    }),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-white">
      <nav className="container py-8 border-b border-[var(--color-border)] mb-8 flex flex-col md:flex-row md:justify-between items-center text-sm uppercase tracking-widest font-medium gap-4">
        <Link href="/" className="flex items-center gap-2 hover:text-[var(--color-primary-dark)] transition-colors">
          <ChevronLeft size={16} /> Voltar para Home
        </Link>
        <span className="font-serif normal-case text-xl hidden md:block">Tayna Xavier</span>
        <div className="w-[120px] hidden md:block"></div>
      </nav>

      <div className="container pb-24">
        <h1 className="text-4xl font-serif text-center mb-12">Coleção Completa</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/produtos"
            className={`btn ${!categoria ? 'btn-primary' : 'btn-secondary'} text-xs`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produtos?categoria=${cat.slug || cat.id}`}
              className={`btn ${categoria === (cat.slug || cat.id) ? 'btn-primary' : 'btn-secondary'} text-xs`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.slug}`}
              className="group block relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-gray-50 image-container">
                <Image 
                  src="/product1.png" 
                  alt={product.name} 
                  fill 
                  className="object-cover image-hover"
                />
              </div>
              <h3 className="font-serif text-lg mb-1 group-hover:text-[var(--color-primary-dark)] transition-colors">{product.name}</h3>
              <p className="text-light text-xs tracking-widest uppercase mb-1">{product.category.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">R$ {product.price.toFixed(2)}</p>
                {product.comparePrice && (
                  <p className="text-xs text-gray-400 line-through">R$ {product.comparePrice.toFixed(2)}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            <Link href="/produtos" className="btn btn-primary mt-6">Limpar Filtros</Link>
          </div>
        )}
      </div>
    </main>
  )
}
