import { getProduct } from '@/actions/products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Truck, Info, ShieldCheck } from 'lucide-react'

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="container py-8 border-b border-[var(--color-border)] mb-8 flex justify-between items-center text-sm uppercase tracking-widest font-medium">
        <Link href="/produtos" className="flex items-center gap-2 hover:text-[var(--color-primary-dark)] transition-colors">
          <ChevronLeft size={16} /> Voltar
        </Link>
        <span className="font-serif normal-case text-xl">Tayna Xavier</span>
        <span className="w-[70px]"></span>{/* spacer */}
      </nav>

      <div className="container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image 
                src="/product1.png" 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50">
                <Image src="/hero.png" alt={`${product.name} detail`} fill className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50">
                <Image src="/product1.png" alt={`${product.name} back`} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col pt-4 md:pt-12 md:sticky md:top-12 h-fit">
            <span className="text-light text-sm uppercase tracking-widest mb-4">
              {product.category.name}
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl mb-6 text-gray-900">
              {product.name}
            </h1>
            
            <div className="mb-8">
              <p className="text-2xl tracking-widest font-light text-gray-900">
                R$ {product.price.toFixed(2)}
              </p>
              {product.comparePrice && (
                <p className="text-sm text-gray-400 line-through mt-1">
                  R$ {product.comparePrice.toFixed(2)}
                </p>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-10 font-light">
                {product.description}
              </p>
            )}

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4 text-sm font-medium">
                <span className="uppercase tracking-widest text-gray-900">Tamanho</span>
                <button className="underline text-gray-500 hover:text-gray-900 transition-colors">Guia de Medidas</button>
              </div>
              <div className="flex gap-3">
                {['PP', 'P', 'M', 'G'].map(size => (
                  <button key={size} className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm hover:border-gray-900 transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={product.stock === 0}
              className={`btn ${product.stock > 0 ? 'btn-primary' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} w-full py-4 text-sm tracking-widest mb-6`}
            >
              {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível (Sold Out)'}
            </button>

            <div className="border-t border-[var(--color-border)] pt-8 flex flex-col gap-6">
              <div className="flex items-start gap-4 text-sm text-gray-600">
                <Truck size={20} className="text-gray-900" />
                <div>
                  <p className="font-medium text-gray-900 mb-1 uppercase tracking-widest">Entrega Premium</p>
                  <p className="font-light">Frete grátis em compras acima de R$ 500. Entregas expressas disponíveis.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm text-gray-600">
                <ShieldCheck size={20} className="text-gray-900" />
                <div>
                  <p className="font-medium text-gray-900 mb-1 uppercase tracking-widest">Garantia & Troca</p>
                  <p className="font-light">Devolução facilitada em até 7 dias após o recebimento.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm text-gray-600">
                <Info size={20} className="text-gray-900" />
                <div>
                  <p className="font-medium text-gray-900 mb-1 uppercase tracking-widest">Composição</p>
                  <p className="font-light">Design exclusivo, acabamento premium e tecidos selecionados.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {}
  }

  return {
    title: `${product.name} - Tayna Xavier Boutique`,
    description: product.description || product.name,
  }
}
