# OpenSpec — Módulo 2: Spec-Driven Development

**Versión**: 1.0
**Curso**: AI Engineer
**Estado**: Completado

---

## 1. Contexto

### 1.1 Propósito

El estudiante pasa de "prompt hacking" a ingeniería predecible. Aprende a escribir especificaciones atómicas (OpenSpec) que la IA ejecuta sin ambigüedad. Implementa el backend completo de TaskFlow AI en Supabase usando SDD.

### 1.2 Stack

- Markdown + OpenSpec Protocol (Lab 4)
- Supabase (PostgreSQL 15+) + pgvector (Lab 5)
- Claude Code CLI + Antigravity
- Next.js 15 App Router (Server/Client Components)
- `@supabase/supabase-js` + `@supabase/ssr`

### 1.3 Prerequisitos del estudiante

- Módulo 1 completado (proyecto TaskFlow AI andamiado)
- Cuenta Supabase (free)

---

## 2. Sesiones

### 2.1 Sesión 2.1 — SDD: El Contrato que Hace Predecible a tu Agente

**Teoría**: 55 min | **Lab**: 3-4h | **Tokens**: ~15K-30K

**Objetivos**:
- Entender por qué el prompt hacking no escala (40% más tokens, 75% más rework)
- Dominar OpenSpec Protocol: metadata, contexto, datos, reglas, RLS, criterios
- Eliminar ambigüedad con tipos explícitos, ejemplos y constraints
- Validar specs con IA

**Contenido**:
- Los 3 dolores del prompt hacking: ambigüedad, inconsistencia, rework
- SDD: Spec → Plan → Código → Tests → Documentación
- OpenSpec: anatomía completa con ejemplo de `products`
- 4 técnicas para eliminar ambigüedad
- 3 formas de inyectar el spec en Claude Code

**Lab 4 — Spec Atómico para el Modelo de Datos**:
- 7 entidades: users, categories, products, cart_items, orders, order_items, reviews
- Tipos explícitos, constraints, relaciones, RLS
- Validación con Claude: "sin ambigüedades detectadas"
- Commit del spec al repo

**Archivos creados**: guión, slides, lab, assets/recursos, demo-code/, `specs/database-spec.md`

### 2.2 Sesión 2.2 — Backend Funcional y Seguro en Supabase

**Teoría**: 55 min | **Lab**: 4-5h | **Tokens**: ~40K-80K

**Objetivos**:
- Entender Server Components vs Client Components
- Configurar Supabase y conectar con Next.js
- Hacer que el agente lea el spec y genere migraciones SQL
- Implementar Row Level Security (RLS)
- Poblar BD con seed data generada por IA

**Contenido**:
- App Router: Server Components (datos) vs Client Components (interactividad)
- Supabase: proyecto, credenciales, SDK (`@supabase/ssr`)
- Flujo: spec → migraciones (7 tablas) → RLS → seed data
- Verificación desde Next.js Server Component

**Lab 5 — Ejecución del Spec en Supabase**:
- Crear proyecto Supabase, configurar .env.local
- SDK: clientes server y browser
- Agente genera migraciones → revisar → ejecutar
- Agente genera RLS → aplicar → probar
- Agente genera seed data → ejecutar → verificar en navegador

**Archivos creados**: guión, slides, lab, assets/recursos, demo-code/

---

## 3. Métricas de tokens

| Sesión | Tokens estimados | Reales (dashboard) |
|--------|-----------------|-------------------|
| 2.1 | ~15K-30K | — |
| 2.2 | ~40K-80K | — |
| **Total** | **~55K-110K** | — |

---

## 4. Criterios de Aceptación

- [x] `specs/database-spec.md` creado con protocolo OpenSpec (7 entidades)
- [x] Spec validado por IA: "sin ambigüedades"
- [x] Proyecto Supabase creado y conectado con Next.js
- [x] 7 migraciones SQL generadas desde el spec
- [x] RLS aplicado en todas las tablas
- [x] Seed data poblada y verificable desde el navegador
- [x] Todos los labs usan automatización de métricas (Helicone)

---

## 5. Archivos creados

```
scripts/modulo-2/
├── sesion-2.1-sdd.md
└── sesion-2.2-supabase.md

slides/modulo-2/
├── sesion-2.1-sdd.md
└── sesion-2.2-supabase.md

labs/modulo-2/
├── lab-4-spec-base-datos.md
└── lab-5-migraciones-sql.md

assets/modulo-2/
├── sesion-2.1/{recursos.md, demo-code/}
└── sesion-2.2/{recursos.md, demo-code/}

specs/
└── database-spec.md
```
