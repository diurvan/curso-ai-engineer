# OpenSpec — Curso AI Engineer

**Versión**: 2.0
**Autor**: Curso AI Engineer
**Fecha**: Julio 2026
**Estado**: En desarrollo

---

## 1. Contexto

### 1.1 Propósito

Curso práctico para programadores semi-senior que quieren dominar el desarrollo de software asistido por IA. El estudiante construye **TaskFlow AI**, una plataforma web inteligente con chatbot RAG, agentes y CI/CD.

### 1.2 Audiencia

- Programadores con 3+ años de experiencia
- Familiarizados con TypeScript, React, Git
- NO se requiere experiencia previa con IA

### 1.3 Metodología: 3 Pilares

1. **Token Economy** — Medir y optimizar cada llamado a la IA
2. **Spec-Driven Development (SDD)** — Specs atómicos como contratos ejecutables
3. **Agentic Builder** — Orquestar múltiples agentes como un equipo de desarrollo

### 1.4 Stack del curso

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| Next.js | 15 | Framework web (App Router) |
| Supabase | Latest | PostgreSQL + Auth + Storage |
| Tailwind CSS | 4 | Estilos utilitarios |
| Shadcn/UI | Latest | Componentes UI |
| Claude Code CLI | Latest | Agente de desarrollo |
| pgvector | Latest | Embeddings vectoriales |
| Playwright | Latest | Tests E2E |
| Vitest | Latest | Tests unitarios |
| Helicone | Free | Monitoreo de tokens |

### 1.5 Estructura del repositorio

```
curso-ai-engineer/
├── specs/                    ← OpenSpecs (single source of truth)
│   ├── course-spec.md        ← Este archivo
│   ├── modulo-1-spec.md      ← Spec del Módulo 1
│   ├── modulo-2-spec.md      ← Spec del Módulo 2
│   └── database-spec.md      ← Spec técnico (modelo de datos)
├── scripts/                  ← Guiones de video
│   └── modulo-N/
├── slides/                   ← Diapositivas Reveal.js
│   └── modulo-N/
├── labs/                     ← Labs prácticos
│   └── modulo-N/
├── assets/                   ← Recursos y demo code
│   └── modulo-N/
├── .opencode/
│   ├── plans/                ← Planes de implementación
│   └── skills/               ← Skills para agentes
└── packages/
    └── metrics/              ← @curso-ai/metrics
```

### 1.6 Convenciones de contenido

- **Idioma**: Español LATAM neutro
- **Guiones**: Suficientemente detallados para grabar video directamente (~55 min c/u)
- **Slides**: Formato Reveal.js Markdown con frontmatter YAML
- **Labs**: Código completo y ejecutable, criterios de éxito medibles
- **Regla de automatización forzosa**: ningún lab pide medición manual de tokens

---

## 2. Mapa del Curso

### 2.1 Módulos

| Módulo | Tema | Sesiones | Labs | Semanas |
|--------|------|----------|------|---------|
| 1 | Token Economy + Fundamentos Agentic | 3 | 3 | 1-2 |
| 2 | Spec-Driven Development | 2 | 2 | 2-3 |
| 3 | Frontend Multimodal | 2 | 2 | 3-4 |
| 4 | RAG y Bases Vectoriales | 2 | 2 | 4-5 |
| 5 | MCP, Custom Skills y Gobernanza | 2 | 2 | 5-6 |
| 6 | Testing, CI/CD y Producción | 4 | 4 | 6-8 |
| 7 | Pipeline Completo + Proyecto Final | 2 | 2 | 8-10 |

### 2.2 Total

- **17 sesiones**, **17 labs**, **~100 horas**
- **Costo estimado por estudiante**: ~$7-15 USD (free tiers + créditos iniciales)
- **Alternativa 100% gratuita**: Ollama + modelos open-source

---

## 3. Convenciones de Especificación

### 3.1 Cómo se construye una sesión (flujo SDD)

```
[Module Spec] → [Implementation Plan] → [Content Agents] → [Validation]
```

1. **Module Spec** define: objetivos, sesiones, labs, stack, tokens estimados
2. **Implementation Plan** desglosa: archivos a crear, dependencias, orden
3. **Content Agents** ejecutan: separados por tipo (guión, slides, lab, assets)
4. **Validation**: cross-references, consistencia, criterios de éxito

### 3.2 Sub-agentes por tipo de contenido

| Tipo | Modelo | Responsabilidad |
|------|--------|-----------------|
| Script (guión) | Sonnet | Narrativa, tono del instructor, engagement, bloques de tiempo |
| Slides | Haiku | Formato estructurado, diagramas Mermaid, tablas |
| Lab | Sonnet | Precisión técnica, edge cases, código ejecutable |
| Spec | Sonnet | Rigor, completitud, relaciones, RLS |
| Demo code | Haiku | Código funcional siguiendo patrones existentes |

### 3.3 Control de contexto

Cada sub-agente recibe **solo el spec del módulo**, no el plan completo del curso. Esto:
- Reduce contexto innecesario (~60% menos tokens por tarea)
- Elimina ambigüedad (el spec es la única fuente de verdad)
- Permite paralelización (agentes independientes)

---

## 4. Criterios de Aceptación del Curso

- [ ] 7 módulos completos con sus 17 sesiones y 17 labs
- [ ] Cada sesión tiene: guión, slides, lab, assets, demo code
- [ ] Cada módulo tiene: spec, plan de implementación
- [ ] Cross-references verificadas: guión → lab, lab → prerequisitos, assets → recursos
- [ ] Regla de automatización forzosa aplicada en todos los labs
- [ ] Plan maestro actualizado reflejando archivos creados

---

## 5. Historial de Cambios

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | Julio 2026 | Versión inicial del curso | Curso AI Engineer |
| 2.0 | Julio 2026 | Reestructura SDD: specs por módulo, sub-agentes, plan trazable | Curso AI Engineer |
