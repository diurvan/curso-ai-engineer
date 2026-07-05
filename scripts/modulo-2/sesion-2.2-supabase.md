# 🎙️ GUION DE GRABACIÓN — Módulo 2, Sesión 2.2
## **Backend Funcional y Seguro en Supabase**
**Duración target**: 45 min teoría + 10 min demo + 5 min intro/outro = **55 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 3 min | Talking head | El spec del Lab 4 se vuelve real |
| 1. App Router: Server vs Client Components | 8 min | Slides | Cuándo usar cada uno |
| 2. Supabase: crear proyecto y conectar | 10 min | Screen recording | Setup completo |
| 3. El agente lee el Spec y genera migraciones | 10 min | Screen recording | De spec a SQL ejecutable |
| 4. Políticas RLS en acción | 7 min | Slides + demo | Seguridad a nivel de fila |
| 5. Seed data con IA | 7 min | Screen recording | Poblar la BD con datos realistas |
| 6. Demo en vivo | 10 min | Screen recording | Flujo completo: spec → BD funcional |
| 7. Preview del Lab 5 | 3 min | Talking head | Qué van a construir |
| 8. Cierre y tarea | 2 min | Talking head | Call to action |

**Total teoría**: ~45 min | **Total con demos**: ~55 min

---

## 🎬 BLOQUE 0: INTRO GANCHO — EL SPEC SE VUELVE REAL (3 min)

**[CÁMARA: Primer plano, misma línea visual que la sesión 2.1]**

> "Bienvenido de vuelta a la **Sesión 2.2 del Módulo 2**.
>
> En la sesión anterior escribiste un **spec atómico** con 7 entidades, reglas de negocio y políticas de seguridad. Lo validaste con Claude. Quedó impecable.
>
> Pero un spec en Markdown no es una base de datos. **Hoy vamos a convertirlo en realidad.**
>
> Vas a:
> 1. Crear un proyecto en Supabase
> 2. Conectarlo con tu proyecto Next.js
> 3. Pasarle el spec a Claude Code para que genere las migraciones SQL
> 4. Ejecutar las migraciones y tener la base de datos funcionando
> 5. Aplicar políticas RLS para que cada usuario vea solo lo que debe
> 6. Poblar la base con datos de prueba generados por IA
>
> Al final de esta sesión, **TaskFlow AI va a tener una base de datos real, segura y con datos**. Sin escribir una sola línea de SQL manualmente.
>
> ¿Listo para ver al agente ejecutar el contrato? Vamos."

---

## 🏗️ BLOQUE 1: APP ROUTER — SERVER VS CLIENT COMPONENTS (8 min)

**[SLIDE 1: "Next.js 15 App Router"]**

> "Antes de meternos con Supabase, necesitamos entender una decisión de arquitectura clave: **Server Components vs Client Components**."
>
> "Porque cuando conectes la base de datos desde Next.js, **tienes que decidir DÓNDE se ejecuta cada pieza de código**."

**[SLIDE 2: Server Components]**

> "**Server Components** se ejecutan en el servidor. Se renderizan antes de llegar al navegador."
>
> ```tsx
> // ✅ Server Component (por defecto en App Router)
> export default async function ProductList() {
>   const products = await db.query('SELECT * FROM products')
>   return <div>{products.map(p => <ProductCard key={p.id} {...p} />)}</div>
> }
> ```
>
> "¿Qué ventajas tienen?
> - **Acceso directo a la base de datos** — no necesitas una API Route
> - **Cero JavaScript en el cliente** — el HTML ya viene renderizado
> - **Más seguro** — las credenciales de la BD nunca llegan al navegador
> - **Más rápido** — menos JS que descargar"

**[SLIDE 3: Client Components]**

