// ============================================
// EJEMPLO: SERVER COMPONENT CON SUPABASE
// ============================================
// Ubicación: app/productos/page.tsx
//
// Este Server Component:
// 1. Se conecta a Supabase usando el cliente de servidor
// 2. Consulta productos activos
// 3. Renderiza HTML en el servidor
// 4. Pasa datos a Client Components hijos via props

import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'

export default async function ProductosPage() {
  const supabase = createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Error al cargar productos</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">No hay productos disponibles</h2>
        <p className="text-gray-600">Vuelve pronto, estamos actualizando el catálogo.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Productos</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// ============================================
// EJEMPLO: CLIENT COMPONENT
// ============================================
// Ubicación: components/ProductCard.tsx
//
// Recibe datos del Server Component padre
// Maneja interactividad local (botón agregar)

'use client'

import { useState } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock_quantity: number
  images: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setAdded(true)
    // En el Lab 7 conectaremos esto con una Server Action
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Imagen placeholder */}
      <div className="mb-4 flex h-48 items-center justify-center rounded-md bg-gray-100">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>

      {/* Info del producto */}
      <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
      <p className="mb-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-[#1e3a5f]">${product.price.toFixed(2)}</span>

        {product.stock_quantity > 0 ? (
          <button
            onClick={handleAddToCart}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
              added
                ? 'bg-green-500'
                : 'bg-[#0ea5e9] hover:bg-[#0284c7]'
            }`}
          >
            {added ? '✓ Agregado' : 'Agregar'}
          </button>
        ) : (
          <span className="text-sm font-medium text-red-500">Agotado</span>
        )}
      </div>

      {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
        <p className="mt-2 text-xs text-amber-600">
          Solo quedan {product.stock_quantity} unidades
        </p>
      )}
    </div>
  )
}
