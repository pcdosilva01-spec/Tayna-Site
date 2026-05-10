import { register } from '@/actions/auth'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Cadastro</h1>
      
      <form action={register} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Já tem conta?{' '}
        <Link href="/login" style={{ color: '#000', fontWeight: 'bold' }}>
          Faça login
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