> "**Client Components** se ejecutan en el navegador. Llevan interactividad."
>
> ```tsx
> 'use client'
> // ✅ Client Component (con 'use client')
> export default function AddToCartButton({ productId }: { productId: string }) {
>   const [loading, setLoading] = useState(false)
>   // ... interactividad del lado del cliente
> }
> ```
>
> "¿Cuándo usarlos?
> - **Interactividad**: onClick, onChange, useState, useEffect
> - **Eventos del navegador**: scroll, resize, drag & drop
> - **APIs del navegador**: localStorage, IntersectionObserver
> - **Actualizaciones en tiempo real**: sin recargar la página"

**[SLIDE 4: Regla práctica]**

> "**La regla es simple:**
>
> ```
> ¿Necesitas datos de la BD?     → Server Component
> ¿Necesitas interactividad?     → Client Component
> ¿Ambos?                        → Server Component padre
>                                 → Client Component hijo
> ```
>
> "Cuando un Server Component necesita pasar datos a un Client Component, los pasa como **props**. El servidor obtiene los datos, el cliente solo los muestra."

**[SLIDE 5: Ejemplo concreto]**

> "Pongamos un ejemplo con TaskFlow AI:"
>
> ```tsx
> // app/productos/page.tsx — Server Component
> import ProductCard from '@/components/ProductCard'
> import { createClient } from '@/lib/supabase/server'
>
> export default async function ProductosPage() {
>   const supabase = createClient()
>   const { data: products } = await supabase
>     .from('products')
>     .select('*')
>     .eq('is_active', true)
>
>   return (
>     <div className="grid grid-cols-3 gap-4">
>       {products?.map(product => (
>         <ProductCard key={product.id} product={product} />
>       ))}
>     </div>
>   )
> }
>
> // components/ProductCard.tsx — Client Component
> 'use client'
> export default function ProductCard({ product }) {
>   const [added, setAdded] = useState(false)
>   return (
>     <div>
>       <h3>{product.name}</h3>
>       <p>${product.price}</p>
>       <button onClick={() => setAdded(true)}>
>         {added ? '✓ Agregado' : 'Agregar al carrito'}
>       </button>
>     </div>
>   )
> }
> ```
>
> "**La página** es Server Component — obtiene los productos de Supabase.
> **La tarjeta** es Client Component — maneja el click del botón.
>
> Así mantenemos lo mejor de ambos mundos."

**[SLIDE 6: Server Actions]**

> "Y para operaciones de escritura (crear, actualizar, borrar), Next.js 15 tiene **Server Actions**:"
>
> ```tsx
> 'use server'
> // Acción que se ejecuta en el servidor
> export async function addToCart(formData: FormData) {
>   const productId = formData.get('productId')
>   const supabase = createClient()
>   await supabase.from('cart_items').insert({
>     user_id: auth.uid(),
>     product_id: productId,
>     quantity: 1
>   })
> }
> ```
>
> "Las Server Actions se llaman desde el cliente pero se ejecutan en el servidor. **Perfecto para el carrito de compras**."

---

## ⚡ BLOQUE 2: SUPABASE — CREAR PROYECTO Y CONECTAR (10 min)

**[SLIDE 7: "¿Qué es Supabase?"]**

> "Supabase es una plataforma que te da:
> - **Base de datos PostgreSQL** — la base
> - **Autenticación** — login, registro, sesiones
> - **Storage** — archivos, imágenes
> - **Edge Functions** — código serverless
>
> Todo con un plan **free tier** generoso. 500 MB de base de datos, 2 GB de ancho de banda. Más que suficiente para TaskFlow AI."

**[SCREEN RECORDING: Crear proyecto Supabase]**

> **Paso 1 — Ir a supabase.com y crear cuenta:**
>
> **[Muestra: navegador, supabase.com, login con GitHub]**
>
> "Usa tu cuenta de GitHub para iniciar sesión. Es más rápido."

> **Paso 2 — Crear nuevo proyecto:**
>
> **[Muestra: clic en "New project"]**
>
> ```
> Name: taskflow-ai
> Database Password: [generar]
> Region: Nearest (ej: US East)
> Pricing Plan: Free
> ```
>
> "El nombre debe coincidir con tu proyecto. La contraseña es para PostgreSQL directo, pero nosotros usaremos el SDK de Supabase."

