# 🎙️ GUION DE GRABACIÓN — Módulo 3, Sesión 3.1
## **De Boceto a Producto con Claude Vision**
**Duración target**: 40 min teoría + 10 min demo + 5 min intro/outro = **50 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 3 min | Talking head | De datos a interfaz visual |
| 1. ¿Qué es Claude Vision? | 6 min | Slides | Cómo funciona la entrada multimodal |
| 2. Tailwind + Shadcn/UI | 8 min | Screen recording | Setup e integración en el proyecto |
| 3. De wireframe a código | 10 min | Slides + demo | El prompt adecuado para Claude Vision |
| 4. Sistema de diseño consistente | 6 min | Slides | Colores, tipografía, espaciado |
| 5. Demo en vivo | 10 min | Screen recording | Wireframe → Landing Page funcional |
| 6. Preview del Lab 6 | 3 min | Talking head | Landing y galería desde wireframe |
| 7. Cierre y tarea | 2 min | Talking head | Call to action |

**Total teoría**: ~40 min | **Total con demos**: ~50 min

---

## 🎬 BLOQUE 0: INTRO GANCHO — DE DATOS A INTERFAZ VISUAL (3 min)

**[CÁMARA: Primer plano]**

> "Bienvenido al **Módulo 3 del curso AI Engineer**.
>
> En el Módulo 1 construiste las herramientas: el dashboard de tokens, tu primer agente, y la orquestación multi-agente.
>
> En el Módulo 2 construiste la base de datos: un spec atómico, migraciones SQL, RLS, y datos reales en Supabase.
>
> Hoy —en el Módulo 3— vas a construir **lo que el usuario ve**. El frontend.
>
> Pero no vamos a escribir CSS a mano. Ni vamos a diseñar en Figma y luego traducir a código.
>
> Vamos a **dibujar un wireframe, tomarle una foto, y que Claude Vision lo convierta en código React**.
>
> Sí, leíste bien. Una foto. Código. En segundos.
>
> Y no solo eso: vamos a integrar Tailwind CSS, Shadcn/UI, y a conectar todo con la base de datos que ya tienes.
>
> ¿Listo para ver cómo un dibujo se convierte en producto? Vamos."

---

## 👁️ BLOQUE 1: ¿QUÉ ES CLAUDE VISION? (6 min)

**[SLIDE 1: "Claude Vision: el agente ve"]**

> "Hasta ahora, Claude solo había **leído** texto. Código, prompts, specs. Pero desde 2025, Claude también **ve**."
>
> "Claude Vision es la capacidad multimodal de Claude: puede analizar imágenes y generar código a partir de ellas."

**[SLIDE 2: ¿Qué puede hacer con imágenes?]**

> "Con Claude Vision puedes:
> - **Subir un wireframe** → obtener código React
> - **Subir un diseño de Figma** → obtener CSS exacto
> - **Subir una captura de pantalla** → obtener el componente equivalente
> - **Subir un diagrama** → obtener la estructura de datos
>
> Todo desde el mismo Claude Code CLI que ya usas."

**[SLIDE 3: ¿Cómo funciona?]**

> "Técnicamente, Claude Vision convierte la imagen en **tokens visuales**. El modelo procesa la imagen junto con tu prompt de texto y genera código."
>
> ```
> Tú: [imagen wireframe] + "Convierte esto en un componente React con Tailwind"
> Claude: → Analiza la imagen → Reconoce secciones → Genera código
> ```
>
> "No necesitas hacer nada especial. En Claude Code, solo adjuntas la imagen al prompt."

**[SLIDE 4: Demo rápida — Claude Vision en acción]**

> "Vamos a verlo funcionando:"
>
> **[SCREEN RECORDING: Terminal, Claude Code con imagen]**
>
> ```bash
> claude -p "Convierte esta imagen en un componente Hero para Next.js con Tailwind"
> ```
>
> **[Muestra: Claude Code recibe la imagen y genera el componente]**
>
> "En 10 segundos, Claude generó un Hero section completo. Podría haberlo ajustado, pero **la estructura, los estilos y la maquetación son exactamente lo que dibujé**."

---

## 🎨 BLOQUE 2: TAILWIND + SHADCN/UI (8 min)

**[SLIDE 5: "¿Qué necesitamos instalar?"]**

