import { login } from '@/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login</h1>
      
      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#000',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Entrar
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Não tem conta?{' '}
        <Link href="/register" style={{ color: '#000', fontWeight: 'bold' }}>
          Cadastre-se
        </Link>
      </p>

      <Link
        href="/"
        style={{
          display: 'block',
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}
      >
        Voltar para home
      </Link>
    </div>
  )
}