> **Paso 3 — Esperar a que se cree el proyecto (~2 min):**
>
> **[Muestra: pantalla de carga "Creating your project..."]**
>
> "Supabase está aprovisionando tu base de datos. Toma un par de minutos. **Momento perfecto para explicar qué está pasando detrás.** "

**[SLIDE 8: Anatomía de un proyecto Supabase]**

> "Cuando creas un proyecto Supabase, obtienes:
>
> ```
> ┌─────────────────────────────────┐
> │         Supabase Project        │
> ├─────────────────────────────────┤
> │  PostgreSQL 15                  │
> │  ├── auth schema                │ ← Usuarios, sesiones
> │  ├── public schema              │ ← Tus tablas (products, etc.)
> │  ├── storage schema             │ ← Archivos, imágenes
> │  └── extensions                 │ ← pgvector (Módulo 4)
> ├─────────────────────────────────┤
> │  API REST                       │ ← Endpoints automáticos
> │  Realtime subscriptions         │ ← WebSockets
> │  Edge Functions                 │ ← Deno serverless
> └─────────────────────────────────┘
> ```
>
> "Lo importante: **PostgreSQL puro**. No te están vendiendo una base de datos 'tipo Postgres'. Es Postgres real. Con extensions, RLS, todo."

**[SCREEN RECORDING: Obtener credenciales]**

> **Paso 4 — Obtener URL y anon key:**
>
> **[Muestra: Project Settings → API]**
>
> ```
> Project URL: https://xxxxxxxxxxxx.supabase.co
> anon public key: eyJhbGciOiJIUzI1NiIs...
> ```
>
> "Necesitas dos cosas:
> - **Project URL** — la dirección de tu proyecto
> - **anon key** — la llave pública (cliente)
>
> La anon key es **pública**. Puede ir en el frontend. La seguridad la da RLS, no la llave."

> **Paso 5 — Configurar variables de entorno en Next.js:**
>
> **[Muestra: creando .env.local]**
>
> ```bash
> NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
> NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
> ```
>
> "En Next.js, las variables con `NEXT_PUBLIC_` se exponen al navegador. La anon key está diseñada para eso."

**[SCREEN RECORDING: Instalar y configurar el SDK]**

> **Paso 6 — Instalar Supabase SDK:**
>
> ```bash
> npm install @supabase/supabase-js @supabase/ssr
> ```
>
> "`@supabase/supabase-js` es el cliente principal. `@supabase/ssr` es el paquete para Server Components — maneja cookies y sesiones del lado del servidor."

> **Paso 7 — Crear el cliente de servidor:**
>
> **[Muestra: creando lib/supabase/server.ts]**
>
> ```typescript
> import { createServerClient } from '@supabase/ssr'
> import { cookies } from 'next/headers'
>
> export function createClient() {
>   const cookieStore = cookies()
>
>   return createServerClient(
>     process.env.NEXT_PUBLIC_SUPABASE_URL!,
>     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
>     {
>       cookies: {
>         getAll() { return cookieStore.getAll() },
>         setAll(cookiesToSet) {
>           cookiesToSet.forEach(({ name, value, options }) =>
>             cookieStore.set(name, value, options))
>         },
>       },
>     }
>   )
> }
> ```
>
> "Este cliente se usa en Server Components. Maneja la autenticación vía cookies."

> **Paso 8 — Crear el cliente del navegador:**
>
> **[Muestra: creando lib/supabase/client.ts]**
>
> ```typescript
> import { createBrowserClient } from '@supabase/ssr'
>
> export function createClient() {
>   return createBrowserClient(
>     process.env.NEXT_PUBLIC_SUPABASE_URL!,
>     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
>   )
> }
> ```
>
> "Este se usa en Client Components. Más simple porque el navegador maneja las cookies automáticamente."

---

## 📋 BLOQUE 3: EL AGENTE LEE EL SPEC Y GENERA MIGRACIONES (10 min)

**[SLIDE 9: "Del spec a SQL — El momento de la verdad"]**

