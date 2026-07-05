# Skill: Crear Sesión de Módulo

Usa esta skill cada vez que debas crear los archivos de una nueva sesión del curso.

## Metodología SDD

Este proyecto se construye con **Spec-Driven Development**:
1. `specs/course-spec.md` — Spec general del curso (contexto global)
2. `specs/modulo-N-spec.md` — Spec del módulo (contrato de contenido)
3. `.opencode/plans/dev-track.md` — Plan de implementación trazable
4. Sub-agentes por tipo de contenido (roles, no procesos separados)

**El spec es la única fuente de verdad. El contenido se genera a partir del spec.**

---

## Flujo de trabajo SDD

```
1. Leer course-spec.md          → contexto global
2. Leer modulo-N-spec.md        → alcance del módulo
3. Leer dev-track.md            → estado actual, qué sigue
4. Por cada sesión:
   a. Script Agent (Sonnet)     → genera guión
   b. Slides Agent (Haiku)      → genera slides desde guión
   c. Lab Agent (Sonnet)        → genera lab desde spec técnico
   d. Assets Agent (Haiku)      → genera demo code + recursos
5. Validar consistencia
6. Actualizar dev-track.md y plan
```

---

## Convenciones

### Archivos por sesión

| Archivo | Ruta | Propósito | Sub-agente |
|---------|------|-----------|------------|
| Guión | `scripts/modulo-N/sesion-N.X-tema.md` | Video script para el instructor | Script Agent (Sonnet) |
| Slides | `slides/modulo-N/sesion-N.X-tema.md` | Diapositivas Reveal.js | Slides Agent (Haiku) |
| Lab | `labs/modulo-N/lab-X-descripcion.md` | Ejercicio práctico del estudiante | Lab Agent (Sonnet) |
| Recursos | `assets/modulo-N/sesion-N.X/recursos.md` | Links de referencia | Assets Agent (Haiku) |
| Demo code | `assets/modulo-N/sesion-N.X/demo-code/` | Código mostrado en el video | Assets Agent (Haiku) |

### Archivos adicionales por módulo

| Archivo | Ruta | Cuándo se crea |
|---------|------|----------------|
| Module spec | `specs/modulo-N-spec.md` | Antes del contenido del módulo |
| Course spec | `specs/course-spec.md` | Una vez (actualizable) |
| Dev track | `.opencode/plans/dev-track.md` | Una vez (actualizable) |
| Spec técnico | `specs/database-spec.md` | Cuando el módulo lo requiera |

### Formato del guión (scripts/)

- Usar el template de `sesion-1.1-token-economy.md` como referencia
- Bloques: Intro → Teoría (varios) → Preview del Lab → Cierre
- Incluir tabla de estructura al inicio (bloque, tiempo, tipo, notas)
- Incluir tabla de entregables al final
- Cámara/slide instructions en **[CORCHETES]**
- Diálogo del instructor en `>`
- **El diálogo debe ser suficientemente detallado para grabar el video directamente**
- Lenguaje claro, para programadores: usa analogías técnicas, evita academicismo
- Duración target: ~55 min por sesión

### Formato de slides (slides/)

- Usar el template de `slides/modulo-1/sesion-1.1-token-economy.md`
- Frontmatter YAML con title, subtitle, theme: dark, transition: slide
- Una slide por separador `---`
- Usar Mermaid para diagramas
- Tablas, código, listas para contenido
- Máximo ~30-35 slides

### Formato del lab (labs/)

- Estructura: Descripción → Arquitectura (Mermaid) → Setup → Código → Pasos → Criterios de éxito
- Incluir código completo y ejecutable
- Checklist de prerequisitos al inicio
- Tabla de métricas para completar desde el dashboard
- Sección de troubleshooting
- Sección "Para estudiantes avanzados" con extensiones opcionales
- NO incluir notas de producción de video (eso va en el guión)
- NO incluir "Guion v1.0"

### Formato de un Spec OpenSpec (specs/)

- Usar el template de `specs/database-spec.md` como referencia
- Estructura OpenSpec:
  1. **Metadata**: título, versión, autor, fecha
  2. **Contexto**: propósito, alcance, stack destino
  3. **Definición de datos** (si aplica): entidades con campos, tipos, constraints, relaciones
  4. **Sesiones**: lista de sesiones con objetivos, contenido, lab asociado
  5. **Métricas**: tokens estimados por sesión
  6. **Criterios de aceptación**: condiciones para dar el spec por validado
  7. **Archivos**: lista de archivos que componen el módulo
- Lenguaje preciso, sin ambigüedad

### Cross-referencing

- El guión debe referenciar al lab (ej: "En el Lab X vamos a...")
- El lab debe listar prerequisitos (ej: "Requiere Lab X completado")
- Los recursos deben estar en assets/ y también enlazados desde el plan
- El spec debe referenciarse desde el lab (ej: "Usa el archivo specs/database-spec.md")
- El plan (`AI-Engineer-Roadmap-2026.md`) debe reflejar los archivos creados

### Regla de automatización forzosa

**Ningún lab puede pedir al estudiante medir tokens, costos o tiempos manualmente.**

| Tipo de lab | Mecanismo | Paquete |
|---|---|---|
| API directa (Anthropic) | `trackAnthropic()` extrae `usage` del response | `@curso-ai/metrics` |
| API directa (OpenAI) | `trackOpenAI()` extrae `usage` del response | `@curso-ai/metrics` |
| Agente CLI (Claude Code) | Helicone proxy captura automático | `syncHelicone()` |
| Otro proveedor | `report()` con valores del response | `@curso-ai/metrics` |

Reglas:
- Siempre usar `trackAnthropic()` o `trackOpenAI()` cuando sea llamada directa a API
- Siempre documentar Helicone para labs que usen agente CLI
- `report()` solo como fallback para casos no cubiertos
- El dashboard debe recibir tokens **reales** (response.usage), nunca estimados manuales

### Pasos al crear una sesión (flujo SDD)

1. Leer `specs/course-spec.md` — contexto global del curso
2. Leer `specs/modulo-N-spec.md` — alcance del módulo actual
3. Leer `.opencode/plans/dev-track.md` — estado actual
4. Leer `.opencode/agents/` — roles de sub-agentes (para entender delegación)
5. Leer `crear-sesion.md` (este archivo) — convenciones actualizadas
6. Ejecutar sub-agentes en orden:
   - **Script Agent (Sonnet)**: genera guión desde el spec del módulo
   - **Slides Agent (Haiku)**: genera slides desde el guión
   - **Lab Agent (Sonnet)**: genera lab desde el spec técnico + spec del módulo
   - **Assets Agent (Haiku)**: genera demo code y recursos
7. Verificar consistencia:
   - ¿El guión menciona el lab?
   - ¿El lab lista prerequisitos correctos?
   - ¿Los paths existen?
   - ¿Las métricas de tokens están en el lab?
8. Actualizar `dev-track.md` con el progreso
9. Actualizar `specs/modulo-N-spec.md` si la estructura cambió
10. Actualizar `AI-Engineer-Roadmap-2026.md` con los nuevos archivos
