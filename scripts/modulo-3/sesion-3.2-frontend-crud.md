# 🎙️ GUION DE GRABACIÓN — Módulo 3, Sesión 3.2
## **Frontend Vivo: CRUD y Code Review Automático**
**Duración target**: 40 min teoría + 10 min demo + 5 min intro/outro = **50 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 3 min | Talking head | De mock a datos reales |
| 1. Server Components a fondo | 8 min | Slides | Consultas a Supabase desde el servidor |
| 2. Server Actions | 8 min | Screen recording | Operaciones CRUD desde el frontend |
| 3. Manejo de estados | 7 min | Slides | Loading, error, empty, edge cases |
| 4. Code Review con Sonnet | 7 min | Slides + demo | El agente como revisor técnico |
| 5. Demo en vivo | 10 min | Screen recording | Galería real + carrito + code review |
| 6. Preview del Lab 7 | 3 min | Talking head | CRUD completo |
| 7. Cierre y tarea | 2 min | Talking head | Resumen Módulo 3 |

**Total teoría**: ~40 min | **Total con demos**: ~50 min

---

## 🎬 BLOQUE 0: INTRO GANCHO — DE MOCK A DATOS REALES (3 min)

**[CÁMARA: Primer plano]**

> "Bienvenido a la **Sesión 3.2 del Módulo 3**.
>
> En la sesión anterior creaste una Landing Page espectacular a partir de un wireframe. Claude Vision convirtió tu dibujo en código.
>
> Pero la galería de productos... tenía datos falsos. Mock data. Placeholder.
>
> Hoy vamos a **conectarla con la vida real**.
>
> Esa base de datos que construiste en el Módulo 2 —con 15 productos, categorías, RLS— va a alimentar tu frontend.
>
> Y no solo eso: cuando termines de escribir el código, **Claude Sonnet lo va a revisar por ti** y te va a decir qué mejorar.
>
> Cero code review manual. Cero esperar a que un compañero tenga tiempo. El agente revisa al instante.
>
> ¿Listo para ver tu producto cobrar vida? Vamos."

---

## 🗄️ BLOQUE 1: SERVER COMPONENTS A FONDO (8 min)

**[SLIDE 1: "Server Components con Supabase"]**

> "En la Sesión 2.2 vimos la teoría de Server Components. Hoy vamos a **aplicarlos a fondo** con Supabase."

**[SLIDE 2: El patrón Server Component → Supabase]**

> "El patrón es siempre el mismo:"
>
> ```typescript
> // 1. Crear el cliente de servidor
> const supabase = createClient()
>
> // 2. Consultar datos
> const { data, error } = await supabase
>   .from('products')
>   .select('*')
>   .eq('is_active', true)
>
> // 3. Renderizar en el servidor
> return <ProductGrid products={data} />
> ```
>
> "No necesitas API Routes. No necesitas fetch. **El servidor habla directo con la base de datos**."

**[SLIDE 3: La galería de productos como Server Component]**

> "Así se ve la galería de productos conectada a Supabase:"
>
> ```typescript
> // app/productos/page.tsx — Server Component
> import { createClient } from '@/lib/supabase/server'
> import ProductCard from '@/components/ProductCard'
>
> export default async function ProductosPage() {
>   const supabase = createClient()
>
>   const { data: products, error } = await supabase
>     .from('products')
>     .select('*')
>     .eq('is_active', true)
>     .order('created_at', { ascending: false })
>
>   if (error) return <ErrorState message={error.message} />
>   if (!products?.length) return <EmptyState />
>
>   return (
>     <div className="grid grid-cols-3 gap-6">
>       {products.map(p => <ProductCard key={p.id} product={p} />)}
>     </div>
>   )
> }
> ```
>
> "Tres estados manejados: **error**, **vacío**, y **con datos**. Esto es lo que hace un frontend profesional."

---

## ⚡ BLOQUE 2: SERVER ACTIONS (8 min)

**[SLIDE 4: "¿Qué es una Server Action?"]**