> "Aquí es donde SDD muestra su poder. Tienes el spec en `specs/database-spec.md`. Claude Code lo lee y **genera las migraciones SQL exactas**."
>
> "No estás escribiendo SQL. No estás traduciendo el spec. El agente **lo lee y lo ejecuta**."

**[SCREEN RECORDING: Generar migraciones]**

> **Paso 1 — Pasar el spec al agente:**
>
> **[Muestra: terminal, en la raíz del proyecto TaskFlow AI]**
>
> ```bash
> claude --antigravity
> ```
>
> "Activamos Antigravity para tener control de cada paso."

> **Paso 2 — La instrucción:**
>
> ```
> "Tengo el spec del modelo de datos en specs/database-spec.md.
>  Quiero que generes migraciones SQL para Supabase.
>
>  Requisitos:
>  - Una migración por entidad (7 migraciones)
>  - Incluir todas las constraints: PK, FK, UNIQUE, CHECK
>  - Incluir índices donde el spec los define
>  - Las migraciones deben ser idempotentes (se pueden ejecutar varias veces)
>  - Usar el formato de migraciones de Supabase
>
>  Empezar con users, luego categories, products, cart_items, orders, order_items, reviews.
>  No ejecutes nada todavía. Solo genera la Task List."
> ```

**[SLIDE 10: Lo que el agente genera]**

> **[Muestra: el agente propone la Task List con 7 migraciones]**
>
> "El agente genera algo como esto:"
>
> ```sql
> -- 001_create_users.sql
> CREATE TABLE IF NOT EXISTS public.users (
>   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
>   full_name TEXT NOT NULL,
>   avatar_url TEXT,
>   role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
>   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
>   updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
>   deleted_at TIMESTAMPTZ
> );
> ```
>
> "Fíjate: **exactamente lo que dice el spec**. No hay interpretación. No hay invención. El spec mandó."

**[SLIDE 11: Revisar migraciones]**

> "**Tú debes revisar cada migración** antes de ejecutarla. ¿Qué revisar?"
>
> ```diff
> ✅ ¿Coincide con el spec?
> ✅ ¿Los tipos son correctos? (DECIMAL no FLOAT, UUID no SERIAL)
> ✅ ¿Las FK tienen ON DELETE correcto? (CASCADE, RESTRICT, SET NULL)
> ✅ ¿Hay UNIQUE donde debe haberlo?
> ✅ ¿Los índices están bien?
> ```

**[SCREEN RECORDING: Aprobar migraciones]**

> **[Muestra: el instructor revisa y aprueba cada migración en Antigravity]**
>
> "Reviso la primera migración de `users`. Todo correcto. ✅ Aprobar.
> Reviso `products`. El spec dice `price DECIMAL(10,2)` y la migración lo tiene. ✅ Aprobar.
> ..."
>
> "En 5 minutos revisé las 7 migraciones. Sin el spec, tendría que haberlas escrito yo. Con el spec, solo verifico que el agente no se haya desviado."

---

## 🔐 BLOQUE 4: POLÍTICAS RLS EN ACCIÓN (7 min)

**[SLIDE 12: "¿Qué es RLS?"]**

> "**Row Level Security** es una feature de PostgreSQL que permite controlar **fila por fila** quién puede leer, insertar, actualizar o borrar."
>
> "Imagina la tabla `orders`. Un usuario solo debe ver SUS pedidos. No los de otros. Con RLS, esto se define en la base de datos, no en el código."

**[SLIDE 13: Sin RLS vs Con RLS]**

> "**Sin RLS**, tienes que asegurarte en CADA consulta:"
>
> ```tsx
> // ❌ Olvidaste el filtro → disaster
> const { data } = await supabase.from('orders').select('*')
>
> // ✅ Tienes que acordarte siempre
> const { data } = await supabase
>   .from('orders')
>   .select('*')
>   .eq('user_id', auth.uid())
> ```

