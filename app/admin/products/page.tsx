import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Produtos</h1>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: '#000',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          + Novo Produto
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Categoria</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Preço</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Estoque</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                    {product.featured && (
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>⭐ Destaque</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{product.category.name}</td>
                <td style={{ padding: '1rem' }}>R$ {product.price.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>{product.stock}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      background: product.active ? '#d4edda' : '#f8d7da',
                    }}
                  >
                    {product.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button style={{ marginRight: '0.5rem', color: '#666' }}>Editar</button>
                  <button style={{ color: '#f00' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            Nenhum produto cadastrado
          </p>
        )}
      </div>
    </div>
  )
}