> "Una Server Action es una función que se ejecuta en el servidor pero se llama desde el cliente. Es la evolución natural de las API Routes."
>
> "**Para el carrito de compras**, las Server Actions son perfectas."

**[SLIDE 5: Crear la Server Action del carrito]**

> **[SCREEN RECORDING: Editor, crea lib/actions/cart.ts]**
>
> ```typescript
> 'use server'
>
> import { createClient } from '@/lib/supabase/server'
> import { revalidatePath } from 'next/cache'
>
> export async function addToCart(productId: string) {
>   const supabase = createClient()
>
>   // Verificar si el producto ya está en el carrito
>   const { data: existing } = await supabase
>     .from('cart_items')
>     .select('id, quantity')
>     .eq('product_id', productId)
>     .single()
>
>   if (existing) {
>     // Incrementar cantidad
>     await supabase
>       .from('cart_items')
>       .update({ quantity: existing.quantity + 1 })
>       .eq('id', existing.id)
>   } else {
>     // Agregar nuevo item
>     await supabase
>       .from('cart_items')
>       .insert({ product_id: productId, quantity: 1 })
>   }
>
>   // Revalidar la caché para que el frontend se actualice
>   revalidatePath('/productos')
> }
> ```

**[SLIDE 6: Llamar la Server Action desde el cliente]**

> "Y desde el Client Component, la llamas como una función normal:"
>
> ```typescript
> 'use client'
> import { addToCart } from '@/lib/actions/cart'
>
> export default function AddToCartButton({ productId }: { productId: string }) {
>   const [loading, setLoading] = useState(false)
>
>   async function handleClick() {
>     setLoading(true)
>     await addToCart(productId)
>     setLoading(false)
>   }
>
>   return (
>     <button onClick={handleClick} disabled={loading}>
>       {loading ? 'Agregando...' : 'Agregar al carrito'}
>     </button>
>   )
> }
> ```
>
> "No necesitas fetch. No necesitas axios. No necesitas API Routes. **Llamas a la función directamente.** "

---

## 🔄 BLOQUE 3: MANEJO DE ESTADOS (7 min)

**[SLIDE 7: "Los 4 estados de todo componente de datos"]**

> "Todo componente que muestra datos tiene **4 estados posibles**. Ignorar uno solo es la causa más común de bugs en frontend."

**[SLIDE 8: Estado 1 — Loading]**

> "**Loading**: mientras los datos se cargan."
>
> ```typescript
> // loading.tsx (Next.js muestra esto automáticamente)
> export default function Loading() {
>   return (
>     <div className="grid grid-cols-3 gap-6 animate-pulse">
>       {[1,2,3].map(i => (
>         <div key={i} className="h-64 bg-gray-200 rounded-lg" />
>       ))}
>     </div>
>   )
> }
> ```
>
> "Next.js tiene **loading.tsx** que se muestra automáticamente mientras el Server Component carga."

**[SLIDE 9: Estado 2 — Error]**

> "**Error**: cuando la base de datos no responde o hay un problema de permisos."
>
> ```typescript
> if (error) {
>   return (
>     <div className="p-8 text-center">
>       <h2 className="text-xl font-bold text-red-600">
>         Error al cargar productos
>       </h2>
>       <p className="text-gray-600">{error.message}</p>
>     </div>
>   )
> }
> ```
>
> "**Nunca dejes que el usuario vea una pantalla en blanco o un error feo.** "

**[SLIDE 10: Estado 3 — Vacío]**

> "**Vacío**: cuando no hay datos que mostrar."
>
> ```typescript
> if (!products || products.length === 0) {
>   return (
>     <div className="p-8 text-center">
>       <h2 className="text-xl font-bold">No hay productos</h2>
>       <p className="text-gray-600">Vuelve pronto, estamos actualizando.</p>
>       <Link href="/" className="text-[#0ea5e9] hover:underline">
>         Volver al inicio
>       </Link>
>     </div>
>   )
> }
> ```
>
> "**El estado vacío no es un error.** Es una oportunidad para guiar al usuario."