> "**Con RLS**, la base de datos lo impone:"
>
> ```sql
> CREATE POLICY "users_see_own_orders" ON orders
>   FOR SELECT USING (auth.uid() = user_id);
> ```
>
> "Aunque el código del frontend no filtre, **la base de datos no devuelve filas que no correspondan**. Es una capa de seguridad que no depende del desarrollador."

**[SLIDE 14: Políticas del spec]**

> "En nuestro spec definimos políticas para cada tabla. Por ejemplo:"
>
> **products:**
> ```sql
> CREATE POLICY "products_read_active" ON public.products
>   FOR SELECT USING (is_active = true AND deleted_at IS NULL);
>
> CREATE POLICY "products_admin_all" ON public.products
>   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
> ```
>
> "**Cualquiera** puede leer productos activos. **Solo admins** pueden modificar."

> **cart_items:**
> ```sql
> CREATE POLICY "cart_items_manage_own" ON public.cart_items
>   FOR ALL USING (auth.uid() = user_id);
> ```
>
> "**Cada usuario** solo ve y modifica su propio carrito."

**[SCREEN RECORDING: El agente genera RLS]**

> **[Muestra: después de las migraciones, el instructor le pide al agente que genere las políticas RLS]**
>
> ```bash
> # Como parte de la misma sesión de Antigravity
> "Ahora genera las políticas RLS según la sección de seguridad del spec"
> ```
>
> "El agente lee la sección de seguridad del spec y genera cada `CREATE POLICY`. Las reviso, están correctas, las apruebo."

**[SLIDE 15: Probar RLS]**

> "**Siempre prueba que RLS funciona.** No confíes, verifica."
>
> ```sql
> -- Probar como usuario anónimo
> SELECT * FROM products;
> -- → debe funcionar (products es público)
>
> SELECT * FROM cart_items;
> -- → debe fallar (no estás autenticado)
> ```
>
> "En el Lab 5 vas a probar cada política con diferentes roles."

---

## 🌱 BLOQUE 5: SEED DATA CON IA (7 min)

**[SLIDE 16: "¿Por qué seed data?"]**

> "Tienes la estructura de la base de datos. Pero está vacía. Necesitas **datos de prueba** para:
> - Ver que el frontend funciona
> - Probar las consultas
> - Demostrar el producto
>
> En vez de inventarlos manualmente, **se los pedimos al agente**."

**[SCREEN RECORDING: Generar seed data]**

> **[Muestra: Antigravity, el instructor pide seed data]**
>
> ```bash
> "Genera seed data para poblar la base de datos.
>  Quiero:
>  - 3 categorías: Laptops, Audífonos, Monitores
>  - 5 productos por categoría (15 en total)
>  - 2 usuarios de prueba
>  - 1 pedido de ejemplo con 2 items
>  - 3 reseñas
>
>  Los datos deben ser realistas para una tienda de tecnología.
>  Genera INSERTs SQL."
> ```

> **[Muestra: el agente genera los INSERTs]**
>
> "El agente genera algo como:"
>
> ```sql
> -- Categorías
> INSERT INTO public.categories (id, name, slug, description)
> VALUES
>   (gen_random_uuid(), 'Laptops', 'laptops', 'Laptops para trabajo, gaming y estudio'),
>   (gen_random_uuid(), 'Audífonos', 'audifonos', 'Audífonos inalámbricos y de diadema'),
>   (gen_random_uuid(), 'Monitores', 'monitores', 'Monitores 4K, gaming y ultrawide');
>
> -- Productos (Laptops)
> INSERT INTO public.products (category_id, name, slug, description, price, stock_quantity)
> VALUES
>   ((SELECT id FROM categories WHERE slug='laptops'), 'MacBook Pro M4',
>    'macbook-pro-m4', '32GB RAM, 1TB SSD, chip M4', 2499.99, 10),
>   ((SELECT id FROM categories WHERE slug='laptops'), 'Dell XPS 16',
>    'dell-xps-16', 'Intel Core Ultra 9, 32GB RAM', 2199.99, 15);
> ```

**[SLIDE 17: Revisar seed data]**

