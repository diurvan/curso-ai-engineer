# Lab 7 — CRUD: Galería Consume Datos Reales de Supabase

## Duración estimada: 3-4 horas
## Tokens estimados: ~25K-50K
## Stack: Next.js 15 + Supabase SDK + Claude Sonnet + Dashboard

## Objetivos
1. Crear un **Server Component** que consulte productos desde Supabase
2. Mostrar productos en la galería con datos reales (no mock)
3. Implementar **Server Action** para agregar al carrito
4. Manejar los **4 estados** del componente: loading, error, vacío, datos
5. Hacer **code review con Sonnet** sobre el código escrito
6. Registrar métricas y verificar en Dashboard

---

## Prerequisitos

| Requisito | Estado |
|-----------|--------|
| Lab 6 — Landing Page desde wireframe | ❌ Pendiente |
| Sesión 2.2 — Base de datos con datos | ❌ Pendiente |
| Variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` configuradas | ❌ Pendiente |
| `@curso-ai/metrics` instalado y configurado | ❌ Pendiente |

**[Ver guía de instalación de Supabase →](#configuracion-supabase)**

---

## Entrega Esperada

- **Landing Page** con navegación → ruta `/productos`
- **Galería de productos** funcionando con datos reales de Supabase
- **Carrito de compras** funcional (al menos agregar items)
- **4 estados** implementados correctamente
- **Code review** realizado y correcciones aplicadas
- **Métricas** visibles en el Dashboard

---

## Dependencias

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## Desarrollo

### Paso 1: Verificar la base de datos

Abre Supabase Studio y verifica que exista la tabla `products` con datos:

```sql
SELECT id, name, price, category, stock_quantity, is_active
FROM products
WHERE is_active = true
LIMIT 5;
```

Si la tabla no tiene datos, ejecuta el seed del Lab 2.2.

---

### Paso 2: Crear el cliente de servidor de Supabase

Crea `lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

⚠️ **Nota**: Este cliente usa la `service_role_key` para omitir RLS en el servidor. Para datos públicos es suficiente, pero en producción deberías usar autenticación.