**[SLIDE 11: Estado 4 — Datos]**

> "**Datos**: cuando todo funciona. Pero incluso acuí hay que manejar edge cases."
>
> ```typescript
> // Productos sin stock
> {product.stock_quantity === 0 && (
>   <span className="text-red-500">Agotado</span>
> )}
>
> // Stock bajo
> {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
>   <p className="text-amber-600">
>     Solo quedan {product.stock_quantity} unidades
>   </p>
> )}
> ```

---

## 👁️ BLOQUE 4: CODE REVIEW CON SONNET (7 min)

**[SLIDE 12: "¿Por qué code review con IA?"]**

> "El code review tradicional tiene problemas:
> - **Disponibilidad**: tu revisor está en otra reunión
> - **Consistencia**: cada revisor tiene criterios distintos
> - **Velocidad**: un PR puede esperar días
>
> Con Sonnet como revisor, obtienes feedback **al instante**, **siempre disponible**, **consistente**."

**[SLIDE 13: El flujo de code review con Sonnet]**

> ```
> 1. Escribes el código
> 2. Se lo pasas a Claude Code con un prompt de revisión
> 3. Sonnet analiza: bugs, performance, accesibilidad, buenas prácticas
> 4. Recibes feedback con sugerencias específicas
> 5. Corriges y vuelves a enviar
> ```

**[SCREEN RECORDING: Demo de code review]**

> **[Muestra: terminal, el instructor envía código a Claude para revisión]**
>
> ```bash
> claude -p "Revisa este código de components/ProductCard.tsx.
> Busca:
> - Errores de TypeScript
> - Problemas de accesibilidad (alt text, aria)
> - Bugs potenciales
> - Malas prácticas de React
> - Oportunidades de performance
>
> Dame sugerencias específicas con código."
> ```
>
> **[Muestra: Claude analiza y responde con sugerencias]**
>
> "Claude encuentra:
> - ✅ Falta `alt` text en la imagen
> - ✅ El botón debería tener `aria-label`
> - ✅ La imagen no tiene `loading="lazy"`
>
> Son **3 problemas reales** que Sonnet detectó en segundos."

**[SLIDE 14: Qué revisa Sonnet]**

> | Categoría | Ejemplos |
> |-----------|----------|
> | **TypeScript** | Tipos incorrectos, `any` innecesario |
> | **Accesibilidad** | Alt text, aria-label, roles |
> | **Performance** | Imágenes sin lazy loading, re-renders |
> | **React** | Key perdidos, estado mal manejado |
> | **Seguridad** | XSS, datos expuestos al cliente |
> | **Buenas prácticas** | Magic numbers, código muerto |

---

## 🖥️ BLOQUE 5: DEMO EN VIVO — GALERÍA + CARRITO + CODE REVIEW (10 min)

**[SCREEN RECORDING: Pantalla completa]**

> "Vamos a hacer el flujo completo que tú harás en el Lab 7."

**[Paso 1: Server Component de productos]**

> **[Muestra: crea app/productos/page.tsx]**
>
> "Creo el Server Component que consulta productos desde Supabase. Manejo los 4 estados: loading, error, vacío, datos."

**[Paso 2: Client Component del carrito]**

> **[Muestra: crea components/AddToCartButton.tsx]**
>
> "Creo el botón de agregar al carrito como Client Component. Llama a la Server Action."

**[Paso 3: Server Action]**

> **[Muestra: crea lib/actions/cart.ts]**
>
> "La Server Action inserta o actualiza el carrito en Supabase."

**[Paso 4: Verificar en navegador]**

> **[Muestra: npm run dev, abre /productos]**
>
> "Los productos se cargan desde Supabase. Hago clic en 'Agregar' y el item aparece en el carrito."

**[Paso 5: Code review con Sonnet]**

> **[Muestra: envía el código a Claude]**
>
> ```bash
> claude -p "Revisa components/AddToCartButton.tsx"
> ```
>
> "Claude encuentra que falta manejo de error en la Server Action. Lo corrijo."