> "Antes de empezar a generar componentes, asegurémonos de que el proyecto tiene las herramientas correctas."
>
> "Vas a necesitar:
> - **Tailwind CSS 4** — ya lo configuramos en el Lab 3 con colores corporativos
> - **Shadcn/UI** — biblioteca de componentes accesibles y personalizables
> - **Lucide React** — iconos"

**[SCREEN RECORDING: Instalación]**

> **Paso 1 — Ir al proyecto:**
>
> ```bash
> cd labs/modulo-1/lab-3-agent-manager/taskflow-ai
> ```

> **Paso 2 — Inicializar Shadcn/UI:**
>
> ```bash
> npx shadcn@latest init
> ```
>
> **[Muestra: el CLI de Shadcn preguntando configuración]**
>
> ```
> Style: Default
> Base color: Slate
> CSS variables: Yes
> ```
>
> "Shadcn/UI no es una dependencia que se instala. Es una colección de componentes que **se copian a tu proyecto**. Tú eliges cuáles usar."

> **Paso 3 — Agregar componentes que usaremos:**
>
> ```bash
> npx shadcn@latest add button card input navigation-menu
> ```
>
> **[Muestra: componentes siendo instalados en components/ui/]**
>
> "Cada componente se instala individualmente. Así evitas tener código muerto."

**[SLIDE 6: Colores corporativos en Tailwind]**

> "Recordemos los colores que definimos en el Lab 3. Abre `tailwind.config.ts`:"
>
> ```typescript
> // tailwind.config.ts
> export default {
>   theme: {
>     extend: {
>       colors: {
>         primary: '#1e3a5f',    // Azul marino
>         accent: '#0ea5e9',     // Cyan
>         background: '#ffffff',
>         foreground: '#1a1a2e',
>       }
>     }
>   },
>   plugins: []
> }
> ```
>
> "Estos colores son los que Claude Vision debe respetar al generar código. **Por eso es importante tener el spec visual definido antes de generar**."

**[SLIDE 7: Shadcn/UI — Componentes disponibles]**

> "¿Qué componentes de Shadcn/UI vamos a usar?"
>
> | Componente | Uso |
> |------------|-----|
> | `Button` | CTAs, acciones |
> | `Card` | Productos, servicios, features |
> | `Input` | Formulario de contacto |
> | `NavigationMenu` | Menú de navegación (opcional) |
>
> "La ventaja de Shadcn/UI: son **accesibles por defecto**, **responsive por defecto**, y **personalizables con Tailwind**."

---

## 🖼️ BLOQUE 3: DE WIREFRAME A CÓDIGO (10 min)

**[SLIDE 8: "El prompt adecuado para Claude Vision"]**

> "No es lo mismo subir una imagen y decir 'hazme esto' que darle un prompt estructurado."
>
> "El secreto está en **el prompt de contexto**. Así como en el Módulo 2 aprendiste a escribir specs para datos, ahora vas a escribir **specs visuales** para Claude Vision."

**[SLIDE 9: Anatomía de un prompt visual]**

> "Un buen prompt visual tiene 4 partes:"
>
> ```
> 1. CONTEXTO: "Este es un wireframe para la Landing Page de TaskFlow AI"
> 2. FORMATO: "Genera un componente React con TypeScript y Tailwind"
> 3. SISTEMA DE DISEÑO: "Usa primary: #1e3a5f, accent: #0ea5e9"
> 4. REQUISITOS: "Responsive, mobile-first, SEO básico"
> ```

**[SLIDE 10: Ejemplo de prompt completo]**

> "Así se ve un prompt completo para Claude Vision:"
>
> ```
> "Tengo un wireframe de la Landing Page de TaskFlow AI,
> una plataforma de servicios técnicos.
>
> Convierte este wireframe en un componente Next.js
> con TypeScript y Tailwind CSS.
>
> Sistema de diseño:
> - Primary: #1e3a5f (azul marino)
> - Accent: #0ea5e9 (cyan)
> - Font: Inter (Google Fonts)
>
> Requisitos:
> - Hero section con título grande, subtítulo y CTA
> - Sección de features con 3 columnas (responsive)
> - Footer con links
> - Mobile-first, diseño responsivo
> - Imágenes con placeholder de next/image
> ```

**[SLIDE 11: Lo que NO debes hacer]**

