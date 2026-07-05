---
title: "Backend Funcional y Seguro en Supabase"
subtitle: "Módulo 2 · Sesión 2.2 · Curso AI Engineer"
author: "[Tu Nombre]"
theme: "dark"
transition: "slide"
highlight: "monokai"
---

# Backend Funcional y Seguro en Supabase

## Módulo 2 · Sesión 2.2

### Curso AI Engineer — De Semi-Senior a Experto en IA

---

## 🎯 Objetivos de esta sesión

- Entender **Server Components vs Client Components** en Next.js 15
- Crear y configurar un **proyecto Supabase**
- Hacer que el agente **lea el spec y genere migraciones SQL**
- Implementar **Row Level Security (RLS)**
- Poblar la BD con **seed data generada por IA**
- **Conectar todo**: spec → migraciones → RLS → datos → frontend

---

## 🧱 Server Components

Se ejecutan en el **servidor**. Renderizan HTML antes de llegar al navegador.

```tsx
// ✅ Server Component (por defecto en App Router)
export default async function ProductList() {
  const products = await db.query('SELECT * FROM products')
  return <div>{products.map(p => <Card key={p.id} {...p} />)}</div>
}
```

**Ventajas**:
- Acceso directo a la BD
- Cero JS en el cliente
- Credenciales seguras (nunca salen del servidor)

---

## 🖥️ Client Components

Se ejecutan en el **navegador**. Llevan interactividad.

```tsx
'use client'
export default function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false)
  return <button onClick={() => setLoading(true)}>Agregar</button>
}
```

**Cuándo usarlos**:
- onClick, onChange, useState, useEffect
- Eventos del navegador
- APIs del navegador (localStorage, etc.)

---

## 📐 Regla práctica

```
¿Necesitas datos de la BD?     → Server Component
¿Necesitas interactividad?     → Client Component
¿Ambos?                        → Server Component padre
                                → Client Component hijo
```

**Server Component** obtiene datos → pasa como props → **Client Component** muestra interactividad.

---

## 🔄 Ejemplo concreto

```tsx
// app/productos/page.tsx — Server Component
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products').select('*').eq('is_active', true)

  return products?.map(p => <ProductCard key={p.id} product={p} />)
}
```

```tsx
// components/ProductCard.tsx — Client Component
'use client'
export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  return <button onClick={() => setAdded(true)}>Agregar</button>
}
```

---

## ⚡ Server Actions

Para operaciones de escritura (crear, actualizar, borrar):

```tsx
'use server'
export async function addToCart(formData: FormData) {
  const supabase = createClient()
  await supabase.from('cart_items').insert({
    user_id: auth.uid(),
    product_id: formData.get('productId'),
    quantity: 1
  })
}
```

Se llaman desde el cliente, se ejecutan en el servidor.

---

## 🗄️ ¿Qué es Supabase?

Plataforma que te da **PostgreSQL puro** + servicios adicionales:

```
┌─────────────────────────────────┐
│         Supabase Project        │
├─────────────────────────────────┤
│  PostgreSQL 15                  │
│  ├── auth schema                │
│  ├── public schema              │ ← Tus tablas
│  ├── storage schema             │
│  └── extensions (pgvector)      │
├─────────────────────────────────┤
│  API REST automática            │
│  Realtime (WebSockets)          │
│  Edge Functions (Deno)          │
└─────────────────────────────────┘
```

**Free tier**: 500 MB BD, 2 GB ancho de banda.

---

## 🔧 Setup: Crear proyecto Supabase

### Paso 1 — Nuevo proyecto
```
Name: taskflow-ai
Region: Nearest a ti
Plan: Free
```

### Paso 2 — Obtener credenciales
```
Project URL: https://xxxx.supabase.co
anon key: eyJhbGciOiJIUzI1NiIs...
```

### Paso 3 — Variables de entorno
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

---

## 📦 Cliente servidor (Server Components)

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                  cookiesToSet.forEach(c => cookieStore.set(c.name, c.value, c.options))
                } } }
  )
}
```

---

## 📦 Cliente navegador (Client Components)

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## 📋 Del spec a las migraciones SQL

### Instrucción en Antigravity

```
"Tengo el spec en specs/database-spec.md.
 Genera 7 migraciones SQL para Supabase:
 - Una por entidad
 - Incluye PK, FK, UNIQUE, CHECK, índices
 - Idempotentes (IF NOT EXISTS)
 - Orden: users → categories → products → cart_items
   → orders → order_items → reviews"
```

---

## 📝 Lo que el agente genera

```sql
-- 001_create_users.sql
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer'
    CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
```

**Exactamente como dice el spec. Sin desviaciones.**

---

## ✅ Checklist de revisión de migraciones

| Check | Qué revisar |
|-------|-------------|
| ✅ | ¿Coincide con el spec? |
| ✅ | ¿Tipos correctos? (DECIMAL, UUID, etc.) |
| ✅ | ¿FK con ON DELETE correcto? |
| ✅ | ¿UNIQUE donde debe haberlo? |
| ✅ | ¿Índices incluidos? |
| ✅ | ¿CHECK constraints? |

---

## 🔐 Row Level Security (RLS)

**Seguridad a nivel de fila** en PostgreSQL.

### Sin RLS
```tsx
// ❌ Te olvidaste del filtro → ves datos de otros
const { data } = await supabase.from('orders').select('*')
```

### Con RLS
```sql
CREATE POLICY "users_see_own_orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
```
```tsx
// ✅ Aunque no filtres, la BD solo devuelve lo tuyo
const { data } = await supabase.from('orders').select('*')
```

---

## 🛡️ Políticas del spec

### products
```sql
CREATE POLICY "products_read_active" ON products
  FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "products_admin_all" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### cart_items
