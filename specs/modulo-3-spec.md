# OpenSpec — Módulo 3: Frontend Multimodal e Interfaces Inteligentes

**Versión**: 1.0
**Curso**: AI Engineer
**Estado**: En desarrollo

---

## 1. Contexto

### 1.1 Propósito

El estudiante aprende a convertir wireframes en interfaces reales usando **Claude Vision** (multimodal). Conecta el frontend con la base de datos de Supabase creada en el Módulo 2. Implementa code review automatizado con Sonnet.

### 1.2 Stack

- Claude Vision (multimodal: imagen → código)
- Tailwind CSS 4 + Shadcn/UI
- React (Custom Hooks, Drag & Drop)
- Supabase (conexión CRUD desde frontend)
- Claude Sonnet (como revisor técnico automatizado)

### 1.3 Prerequisitos del estudiante

- Módulo 2 completado (BD en Supabase con datos)
- Proyecto TaskFlow AI con `specs/database-spec.md`
- Claude Code CLI con capacidad multimodal

---

## 2. Sesiones

### 2.1 Sesión 3.1 — De Boceto a Producto con Claude Vision

**Teoría**: 50 min | **Lab**: 4-5h | **Tokens**: ~30K-60K

**Objetivos**:
- Entender el flujo multimodal: imagen → prompt → código
- Integrar Tailwind CSS y Shadcn/UI en el proyecto existente
- Convertir wireframes (Excalidraw) en componentes React
- Implementar diseño responsivo y sistema de diseño consistente

**Contenido**:
- Claude Vision: cómo funciona la entrada multimodal
- De wireframe a componente: el prompt adecuado
- Tailwind CSS + Shadcn/UI: setup y componentes base
- Diseño responsivo: mobile-first con Tailwind
- Sistema de diseño: colores, tipografía, espaciado consistente
- Adaptación de specs visuales para que el agente respete el sistema de diseño

**Stack específico**: Claude Vision + Tailwind CSS + Shadcn/UI + TaskFlow AI (proyecto existente)

**Lab 6 — Landing Page y Galería desde Wireframe**:
- Dibujar wireframe en Excalidraw (hero, galería, features, footer)
- Subir a Claude Vision con prompt de generación
- Revisar y ajustar código generado
- Integrar con layout existente (Header + Footer del Lab 3)
- Verificar diseño responsivo
- Medir tokens en Dashboard

**Archivos a crear**: guión, slides, lab, assets/recursos, demo-code/

### 2.2 Sesión 3.2 — Frontend Vivo: CRUD y Code Review Automático

**Teoría**: 50 min | **Lab**: 3-4h | **Tokens**: ~25K-50K

**Objetivos**:
- Conectar frontend con Supabase (Server Components, Server Actions)
- Implementar CRUD: leer productos, agregar al carrito
- Manejar estados: loading, error, empty
- Implementar code review automatizado con Sonnet

**Contenido**:
- Server Components para consultas a Supabase
- Server Actions para operaciones de escritura (carrito)
- Manejo de estados: loading skeleton, error boundary, empty state
- Code Review con Sonnet: el agente revisa el código del estudiante
- Ciclo: escribir → Sonnet review → corregir → aprobar

**Stack específico**: Next.js 15 + Supabase SDK + Claude Sonnet (revisor) + Dashboard

**Lab 7 — CRUD: Galería Consume Datos Reales**:
- Server Component que consulta productos desde Supabase
- Galería funcional con datos reales del catálogo
- Server Action para agregar al carrito
- Manejo de estados (loading, error, vacío)
- Code review con Sonnet: pasar código al agente para revisión
- Registrar métricas en Dashboard

**Archivos a crear**: guión, slides, lab, assets/recursos, demo-code/

---

## 3. Métricas de tokens

| Sesión | Tokens estimados | Reales (dashboard) |
|--------|-----------------|-------------------|
| 3.1 | ~30K-60K | — |
| 3.2 | ~25K-50K | — |
| **Total** | **~55K-110K** | — |

---

## 4. Criterios de Aceptación

- [ ] Landing Page responsiva funcional generada desde wireframe (Lab 6)
- [ ] Galería de productos con datos reales de Supabase (Lab 7)
- [ ] Carrito funcional con Server Actions (Lab 7)
- [ ] Manejo de estados: loading, error, empty (Lab 7)
- [ ] Code review con Sonnet demostrado (Lab 7)
- [ ] Sistema de diseño consistente (colores corporativos del Lab 3)
- [ ] Todos los labs usan automatización de métricas

---

## 5. Archivos a crear

```
scripts/modulo-3/
├── sesion-3.1-vision.md
└── sesion-3.2-frontend-crud.md

slides/modulo-3/
├── sesion-3.1-vision.md
└── sesion-3.2-frontend-crud.md

labs/modulo-3/
├── lab-6-landing-wireframe.md
└── lab-7-frontend-crud.md

assets/modulo-3/
├── sesion-3.1/{recursos.md, demo-code/}
└── sesion-3.2/{recursos.md, demo-code/}
```