> "Errores comunes al usar Claude Vision:"
>
> | Error | Por qué | Solución |
> |-------|---------|----------|
> | Subir imagen sin contexto | Claude adivina el propósito | Siempre explica qué es |
> | No especificar formato | Claude puede generar HTML, Vue, Angular | Di explícitamente "React + TypeScript + Tailwind" |
> | Ignorar el sistema de diseño | Claude usa colores genéricos | Pasa los colores exactos |
> | Esperar perfección al primer intento | La imagen tiene limitaciones | Revisa y ajusta con prompts adicionales |

**[SLIDE 12: Revisión y ajuste del código generado]**

> "El código que genera Claude Vision es **un 80%**. Tú pones el 20% restante."
>
> "¿Qué revisar?"
>
> ```
> ✅ Estructura correcta (¿los divs están bien anidados?)
> ✅ Colores correctos (¿usó los del sistema de diseño?)
> ✅ Responsive (¿se ve bien en mobile?)
> ✅ Accesibilidad (¿hay alt text, aria-label?)
> ✅ Rendimiento (¿las imágenes tienen lazy loading?)
> ```

---

## 📐 BLOQUE 4: SISTEMA DE DISEÑO CONSISTENTE (6 min)

**[SLIDE 13: "¿Por qué un sistema de diseño?"]**

> "Cuando generas componentes en diferentes sesiones, cada vez Claude puede usar estilos distintos. **Un sistema de diseño evita eso**."
>
> "El sistema de diseño de TaskFlow AI es simple pero efectivo:"

**[SLIDE 14: Tokens de diseño]**

> | Token | Valor | Uso |
> |-------|-------|-----|
> | `primary` | `#1e3a5f` | Headers, títulos, botones principales |
> | `accent` | `#0ea5e9` | CTAs, links, hover states |
> | `background` | `#ffffff` | Fondos |
> | `surface` | `#f8fafc` | Cards, secciones alternas |
> | `text-primary` | `#1a1a2e` | Texto principal |
> | `text-secondary` | `#64748b` | Texto secundario |
> | `border` | `#e2e8f0` | Bordes y separadores |
> | `radius` | `0.5rem` | Border radius general |

**[SLIDE 15: Cómo documentar el sistema de diseño para el agente]**

> "Crea un archivo `specs/design-spec.md` con los tokens:"
>
> ```markdown
> # OpenSpec — Sistema de Diseño TaskFlow AI
>
> ## Colores
> - primary: #1e3a5f (azul marino)
> - accent: #0ea5e9 (cyan)
> - background: #ffffff
>
> ## Tipografía
> - Font: Inter (Google Fonts)
> - Headings: font-bold, tracking-tight
> - Body: text-base, leading-relaxed
>
> ## Espaciado
> - Section padding: py-16 md:py-24
> - Card padding: p-6
> - Gap grid: gap-6 md:gap-8
> ```
>
> "Este spec visual se lo pasas a Claude Vision junto con el wireframe. **Así todos los componentes son consistentes**."

---

## 🖥️ BLOQUE 5: DEMO EN VIVO — WIREFRAME → LANDING PAGE (10 min)

**[SCREEN RECORDING: Pantalla completa]**

> "Vamos a crear la Landing Page de TaskFlow AI desde un wireframe de Excalidraw."

**[Paso 1: Dibujar el wireframe en Excalidraw]**

> **[Muestra: excalidraw.com, dibuja la landing]**
>
> "Abro excalidraw.com y dibujo la estructura:
> - Hero: título grande + subtítulo + 2 botones CTA
> - Features: 3 columnas con icono + título + descripción
> - Banner promocional: texto + CTA
> - Footer: 3 columnas con links"

**[Paso 2: Guardar la imagen y preparar el prompt]**

> **[Muestra: exporta como PNG]**
>
> "Exporto como PNG y preparo el prompt con el sistema de diseño:"

**[Paso 3: Subir a Claude Vision]**

> **[Muestra: terminal con Claude Code]**
>
> ```bash
> claude -p "Convierte este wireframe en la Landing Page de TaskFlow AI.
> Usa Tailwind CSS con colores primary: #1e3a5f, accent: #0ea5e9.
> Crea el archivo app/page.tsx. Responsive mobile-first."
> ```
>
> **[Muestra: Claude Vision procesa la imagen y genera el código]**

**[Paso 4: Revisar el código generado]**

> **[Muestra: el código generado por Claude]**
>
> "Fíjate: Claude interpretó el wireframe correctamente:
> - Hero con título y CTA ✅
> - 3 features en grid ✅
> - Banner promocional ✅
> - Footer con 3 columnas ✅
>
> Pero veo que usó `bg-blue-500` en vez de nuestro `bg-[#0ea5e9]`. Voy a pedirle que lo corrija."