> "**Siempre revisa la seed data.** El agente puede inventar precios irreales o nombres raros."
>
> "¿Qué revisar?
> - **Precios**: ¿tienen sentido? ($2499 para una MacBook → ✅)
> - **Cantidades**: ¿el stock es razonable? (10 unidades → ✅)
> - **Relaciones**: ¿cada producto tiene una categoría válida? → ✅
> - **Variedad**: ¿hay suficiente diversidad de datos? → ✅"

**[SCREEN RECORDING: Ejecutar seed]**

> **[Muestra: ejecutando los INSERTs en el SQL Editor de Supabase]**
>
> "Voy al SQL Editor de Supabase, pego los INSERTs y los ejecuto."
>
> ```bash
> # O desde la terminal con psql
> psql $SUPABASE_DATABASE_URL < seed-data.sql
> ```
>
> "Ahora la base de datos tiene datos reales. **En 2 minutos.** "

---

## 🖥️ BLOQUE 6: DEMO EN VIVO — FLUJO COMPLETO (10 min)

**[SCREEN RECORDING: Pantalla completa]**

> "Vamos a hacer el flujo completo de principio a fin, como lo harás en el Lab 5."

**[Paso 1: Crear proyecto Supabase]**

> **[Muestra: supabase.com, crea proyecto "taskflow-ai"]**
>
> "Proyecto creado. Copio las credenciales a `.env.local`."

**[Paso 2: Configurar el SDK]**

> **[Muestra: edita lib/supabase/server.ts y client.ts]**
>
> "SDK instalado, clientes configurados."

**[Paso 3: Pasar spec al agente]**

> **[Muestra: terminal con claude --antigravity]**
>
> ```
> "Tengo el spec en specs/database-spec.md. Genera las 7 migraciones SQL."
> ```
>
> "El agente genera las migraciones. Las reviso una por una. ✅ Aprobadas."

**[Paso 4: Ejecutar migraciones]**

> **[Muestra: pega las migraciones en el SQL Editor de Supabase y las ejecuta]**
>
> "7 migraciones ejecutadas. 7 tablas creadas. Puedo verlas en el Table Editor."

**[Paso 5: Generar y ejecutar RLS]**

> **[Muestra: el agente genera las políticas RLS, las revisa y ejecuta]**
>
> "Políticas RLS aplicadas. Listas para proteger los datos."

**[Paso 6: Seed data]**

> **[Muestra: el agente genera seed data, la revisa y ejecuta]**
>
> "15 productos, 3 categorías, datos realistas."

**[Paso 7: Verificar desde el código]**

> **[Muestra: crea un Server Component que consulta productos]**
>
> ```tsx
> // app/productos/page.tsx
> import { createClient } from '@/lib/supabase/server'
>
> export default async function ProductosPage() {
>   const supabase = createClient()
>   const { data: products } = await supabase
>     .from('products')
>     .select('*')
>     .eq('is_active', true)
>
>   return (
>     <pre>{JSON.stringify(products, null, 2)}</pre>
>   )
> }
> ```
>
> **[Muestra: navegador, la página muestra los productos]**
>
> "Los productos aparecen. La base de datos responde. **TaskFlow AI ya tiene backend.** "

**[SLIDE 18: Resumen de la demo]**

| Paso | Tiempo | ¿Quién lo hace? |
|------|--------|-----------------|
| Crear proyecto Supabase | 2 min | Tú (manual) |
| Configurar SDK | 3 min | Tú (una vez) |
| Generar migraciones | 30 seg | Agente |
| Revisar migraciones | 5 min | Tú |
| Ejecutar migraciones | 10 seg | Tú (clic) |
| Generar RLS | 30 seg | Agente |
| Generar seed data | 30 seg | Agente |
| Ejecutar seed | 10 seg | Tú |
| Verificar | 2 min | Tú |
| **Total** | **~15 min** | |

> "**15 minutos.** De un spec en Markdown a una base de datos funcional, segura y con datos."

---

## 🚀 BLOQUE 7: PREVIEW DEL LAB 5 (3 min)

**[CÁMARA: Talking head]**

