'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'

export function SlideCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 className="font-serif text-2xl">Carrinho</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-light tracking-wide text-sm">Seu carrinho está vazio.</p>
                  <button onClick={onClose} className="btn btn-primary mt-4">Continuar Comprando</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.product.images?.[0] || '/product1.png'} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-gray-900 leading-tight pr-4">{item.product.name}</h3>
                        <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-medium mb-auto">R$ {item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center border border-[var(--color-border)] rounded-full w-fit">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-50 rounded-l-full">
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm text-center min-w-[2rem]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-50 rounded-r-full">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--color-border)] p-6 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="font-serif text-2xl">R$ {getTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 font-light mb-6">Frete e impostos calculados no checkout.</p>
                <Link href="/checkout" onClick={onClose} className="btn btn-primary w-full py-4 text-sm tracking-widest block text-center">
                  Finalizar Compra
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
