import { prisma } from '@/lib/prisma'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Categorias</h1>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: '#000',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          + Nova Categoria
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Slug</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Produtos</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Ordem</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{category.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{category.slug}</td>
                <td style={{ padding: '1rem' }}>{category._count.products}</td>
                <td style={{ padding: '1rem' }}>{category.order}</td>
                <td style={{ padding: '1rem' }}>
                  <button style={{ marginRight: '0.5rem', color: '#666' }}>Editar</button>
                  <button style={{ color: '#f00' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            Nenhuma categoria cadastrada
          </p>
        )}
      </div>
    </div>
  )
}