> "**Lab 5: Ejecución del Spec en Supabase**.
>
> En este lab vas a hacer exactamente lo que acabo de mostrar, paso a paso:
>
> 1. Crear un proyecto en Supabase (plan Free)
> 2. Configurar las variables de entorno en Next.js
> 3. Instalar los paquetes `@supabase/supabase-js` y `@supabase/ssr`
> 4. Crear los clientes de servidor y navegador
> 5. Pasarle el spec del Lab 4 a Claude Code
> 6. El agente genera las 7 migraciones SQL
> 7. Revisar y aprobar cada migración
> 8. Ejecutarlas en Supabase
> 9. Generar y aplicar políticas RLS
> 10. Poblar con seed data generada por IA
> 11. Verificar que los datos se consultan desde Next.js
> 12. Registrar el consumo en el Dashboard
>
> **Stack**: Supabase + Claude Code + Spec del Lab 4 + Dashboard
> **Duración**: 4-5 horas (~40K-80K tokens)
> **Requisito**: Lab 4 completado (spec validado)
>
> **El resultado**: TaskFlow AI con base de datos real, segura, poblada y conectada a Next.js."

---

## 🎯 BLOQUE 8: CIERRE Y TAREA (2 min)

**[SLIDE 19: Resumen]**

> "Resumen de hoy:
> 1. **Server Components** para datos, **Client Components** para interactividad
> 2. **Supabase** = PostgreSQL administrado con free tier generoso
> 3. **El agente lee el spec y genera migraciones exactas** — sin interpretación
> 4. **RLS** es seguridad a nivel de base de datos, no de código
> 5. **Seed data con IA** — poblar la BD en segundos
> 6. **Flujo completo**: spec → migraciones → RLS → seed → verificación"

**[SLIDE 20: Tarea antes del Módulo 3]**

> **Tu tarea**:
> 1. Crear proyecto Supabase y conectar con Next.js
> 2. Pasar el spec a Claude Code y generar migraciones
> 3. Revisar, aprobar y ejecutar migraciones
> 4. Generar y aplicar políticas RLS
> 5. Poblar con seed data
> 6. Verificar desde el navegador que los datos se cargan
> 7. Commit y push a GitHub
>
> En el **Módulo 3** vamos a: **Frontend Multimodal**. Vamos a convertir wireframes en interfaces reales usando Claude Vision, conectar el frontend con la base de datos que acabas de crear y hacer code review automatizado con Sonnet.
>
> **Nos vemos en el Módulo 3. ¡Tu base de datos ya está viva!** "

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: Misma configuración que sesiones anteriores
- **Pantalla**: Alternar entre Supabase web, terminal con Claude Code, y editor de código
- **Zoom**: En las migraciones generadas y en las políticas RLS

### Post-producción
- **Overlay**: Mostrar el diagrama de Server vs Client Components durante el Bloque 1
- **Split screen**: Supabase SQL Editor a la izquierda, Claude Code a la derecha durante migraciones
- **Subtítulos**: Español (auto-generados + revisión)
- **Highlight**: Resaltar las diferencias entre el spec y el SQL generado (deben ser casi idénticas)

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-2/sesion-2.2-supabase.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-2/sesion-2.2-supabase.md` |
| Lab | Markdown | `labs/modulo-2/lab-5-migraciones-sql.md` |
| Recursos | Markdown | `assets/modulo-2/sesion-2.2/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS (para description del video)

1. **Supabase**: https://supabase.com
2. **Next.js App Router**: https://nextjs.org/docs/app
3. **Supabase + Next.js SSR**: https://supabase.com/docs/guides/auth/quickstarts/nextjs
4. **Supabase RLS**: https://supabase.com/docs/guides/auth/row-level-security
5. **Claude Code CLI**: https://docs.anthropic.com/en/docs/claude-code/overview
6. **Spec del curso**: `specs/database-spec.md`
7. **Repo del curso**: https://github.com/tu-usuario/curso-ai-engineer
8. **pgvector**: https://github.com/pgvector/pgvector (para Módulo 4)

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 55 min.*
