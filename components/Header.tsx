'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Heart, User, Menu } from 'lucide-react'
import { SlideCart } from './SlideCart'
import { useCart } from '@/hooks/use-cart'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getItemCount } = useCart()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const itemCount = mounted ? getItemCount() : 0

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 text-gray-900' : 'bg-transparent py-6 text-gray-900 md:text-gray-900'
        }`}
      >
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center md:hidden">
            <button className="p-2"><Menu size={20} /></button>
          </div>

          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
            <Link href="/produtos" className="hover:text-[var(--color-primary-dark)] transition-colors">Novidades</Link>
            <Link href="/produtos?categoria=vestidos" className="hover:text-[var(--color-primary-dark)] transition-colors">Vestidos</Link>
            <Link href="/produtos?categoria=alfaiataria" className="hover:text-[var(--color-primary-dark)] transition-colors">Alfaiataria</Link>
          </nav>

          <Link href="/" className="font-serif text-2xl lg:text-3xl tracking-wide absolute left-1/2 -translate-x-1/2">
            Tayna Xavier
          </Link>
          
          <div className="flex gap-4 items-center">
            <Link href="/login" className="hidden md:block p-2 hover:text-[var(--color-primary-dark)] transition-colors">
              <User size={20} />
            </Link>
            <Link href="/favoritos" className="hidden md:block p-2 hover:text-[var(--color-primary-dark)] transition-colors">
              <Heart size={20} />
            </Link>
            <button 
              className="p-2 relative hover:text-[var(--color-primary-dark)] transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SlideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
