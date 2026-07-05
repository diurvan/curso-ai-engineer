# Demo Code — Sesión 3.2: Frontend Vivo — CRUD y Code Review Automático

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `productos-page.tsx` | Server Component que consulta productos de Supabase |
| `product-card.tsx` | Client Component con manejo de estados |
| `add-to-cart-button.tsx` | Botón que llama a la Server Action |
| `cart-actions.ts` | Server Action para agregar al carrito |
| `loading.tsx` | Skeleton loading state |

## Flujo de la demo

1. Verificar BD en Supabase Studio (tabla `products` con datos)
2. Crear Server Component → galería conectada
3. Crear Server Action → carrito funcional
4. Manejar 4 estados (loading, error, vacío, datos)
5. Code review con Sonnet: `claude -p "Revisa product-card.tsx"`
6. Verificar en navegador y Dashboard
