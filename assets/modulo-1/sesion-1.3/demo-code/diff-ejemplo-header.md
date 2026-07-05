# Ejemplo de Diff generado por Antigravity

Este archivo muestra el **Diff** que Antigravity presenta al crear el componente Header en la Sesión 1.3. El estudiante debe **revisar y aprobar** este cambio antes de que se aplique.

---

## Diff: `components/Header.tsx`

### Contexto
Crear componente Header con logo, navegación responsiva y CTA.

### Cambios propuestos

```diff
+ import Link from 'next/link'
+ import { Menu, X } from 'lucide-react'
+
+ export default function Header() {
+   return (
+     <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
+       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
+         {/* Logo */}
+         <Link href="/" className="flex items-center gap-2">
+           <span className="text-xl font-bold text-[#1e3a5f]">TaskFlow AI</span>
+         </Link>
+
+         {/* Desktop Navigation */}
+         <nav className="hidden items-center gap-8 md:flex">
+           <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#0ea5e9]">
+             Inicio
+           </Link>
+           <Link href="/productos" className="text-sm font-medium text-gray-700 hover:text-[#0ea5e9]">
+             Productos
+           </Link>
+           <Link href="/servicios" className="text-sm font-medium text-gray-700 hover:text-[#0ea5e9]">
+             Servicios
+           </Link>
+           <Link href="/contacto" className="text-sm font-medium text-gray-700 hover:text-[#0ea5e9]">
+             Contacto
+           </Link>
+         </nav>
+
+         {/* CTA Button */}
+         <Link
+           href="/contacto"
+           className="hidden rounded-lg bg-[#0ea5e9] px-4 py-2 text-sm font-medium text-white hover:bg-[#0284c7] md:block"
+         >
+           Comenzar
+         </Link>
+
+         {/* Mobile menu button */}
+         <button className="md:hidden" aria-label="Abrir menú">
+           <Menu className="h-6 w-6 text-gray-700" />
+         </button>
+       </div>
+     </header>
+   )
+ }
```

### Checklist de revisión

| Check | Descripción |
|-------|-------------|
| ✅ | Nombre del componente coincide con el archivo (`Header`) |
| ✅ | Usa `next/link` para navegación (no `<a>` directo) |
| ✅ | Tailwind classes con colores corporativos (`#1e3a5f`, `#0ea5e9`) |
| ✅ | Header fijo en scroll (`fixed top-0 z-50`) |
| ✅ | Navegación desktop visible (`hidden md:flex`) |
| ✅ | Menú hamburguesa en mobile (botón con `md:hidden`) |
| ✅ | Botón CTA visible solo en desktop (`hidden md:block`) |
| ✅ | `aria-label` en botón mobile (accesibilidad) |
| ⚠️ | Falta estado del menú mobile (no implementa toggle aún) |

### Decisión

> ✅ **Aprobar** — El componente es correcto y sigue las especificaciones.
> El toggle del menú mobile se puede agregar en una iteración posterior o con un hook personalizado.
