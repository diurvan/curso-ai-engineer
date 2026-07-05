# 🧪 Lab 5 — Ejecución del Spec en Supabase

## 📋 Descripción del Lab

**Stack**: Supabase + Claude Code + Spec del Lab 4 + Dashboard (via Helicone)
**Duración**: 4-5 horas (~40K-80K tokens)
**Requisito**: Lab 4 completado (spec validado en `specs/database-spec.md`)

### 🎯 Objetivo

Convertir el spec del Lab 4 en una base de datos **real, funcional y segura** en Supabase. El agente leerá el spec y generará:

- 7 migraciones SQL (una por entidad)
- Políticas RLS para cada tabla
- Seed data para poblar la base de datos

**El estudiante nunca anota tokens manualmente** — el agente CLI reporta automáticamente al dashboard via Helicone.

---

## 🏗️ Arquitectura

```mermaid
graph TD
    A[specs/database-spec.md] --> B[🤖 Claude Code]
    B --> C[Migraciones SQL]
    B --> D[Políticas RLS]
    B --> E[Seed data]
    C --> F[SQL Editor Supabase]
    D --> F
    E --> F
    F --> G[(Supabase PostgreSQL)]
    G --> H[Server Component Next.js]
    H --> I[🌐 Navegador]
    J[📊 Dashboard] -.->|Helicone| B
```

---

## 📋 Prerequisitos

Antes de empezar, verifica que tienes:

- [ ] **Lab 4 completado** — spec validado en `specs/database-spec.md`
- [ ] **Lab 3 completado** — proyecto TaskFlow AI en `labs/modulo-1/lab-3-agent-manager/taskflow-ai/`
- [ ] **Cuenta en Supabase** (free) — [supabase.com](https://supabase.com)
- [ ] **Node.js 20+** y npm
- [ ] **Claude Code CLI** instalado y autenticado
- [ ] **Helicone** configurado

---

## 🛠️ Setup

### 1. Ir al proyecto TaskFlow AI

```bash
cd labs/modulo-1/lab-3-agent-manager/taskflow-ai
```

### 2. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) e inicia sesión con GitHub
2. Haz clic en **New project**
3. Completa:

| Campo | Valor |
|-------|-------|
| Name | `taskflow-ai` |
| Database Password | Generar y guardar |
| Region | La más cercana a ti |
| Pricing Plan | **Free** |

4. Espera ~2 minutos a que se cree el proyecto

### 3. Obtener credenciales

1. En el dashboard de Supabase, ve a **Project Settings → API**
2. Copia estos valores:

```
Project URL: https://xxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIs...
```

### 4. Configurar variables de entorno

Crea (o edita) el archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 5. Instalar dependencias de Supabase

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 6. Crear los clientes de Supabase

Crea la carpeta y los archivos del cliente:

```bash
mkdir -p lib/supabase
```

#### `lib/supabase/server.ts`

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

#### `lib/supabase/client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## 🎬 Ejecución del Lab

### Paso 1: Pasar el spec al agente

Asegúrate de que `specs/database-spec.md` existe y está completo (del Lab 4). Luego:

```bash
claude --antigravity
```

Dale esta instrucción:

```
Tengo el spec del modelo de datos en specs/database-spec.md.

Quiero que generes migraciones SQL para Supabase con este orden:
1. Primero las migraciones CREATE TABLE (7 tablas)
2. Luego las políticas RLS (según la sección de seguridad del spec)
3. Finalmente seed data para pruebas

Requisitos de las migraciones:
- Una migración por entidad
- Idempotentes (IF NOT EXISTS)
- Incluir todas las constraints: PK, FK, UNIQUE, CHECK
- Incluir índices donde el spec los define
- ENUM order_status antes de la tabla orders

Requisitos del seed data:
- 3 categorías: Laptops, Audífonos, Monitores
- 5 productos por categoría
- 2 usuarios de prueba
- 1 pedido de ejemplo con 2 items
- 3 reseñas
- Datos realistas para tienda de tecnología

Genera la Task List primero. NO ejecutes nada todavía.
```

### Paso 2: Revisar la Task List

El agente propondrá una Task List similar a:

```
## [ ] Fase 1: Migraciones SQL
- [ ] Migración 001: ENUM order_status + tabla users
- [ ] Migración 002: Tabla categories
- [ ] Migración 003: Tabla products
- [ ] Migración 004: Tabla cart_items
- [ ] Migración 005: Tabla orders
- [ ] Migración 006: Tabla order_items
- [ ] Migración 007: Tabla reviews

## [ ] Fase 2: Políticas RLS
- [ ] RLS para todas las tablas

## [ ] Fase 3: Seed data
- [ ] Insert categorías y productos
- [ ] Insert usuarios y pedido de ejemplo
- [ ] Insert reseñas
```

**Revisa**:
- ¿El orden es correcto? (FK deben crearse después de las tablas que referencian)
- ¿Falta alguna entidad? (deben ser 7)

Luego dile: **"Apruebo la Task List. Empieza con la Fase 1."**

### Paso 3: Revisar y aprobar cada migración

El agente generará cada migración y te mostrará el diff. **Revisa cada una**:

#### Migración 001 — users

```sql
-- Verifica que:
-- ✅ id UUID PK REFERENCES auth.users(id) ON DELETE CASCADE
-- ✅ role con CHECK (customer, admin)
-- ✅ created_at / updated_at / deleted_at
```

#### Migración 002 — categories

```sql
-- Verifica que:
-- ✅ slug UNIQUE
-- ✅ parent_id FK → categories ON DELETE SET NULL
-- ✅ is_active DEFAULT true
-- ✅ Índice: slug único donde deleted_at IS NULL
```

#### Migración 003 — products

```sql
-- Verifica que:
-- ✅ category_id FK → categories ON DELETE RESTRICT
-- ✅ price DECIMAL(10,2) NOT NULL CHECK >= 0
-- ✅ stock_quantity INTEGER DEFAULT 0 CHECK >= 0
-- ✅ embedding VECTOR(1536) nullable (para Módulo 4)
-- ✅ Índices: slug, category_id, is_active
```

#### Migración 004 — cart_items

```sql
-- Verifica que:
-- ✅ UNIQUE(user_id, product_id)
-- ✅ quantity CHECK > 0
-- ✅ FK con ON DELETE CASCADE
```

#### Migración 005 — orders

```sql
-- Verifica que:
-- ✅ ENUM order_status creado antes
-- ✅ total_amount DECIMAL CHECK >= 0
-- ✅ FK a users ON DELETE RESTRICT
-- ✅ Índices: user_id, status
```

#### Migración 006 — order_items

```sql
-- Verifica que:
-- ✅ order_id FK → orders ON DELETE CASCADE
-- ✅ product_id FK → products ON DELETE RESTRICT
-- ✅ total_price = quantity * unit_price (CHECK)
```

#### Migración 007 — reviews

```sql
-- Verifica que:
-- ✅ UNIQUE(product_id, user_id)
-- ✅ rating CHECK >= 1 AND <= 5
-- ✅ is_verified_purchase DEFAULT false
-- ✅ is_approved DEFAULT true
```

> ⚡ **Si algo no coincide con el spec, rechaza el diff y pídele al agente que lo corrija.**

### Paso 4: Ejecutar migraciones en Supabase

Una vez aprobadas todas las migraciones, ejecútalas en Supabase.

**Opción A — SQL Editor (recomendado):**

1. Ve a tu proyecto en [supabase.com/dashboard](https://supabase.com/dashboard)
2. Abre **SQL Editor**
3. Pega cada migración (o todas juntas) y haz clic en **Run**

**Opción B — psql (terminal):**

```bash
# Si tienes psql instalado y la connection string
psql "postgresql://postgres:xxxx@db.xxxx.supabase.co:5432/postgres" < migrations.sql
```

**Opción C — Desde el agente (si tiene permiso):**

```bash
# Si configuraste la connection string en .env
claude -p "Conéctate a Supabase y ejecuta las migraciones aprobadas"
```

### Paso 5: Generar y aplicar políticas RLS

Vuelve a Antigravity y dile:

```
Ahora genera las políticas RLS según la sección de seguridad del spec.
```

Revisa cada política:

| Tabla | Debe tener |
|-------|-----------|
| users | SELECT propio, UPDATE propio, SELECT admin |
| categories | SELECT activas público, ALL admin |
| products | SELECT activos público, ALL admin |
| cart_items | ALL propio (CRUD completo) |
| orders | SELECT propio, INSERT propio, UPDATE admin |
| order_items | SELECT del dueño del pedido, INSERT admin |
| reviews | SELECT aprobadas público, INSERT propio, UPDATE propio, ALL admin |

Ejecuta las políticas en el SQL Editor de Supabase.

**Habilita RLS en cada tabla:**

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
```

### Paso 6: Probar RLS

En el SQL Editor de Supabase, prueba cada política:

```sql
-- Probar como anónimo (sin sesión)
SELECT * FROM public.products LIMIT 1;     -- ✅ debe funcionar
SELECT * FROM public.cart_items LIMIT 1;   -- ❌ debe fallar
SELECT * FROM public.orders LIMIT 1;       -- ❌ debe fallar

-- Probar políticas de escritura
INSERT INTO public.products (name, slug, description, price)
VALUES ('test', 'test', 'test', 10);
-- ❌ debe fallar (solo admin inserta productos)
```

Si alguna política falla donde debería funcionar (o viceversa), corrige la política y vuelve a ejecutarla.

### Paso 7: Generar seed data

Vuelve a Antigravity:

```
Ahora genera el seed data. SQL INSERTs listos para ejecutar.
```

Revisa la seed data:

- **Precios** realistas ($2499 para MacBook Pro ✅)
- **Cantidades en stock** razonables (5-20 unidades)
- **Relaciones correctas** (cada producto tiene categoría)
- **Datos variados** (no todos los productos iguales)

Ejecuta los INSERTs en el SQL Editor de Supabase.

### Paso 8: Verificar desde Next.js

Crea un Server Component que consulte los productos:

```tsx
// app/productos/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function ProductosPage() {
  const supabase = createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products?.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-400">Stock: {product.stock_quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Ejecuta el servidor:

```bash
npm run dev
```

Abre `http://localhost:3000/productos`. Deberías ver los productos cargados desde Supabase.

---

## 📊 Dashboard: Verificar métricas

Las métricas de esta sesión (tokens usados al generar migraciones, RLS y seed data) se registran automáticamente via Helicone.

Completa esta tabla con los datos reales:

| Métrica | Valor |
|---------|-------|
| Proyecto | `lab-5` |
| Modelo usado | `________` |
| Total input tokens | `________` |
| Total output tokens | `________` |
| Costo total | `$________` |
| Migraciones generadas | `________` (7 esperadas) |
| Políticas RLS generadas | `________` |
| Filas de seed insertadas | `________` |

---

## 📝 Conclusión

Crea `labs/modulo-2/lab-5-migraciones-sql/conclusion.md` y responde:

1. **¿El agente generó las migraciones exactamente como estaban en el spec?** ¿Hubo diferencias?
2. **¿Cuánto tiempo te tomó revisar las 7 migraciones?**
3. **¿Encontraste algún error en las migraciones que el agente tuvo que corregir?**
4. **¿Las políticas RLS funcionaron correctamente la primera vez?**
5. **¿Cómo se compara este flujo (spec → agente → BD) con crear la BD manualmente?**

### Ejemplo de conclusión

```markdown
# Conclusión — Lab 5: Migraciones SQL desde Spec

- El agente generó las 7 migraciones idénticas al spec
- Revisión: ~10 min para las 7 migraciones
- Encontré 1 error: FK de cart_items tenía RESTRICT
  en vez de CASCADE. Lo rechacé, el agente lo corrigió
- RLS funcionó al primer intento (todas las políticas
  estaban en el spec, el agente solo las copió)
- Comparado con hacerlo manual: esto fue 10x más rápido
  y con menos errores
```

---

## ✅ Criterios de éxito

| Objetivo | Criterio |
|----------|----------|
| **Proyecto Supabase** | Creado y conectado con Next.js |
| **Migraciones** | 7 tablas creadas exactamente como el spec |
| **Migraciones revisadas** | Cada migración fue aprobada con diff |
| **RLS aplicado** | Todas las tablas tienen RLS habilitado y políticas |
| **RLS verificado** | Probado con queries anónimas y autenticadas |
| **Seed data** | BD poblada con datos realistas |
| **Frontend conectado** | Server Component muestra productos desde Supabase |
| **Dashboard** | Tokens registrados via Helicone |
| **Git push** | Código actualizado en GitHub |

---

## 🔍 Comandos de verificación

```bash
# Verificar que Supabase responde
node -e "import { createClient } from '@/lib/supabase/server';
  const supabase = createClient();
  supabase.from('products').select('count').then(r => console.log(r));"

# Verificar estructura del proyecto
ls -la lib/supabase/

# Verificar tablas en Supabase
# (Abre SQL Editor y ejecuta:)
# SELECT table_name FROM information_schema.tables
# WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

# Verificar seed data
# SELECT COUNT(*) FROM products;  -- debe ser 15
# SELECT COUNT(*) FROM categories;  -- debe ser 3

# Verificar RLS
# SELECT tablename, rowsecurity FROM pg_tables
# WHERE schemaname = 'public';
```

---

## 🚀 Para estudiantes avanzados

1. **Supabase Studio**: Explora el Table Editor y prueba consultas en vivo
2. **Typescript types**: Genera tipos automáticos con `npx supabase gen types typescript --linked`
3. **Edge Function**: Crea una función serverless en Supabase que ejecute validaciones
4. **Seed vía API**: En lugar de SQL directo, usa la API REST de Supabase para insertar datos
5. **Migraciones versionadas**: Guarda las migraciones en `supabase/migrations/` con `supabase migration new`

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| `supabase.from(...).select(...)` devuelve vacío | Verifica que las tablas tienen datos y RLS permite lectura |
| Error `relation "public.users" does not exist` | Las migraciones no se ejecutaron. Ve al SQL Editor y ejecútalas manualmente |
| Error `permission denied for table` | RLS está bloqueando. Verifica las políticas y que `ENABLE ROW LEVEL SECURITY` está activo |
| La anon key no funciona | Verifica que `NEXT_PUBLIC_SUPABASE_ANON_KEY` está correcta en `.env.local` |
| El agente no genera migraciones | El spec tiene ambigüedades. Vuelve al Lab 4 y refínalo |

---

## 💡 Tips del instructor

- **No ejecutes migraciones sin revisarlas.** El agente es excelente, pero un error en una FK puede ser difícil de arreglar después
- **Guarda las migraciones en el repo** — créalas en `supabase/migrations/` para tener historial
- **El spec es tu documentación viva** — cualquier cambio futuro empieza por actualizar el spec, no el SQL directo
- **Prueba RLS exhaustivamente** — es más fácil romper la seguridad de lo que crees

---

> **Lab 5 completado** — TaskFlow AI tiene una base de datos real, funcional, segura y poblada, generada íntegramente por un agente a partir de un spec.
>
> **Módulo 2 completado.** Pasaste de escribir prompts a escribir specs que la IA ejecuta sin ambigüedad.
