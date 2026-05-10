'use server'

import { signIn, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validated = loginSchema.safeParse({ email, password })
  if (!validated.success) {
    return { error: 'Dados inválidos' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Email ou senha incorretos' }
    }
    throw error
  }
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validated = registerSchema.safeParse({ name, email, password })
  if (!validated.success) {
    return { error: 'Dados inválidos' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email já cadastrado' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Erro ao fazer login' }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' })
}
