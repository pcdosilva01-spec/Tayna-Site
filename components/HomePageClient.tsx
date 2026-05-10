'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function HomePageClient({ featuredProducts, categories }: { featuredProducts: any[], categories: any[] }) {
  // SVG do Instagram Inline para evitar erro de barrel optimization
  const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )

  return (
    <main className="w-full">
      {/* Navbar (Placeholder for context) */}
      <nav className="absolute top-0 w-full z-20 px-4 py-6 md:px-8 flex justify-between items-center text-white mix-blend-difference">
        <div className="text-xl tracking-widest uppercase font-serif">Tayna Xavier</div>
        <div className="flex gap-4">
          <Heart size={20} />
          <ShoppingBag size={20} />
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#E8CFC1]">
          <Image 
            src="/hero.png" 
            alt="Moda feminina premium" 
            fill 
            className="object-cover opacity-90 image-hover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        
        <motion.div 
          className="relative z-20 text-center text-white px-4 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg">
            Elegância em cada detalhe.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl tracking-wide mb-8 max-w-lg mx-auto font-light drop-shadow-md">
            Sua nova experiência fashion. Minimalismo e sofisticação para a mulher moderna.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/produtos" className="btn btn-white">
              Ver Coleção
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. BEST SELLERS */}
      <section className="py-24 container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif mb-4">
            Mais Desejados
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-16 h-[1px] bg-[var(--color-primary)] mb-4" />
          <motion.p variants={fadeInUp} className="text-light tracking-wide uppercase text-sm">
            Curadoria Exclusiva
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {featuredProducts.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={fadeInUp} className="group relative">
              <Link href={`/produtos/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white image-container">
                <span className="badge">Novo</span>
                <Image 
                  src="/product1.png" 
                  alt={product.name} 
                  fill 
                  className="object-cover image-hover"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors">
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </Link>
              <Link href={`/produtos/${product.slug}`}>
                <h3 className="font-serif text-lg mb-1 group-hover:text-[var(--color-primary-dark)] transition-colors">{product.name}</h3>
                <p className="text-light tracking-widest text-sm">R$ {product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. CATEGORIES - EDITORIAL */}
      <section className="py-24 bg-white">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {categories.slice(0, 4).map((category, idx) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link href={`/produtos?categoria=${category.slug}`} className="group relative block h-[400px] md:h-[600px] overflow-hidden rounded-3xl image-container">
                  <Image 
                    src={idx % 2 === 0 ? "/hero.png" : "/product1.png"} 
                    alt={category.name} 
                    fill 
                    className="object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-serif mb-2">{category.name}</h3>
                    <span className="flex items-center gap-2 text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                      Explorar <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. LOOKBOOK */}
      <section className="py-24 container text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif mb-6">
            Coleção Resort 26
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-light max-w-2xl mx-auto mb-12">
            Descubra as texturas, os recortes e a alfaiataria impecável que definem a nova temporada.
            Uma ode à feminilidade e à sofisticação.
          </motion.p>
          <motion.div variants={fadeInUp} className="relative aspect-video rounded-3xl overflow-hidden image-container">
            <Image 
              src="/hero.png" 
              alt="Lookbook" 
              fill 
              className="object-cover image-hover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <button className="btn btn-white">Ver Lookbook</button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="py-24 bg-[var(--color-primary-light)] text-center px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-serif mb-4">Inscreva-se</h2>
          <p className="text-light mb-8">Receba acesso antecipado a lançamentos, eventos exclusivos e muito mais.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="flex-1 px-6 py-3 rounded-3xl border-none outline-none text-center sm:text-left focus:ring-2 focus:ring-[var(--color-primary-dark)]"
            />
            <button type="submit" className="btn btn-primary">Assinar</button>
          </form>
        </motion.div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-16 bg-white border-t border-[var(--color-border)] text-sm">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl mb-4">Tayna Xavier</h3>
            <p className="text-light">Moda feminina sofisticada para quem valoriza elegância e exclusividade.</p>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-medium">Shop</h4>
            <ul className="flex flex-col gap-2 text-light">
              <li><Link href="/produtos">Novidades</Link></li>
              <li><Link href="/produtos">Mais Vendidos</Link></li>
              <li><Link href="/produtos">Vestidos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-medium">Ajuda</h4>
            <ul className="flex flex-col gap-2 text-light">
              <li><Link href="#">FAQ</Link></li>
              <li><Link href="#">Trocas e Devoluções</Link></li>
              <li><Link href="#">Guia de Tamanhos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-medium">Social</h4>
            <a href="https://www.instagram.com/taynaxavier_boutique/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-light hover:text-[var(--color-text)] transition-colors">
              <InstagramIcon /> Instagram
            </a>
          </div>
        </div>
        <div className="container flex flex-col md:flex-row justify-between items-center text-light pt-8 border-t border-[var(--color-border)]">
          <p>© 2026 Tayna Xavier Boutique. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/admin">Admin</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