```sql
CREATE POLICY "cart_items_manage_own" ON cart_items
  FOR ALL USING (auth.uid() = user_id);
```

---

## 🧪 Probar RLS

```sql
-- Como usuario anónimo
SELECT * FROM products;     -- ✅ debe funcionar
SELECT * FROM cart_items;   -- ❌ debe fallar

-- Como usuario autenticado
SELECT * FROM cart_items WHERE user_id = auth.uid();  -- ✅
SELECT * FROM cart_items;  -- ❌ (RLS solo devuelve lo propio)
```

> **Siempre prueba que RLS funciona. No confíes, verifica.**

---

## 🌱 Seed data con IA

### Instrucción en Antigravity
```
"Genera seed data para TaskFlow AI:
 - 3 categorías: Laptops, Audífonos, Monitores
 - 5 productos por categoría (15 total)
 - 2 usuarios de prueba
 - 1 pedido de ejemplo
 - 3 reseñas
 Datos realistas para tienda de tecnología."
```

---

## 🌱 Seed data generada

```sql
INSERT INTO public.categories (name, slug, description) VALUES
  ('Laptops', 'laptops', 'Laptops para trabajo, gaming y estudio'),
  ('Audífonos', 'audifonos', 'Audífonos inalámbricos y de diadema'),
  ('Monitores', 'monitores', 'Monitores 4K, gaming y ultrawide');

INSERT INTO public.products
  (category_id, name, slug, description, price, stock_quantity)
VALUES
  ((SELECT id FROM categories WHERE slug='laptops'),
   'MacBook Pro M4', 'macbook-pro-m4',
   '32GB RAM, 1TB SSD, chip M4', 2499.99, 10);
```

---

## 🔬 Demo: Flujo completo (10 min)

| Paso | Quién | Tiempo |
|------|-------|--------|
| Crear proyecto Supabase | Tú | 2 min |
| Configurar SDK | Tú | 3 min |
| Generar migraciones | **Agente** | 30 seg |
| Revisar migraciones | Tú | 5 min |
| Ejecutar migraciones | Tú | 10 seg |
| Generar RLS | **Agente** | 30 seg |
| Generar seed data | **Agente** | 30 seg |
| Ejecutar seed | Tú | 10 seg |
| Verificar en frontend | Tú | 2 min |
| **Total** | | **~15 min** |

---

## 🧪 Lab 5: Ejecución del Spec en Supabase

### Pasos
1. Crear proyecto Supabase (plan Free)
2. Configurar `.env.local` con credenciales
3. Instalar `@supabase/supabase-js` + `@supabase/ssr`
4. Crear clientes server/client en `lib/supabase/`
5. Pasar el spec a Claude Code → genera migraciones
6. Revisar y aprobar migraciones
7. Ejecutar en Supabase
8. Generar y aplicar RLS
9. Poblar con seed data
10. Verificar desde Next.js

**Stack**: Supabase + Claude Code + Spec Lab 4 + Dashboard
**Duración**: 4-5 horas | **Tokens**: ~40K-80K
**Requisito**: Lab 4 completado

---

## ✅ Checklist post-sesión

- [ ] Proyecto Supabase creado (taskflow-ai)
- [ ] Variables de entorno configuradas
- [ ] Paquetes instalados (`@supabase/supabase-js`, `@supabase/ssr`)
- [ ] Clientes server y browser creados
- [ ] Agente generó 7 migraciones desde el spec
- [ ] Migraciones revisadas y aprobadas
- [ ] Migraciones ejecutadas → 7 tablas creadas
- [ ] Políticas RLS aplicadas
- [ ] Seed data ejecutada → datos visibles
- [ ] Server Component consulta productos exitosamente
- [ ] Dashboard registró los tokens
- [ ] Commit y push a GitHub

---

## 📚 Recursos

| Recurso | Link |
|---------|------|
| Supabase | `supabase.com` |
| Next.js App Router | `nextjs.org/docs/app` |
| Supabase + Next.js SSR | `supabase.com/docs/guides/auth/quickstarts/nextjs` |
| RLS Guide | `supabase.com/docs/guides/auth/row-level-security` |
| Supabase SQL Editor | `supabase.com/dashboard` |
| Claude Code | `docs.anthropic.com/en/docs/claude-code` |
| Spec del curso | `specs/database-spec.md` |

---

## 🎬 Módulo 3: Frontend Multimodal

> Vamos a convertir **wireframes en interfaces reales** con Claude Vision.
>
> Conectaremos el frontend con la base de datos que acabas de crear.
>
> **¡Nos vemos en el Módulo 3!** 🚀

---

*Curso AI Engineer — Módulo 2, Sesión 2.2*