**[SLIDE 15: Resultado de la demo]**

> | Componente | Líneas | Tipo |
> |------------|--------|------|
> | `app/productos/page.tsx` | ~30 | Server Component |
> | `components/ProductCard.tsx` | ~40 | Client Component |
> | `components/AddToCartButton.tsx` | ~25 | Client Component |
> | `lib/actions/cart.ts` | ~35 | Server Action |
> | **Total** | **~130 líneas** | **Full-stack funcional** |

---

## 🚀 BLOQUE 6: PREVIEW DEL LAB 7 (3 min)

**[CÁMARA: Talking head]**

> "**Lab 7: CRUD — Galería Consume Datos Reales de Supabase**.
>
> En este lab vas a:
>
> 1. Crear un Server Component que consulte productos desde Supabase
> 2. Mostrar productos en la galería (con datos reales)
> 3. Implementar Server Action para agregar al carrito
> 4. Manejar los 4 estados: loading, error, vacío, datos
> 5. Hacer code review con Sonnet
> 6. Registrar métricas en el Dashboard
>
> **Stack**: Next.js 15 + Supabase SDK + Claude Sonnet (revisor) + Dashboard
> **Duración**: 3-4 horas (~25K-50K tokens)
> **Requisito**: Lab 6 completado (Landing Page) y Módulo 2 (BD con datos)"

---

## 🎯 BLOQUE 7: CIERRE Y TAREA (2 min)

**[SLIDE 16: Resumen del Módulo 3]**

> "Resumen del Módulo 3 completo:
>
> En la Sesión 3.1: **De wireframe a código** con Claude Vision.
>
> En esta sesión:
> 1. **Server Components** conectan el frontend directo a Supabase
> 2. **Server Actions** permiten escribir datos sin API Routes
> 3. **4 estados**: loading, error, vacío, datos — un frontend profesional
> 4. **Code Review con Sonnet**: feedback instantáneo y consistente"
>
> "Tu producto ahora tiene:
> - ✅ Frontend visual atractivo (Landing + galería)
> - ✅ Datos reales desde Supabase
> - ✅ Carrito de compras funcional
> - ✅ Code review automatizado

**[SLIDE 17: Tarea antes del Módulo 4]**

> **Tu tarea**:
> 1. Server Component que consulte productos de Supabase
> 2. Server Action para agregar al carrito
> 3. Manejar loading, error, vacío, datos
> 4. Code review con Sonnet
> 5. Commit y push a GitHub
>
> En el **Módulo 4** vamos a: **RAG y Bases Vectoriales**. TaskFlow AI va a tener MEMORIA. Los usuarios van a poder preguntarle al chatbot cosas como '¿Qué servicios tienen para pequeñas empresas?' y el chatbot va a responder con datos reales del catálogo usando búsqueda semántica.
>
> **¡Nos vemos en el Módulo 4!** "

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: Misma configuración
- **Pantalla**: Alternar entre editor (código) y navegador (resultado)
- **Zoom**: En el code review — mostrar los issues que encuentra Sonnet

### Post-producción
- **Overlay**: Los 4 estados (loading, error, empty, data) durante el Bloque 3
- **Split screen**: Código a la izquierda, resultado a la derecha durante la demo
- **Subtítulos**: Español

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-3/sesion-3.2-frontend-crud.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-3/sesion-3.2-frontend-crud.md` |
| Lab | Markdown | `labs/modulo-3/lab-7-frontend-crud.md` |
| Recursos | Markdown | `assets/modulo-3/sesion-3.2/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS

1. **Next.js Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
2. **Supabase + Next.js SSR**: https://supabase.com/docs/guides/auth/quickstarts/nextjs
3. **Claude Code CLI**: https://docs.anthropic.com/en/docs/claude-code/overview
4. **Loading UI en Next.js**: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
5. **Error Handling en Next.js**: https://nextjs.org/docs/app/building-your-application/routing/error-handling

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 50 min.*
