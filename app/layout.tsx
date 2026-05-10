import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Tayna Xavier Boutique - Moda Feminina Premium',
  description: 'Moda feminina premium com estilo e elegância. Vestidos, conjuntos, cropped e muito mais.',
  keywords: ['moda feminina', 'boutique', 'vestidos', 'conjuntos', 'roupas femininas'],
  authors: [{ name: 'Tayna Xavier Boutique' }],
  openGraph: {
    title: 'Tayna Xavier Boutique',
    description: 'Moda feminina premium com estilo e elegância',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
