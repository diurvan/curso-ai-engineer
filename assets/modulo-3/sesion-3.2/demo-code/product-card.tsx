'use client'

import { useState } from 'react'
import { addToCart } from '@/lib/actions/cart'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock_quantity: number
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)

  const isOutOfStock = product.stock_quantity === 0
  const isLowStock = product.stock_quantity <= 5 && product.stock_quantity > 0

  async function handleAddToCart() {
    setLoading(true)
    try {
      await addToCart(product.id)
    } catch (err) {
      console.error('Error adding to cart:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1e293b] rounded-lg overflow-hidden shadow-lg border border-gray-800">
      <img
        src={product.image_url || '/placeholder.svg'}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <span className="text-xs text-[#0ea5e9] uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold mt-1">{product.name}</h3>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>

          {isOutOfStock ? (
            <span className="text-red-400 text-sm font-medium">Agotado</span>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="px-4 py-2 bg-[#0ea5e9] text-white rounded-lg
                         hover:bg-[#0284c7] disabled:opacity-50
                         transition-colors"
            >
              {loading ? 'Agregando...' : 'Agregar al carrito'}
            </button>
          )}
        </div>

        {isLowStock && (
          <p className="text-amber-400 text-xs mt-2">
            Solo quedan {product.stock_quantity} unidades
          </p>
        )}
      </div>
    </div>
  )
}
