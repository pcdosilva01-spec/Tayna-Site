import { prisma } from '@/lib/prisma'
import { formatDate } from '@/utils/helpers'

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Cupons</h1>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: '#000',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          + Novo Cupom
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Código</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Desconto</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Tipo</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Usos</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Expira em</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{coupon.code}</td>
                <td style={{ padding: '1rem' }}>
                  {coupon.type === 'PERCENTAGE' ? `${coupon.discount}%` : `R$ ${coupon.discount}`}
                </td>
                <td style={{ padding: '1rem' }}>{coupon.type}</td>
                <td style={{ padding: '1rem' }}>
                  {coupon.usedCount} {coupon.maxUses ? `/ ${coupon.maxUses}` : ''}
                </td>
                <td style={{ padding: '1rem' }}>
                  {coupon.expiresAt ? formatDate(coupon.expiresAt) : 'Sem expiração'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      background: coupon.active ? '#d4edda' : '#f8d7da',
                    }}
                  >
                    {coupon.active ? 'Ativo' : 'Inativo'}
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

        {coupons.length === 0 && (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            Nenhum cupom cadastrado
          </p>
        )}
      </div>
    </div>
  )
}