**[Ref: Supabase SSR docs →](https://supabase.com/docs/guides/auth/quickstarts/nextjs)**

---

### Paso 3: Server Component de la galería

Crea `app/productos/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'

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
          <p className="text-gray-400">Vuelve pronto, estamos actualizando el catálogo.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-[#0ea5e9] hover:underline"
          >
            Volver al inicio
          </Link>
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
```

---

### Paso 4: Componente ProductCard con edge cases

Crea `components/ProductCard.tsx`:

```typescript
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
```

---

### Paso 5: Server Action para el carrito

Crea `lib/actions/cart.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { trackAnthropic } from '@curso-ai/metrics'

export async function addToCart(productId: string) {
  const supabase = createClient()

  // Verificar si el producto ya está en el carrito
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('product_id', productId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id)

    if (error) {
      console.error('Error updating cart:', error)
      throw new Error('No se pudo actualizar el carrito')
    }
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ product_id: productId, quantity: 1 })

    if (error) {
      console.error('Error inserting to cart:', error)
      throw new Error('No se pudo agregar al carrito')
    }
  }

  // Registrar métrica
  trackAnthropic({
    type: 'server_action',
    action: 'add_to_cart',
    product_id: productId,
  })

  // Revalidar la caché para actualizar el frontend
  revalidatePath('/productos')
}
```

---

### Paso 6: Loading state

Crea `app/productos/loading.tsx`:

```typescript
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#1e293b] rounded-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-800" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-20 bg-gray-800 rounded" />
                <div className="h-5 w-40 bg-gray-800 rounded" />
                <div className="h-4 w-full bg-gray-800 rounded" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 w-20 bg-gray-800 rounded" />
                  <div className="h-10 w-36 bg-gray-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
```

---

### Paso 7: Verificar el navegador

```bash
npm run dev
# Abre http://localhost:3000/productos
```

---

### Paso 8: Code Review con Sonnet

Analiza tu `components/ProductCard.tsx` con Sonnet:

```bash
claude -p "Revisa este archivo components/ProductCard.tsx.
Evalúa:
1. TypeScript — ¿tipos correctos? ¿usamos 'any'?
2. Accesibilidad — ¿alt text? ¿aria-label?
3. Performance — ¿lazy loading? ¿re-renders innecesarios?
4. React — ¿keys correctas? ¿estado manejado bien?
5. Seguridad — ¿XSS potential?
6. Buenas prácticas — ¿magic numbers? ¿código muerto?

Dame sugerencias específicas con fragmentos de código."
```

📸 **Captura de pantalla**: Toma un screenshot del análisis de Sonnet y guárdalo como `assets/modulo-3/sesion-3.2/demo-code/code-review-sonnet.png`.

---

### Paso 9: Corregir según el feedback

Aplica las correcciones que Sonnet sugirió. Luego repite:

```bash
claude -p "Vuelve a revisar components/ProductCard.tsx después de las correcciones."
```

---

### Paso 10: Verificar en Dashboard

```typescript
// En app/dashboard/page.tsx o similar
import { syncHelicone } from '@curso-ai/metrics'

// Sincronizar métricas al Helicone
await syncHelicone({
  userId: 'lab-7',
  metadata: {
    lab: '7',
    module: '3',
    session: '3.2',
    components_created: 4,
    lines_of_code: 130,
  },
})
```

Abre el dashboard y verifica que las métricas del Lab 7 aparezcan.

---

## Checklist de Validación

| # | Item | ✅/❌ |
|---|------|-------|
| 1 | `lib/supabase/server.ts` creado con `@supabase/ssr` | |
| 2 | `app/productos/page.tsx` consulta productos de Supabase | |
| 3 | `components/ProductCard.tsx` muestra datos reales | |
| 4 | Estado **loading** con skeleton implementado en `loading.tsx` | |
| 5 | Estado **error** con mensaje amigable | |
| 6 | Estado **vacío** con link de navegación | |
| 7 | Edge case: **stock agotado** muestra "Agotado" | |
| 8 | Edge case: **stock bajo** muestra advertencia | |
| 9 | `lib/actions/cart.ts` — Server Action funcional | |
| 10 | Botón "Agregar al carrito" inserta/actualiza en Supabase | |
| 11 | `revalidatePath` refresca la galería automáticamente | |
| 12 | Code review con Sonnet completado | |
| 13 | Captura de pantalla del code review guardada | |
| 14 | Correcciones aplicadas y re-validadas | |
| 15 | Métricas visibles en Dashboard | |
| 16 | `git commit` y `git push` | |

---

## Referencias

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Supabase SSR Client](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Loading UI in Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Error Handling in Next.js](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Paquete @curso-ai/metrics](/packages/metrics)
- [Spec de base de datos](/specs/database-spec.md)

---

## Troubleshooting

### ❌ `SupabaseClient` no encuentra la tabla `products`
→ Verifica que ejecutaste el seed del Lab 2.2.

### ❌ Server Action lanza error 500
→ Revisa que `SUPABASE_SERVICE_ROLE_KEY` esté en `.env.local`.
→ Verifica que la tabla `cart_items` exista en Supabase Studio.

### ❌ `createServerClient` no se encuentra
→ `npm install @supabase/ssr` y asegúrate de que Next.js 15 esté instalado.

### ❌ Dashboard no muestra métricas
→ Verifica que la API key de Helicone esté configurada.
→ Ejecuta `syncHelicone()` manualmente y revisa la consola.

---

## Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| Datos reales | 25% | Server Component consulta Supabase y muestra productos reales |
| Estados UI | 25% | 4 estados correctamente implementados (loading, error, vacío, datos) |
| Carrito | 25% | Server Action funcional, datos persistidos en Supabase |
| Code Review | 15% | Análisis con Sonnet completado y correcciones aplicadas |
| Métricas | 10% | Métricas registradas y visibles en Dashboard |

---

*Lab 7 — v1.0 · Curso AI Engineer · Módulo 3 · Sesión 3.2*
