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
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Error al cargar productos
          </h2>
          <p className="text-gray-400">{error.message}</p>
          <p className="text-gray-500 mt-4">Intenta de nuevo más tarde.</p>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No hay productos disponibles</h2>
          <p className="text-gray-400">Vuelve pronto, estamos actualizando.</p>
          <a
            href="/"
            className="inline-block mt-4 text-[#0ea5e9] hover:underline"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Nuestros Productos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
