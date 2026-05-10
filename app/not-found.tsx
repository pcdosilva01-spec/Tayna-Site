import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '4rem' }}>404</h1>
      <h2>Página não encontrada</h2>
      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          background: '#000',
          color: '#fff',
          borderRadius: '4px',
          marginTop: '1rem'
        }}
      >
        Voltar para home
      </Link>
    </div>
  )
}
