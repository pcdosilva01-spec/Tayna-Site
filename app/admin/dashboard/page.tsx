import { getDashboardStats, getTopProducts } from '@/actions/admin'
import { TrendingUp, ShoppingBag, DollarSign, Package, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
  const [stats, topProducts] = await Promise.all([
    getDashboardStats(),
    getTopProducts(),
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gray-900">Visão Geral</h1>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Baixar Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm font-medium">Total de Pedidos</span>
            <ShoppingBag size={20} className="text-gray-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm font-medium">Faturamento Total</span>
            <DollarSign size={20} className="text-gray-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">
            R$ {stats.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm font-medium">Pedidos Pendentes</span>
            <TrendingUp size={20} className="text-orange-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.pendingOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm font-medium">Total de Produtos</span>
            <Package size={20} className="text-gray-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.products}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Produtos Mais Vendidos</h2>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            Ver Todos <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="flex flex-col">
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-8">Produto</div>
            <div className="col-span-4 text-right">Vendas</div>
          </div>
          {topProducts.map((item, index) => (
            <div
              key={item.product?.id}
              className="grid grid-cols-12 gap-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center"
            >
              <div className="col-span-8 flex items-center gap-4">
                <span className="text-gray-400 font-mono text-sm w-6">0{index + 1}</span>
                <span className="font-medium text-gray-900">{item.product?.name}</span>
              </div>
              <div className="col-span-4 text-right font-medium text-gray-900">
                {item.quantity} un
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