**[Paso 5: Ajustar con un prompt adicional]**

> ```bash
> claude -p "Cambia bg-blue-500 por bg-[#0ea5e9] en los botones CTA.
> Cambia text-blue-600 por text-[#0ea5e9] en los links."
> ```
>
> **[Muestra: Claude corrige los colores]**

**[Paso 6: Verificar en el navegador]**

> **[Muestra: npm run dev y abre localhost:3000]**
>
> "La landing se ve exactamente como el wireframe. **De dibujo a producto en 5 minutos.** "

**[SLIDE 16: Resultado de la demo]**

> | Paso | Tiempo | Quién |
> |------|--------|-------|
> | Dibujar wireframe | 3 min | Tú (Excalidraw) |
> | Subir a Claude Vision | 10 seg | Tú |
> | Generar código | 30 seg | Claude Vision |
> | Revisar y ajustar | 2 min | Tú |
> | Verificar en navegador | 1 min | Tú |
> | **Total** | **~7 min** | |

---

## 🚀 BLOQUE 6: PREVIEW DEL LAB 6 (3 min)

**[CÁMARA: Talking head]**

> "**Lab 6: Landing Page y Galería desde Wireframe**.
>
> En este lab vas a:
>
> 1. Dibujar un wireframe de la Landing Page en Excalidraw (hero, features, galería, footer)
> 2. Configurar Shadcn/UI en tu proyecto TaskFlow AI
> 3. Subir el wireframe a Claude Vision con un prompt completo
> 4. Revisar y ajustar el código generado
> 5. Integrar con el layout existente (Header + Footer del Lab 3)
> 6. Verificar diseño responsivo
> 7. Medir tokens en el Dashboard
>
> **Stack**: Claude Vision + Tailwind CSS + Shadcn/UI + Dashboard
> **Duración**: 4-5 horas (~30K-60K tokens)
> **Requisito**: Módulo 2 completado (proyecto con BD en Supabase)"

---

## 🎯 BLOQUE 7: CIERRE Y TAREA (2 min)

**[SLIDE 17: Resumen]**

> "Resumen de hoy:
> 1. **Claude Vision** convierte imágenes en código — no necesitas diseñar en código
> 2. **El prompt visual** tiene 4 partes: contexto, formato, diseño, requisitos
> 3. **Shadcn/UI** te da componentes accesibles y personalizables
> 4. **Sistema de diseño** = consistencia entre componentes
> 5. **Revisa siempre** el código generado — Claude Vision da el 80%, tú pones el 20%"

**[SLIDE 18: Tarea antes de la Sesión 3.2]**

> **Tu tarea**:
> 1. Configurar Shadcn/UI en el proyecto
> 2. Dibujar wireframe de la Landing + galería en Excalidraw
> 3. Subir a Claude Vision y generar el código
> 4. Integrar con el layout existente
> 5. Asegurar diseño responsivo
> 6. Commit y push a GitHub
>
> En la **Sesión 3.2** vamos a: **conectar el frontend con la base de datos**. La galería que creaste hoy va a mostrar productos REALES de Supabase. Y vamos a implementar code review automatizado con Sonnet.
>
> **Nos vemos en la Sesión 3.2. ¡A dibujar se ha dicho!** "

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: Misma configuración que módulos anteriores
- **Pantalla**: Excalidraw para el wireframe, terminal para Claude Vision, navegador para el resultado
- **Zoom**: En el prompt completo y en el código generado

### Post-producción
- **Overlay**: Mostrar el wireframe original vs el resultado final en pantalla dividida
- **Split screen**: Excalidraw a la izquierda, código generado a la derecha
- **Subtítulos**: Español
- **Highlight**: Marcar las diferencias entre el wireframe y el resultado final

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-3/sesion-3.1-vision.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-3/sesion-3.1-vision.md` |
| Lab | Markdown | `labs/modulo-3/lab-6-landing-wireframe.md` |
| Recursos | Markdown | `assets/modulo-3/sesion-3.1/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS

1. **Excalidraw**: https://excalidraw.com
2. **Shadcn/UI**: https://ui.shadcn.com
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **Claude Code CLI**: https://docs.anthropic.com/en/docs/claude-code/overview
5. **Lucide Icons**: https://lucide.dev
6. **Repo del curso**: https://github.com/tu-usuario/curso-ai-engineer

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 50 min.*
