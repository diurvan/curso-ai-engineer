# Skill: Crear Sesión de Módulo

Usa esta skill cada vez que debas crear los archivos de una nueva sesión del curso.

## Convenciones

### Archivos por sesión

| Archivo | Ruta | Propósito |
|---------|------|-----------|
| Guión | `scripts/modulo-N/sesion-N.X-tema.md` | Video script para el instructor |
| Slides | `slides/modulo-N/sesion-N.X-tema.md` | Diapositivas Reveal.js |
| Lab | `labs/modulo-N/lab-X-descripcion.md` | Ejercicio práctico del estudiante |
| Recursos | `assets/modulo-N/sesion-N.X/recursos.md` | Links de referencia |
| Demo code | `assets/modulo-N/sesion-N.X/demo-code/` | Código mostrado en el video |

### Formato del guión (scripts/)

- Usar el template de `sesion-1.1-token-economy.md` como referencia
- Bloques: Intro → Teoría (varios) → Preview del Lab → Cierre
- Incluir tabla de estructura al inicio (bloque, tiempo, tipo, notas)
- Incluir tabla de entregables al final
- Cámara/slide instructions en **[CORCHETES]**
- Diálogo del instructor en `>`

### Formato de slides (slides/)

- Usar el template de `slides/modulo-1/sesion-1.1-token-economy.md`
- Frontmatter YAML con title, subtitle, theme, transition
- Una slide por separador `---`
- Usar Mermaid para diagramas
- Tablas, código, listas para contenido

### Formato del lab (labs/)

- Usar el template de `labs/modulo-1/lab-1-dashboard-tokens.md`
- Estructura: Descripción → Arquitectura → Setup → Schema → Código → Comandos → Criterios de éxito
- Incluir código completo y ejecutable
- NO incluir notas de producción de video (eso va en el guión)
- NO incluir "Guion v1.0" — el lab no es el guión

### Cross-referencing

- El guión debe referenciar al lab (ej: "En el Lab X vamos a...")
- El lab debe listar prerequisitos (ej: "Requiere Lab 1 desplegado")
- Los recursos deben estar en assets/ y también enlazados desde el plan
- El plan (AI-Engineer-Roadmap-2026.md) debe reflejar los archivos creados

### Regla de automatización forzosa

**Ningún lab puede pedir al estudiante medir tokens, costos o tiempos manualmente.**

El mecanismo depende del tipo de lab:

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

### Pasos al crear una sesión

1. Leer el plan `AI-Engineer-Roadmap-2026.md` para entender objetivos y métricas
2. Leer el skill actual `crear-sesion.md` por si hay actualizaciones
3. Leer la sesión anterior como template de referencia
4. Crear todos los archivos (scripts, slides, lab, assets) en paralelo
5. Verificar consistencia: ¿el script menciona el lab? ¿el lab menciona prerequisitos? ¿los paths existen?
6. Actualizar el plan si la estructura cambia
