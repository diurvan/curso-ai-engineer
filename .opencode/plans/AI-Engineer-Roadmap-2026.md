# 🚀 Plan de Estudio: AI Engineer — De Semi-Senior a Experto en IA

> **Duración**: 10 semanas | **Modalidad**: Autoaprendizaje + Labs prácticos  
> **Público**: Programadores semi-senior que quieren dominar el desarrollo con IA  
> **Idioma**: Español (LATAM)  
> **Producto final**: TaskFlow AI — Plataforma web inteligente con chatbot RAG, agentes y CI/CD  
> **Fecha**: Julio 2026

---

## 📋 Índice

1. [Introducción y Metodología](#1-introducción-y-metodología)
2. [Herramientas del Curso (Stack Gratuito)](#2-herramientas-del-curso-stack-gratuito)
3. [Mapa del Curso por Semanas](#3-mapa-del-curso-por-semanas)
4. [Módulo 1 — Token Economy + Fundamentos Agentic](#4-módulo-1--token-economy--fundamentos-agentic)
5. [Módulo 2 — Spec-Driven Development](#5-módulo-2--spec-driven-development)
6. [Módulo 3 — Frontend Multimodal e Interfaces Inteligentes](#6-módulo-3--frontend-multimodal-e-interfaces-inteligentes)
7. [Módulo 4 — RAG y Bases Vectoriales](#7-módulo-4--rag-y-bases-vectoriales)
8. [Módulo 5 — Extensibilidad Agentic: MCP, Custom Skills y Gobernanza](#8-módulo-5--extensibilidad-agentic-mcp-custom-skills-y-gobernanza)
9. [Módulo 6 — Testing, CI/CD y Despliegue a Producción](#9-módulo-6--testing-cicd-y-despliegue-a-producción)
10. [Módulo 7 — Pipeline Completo + Proyecto Final](#10-módulo-7--pipeline-completo--proyecto-final)
11. [Sistema de Evaluación y Certificación](#11-sistema-de-evaluación-y-certificación)
12. [Guía de Exportación a Plataforma Web](#12-guía-de-exportación-a-plataforma-web)
13. [Glosario](#13-glosario)

---

## 1. Introducción y Metodología

### 1.1 ¿Qué lograrás al finalizar este curso?

Construir por ti mismo **una plataforma web completa e inteligente** (TaskFlow AI) usando agentes de IA como tu equipo de desarrollo. Desde la especificación hasta el despliegue en producción, pasando por frontend, backend, bases de datos vectoriales, tests automatizados y un pipeline CI/CD.

### 1.2 Metodología: Los 3 Pilares

Este curso se basa en 3 pilares que se refuerzan mutuamente:

```
┌─────────────────────────────────────┐
│           AI ENGINEER                │
├──────────────────┬──────────────────┤
│   ╔══════════╗   │   ╔══════════╗   │
│   ║  TOKEN   ║   │   ║   SPEC   ║   │
│   ║ ECONOMY  ║   │   ║   DRIVEN ║   │
│   ╚══════════╝   │   ╚══════════╝   │
│   Mide y optimiza│   Define antes   │
│   cada llamado   │   de construir   │
├──────────────────┴──────────────────┤
│   ╔══════════════════════════════╗   │
│   ║      AGENTIC BUILDER        ║   │
│   ╚══════════════════════════════╝   │
│   Construye con agentes, no solo     │
│   con código                          │
└─────────────────────────────────────┘
```

1. **Token Economy** — Mides cada llamado a la IA, optimizas costos y tomas decisiones informadas sobre qué modelo usar y cuándo.
2. **Spec-Driven Development (SDD)** — Defines specs atómicas como contratos antes de escribir código. La IA ejecuta, no improvisa.
3. **Agentic Builder** — Orquestas múltiples agentes (código, revisión, tests, deploys) como si fueran un equipo de desarrollo.

### 1.3 Estructura de cada módulo

Cada módulo contiene:
- **Objetivos de aprendizaje**
- **2-4 sesiones** con teoría + demostración
- **Labs prácticos** (1 por sesión)
- **Recursos externos** (videos, artículos, documentación)
- **Métrica de tokens** — cuánto deberías consumir aproximadamente

### 1.4 Ritmo sugerido

| Semana | Módulo | Sesiones | Labs |
|--------|--------|----------|------|
| 1-2 | M1: Token Economy + Fundamentos Agentic | 3 | 3 |
| 2-3 | M2: Spec-Driven Development | 2 | 2 |
| 3-4 | M3: Frontend Multimodal | 2 | 2 |
| 4-5 | M4: RAG y Bases Vectoriales | 2 | 2 |
| 5-6 | M5: MCP, Skills y Gobernanza | 2 | 2 |
| 6-8 | M6: Testing, CI/CD y Producción | 4 | 4 |
| 8-10 | M7: Pipeline Completo + Proyecto Final | 2 | 2 |
| **Total** | **7 módulos** | **17 sesiones** | **17 labs** |

---

## 2. Herramientas del Curso (Stack Gratuito)

### 2.1 Stack tecnológico principal

| Herramienta | Uso | Alternativa gratuita |
|-------------|-----|---------------------|
| **Claude Code CLI** (Anthropic) | Agente principal de desarrollo | — (free tier disponible) |
| **OpenAI API** | Embeddings, chat alternativo | OpenRouter (multi-modelo) |
| **Next.js 15** | Framework web | — |
| **Supabase** | Base de datos PostgreSQL + auth | NeonDB (PostgreSQL serverless) |
| **Vercel** | Hosting + CI/CD | Cloudflare Pages, Netlify |
| **GitHub** | Repositorio + Actions | GitLab |
| **Tailwind CSS** | Estilos | — |
| **Shadcn/UI** | Componentes UI | — |
| **pgvector** | Extension vectorial | — |
| **Playwright** | Tests E2E | — |
| **Vitest** | Tests unitarios | — |
| **Helicone** | Monitoreo de tokens (free tier) | LangSmith, OpenRouter analytics |
| **Ollama** | Modelos open-source locales | — |
| **LangChain** | Orquestación RAG + agentes | — |
| **@curso-ai/metrics** | Paquete workspace para reporte automático al Dashboard | — |

### 2.2 Free Tiers que necesitarás crear

1. **Cuenta de GitHub** (gratis) → GitHub Actions 2000 min/mes
2. **Cuenta de Vercel** (Hobby, gratis) → 100 GB ancho de banda
3. **Cuenta de Supabase** (Free) → 500 MB BD, 2 GB ancho de banda
4. **API Key de Anthropic** → Crédito inicial único (~$5-10 USD)
5. **API Key de OpenAI** → Crédito inicial (~$5 USD, o usar OpenRouter)
6. **Cuenta de Helicone** (Free) → 100k requests/mes
7. **Ollama** (local, 100% gratis) → Corre modelos open-source

### 2.3 Estimación de costos totales del curso

Usando solo free tiers + créditos iniciales:

| Concepto | Costo estimado |
|----------|---------------|
| API Anthropic (Claude) | ~$5-10 USD (crédito inicial) |
| API OpenAI (embeddings) | ~$2-5 USD (crédito inicial) |
| Supabase Free Tier | $0 |
| Vercel Free Tier | $0 |
| GitHub Free | $0 |
| Helicone Free Tier | $0 |
| **Total estimado** | **~$7-15 USD por estudiante** |

> 💡 **Alternativa 100% gratuita**: Usar Ollama + modelos open-source (Llama 3, Mistral) para la mayoría de laboratorios, y solo usar APIs cloud para el módulo de RAG y chatbot.

---

## 3. Mapa del Curso por Semanas

```
Semana 1
├── M1-S1: Token Economy → Lab 1: Dashboard de Tokens (Web + API)
└── M1-S2: Tu Primer Agente → Lab 2: Test A/B con métricas

Semana 2
├── M1-S3: Multi-Agente → Lab 3: Agent Manager + estructura Next.js
└── M2-S1: SDD → Lab 4: Spec atómico para BD

Semana 3
├── M2-S2: Backend Supabase → Lab 5: Migraciones SQL + RLS
└── M3-S1: Frontend Multimodal → Lab 6: Landing desde wireframe

Semana 4
├── M3-S2: CRUD + Code Review → Lab 7: Frontend conectado a BD
└── M4-S1: RAG → Lab 8: Embeddings automáticos

Semana 5
├── M4-S2: Chatbot RAG → Lab 9: Asistente de ventas
└── M5-S1: MCP → Lab 10: Servidor MCP de assets

Semana 6
├── M5-S2: Custom Skills → Lab 11: Skill Tech Lead
└── M6-S1: Testing Unitario → Lab 12: Suite Vitest

Semana 7
├── M6-S2: E2E Playwright → Lab 13: Prueba E2E completa
└── M6-S3: Core Web Vitals → Lab 14: Auditoría + dash

Semana 8
├── M6-S4: CI/CD → Lab 15: Pipeline GitHub Actions
└── M7-S1: War Room → Lab 16: Bug + feature rápida

Semana 9-10
├── M7-S2: Showcase → Proyecto Final
└── 🏆 Certificación
```

---

## 4. Módulo 1 — Token Economy + Fundamentos Agentic

**Duración**: Semanas 1-2 | **Sesiones**: 3 | **Labs**: 3

**Objetivo del módulo**: Aprender a medir, monitorear y optimizar el consumo de tokens como habilidad fundamental del AI Engineer. Construir el Dashboard que usaremos durante todo el curso. Luego crear tu primer agente productivo con conciencia de costos.

---

### Sesión 1.1 — Token Economy: Mide antes de Construir

**Teoría (40 min)**

- **¿Por qué el token es la moneda del desarrollo en 2026?**
  - Evolución de los costos de cómputo: CPU → GPU → Token
  - Contexto de modelos en 2026: precios por token, ventanas de contexto ampliadas
- **Anatomía de un token**
  - Qué es un token (tokenización por subpalabras BPE)
  - Input tokens vs output tokens vs tokens de caché
  - Ventana de contexto: cómo se llena y por qué importa
- **Comparativa de modelos y costos actuales**

| Modelo | Input (por 1M tokens) | Output (por 1M tokens) | Contexto |
|--------|----------------------|-----------------------|----------|
| Claude Sonnet 4 | $3.00 | $15.00 | 200K |
| Claude Haiku 3.5 | $0.80 | $4.00 | 200K |
| GPT-4o | $2.50 | $10.00 | 128K |
| GPT-4o Mini | $0.15 | $0.60 | 128K |
| Llama 3 70B (local) | $0 (tu GPU) | $0 (tu GPU) | 128K |

- **Métricas clave para monitorear**
  - Tokens por request (promedio, P50, P95)
  - Costo por tarea completada
  - Eficiencia de prompt (tokens útiles / tokens totales)
  - Ratio de caché (prompt caching)
  - Costo por deployment / por proyecto / por usuario
- **Herramientas de monitoreo gratuitas**
  - Helicone: proxy que intercepta y mide (100k req/mes gratis)
  - LangSmith: tracing con dashboard de costos (free tier)
  - OpenRouter: analytics multi-modelo incluidos
  - Construcción propia: es nuestro Lab 1

**Recursos externos**
- 📺 [Anthropic - Token counter (oficial)](https://www.anthropic.com/token-counter)
- 📺 [OpenAI Tokenizer (oficial)](https://platform.openai.com/tokenizer)
- 📺 [Video: "Understanding LLM Token Pricing" (buscar en YouTube)]
- 📝 [Documentación: OpenAI Pricing](https://openai.com/api/pricing/)
- 📝 [Documentación: Anthropic Pricing](https://www.anthropic.com/pricing)

---

#### 🧪 Lab 1 — Dashboard de Monitoreo de Tokens (Web + API)

**Stack**: Next.js 15 + Supabase + Tailwind CSS + Recharts (gráficos)

**Objetivo**: Construir una aplicación web funcional que:
1. Reciba logs de consumo de tokens (API REST)
2. Almacene cada llamada: modelo, tokens input/output, costo, proyecto, timestamp
3. Muestre un dashboard con gráficos de consumo por día/proyecto/modelo
4. Calcule costos estimados automáticamente
5. Envíe alertas cuando se supere un umbral configurable
6. Exponga una API REST para que futuros proyectos envíen métricas

**Arquitectura del Dashboard**

```
┌─────────────────────────────────────────────┐
│             Dashboard Web (Next.js)          │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐ │
│  │Gráfico   │ │Tabla de  │ │Selector de   │ │
│  │diario    │ │logs      │ │proyecto/modelo│ │
│  └─────────┘ └──────────┘ └──────────────┘ │
│  ┌──────────────────────────────────────┐   │
│  │Alertas y umbrales configurables      │   │
│  └──────────────────────────────────────┘   │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│          API REST (Next.js API Routes)       │
│  POST /api/logs     — recibir métricas       │
│  GET  /api/logs     — consultar métricas     │
│  GET  /api/stats    — agregaciones           │
│  POST /api/alerts   — configurar alertas     │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│          Supabase (PostgreSQL)               │
│  tabla: token_logs                           │
│  - id, project, model, input_tokens,         │
│    output_tokens, cached_tokens, cost,       │
│    endpoint, timestamp                       │
│  tabla: alerts                               │
│  - id, project, threshold, enabled, webhook  │
└─────────────────────────────────────────────┘
```

**Pasos del Lab**

1. Inicializar proyecto Next.js 15 con App Router y Tailwind
2. Configurar Supabase: schema de tablas `token_logs` y `alerts`
3. Crear API Route `POST /api/logs` que recibe y almacena métricas
4. Crear API Route `GET /api/stats` que devuelve agregaciones por período
5. Construir dashboard: gráfico de líneas (consumo diario), tabla de logs, filtros
6. Implementar sistema de alertas: umbral por proyecto + notificación
7. Crear un script de ejemplo que envíe métricas simuladas para pruebas
8. Desplegar en Vercel
9. Escribir documentación de la API para que otros proyectos la consuman

**Métrica de tokens**: ~10K tokens (usando Claude para asistencia en el código)
**Duración estimada**: 4-6 horas
**Criterio de éxito**: Dashboard desplegado en Vercel, recibiendo datos reales desde un script de prueba.

**Recursos del Lab**
- 📺 [Next.js 15 App Router Docs](https://nextjs.org/docs)
- 📺 [Supabase Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- 📺 [Recharts Docs (gráficos React)](https://recharts.org/en-US/guide)
- 📺 [Video: "Build a Dashboard with Next.js and Supabase" (YouTube)]

---

### Sesión 1.2 — Tu Primer Agente Productivo

**Teoría (45 min)**

- **Arquitectura de un agente de código**
  - System prompt → Herramientas disponibles → Contexto → Output
  - Ciclo de razonamiento: Plan → Execute → Observe → Adapt
- **Instalación y configuración de Claude Code CLI**
  - Autenticación, proyectos, modos de operación
- **Cuándo usar cada modelo**
  - Haiku: tareas rápidas, formateo, refactors simples
  - Sonnet: desarrollo general, generación de features
  - Opus: razonamiento complejo, debugging profundo
  - ⚡ **Decisión basada en costo**: usar el dashboard del Lab 1 para decidir
- **Control de costos desde el inicio**
  - Limitar turns por tarea
  - Usar prompt caching
  - Batch de operaciones similares

**Archivos creados**
- 📜 Guión: `scripts/modulo-1/sesion-1.2-primer-agente.md`
- 📽️ Slides: `slides/modulo-1/sesion-1.2-primer-agente.md`
- 📚 Recursos: `assets/modulo-1/sesion-1.2/recursos.md`

**Recursos externos**
- 📺 [Video: "Claude Code: Getting Started" (oficial Anthropic)]
- 📝 [Documentación Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/overview)

---

#### 🧪 Lab 2 — Test A/B Haiku vs Sonnet con Dashboard

**Stack**: `@curso-ai/metrics` + Anthropic SDK + Dashboard del Lab 1

**Objetivo**: Ejecutar un experimento controlado donde el agente genera meta-descripciones SEO para 10 páginas, primero con Haiku y luego con Sonnet. **Todas las métricas se envían automáticamente al dashboard via `trackAnthropic()`** — el estudiante nunca anota tokens manualmente.
- Tokens consumidos (input + output)
- Costo por lote
- Calidad del output (evaluación subjetiva 1-5)
- Tiempo de ejecución

**Pasos del Lab**

1. Instalar `@anthropic-ai/sdk` y `@curso-ai/metrics` (workspace local)
2. Preparar un prompt de generación de meta-descripciones para 10 páginas
3. Escribir script con `trackAnthropic()` para Haiku y Sonnet
4. Ejecutar — `trackAnthropic()` extrae `usage` del response, calcula costo y envía al dashboard
5. Evaluar calidad de ambos outputs
6. Comparar en el Dashboard y escribir conclusión

> ⚡ **Regla del curso**: Ningún lab pide al estudiante medir manualmente. `@curso-ai/metrics` (`trackAnthropic`, `trackOpenAI`, `syncHelicone`, `report`) automatiza el reporte en todos los labs 2-17.

**Métrica de tokens**: ~50K-100K tokens
**Duración estimada**: 2-3 horas
**Criterio de éxito**: Dashboard mostrando la comparativa lado a lado.
**Archivo**: `labs/modulo-1/lab-2-ab-testing.md`

---

### Sesión 1.3 — Orquesta Múltiples Agentes

**Teoría (45 min)**

- **El IDE como orquestador**
  - Antigravity / Continue.dev / Aider / Cline
- **Gestión de Artifacts**
  - Task Lists (plan de trabajo)
  - Implementation Plans (especificación técnica)
- **Orquestación de agentes**: un agente planifica, otro escribe, otro revisa
- **Estrategias anti-alucinaciones**
  - Isolamiento por archivo
  - Validación con tests
  - Aprobación humana de Diffs

**Recursos externos**
- 📺 [Aider AI Pair Programming](https://aider.chat/docs/usage.html)
- 📺 [Continue.dev Docs](https://docs.continue.dev/)
- 📺 [Video: "Multi-Agent Coding" en YouTube]

---

#### 🧪 Lab 3 — Andamiaje Principal de TaskFlow AI con Agent Manager

**Stack**: Continue.dev (o Aider) + Next.js 15 + Dashboard

**Objetivo**: Usar el Agent Manager para planificar y estructurar el andamiaje principal:
- Header, Footer, Navegación
- Layout principal (App Router)
- Estructura de rutas: `/`, `/productos`, `/servicios`, `/contacto`
- Páginas placeholder con contenido mock

**Pasos del Lab**

1. Crear el proyecto Next.js 15
2. Definir en el Agent Manager la Task List completa
3. Ejecutar agente para crear estructura de carpetas y layouts
4. Revisar y aprobar Diffs generados
5. Medir tokens consumidos en el Dashboard
6. Push a GitHub

**Métrica de tokens**: ~30K-60K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Proyecto Next.js corriendo localmente con navegación funcional.

---

## 5. Módulo 2 — Spec-Driven Development

**Duración**: Semanas 2-3 | **Sesiones**: 2 | **Labs**: 2

**Objetivo**: Dominar la escritura de especificaciones atómicas que la IA ejecute sin ambigüedad. Implementar el backend completo en Supabase usando SDD.

---

### Sesión 2.1 — SDD: El Contrato que Hace Predecible a tu Agente

**Teoría (50 min)**

- **¿Por qué el "prompt hacking" no escala?**
  - Problemas: ambigüedad, inconsistencia, rework infinito
  - Estadística: un buen Spec reduce el consumo de tokens en ~40%
- **SDD como única fuente de verdad**
  - Spec → Plan → Código → Tests → Documentación
- **OpenSpec Protocol: anatomía de un Spec**
  - Contexto y objetivos, definición de datos, contratos de API
  - Reglas de negocio, criterios de aceptación
- **Eliminar ambigüedad**: lenguaje preciso, tipos explícitos, ejemplos concretos
- **Inyección del Spec en Claude Code**

**Recursos externos**
- 📺 [Video: "Spec-Driven Development: The Missing Methodology for AI Coding"]
- 📝 [OpenSpec Protocol]

---

#### 🧪 Lab 4 — Spec Atómico para el Modelo de Datos

**Stack**: Markdown + Claude Code + Dashboard

**Objetivo**: Redactar un Spec completo y atómico para el modelo de datos de TaskFlow AI:
- `users`, `categories`, `products`, `cart_items`, `orders`, `order_items`, `reviews`

**Pasos del Lab**

1. Crear `specs/database-spec.md` con protocolo OpenSpec
2. Para cada entidad: nombre, campos, tipos, constraints, relaciones, RLS
3. Validar el Spec con Claude: preguntarle si encuentra ambigüedades
4. Refinar hasta que no haya ambigüedad
5. Medir tokens consumidos en el Dashboard

**Métrica de tokens**: ~15K-30K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Spec validado por IA como "sin ambigüedades detectadas".

---

### Sesión 2.2 — Backend Funcional y Seguro en Supabase

**Teoría (45 min)**

- **App Router: Server Components vs Client Components**
- **Supabase: setup, RLS, migraciones SQL**
- **El agente lee el Spec y genera migraciones**
- **Seed data con IA**

**Recursos externos**
- 📝 [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- 📝 [Next.js App Router](https://nextjs.org/docs/app)

---

#### 🧪 Lab 5 — Ejecución del Spec en Supabase

**Stack**: Supabase + Claude Code + Spec del Lab 4 + Dashboard

**Pasos del Lab**
1. Configurar proyecto Supabase y conectar con Next.js
2. Pasar el Spec a Claude Code
3. El agente genera migraciones SQL
4. Revisar y aprobar migraciones
5. Ejecutar en Supabase
6. Generar políticas RLS según el Spec
7. Testear RLS
8. Poblar con seed data
9. Registrar consumo en el Dashboard

**Métrica de tokens**: ~40K-80K tokens
**Duración estimada**: 4-5 horas
**Criterio de éxito**: BD funcional en Supabase con RLS verificado.

---

## 6. Módulo 3 — Frontend Multimodal e Interfaces Inteligentes

**Duración**: Semanas 3-4 | **Sesiones**: 2 | **Labs**: 2

**Objetivo**: Convertir wireframes en interfaces reales usando IA multimodal. Conectar frontend con Supabase.

---

### Sesión 3.1 — De Boceto a Producto con Claude Vision

**Teoría (45 min)**
- Flujo multimodal: imagen → código
- Tailwind CSS + Shadcn/UI
- Diseño de interfaces interactivas (Drag & Drop, modales)

**Recursos externos**
- 📝 [Shadcn/UI Docs](https://ui.shadcn.com/docs)
- 📝 [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

#### 🧪 Lab 6 — Landing Page y Galería desde Wireframe

**Stack**: Claude Vision + Tailwind CSS + Shadcn/UI + Dashboard

**Pasos del Lab**
1. Dibujar wireframe en Excalidraw
2. Subir a Claude Vision con prompt adecuado
3. Revisar y ajustar código generado
4. Integrar con layout existente
5. Medir tokens en el Dashboard

**Métrica de tokens**: ~30K-60K tokens
**Duración estimada**: 4-5 horas
**Criterio de éxito**: Landing Page responsiva funcional.

---

### Sesión 3.2 — Frontend Vivo: CRUD y Code Review Automático

**Teoría (40 min)**
- Conexión frontend ↔ Supabase (Server Components, Server Actions)
- Manejo de estados: loading, error, empty
- Code Review automatizado con Sonnet

---

#### 🧪 Lab 7 — CRUD: Galería Consume Datos Reales de Supabase

**Stack**: Next.js + Supabase + Claude Code + Dashboard

**Pasos del Lab**
1. Server Component que consulta productos desde Supabase
2. Mostrar productos en galería
3. Server Action para carrito
4. Manejar estados
5. Code review con Sonnet
6. Registrar en Dashboard

**Métrica de tokens**: ~25K-50K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Galería con datos reales, carrito funcional.

---

## 7. Módulo 4 — RAG y Bases Vectoriales

**Duración**: Semanas 4-5 | **Sesiones**: 2 | **Labs**: 2

**Objetivo**: Implementar RAG para dar memoria contextual a TaskFlow AI. Chatbot que entienda el catálogo.

---

### Sesión 4.1 — RAG, pgvector y Embeddings

**Teoría (50 min)**
- Arquitectura RAG: documentos → chunking → embeddings → vector store → retrieval → LLM
- pgvector: extensión vectorial en PostgreSQL
- Embeddings: OpenAI vs sentence-transformers (gratis local)
- Chunking strategies: fixed-size, semantic, recursive

**Recursos externos**
- 📝 [Documentación pgvector](https://github.com/pgvector/pgvector)
- 📝 [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- 📺 [Video: "RAG from Scratch" en YouTube]

---

#### 🧪 Lab 8 — Script de Embeddings Automáticos

**Stack**: Supabase + pgvector + Ollama (sentence-transformers) + Dashboard

**Pasos del Lab**
1. Habilitar pgvector en Supabase
2. Agregar columna `embedding` a `products`
3. Crear función que genere embedding al insertar producto
4. Crear trigger o Edge Function
5. Probar inserción → verificar embedding
6. Crear función `match_products(query, match_count)`
7. Medir tokens en Dashboard

**Alternativa gratuita**: sentence-transformers con Ollama local.
**Métrica de tokens**: ~10K-20K tokens
**Duración estimada**: 4-5 horas
**Criterio de éxito**: Embeddings generados automáticamente, búsqueda semántica funcional.

---

### Sesión 4.2 — Chatbot RAG Embebido

**Teoría (45 min)**
- Componente React flotante → API Route → RAG → LLM → Respuesta
- Inyección dinámica de contexto recuperado
- Filtros RLS + búsqueda semántica combinados
- UX: streaming, fuentes, prevención de alucinaciones

---

#### 🧪 Lab 9 — Asistente de Navegación/Ventas con RAG

**Stack**: Next.js + Supabase + pgvector + LLM + Dashboard

**Pasos del Lab**
1. Componente ChatBot flotante
2. API Route `POST /api/chat` con pipeline RAG completo
3. Streaming de respuesta (SSE)
4. Mostrar fuentes recuperadas
5. Probar con preguntas reales
6. Medir costo por conversación en Dashboard

**Métrica de tokens**: ~5K-15K tokens por conversación
**Duración estimada**: 5-6 horas
**Criterio de éxito**: Chatbot funcional respondiendo con datos reales del catálogo.

---

## 8. Módulo 5 — Extensibilidad Agentic: MCP, Custom Skills y Gobernanza

**Duración**: Semanas 5-6 | **Sesiones**: 2 | **Labs**: 2

**Objetivo**: Extender agentes con MCP y crear Skills de auditoría automática.

---

### Sesión 5.1 — MCP: Conecta tu Agente al Mundo Real

**Teoría (45 min)**
- ¿Qué es MCP? Protocolo para conectar LLMs con herramientas externas
- Arquitectura: Host → Cliente MCP → Servidor MCP → Recursos
- Seguridad y permisos
- Casos: File System, Terminal, APIs externas, BD

**Recursos externos**
- 📝 [MCP Docs](https://modelcontextprotocol.io/)
- 📺 [Video: "Build Your First MCP Server" en YouTube]

---

#### 🧪 Lab 10 — Servidor MCP de Assets

**Stack**: TypeScript + MCP SDK + Dashboard

**Pasos del Lab**
1. Crear servidor MCP con TypeScript
2. Herramientas: `read_assets`, `read_sitemap`, `get_image_dimensions`
3. Configurar Claude Code para usar el servidor
4. Probar: pedir al agente crear banner usando assets reales
5. Medir tokens ahorrados en Dashboard

**Métrica de tokens**: ~15K-25K tokens
**Duración estimada**: 4-5 horas
**Criterio de éxito**: Servidor MCP funcional, agente accede a assets automáticamente.

---

### Sesión 5.2 — Custom Skills: Auditoría y Gobierno

**Teoría (40 min)**
- Custom Skills: validadores, linters, generadores
- Trigger → Validación → Feedback → Corrección
- Integración con SDD

---

#### 🧪 Lab 11 — Skill "Tech Lead" de Accesibilidad y SEO

**Stack**: Claude Code Skills + TypeScript + Dashboard

**Validaciones**: a11y (alt text, aria-label, headings) + SEO técnico (title, meta description, structured data)

**Pasos del Lab**
1. Crear Skill como script Node.js
2. Implementar validadores
3. Configurar ejecución post-generación
4. Probar con código que viole reglas
5. El Skill sugiere correcciones
6. Medir tokens en Dashboard

**Métrica de tokens**: ~10K-20K tokens por validación
**Duración estimada**: 4-5 horas
**Criterio de éxito**: Skill detecta violaciones y sugiere correcciones.

---

## 9. Módulo 6 — Testing, CI/CD y Despliegue a Producción

**Duración**: Semanas 6-8 | **Sesiones**: 4 | **Labs**: 4

**Objetivo**: Testing automatizado, optimización, CI/CD completo.

---

### Sesión 6.1 — Testing Unitario Asistido por IA

**Teoría (40 min)**
- Testing desde Specs (SDD): criterios de aceptación = tests
- Vitest: configuración, mocking, coverage
- Generación de tests con IA

**Recursos externos**
- 📝 [Vitest Docs](https://vitest.dev/guide/)

---

#### 🧪 Lab 12 — Suite de Tests desde Specs

**Stack**: Vitest + Claude Code + Dashboard

**Pasos del Lab**
1. Configurar Vitest
2. Pasar Specs al agente
3. El agente genera tests
4. Ejecutar y verificar
5. Auto-corrección si fallan
6. Registrar en Dashboard

**Métrica de tokens**: ~20K-40K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Suite funcional y pasando.

---

### Sesión 6.2 — E2E con Playwright + Autocorrección

**Teoría (40 min)**
- Playwright: selectores estables, test E2E
- Flujo: test falla → agente corrige → test pasa

---

#### 🧪 Lab 13 — Prueba E2E del Flujo Completo

**Stack**: Playwright + Claude Code + Dashboard

**Pasos del Lab**
1. Configurar Playwright
2. Test: Landing → chatbot RAG → formulario de contacto
3. Ejecutar y verificar
4. Romper algo → agente corrige
5. Medir tokens en Dashboard

**Métrica de tokens**: ~15K-30K tokens
**Duración estimada**: 4-5 horas
**Criterio de éxito**: Test E2E completo con autocorrección demostrada.

---

### Sesión 6.3 — Core Web Vitals, Secrets y Costos

**Teoría (45 min)**
- Core Web Vitals: LCP, CLS, INP, optimización con IA
- Gestión de secrets: .env, proveedores
- Caché de respuestas IA, caché de embeddings
- Control de costos en producción con Dashboard

---

#### 🧪 Lab 14 — Auditoría y Optimización

**Stack**: Lighthouse CI + Dashboard + Claude Code

**Pasos del Lab**
1. Ejecutar Lighthouse CI
2. Pasar reporte al agente
3. Implementar mejoras
4. Re-ejecutar y comparar
5. Configurar alertas en Dashboard

**Métrica de tokens**: ~10K-20K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: +10 puntos en Lighthouse score.

---

### Sesión 6.4 — CI/CD: GitHub Actions + Vercel

**Teoría (40 min)**
- CI/CD: Lint → Test → Build → Deploy
- PR Review automatizado por IA
- Generación automática de documentación

---

#### 🧪 Lab 15 — Pipeline CI/CD Completo

**Stack**: GitHub Actions + Vercel + Vitest + Playwright + Dashboard

**Pasos del Lab**
1. Crear `.github/workflows/ci-cd.yml`
2. Configurar secrets (Vercel token, API keys)
3. Push y verificar pipeline
4. Romper test → falla → arreglar → deploy automático
5. Medir en Dashboard

**Métrica de tokens**: ~5K-10K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Pipeline funcional: push → tests → deploy.

---

## 10. Módulo 7 — Pipeline Completo + Proyecto Final

**Duración**: Semanas 8-10 | **Sesiones**: 2 | **Labs**: 2

**Objetivo**: War Room simulado, presentación final y certificación.

---

### Sesión 7.1 — War Room: De Spec a Producción en Minutos

**Teoría (30 min)**
- Flujo end-to-end: Spec → Plan → Skills MCP → Código → CI/CD
- Edge cases, bugs, cambios de última hora

---

#### 🧪 Lab 16 — War Room Simulado

**Stack**: Stack completo + Dashboard

**Pasos del Lab**
1. Bug visual introducido (ej. galería no carga)
2. Feature rápida (banner promocional)
3. Diagnosticar bug con agente
4. Spec del banner → agente implementa
5. Push → CI/CD → deploy
6. Medir tiempo: "de bug a producción"

**Métrica de tokens**: ~20K-40K tokens
**Duración estimada**: 3-4 horas
**Criterio de éxito**: Bug corregido + feature desplegada.

---

### Sesión 7.2 — Showcase y Certificación

**Teoría (30 min)**
- Presentación técnica a stakeholders
- Roadmap del AI Engineer: multi-agente, fine-tuning, eval-driven development

---

#### 🏆 Proyecto Final — TaskFlow AI Completo

**Checklist**:
- [ ] Dashboard de Tokens funcional (Lab 1)
- [ ] Proyecto Next.js desplegado en Vercel
- [ ] Specs en el repositorio
- [ ] BD en Supabase con RLS
- [ ] Frontend con galería de productos
- [ ] Chatbot RAG embebido funcional
- [ ] Tests unitarios (Vitest) pasando
- [ ] Tests E2E (Playwright) pasando
- [ ] Pipeline CI/CD en GitHub Actions
- [ ] Core Web Vitals optimizados (score > 80)
- [ ] Servidor MCP funcionando
- [ ] Skill de auditoría implementado

**Criterio de éxito**: Plataforma end-to-end, desplegada, testeada, lista para portafolio.

---

## 11. Sistema de Evaluación y Certificación

### 11.1 Rúbrica por Lab

Cada lab se evalúa (0-5 pts cada criterio):

| Criterio | Descripción |
|----------|-------------|
| **Funcionalidad** | El entregable funciona según lo especificado |
| **Calidad** | Buenas prácticas, código limpio |
| **Métrica de tokens** | Registrado correctamente en el Dashboard |

**Total**: 17 labs × 15 pts = 255 pts máximos

### 11.2 Requisitos de Certificación

1. Completar los 17 labs (mín. 8/15 cada uno)
2. Subir proyecto final a GitHub funcional
3. Presentar Showcase en vivo
4. Reporte final de tokens del Dashboard

### 11.3 Sistema de Certificación

- Generado automáticamente desde el Dashboard al completar requisitos
- **Formato**: PDF desde Next.js (API Route → PDF gen)
- **Almacenado** en Supabase Storage
- **Verificable** mediante enlace público

**Datos del certificado**:
- Nombre del estudiante
- Título: "AI Engineer — Certificación en Desarrollo con Agentes de IA"
- Fecha + Módulos (7) + Labs (17) + Horas (~100h)
- Token Hash Único (THU): firma basada en hash del reporte final de tokens

---

## 12. Guía de Exportación a Plataforma Web

### 12.1 Estructura de archivos del curso

```
curso-ai-engineer/
├── README.md
├── .opencode/plans/
│   └── AI-Engineer-Roadmap-2026.md        ← Plan maestro (este archivo)
├── scripts/                               ← Guiones de grabación (video tutorial)
│   ├── modulo-1/
│   │   ├── sesion-1.1-token-economy.md
│   │   ├── sesion-1.2-primer-agente.md
│   │   └── sesion-1.3-multi-agente.md
│   └── modulo-2/
│       ├── sesion-2.1-sdd.md
│       └── sesion-2.2-supabase.md
├── slides/                                ← Diapositivas (Reveal.js Markdown)
│   ├── modulo-1/
│   │   ├── sesion-1.1-token-economy.md
│   │   ├── sesion-1.2-primer-agente.md
│   │   └── sesion-1.3-multi-agente.md
│   └── modulo-2/
│       ├── sesion-2.1-sdd.md
│       └── sesion-2.2-supabase.md
├── labs/                                  ← Ejercicios prácticos para el estudiante
│   ├── modulo-1/
│   │   ├── lab-1-dashboard-tokens.md
│   │   ├── lab-2-ab-testing.md
│   │   └── lab-3-agent-manager.md
│   └── modulo-2/
│       ├── lab-4-spec-base-datos.md
│       └── lab-5-migraciones-sql.md
├── assets/                                ← Recursos complementarios
│   ├── modulo-1/
│   │   ├── sesion-1.1/
│   │   │   ├── recursos.md
│   │   │   └── demo-code/
│   │   ├── sesion-1.2/
│   │   │   ├── recursos.md
│   │   │   └── demo-code/
│   │   └── sesion-1.3/
│   │       ├── recursos.md
│   │       └── demo-code/
│   └── modulo-2/
│       ├── sesion-2.1/
│       │   ├── recursos.md
│       │   └── demo-code/
│       └── sesion-2.2/
│           ├── recursos.md
│           └── demo-code/
├── specs/                                 ← Specs OpenSpec (M2+)
│   └── database-spec.md                   ← (creado)
└── packages/                              ← Workspaces reutilizables
    └── metrics/                           ← @curso-ai/metrics
        ├── src/
        │   ├── index.ts
        │   ├── types.ts
        │   ├── reporter.ts
        │   ├── costs.ts
        │   ├── providers/
        │   │   ├── anthropic.ts           ← trackAnthropic()
        │   │   └── openai.ts              ← trackOpenAI()
        │   └── helicone.ts                ← syncHelicone()
        ├── package.json
        └── tsconfig.json
```

### 12.2 Formatos de exportación

**Markdown** → portable a:
- **GitHub Pages** (con Jekyll)
- **Docusaurus** (con plugins MDX)
- **MkDocs** (con Material theme)
- **GitBook**
- **Read the Docs**

**Exportación rápida a web**:

```bash
# Opción fácil: GitHub Pages
mkdir docs && cp *.md docs/
# Settings → Pages → Source: main/docs

# Opción profesional: Docusaurus
npx create-docusaurus@latest curso-web classic
# Copiar MD a docs/, configurar sidebar
```

---

## 13. Glosario

| Término | Definición |
|---------|------------|
| **Token** | Unidad mínima de texto que procesa un LLM (~0.75 palabras en inglés) |
| **Token Economy** | Gestión y optimización del consumo de tokens como recurso |
| **SDD** | Metodología donde las especificaciones guían a la IA |
| **OpenSpec** | Protocolo para specs atómicas y sin ambigüedad |
| **MCP** | Protocolo estándar para conectar LLMs con herramientas externas |
| **RAG** | Técnica que combina búsqueda de información + generación de texto |
| **Embedding** | Vector numérico que representa el significado semántico de un texto |
| **pgvector** | Extensión de PostgreSQL para vectores (embeddings) |
| **RLS** | Políticas de seguridad a nivel de fila en PostgreSQL |
| **Core Web Vitals** | Métricas de Google: LCP, CLS, INP |
| **CI/CD** | Integración Continua / Despliegue Continuo |
| **Custom Skill** | Script que extiende capacidades de Claude Code |
| **LLM** | Large Language Model |

---

## Apéndice A: Mapa de Recursos Externos

### Videos recomendados (YouTube)

| Tema | Búsqueda sugerida |
|------|------------------|
| Token Economy | "Understanding LLM Token Pricing" |
| RAG | "RAG from Scratch" — LangChain |
| Embeddings | "Embeddings: What they are" — Google Cloud Tech |
| Testing con IA | "AI-Powered Testing with Playwright" |
| MCP | "Model Context Protocol Explained" |
| SDD | "Spec-Driven Development with AI" |
| CI/CD | "GitHub Actions Full CI/CD Pipeline" — Fireship |

### Documentación oficial

- [Next.js 15](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Anthropic API](https://docs.anthropic.com/en/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Playwright](https://playwright.dev/docs/intro)
- [Vitest](https://vitest.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com/docs)
- [MCP](https://modelcontextprotocol.io/)
- [pgvector](https://github.com/pgvector/pgvector)

### Herramientas gratuitas

| Herramienta | URL |
|-------------|-----|
| Continue.dev | https://continue.dev |
| Aider | https://aider.chat |
| Ollama | https://ollama.ai |
| OpenRouter | https://openrouter.ai |
| Helicone | https://helicone.ai |
| LangSmith | https://smith.langchain.com |
| Excalidraw | https://excalidraw.com |
| NeonDB | https://neon.tech |
| Cloudflare Pages | https://pages.cloudflare.com |

---

## Apéndice B: Alternativas 100% Open-Source

| Módulo | Original | Alternativa gratuita |
|--------|----------|---------------------|
| M1 | Claude/OpenAI API | Ollama + Llama 3 + OpenRouter |
| M1 | Supabase | SQLite local o Turso |
| M3 | Shadcn/UI | Headless UI + Tailwind |
| M4 | OpenAI Embeddings | sentence-transformers + Ollama |
| M6 | Vercel | Cloudflare Pages |
| Todos | Claude Code | Continue.dev + Ollama (100% local) |

---

> **📌 Versión**: 1.0 — Julio 2026  
> **Autor**: Curso AI Engineer LATAM  
> **Licencia**: Creative Commons — Compartir para aprender
