import { getProducts, getCategories } from '@/actions/products'
import Link from 'next/link'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { categoria?: string; busca?: string }
}) {
  const [products, categories] = await Promise.all([
    getProducts({
      categoryId: searchParams.categoria,
      search: searchParams.busca,
    }),
    getCategories(),
  ])

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#666' }}>← Voltar</Link>
      </div>

      <h1 style={{ marginBottom: '2rem' }}>Produtos</h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link
          href="/produtos"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: !searchParams.categoria ? '#000' : '#fff',
            color: !searchParams.categoria ? '#fff' : '#000',
          }}
        >
          Todos
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/produtos?categoria=${cat.id}`}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: searchParams.categoria === cat.id ? '#000' : '#fff',
              color: searchParams.categoria === cat.id ? '#fff' : '#000',
            }}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.slug}`}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div style={{ aspectRatio: '1', background: '#f5f5f5' }} />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {product.category.name}
              </p>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                R$ {product.price.toFixed(2)}
              </p>
              {product.comparePrice && (
                <p style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>
                  R$ {product.comparePrice.toFixed(2)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
          Nenhum produto encontrado
        </p>
      )}
    </div>
  )
}
