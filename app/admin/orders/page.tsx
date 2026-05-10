import { getAdminOrders } from '@/actions/admin'
import { formatDate } from '@/utils/helpers'

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders()

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Pedidos</h1>

      <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Número</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Cliente</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Pagamento</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>{order.orderNumber}</td>
                <td style={{ padding: '1rem' }}>{order.customerName}</td>
                <td style={{ padding: '1rem' }}>R$ {order.total.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      background:
                        order.status === 'DELIVERED'
                          ? '#d4edda'
                          : order.status === 'CANCELLED'
                          ? '#f8d7da'
                          : '#fff3cd',
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      background: order.paymentStatus === 'PAID' ? '#d4edda' : '#fff3cd',
                    }}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            Nenhum pedido encontrado
          </p>
        )}
      </div>
    </div>
  )
}
