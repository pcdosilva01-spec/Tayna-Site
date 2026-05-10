import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/actions/auth'
import { LayoutDashboard, ShoppingBag, Package, FolderTree, Tag, Users, LogOut, ArrowLeft } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Produtos', href: '/admin/products', icon: Package },
    { name: 'Categorias', href: '/admin/categories', icon: FolderTree },
    { name: 'Cupons', href: '/admin/coupons', icon: Tag },
    { name: 'Clientes', href: '/admin/customers', icon: Users },
  ]

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col pt-8 pb-4">
        <div className="px-6 mb-8 text-center">
          <h2 className="font-serif text-xl tracking-wide text-gray-900">Tayna Xavier</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex flex-col gap-1 px-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium text-sm"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 mt-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Voltar para loja
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium text-sm"
            >
              <LogOut size={18} />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
