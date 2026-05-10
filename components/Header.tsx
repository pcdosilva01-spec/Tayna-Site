import Link from 'next/link'

export function Header() {
  return (
    <header style={{
      borderBottom: '1px solid #ddd',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Tayna Xavier Boutique
      </Link>
      
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/produtos">Produtos</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  )
}
