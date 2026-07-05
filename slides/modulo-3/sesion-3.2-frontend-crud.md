---
title: "Frontend Vivo: CRUD y Code Review Automático"
subtitle: "Módulo 3 · Sesión 3.2 · Curso AI Engineer"
author: "[Tu Nombre]"
theme: "dark"
transition: "slide"
highlight: "monokai"
---

# Frontend Vivo: CRUD y Code Review Automático

## Módulo 3 · Sesión 3.2

### Curso AI Engineer — De Semi-Senior a Experto en IA

---

## 🎯 Objetivos de esta sesión

- Conectar **Server Components** con Supabase
- Implementar **Server Actions** para el carrito
- Manejar los **4 estados** de un componente de datos
- Implementar **Code Review automatizado** con Sonnet
- Unir todo: galería real + carrito + revisión

---

## 🗄️ Server Component → Supabase

```typescript
// app/productos/page.tsx
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'

export default async function ProductosPage() {
  const supabase = createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) return <ErrorState message={error.message} />
  if (!products?.length) return <EmptyState />

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
```

---

## ⚡ Server Action: Carrito

### `lib/actions/cart.ts`

```typescript
'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string) {
  const supabase = createClient()

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('product_id', productId)
    .single()

  if (existing) {
    await supabase.from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id)
  } else {
    await supabase.from('cart_items')
      .insert({ product_id: productId, quantity: 1 })
  }

  revalidatePath('/productos')
}
```

---

## 🔄 Llamar desde el cliente

```tsx
'use client'
import { addToCart } from '@/lib/actions/cart'

export default function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    await addToCart(productId)
    setLoading(false)
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Agregando...' : 'Agregar al carrito'}
    </button>
  )
}
```

Sin fetch, sin axios, sin API Routes.

---

## 🔄 Los 4 estados de un componente de datos

```
┌──────────────────┐
│   1. LOADING     │ ← loading.tsx (automático)
│   Esqueletos     │
├──────────────────┤
│   2. ERROR       │ ← error.tsx o manejo manual
│   Mensaje amable │
├──────────────────┤
│   3. VACÍO       │ ← Sin datos
│   Guiar usuario  │
├──────────────────┤
│   4. DATOS       │ ← Todo funciona
│   Edge cases     │
└──────────────────┘
```

---

## 1. Loading

```typescript
// loading.tsx — Next.js lo muestra automáticamente
export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-6 animate-pulse">
      {[1,2,3].map(i => (
        <div key={i} className="h-64 rounded-lg bg-gray-200" />
      ))}
    </div>
  )
}
```

> **Zero configuración.** Next.js renderiza `loading.tsx` mientras el Server Component carga.

---

## 2. Error

```typescript
if (error) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">
        Error al cargar productos
      </h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  )
}
```

> **Nunca una pantalla en blanco.** Siempre un mensaje amigable.

---

## 3. Vacío

```typescript
if (!products?.length) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold">No hay productos</h2>
      <p className="text-gray-600">Vuelve pronto, estamos actualizando.</p>
      <Link href="/" className="text-[#0ea5e9] hover:underline">
        Volver al inicio
      </Link>
    </div>
  )
}
```

> **El estado vacío no es un error.** Es una oportunidad para guiar al usuario.

---

## 4. Datos + Edge Cases

```typescript
// Stock agotado
{product.stock_quantity === 0 && (
  <span className="text-red-500 font-medium">Agotado</span>
)}

// Stock bajo
{product.stock_quantity <= 5 && product.stock_quantity > 0 && (
  <p className="text-amber-600 text-sm">
    Solo quedan {product.stock_quantity} unidades
  </p>
)}
```

---

## 👁️ Code Review con Sonnet

### El problema del review tradicional
- **Disponibilidad**: el revisor está ocupado
- **Consistencia**: cada revisor tiene criterios distintos
- **Velocidad**: un PR puede esperar días

### Con Sonnet
- Feedback **al instante**
- **Siempre disponible**
- **Consistente** (mismos criterios siempre)

---

## 🔍 Flujo de code review

```
1. Escribes el código
2. Claude Code lo analiza
3. Sonnet devuelve:
   ├── 🐛 Bugs potenciales
   ├── ⚡ Problemas de performance
   ├── ♿ Issues de accesibilidad
   └── 💡 Sugerencias de mejora
4. Corriges y repites
```

---

## 📋 Qué revisa Sonnet

| Categoría | Ejemplos |
|-----------|----------|
| TypeScript | Tipos incorrectos, `any` |
| Accesibilidad | Alt text, aria-label |
| Performance | Sin lazy loading, re-renders |
| React | Keys, estado mal manejado |
| Seguridad | XSS, datos expuestos |
| Buenas prácticas | Magic numbers, dead code |

---

## 💻 Prompt de code review

```bash
claude -p "Revisa este archivo components/ProductCard.tsx.
Busca:
- Errores de TypeScript
- Problemas de accesibilidad
- Bugs potenciales
- Malas prácticas de React
- Oportunidades de performance

Dame sugerencias específicas con código."
```

---

## 🔬 Demo: Galería + Carrito + Code Review

### Componentes creados

| Archivo | Líneas | Tipo |
|---------|--------|------|
| `app/productos/page.tsx` | ~30 | Server Component |
| `components/ProductCard.tsx` | ~40 | Client Component |
| `components/AddToCartButton.tsx` | ~25 | Client Component |
| `lib/actions/cart.ts` | ~35 | Server Action |
| **Total** | **~130** | **Full-stack funcional** |

---

## 🧪 Lab 7: CRUD — Galería con Datos Reales

### Pasos
1. Server Component que consulta productos de Supabase
2. Galería funcional con datos reales (no mock)
3. Server Action para agregar al carrito
4. Manejar 4 estados: loading, error, vacío, datos
5. Code review con Sonnet
6. Registrar en Dashboard

**Stack**: Next.js 15 + Supabase + Claude Sonnet + Dashboard
**Duración**: 3-4 horas | **Tokens**: ~25K-50K
**Requisito**: Lab 6 + Módulo 2

---

## ✅ Checklist post-sesión

- [ ] Server Component consulta productos de Supabase
- [ ] Galería muestra datos reales (no mock)
- [ ] Server Action `addToCart` funciona
- [ ] Botón de agregar al carrito funcional
- [ ] Loading state con skeleton
- [ ] Error state con mensaje amigable
- [ ] Empty state con link de navegación
- [ ] Edge cases: stock agotado, stock bajo
- [ ] Code review con Sonnet completado
- [ ] Correcciones aplicadas

---

## 📚 Recursos

| Recurso | Link |
|---------|------|
| Next.js Server Actions | `nextjs.org/docs/app/building-your-application/data-fetching/server-actions` |
| Supabase + Next.js SSR | `supabase.com/docs/guides/auth/quickstarts/nextjs` |
| Loading UI | `nextjs.org/docs/app/building-your-application/routing/loading-ui` |
| Error Handling | `nextjs.org/docs/app/building-your-application/routing/error-handling` |
| Claude Code Review | `docs.anthropic.com/en/docs/claude-code` |

---

## 🎬 Módulo 4: RAG y Bases Vectoriales

> TaskFlow AI va a tener **memoria**.
>
> Un chatbot que responde con datos reales del catálogo usando búsqueda semántica.
>
> **¡Nos vemos en el Módulo 4!** 🚀

---

*Curso AI Engineer — Módulo 3, Sesión 3.2*
