---
title: "De Boceto a Producto con Claude Vision"
subtitle: "Módulo 3 · Sesión 3.1 · Curso AI Engineer"
author: "[Tu Nombre]"
theme: "dark"
transition: "slide"
highlight: "monokai"
---

# De Boceto a Producto con Claude Vision

## Módulo 3 · Sesión 3.1

### Curso AI Engineer — De Semi-Senior a Experto en IA

---

## 🎯 Objetivos de esta sesión

- Entender el **flujo multimodal**: imagen → prompt → código
- Configurar **Shadcn/UI** en el proyecto TaskFlow AI
- Escribir **prompts visuales** efectivos para Claude Vision
- Definir un **sistema de diseño** consistente
- Convertir un **wireframe en Landing Page funcional**

---

## 👁️ Claude Vision: el agente ve

Claude procesa imágenes como **tokens visuales** junto con tu prompt de texto.

```
Tú: [imagen] + "Convierte esto en React + Tailwind"
Claude: → Analiza → Reconoce secciones → Genera código
```

**¿Qué puedes subir?**
- Wireframes (Excalidraw, Figma)
- Capturas de pantalla
- Diagramas
- Diseños de UI

---

## ⚙️ Setup: Shadcn/UI

```bash
# Inicializar Shadcn/UI
npx shadcn@latest init

# Agregar componentes
npx shadcn@latest add button card input navigation-menu
```

**Componentes que usaremos**:

| Componente | Uso |
|------------|-----|
| Button | CTAs, acciones |
| Card | Productos, servicios |
| Input | Formulario de contacto |
| NavigationMenu | Menú responsive |

---

## 🎨 Sistema de diseño — Colores

```typescript
// tailwind.config.ts
colors: {
  primary: '#1e3a5f',    // Azul marino
  accent: '#0ea5e9',     // Cyan
  background: '#ffffff',
  foreground: '#1a1a2e',
}
```

| Token | Valor | Uso |
|-------|-------|-----|
| primary | `#1e3a5f` | Headers, títulos |
| accent | `#0ea5e9` | CTAs, hover |
| background | `#ffffff` | Fondos |
| text-secondary | `#64748b` | Texto secundario |

---

## 📝 Anatomía de un prompt visual

```
1. CONTEXTO     → "Landing Page de TaskFlow AI, servicios técnicos"
2. FORMATO      → "React + TypeScript + Tailwind CSS"
3. DISEÑO       → "Primary: #1e3a5f, Accent: #0ea5e9"
4. REQUISITOS   → "Responsive, mobile-first, SEO"
```

---

## ✅ Ejemplo de prompt completo

```
"Tengo un wireframe de la Landing Page de TaskFlow AI,
una plataforma de servicios técnicos.

Convierte este wireframe en un componente Next.js
con TypeScript y Tailwind CSS.

Sistema de diseño:
- Primary: #1e3a5f
- Accent: #0ea5e9
- Font: Inter

Requisitos:
- Hero con título, subtítulo y CTA
- Features en grid de 3 columnas
- Footer con links
- Mobile-first, responsivo"
```

---

## ❌ Errores comunes

| Error | Consecuencia | Solución |
|-------|-------------|----------|
| Imagen sin contexto | Claude adivina | Explica qué es |
| Sin formato explícito | Genera HTML, Vue, Angular | "React + TS + Tailwind" |
| Sin sistema de diseño | Colores genéricos | Pasa tokens exactos |
| Esperar perfección | Frustración | Revisa + ajusta |

---

## 📐 Design Spec para el agente

```markdown
# specs/design-spec.md

## Colores
- primary: #1e3a5f
- accent: #0ea5e9

## Tipografía
- Font: Inter
- H1: text-5xl font-bold
- Body: text-base leading-relaxed

## Espaciado
- Section: py-16 md:py-24
- Card: p-6
- Grid: gap-6 md:gap-8
```

> **Pásale este spec a Claude Vision junto con el wireframe.**

---

## 🔬 Demo: Wireframe → Landing Page

### Pasos
1. Dibujar en Excalidraw (hero, features, banner, footer)
2. Exportar PNG
3. Subir a Claude Vision con prompt completo
4. Revisar código generado
5. Ajustar colores y detalles
6. Verificar en navegador

### Resultado
| Paso | Tiempo |
|------|--------|
| Wireframe | 3 min |
| Generar código | 30 seg |
| Revisar + ajustar | 2 min |
| **Total** | **~7 min** |

---

## 🧪 Lab 6: Landing Page y Galería desde Wireframe

### Pasos
1. Dibujar wireframe en Excalidraw
2. Configurar Shadcn/UI
3. Prompt completo a Claude Vision
4. Revisar y ajustar código
5. Integrar con layout del Lab 3
6. Verificar responsive

**Stack**: Claude Vision + Tailwind + Shadcn/UI + Dashboard
**Duración**: 4-5 horas | **Tokens**: ~30K-60K
**Requisito**: Módulo 2 completado

---

## ✅ Checklist post-sesión

- [ ] Shadcn/UI configurado (`npx shadcn@latest init`)
- [ ] Componentes instalados (button, card, input, navigation-menu)
- [ ] Wireframe dibujado en Excalidraw
- [ ] Prompt completo con sistema de diseño
- [ ] Código generado por Claude Vision
- [ ] Código revisado y ajustado
- [ ] Integrado con layout existente
- [ ] Diseño responsivo verificado
- [ ] Landing Page funcional en `localhost:3000`
- [ ] Tokens registrados en Dashboard

---

## 📚 Recursos

| Recurso | Link |
|---------|------|
| Excalidraw | `excalidraw.com` |
| Shadcn/UI | `ui.shadcn.com` |
| Tailwind CSS | `tailwindcss.com/docs` |
| Claude Code | `docs.anthropic.com/en/docs/claude-code` |
| Lucide Icons | `lucide.dev` |

---

## 🎬 Sesión 3.2: Frontend Vivo — CRUD + Code Review

> Conectaremos la galería con **datos reales de Supabase**.
>
> Implementaremos **Server Actions** para el carrito.
>
> Code review **automatizado con Sonnet**.

**¡Nos vemos en la Sesión 3.2!** 🚀

---

*Curso AI Engineer — Módulo 3, Sesión 3.1*
