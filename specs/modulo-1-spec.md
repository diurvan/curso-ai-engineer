# OpenSpec — Módulo 1: Token Economy + Fundamentos Agentic

**Versión**: 1.1
**Curso**: AI Engineer
**Estado**: Completado

---

## 1. Contexto

### 1.1 Propósito

Primer contacto del estudiante con el desarrollo asistido por IA. Aprende a medir tokens, crear un agente productivo y orquestar múltiples agentes. Construye el Dashboard de monitoreo que usará durante todo el curso.

### 1.2 Stack

- Next.js 15 + Supabase + Tailwind CSS + Recharts (Lab 1)
- Anthropic SDK + `@curso-ai/metrics` (Lab 2)
- Claude Code CLI + Antigravity (Lab 3)

### 1.3 Prerequisitos del estudiante

- Node.js 20+, npm, Git
- Cuenta GitHub
- API key de Anthropic (~$5-10 crédito inicial)

---

## 2. Sesiones

### 2.1 Sesión 1.1 — Token Economy: Mide antes de Construir

**Teoría**: 50 min | **Lab**: 4-6h | **Tokens**: ~10K

**Objetivos**:
- Entender el token como unidad económica del desarrollo con IA
- Comparar modelos por ROI, no por marca
- Configurar Helicone y herramientas de monitoreo
- Construir dashboard web con Next.js + Supabase

**Contenido**:
- Anatomía del token (input, output, caché)
- Comparativa de modelos y costos 2026
- 5 métricas clave para monitorear
- Arquitectura: Next.js App Router → API Routes → Supabase → Recharts

**Lab 1 — Dashboard de Tokens**:
- API REST para recibir métricas (POST /api/logs, GET /api/stats)
- Dashboard con gráficos de consumo diario
- Sistema de alertas configurables
- Despliegue en Vercel

**Archivos creados**: guión, slides, lab, assets/recursos

### 2.2 Sesión 1.2 — Tu Primer Agente Productivo

**Teoría**: 50 min | **Lab**: 2-3h | **Tokens**: ~50K-100K

**Objetivos**:
- Instalar y configurar Claude Code CLI
- Entender cuándo usar Haiku vs Sonnet vs Opus
- Aplicar control de costos (turns, caching, batch)
- Ejecutar test A/B entre modelos

**Contenido**:
- Arquitectura de un agente (Plan → Execute → Observe → Adapt)
- Árbol de decisión de modelos
- 3 palancas de control de costos
- `@curso-ai/metrics`: trackAnthropic, trackOpenAI, syncHelicone, report

**Lab 2 — Test A/B Haiku vs Sonnet**:
- Script con trackAnthropic() para ambos modelos
- Métricas automáticas al dashboard
- Evaluación de calidad del output
- Conclusión: ¿cuál es más rentable?

**Archivos creados**: guión, slides, lab, assets/recursos, demo-code/run-ab-test.mjs

### 2.3 Sesión 1.3 — Orquesta Múltiples Agentes

**Teoría**: 55 min | **Lab**: 3-4h | **Tokens**: ~30K-60K

**Objetivos**:
- Entender limitaciones del agente único
- Usar Antigravity / Agent Manager
- Gestionar Artifacts: Task Lists e Implementation Plans
- Aplicar estrategias anti-alucinaciones

**Contenido**:
- De agente único a equipo de agentes
- Antigravity: interfaz bidireccional, Diff View
- Task Lists como contrato con el agente
- 3 estrategias: aislamiento, aprobación de Diffs, validación automática

**Lab 3 — Andamiaje de TaskFlow AI**:
- Proyecto Next.js 15 + Tailwind
- Task List con 3 fases ~10 tareas
- Aprobación de Diffs paso a paso
- Push a GitHub

**Archivos creados**: guión, slides, lab, assets/recursos, demo-code/

---

## 3. Métricas de tokens

| Sesión | Tokens estimados | Reales (dashboard) |
|--------|-----------------|-------------------|
| 1.1 | ~10K | — |
| 1.2 | ~50K-100K | — |
| 1.3 | ~30K-60K | — |
| **Total** | **~90K-170K** | — |

---

## 4. Criterios de Aceptación

- [x] Dashboard de tokens funcional en Vercel (Lab 1)
- [x] Script A/B test con trackAnthropic (Lab 2)
- [x] Comparativa Haiku vs Sonnet con datos reales del dashboard (Lab 2)
- [x] Proyecto Next.js andamiado con Antigravity (Lab 3)
- [x] Cross-references verificadas entre sesiones
- [x] Todos los labs usan automatización de métricas

---

## 5. Archivos creados

```
scripts/modulo-1/
├── sesion-1.1-token-economy.md
├── sesion-1.2-primer-agente.md
└── sesion-1.3-multi-agente.md

slides/modulo-1/
├── sesion-1.1-token-economy.md
├── sesion-1.2-primer-agente.md
└── sesion-1.3-multi-agente.md

labs/modulo-1/
├── lab-1-dashboard-tokens.md
├── lab-2-ab-testing.md
└── lab-3-agent-manager.md

assets/modulo-1/
├── sesion-1.1/{recursos.md, demo-code/}
├── sesion-1.2/{recursos.md, demo-code/}
└── sesion-1.3/{recursos.md, demo-code/}
```
