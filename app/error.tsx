'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      gap: '1rem'
    }}>
      <h2>Algo deu errado!</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          background: '#000',
          color: '#fff',
          borderRadius: '4px'
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}
