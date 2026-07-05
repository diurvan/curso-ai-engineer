# 🎙️ GUION DE GRABACIÓN — Módulo 1, Sesión 1.3
## **Orquesta Múltiples Agentes**
**Duración target**: 40 min teoría + 10 min demo + 5 min intro/outro = **55 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 2 min | Talking head | Conectar con sesiones anteriores |
| 1. Del agente único a la orquestación | 8 min | Slides | Limitaciones de 1 agente, valor del equipo |
| 2. Antigravity / Agent Manager | 8 min | Screen recording | Instalación, interfaz, flujo bidireccional |
| 3. Artifacts: Task Lists e Implementation Plans | 7 min | Slides + demo | De la idea al plan estructurado |
| 4. Estrategias anti-alucinaciones | 7 min | Slides | Aislamiento, aprobación de Diffs, validación |
| 5. Demo en vivo | 10 min | Screen recording | Andamiaje de TaskFlow AI con Agent Manager |
| 6. Preview del Lab 3 | 3 min | Talking head | Qué van a construir |
| 7. Cierre y tarea | 2 min | Talking head | Call to action |

**Total teoría**: ~40 min | **Total con demos**: ~55 min

---

## 🎬 BLOQUE 0: INTRO GANCHO (2 min)

**[CÁMARA: Primer plano, misma línea visual que sesiones anteriores]**

> "Bienvenido a la **Sesión 1.3 del curso AI Engineer**.
>
> En la sesión 1.1 construiste tu **dashboard de tokens**. Ahora ves cada centavo que gastas.
>
> En la sesión 1.2 **creaste tu primer agente productivo**. Sabes instalar Claude Code, elegir el modelo correcto y medir costos.
>
> Hoy vas a dar **el salto de tener un agente a orquestar un equipo de agentes**.
>
> Un agente solo es como un desarrollador trabajando solo. Ahora vas a aprender a tener **un equipo**: uno que planifica, otro que escribe código, otro que revisa, todo orquestado desde tu IDE.
>
> ¿Listo? Vamos."

---

## 🏗️ BLOQUE 1: DEL AGENTE ÚNICO A LA ORQUESTACIÓN (8 min)

**[SLIDE 1: "¿Por qué un solo agente no es suficiente?"]**

> "Un agente de código es increíble. Pero tiene **limitaciones**."
>
> "Cuando trabajas con un solo agente:
> - **No hay especialización**: el mismo agente planifica, escribe y revisa
> - **La ventana de contexto se satura**: entre más turns, peor calidad
> - **No hay revisión**: el agente no cuestiona su propio código
> - **Una tarea bloquea todo**: mientras piensa, no avanzas"

**[SLIDE 2: "La orquestación como solución"]**

> "La orquestación de agentes resuelve esto. En lugar de un agente todólogo, tienes **un equipo**:
>
> - Un agente **planificador** — analiza la tarea, la descompone, define el plan
> - Un agente **constructor** — escribe el código siguiendo el plan
> - Un agente **revisor** — audita el código generado, busca errores
> - **Tú** — apruebas o rechazas cada paso"

**[SLIDE 3: Agente único vs Equipo de agentes]**

| Aspecto | Agente único | Equipo orquestado |
|---------|-------------|-------------------|
| Especialización | Generalista | Roles dedicados |
| Contexto | Se satura | Cada agente tiene contexto limpio |
| Revisión | Auto-revisión (limitada) | Revisor independiente |
| Velocidad | Secuencial | Tareas paralelizables |
| Costo | Un solo modelo | Modelos según rol (Haiku/Sonnet) |

> "Y lo mejor: **no estamos hablando de teoría**. Esto existe hoy en tu IDE."

**[SLIDE 4: Herramientas de orquestación]**

> "Tienes varias opciones para orquestar agentes hoy en 2026:"
>
> | Herramienta | Enfoque | Precio |
> |-------------|---------|--------|
> | **Continue.dev** | Open-source, multi-modelo | Gratis |
> | **Aider** | Terminal-based, multi-modelo | Gratis |
> | **Cline** | VS Code extension, MCP | Gratis |
> | **Claude Code + Antigravity** | Agent Manager nativo | Incluido en Claude Code |
>
> "En este curso vamos a usar **Claude Code con Antigravity** porque es el más integrado. Pero los conceptos aplican a todas."

---

## ⚙️ BLOQUE 2: ANTIGRAVITY / AGENT MANAGER (8 min)

**[SLIDE 5: "¿Qué es Antigravity?"]**

> "Antigravity es la **interfaz bidireccional de Claude Code** que convierte tu terminal en un centro de control de agentes."
>
> "No es una herramienta externa. **Es parte de Claude Code CLI**. Se activa con un flag."

**[SCREEN RECORDING: Instalación y primera vista]**

> **Paso 1 — Activar Antigravity:**
>
> ```bash
> claude --antigravity
> ```
>
> **[Muestra terminal: se abre interfaz Antigravity]**

> "Al ejecutar `claude --antigravity`, tu terminal se transforma. En lugar de la línea de comandos tradicional, ves:
>
> 1. **Panel principal** — donde el agente te muestra su plan
> 2. **Agent Manager** — selector de roles de agente
> 3. **Diff View** — cambios propuestos antes de aplicarlos
> 4. **Task List** — tareas pendientes y completadas"

**[SLIDE 6: Editor tradicional vs Agent Manager]**

```
┌─────────────────────────────────────┐
│         TERMINAL TRADICIONAL         │
│                                     │
│  $ claude -p "crea un componente"   │
│  > Generando...                     │
│  > Código creado.                   │
│                                     │
│  Problema: no ves el plan,          │
│  no apruebas pasos intermedios      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         ANTIGRAVITY MODE            │
│ ┌───────────────────────────────┐   │
│ │ 🤖 Agent: Planificador       │   │
│ │ 📋 Task List: 5 tasks        │   │
│ │ 📝 Plan: ver detalle         │   │
│ │ 🔍 Diff: 3 archivos          │   │
│ │ ✅ [Aprobar] ❌ [Rechazar]   │   │
│ └───────────────────────────────┘   │
│                                     │
│  Ventaja: ves, apruebas, controlas  │
└─────────────────────────────────────┘
```

> "**La diferencia es control**. En modo tradicional, el agente hace y tú ves el resultado. En modo Antigravity, **tú apruebas cada paso**. El agente propone, tú dispones."

**[SCREEN RECORDING: Flujo bidireccional]**

> **[Muestra: el instructor abre Antigravity y demuestra el flujo]**
>
> "Voy a pedirle al agente que cree la estructura de carpetas de TaskFlow AI. Miren cómo **propone un plan primero**."
>
> ```bash
> claude --antigravity
> # "Vamos a crear la estructura base de TaskFlow AI"
> ```
>
> **[Muestra: el agente propone un plan de 5 pasos]**
>
> "El agente me muestra el plan. Yo puedo:
> - **Aprobarlo** — sigue adelante
> - **Rechazarlo** — vuelve a pensar
> - **Editarlo** — cambio pasos específicos
>
> Esto es clave: **tú no pierdes el control**. El agente ejecuta, tú gobiernas."

---

## 📋 BLOQUE 3: ARTIFACTS — TASK LISTS E IMPLEMENTATION PLANS (7 min)

**[SLIDE 7: "¿Qué son los Artifacts?"]**

> "Los Artifacts son la **memoria estructurada del agente**. No son conversación. Son **documentos vivos** que el agente crea, mantiene y actualiza mientras trabaja."
>
> "Dos tipos principales:
> - **Task List** — lista de tareas con estado (pendiente, en progreso, completada)
> - **Implementation Plan** — especificación técnica detallada de cómo implementar"

**[SLIDE 8: Estructura de una Task List]**

```markdown
# Task List: Andamiaje TaskFlow AI

## [ ] Fase 1: Estructura base
- [x] Crear proyecto Next.js 15 con App Router
- [x] Configurar Tailwind CSS
- [x] Configurar carpetas: app/, components/, lib/

## [ ] Fase 2: Layouts y navegación
- [ ] Crear RootLayout con Header y Footer
- [ ] Implementar navegación: /, /productos, /servicios, /contacto
- [ ] Configurar layout responsivo

## [ ] Fase 3: Páginas placeholder
- [ ] Landing Page con hero section
- [ ] Página de productos con grid
- [ ] Página de servicios con cards
- [ ] Página de contacto con formulario
```

> "La Task List es **tu contrato con el agente**. Le dices qué necesitas, él lo desglosa en tareas, y tú ves el progreso en tiempo real."

**[SLIDE 9: Implementation Plan]**

> "El **Implementation Plan** va un paso más allá. No solo dice qué hacer, dice **cómo** hacerlo."
>
> ```markdown
> # Implementation Plan: Header Component
>
> ## Archivo: components/Header.tsx
> - Server Component (cliente no necesita interactividad)
> - Logo a la izquierda (enlace a /)
> - Navegación central: Inicio, Productos, Servicios, Contacto
> - Botón CTA a la derecha: "Comenzar"
> - Responsive: menú hamburguesa en mobile
> - Estilos con Tailwind CSS utility classes
>
> ## Dependencias
> - @radix-ui/react-navigation-menu para menú mobile
> - next/link para navegación
>
> ## Criterios de aceptación
> - Header fijo en scroll
> - Menú hamburguesa funcional en mobile
> - Links navegables
> ```

> "El Implementation Plan es **el puente entre la especificación y el código**. El agente lo usa como guía exacta para generar código que cumpla con lo que necesitas."

**[SCREEN RECORDING: Creando Artifacts en vivo]**

> **[Muestra: el instructor usa Antigravity para crear una Task List]**
>
> "Voy a pedirle al agente que genere una **Task List** para el andamiaje de TaskFlow AI. Verán cómo **él mismo desglosa** el trabajo."
>
> ```bash
> # En Antigravity
> "Crea una Task List para el andamiaje de TaskFlow AI.
>  Necesito: proyecto Next.js, layouts, navegación y 4 páginas placeholder."
> ```
>
> **[Muestra: el agente genera la Task List]**
>
> ¿Ven? Él mismo definió las fases. Yo puedo **reordenar, agregar o quitar tareas**. Luego le digo 'ejecutar' y empieza a trabajarlas una por una."

---

## 🛡️ BLOQUE 4: ESTRATEGIAS ANTI-ALUCINACIONES (7 min)

**[SLIDE 10: "El problema de las alucinaciones de código"]**

> "Los agentes de código a veces **alucinan**. ¿Qué significa?
>
> - **Archivos que no existen** — el agente referencia un módulo que nunca creó
> - **Funciones inventadas** — llama a APIs que no existen en el SDK
> - **Dependencias falsas** — asume que tienes paquetes que no instalaste
> - **Código inconsistente** — dos archivos que deberían coordinarse, no lo hacen
>
> La orquestación nos da **herramientas para prevenir esto**."

**[SLIDE 11: Estrategia 1 — Aislamiento por archivo]**

> "**Cada agente trabaja en un archivo a la vez**. No permitas que un agente edite 5 archivos simultáneamente.
>
> En Antigravity:
> ```bash
> # ✅ Bueno: un archivo por tarea
> "Crea el componente Header.tsx"
>
> # ❌ Malo: edición masiva sin control
> "Crea toda la carpeta components/ con 10 componentes"
> ```
>
> **El aislamiento reduce las alucinaciones en ~60%** porque el agente mantiene el contexto completo de un solo archivo."

**[SLIDE 12: Estrategia 2 — Aprobación de Diffs]**

> "**Nunca dejes que el agente aplique cambios sin tu revisión.**
>
> En Antigravity, cada cambio se muestra como **Diff** antes de aplicarse:"
>
> ```
> ┌─────────────────────────────────────┐
> │  Archivo: components/Header.tsx     │
> │  ┌─────────────────────────────┐   │
> │  │ - import old from './bad'   │   │
> │  │ + import Link from 'next/link'│   │
> │  └─────────────────────────────┘   │
> │                                     │
> │  ✅ Aprobar │ ❌ Rechazar │ ✏️ Editar │
> └─────────────────────────────────────┘
> ```
>
> "**Tips para revisar Diffs**:
> - ¿El cambio es consistente con el resto del código?
> - ¿Usa las mismas convenciones que el proyecto?
> - ¿Las importaciones existen realmente?
> - ¿El nombre del componente coincide con el archivo?"

**[SLIDE 13: Estrategia 3 — Validación con herramientas]**

> "Después de aprobar el código, ejecuta **validaciones automáticas**:"
>
> ```bash
> # Validar TypeScript
> npx tsc --noEmit
>
> # Validar formato
> npx prettier --check .
>
> # Validar lint
> npx eslint .
>
> # Build para verificar errores
> npm run build
> ```
>
> "Si el build falla, el agente **recibe el error y lo corrige**. No tú. Esto es clave: **el agente se auto-corrige** con el feedback del compilador."

**[SLIDE 14: Resumen de estrategias]**

| Estrategia | Cómo | Reduce alucinaciones |
|------------|------|---------------------|
| Aislamiento | 1 archivo por tarea | ~60% |
| Aprobación de Diffs | Revisar antes de aplicar | ~80% (detección) |
| Validación automática | tsc, prettier, eslint, build | ~95% (corrección) |

> "Con estas tres estrategias, **eliminas prácticamente todas las alucinaciones** del flujo de trabajo."

---

## 🖥️ BLOQUE 5: DEMO EN VIVO — ANDAMIAJE DE TASKFLOW AI (10 min)

**[SCREEN RECORDING: Pantalla completa — terminal con Antigravity]**

> "Vamos a construir el **andamiaje completo de TaskFlow AI** usando el Agent Manager de Antigravity."
>
> "**Escenario**: Crear la estructura base de una plataforma web:
> - Proyecto Next.js 15 con App Router
> - Layout con Header y Footer
> - Navegación responsiva
> - 4 páginas placeholder: Landing, Productos, Servicios, Contacto"

**[Paso 1: Inicializar el proyecto]**

> "Primero, creamos el proyecto Next.js:"
>
> ```bash
> npx create-next-app@latest taskflow-ai --typescript --tailwind --app
> cd taskflow-ai
> ```
>
> **[Muestra: proyecto creado]**

**[Paso 2: Activar Antigravity y crear Task List]**

> "Ahora activamos Antigravity y creamos la Task List:"
>
> ```bash
> claude --antigravity
> ```
>
> **[Muestra: Antigravity se abre]**
>
> "Le pido al agente que genere una Task List completa para el andamiaje."

**[Paso 3: Revisar Task List generada]**

> **[Muestra: el agente genera Task List con 3 fases y ~10 tareas]**
>
> "El agente propuso:
> - **Fase 1**: Limpiar boilerplate, configurar Tailwind, crear estructura de carpetas
> - **Fase 2**: Header con navegación, Footer, RootLayout responsivo
> - **Fase 3**: Landing, Productos, Servicios, Contacto (páginas placeholder)
>
> Se ve bien. **Aprieto 'Aprobar'.** "

**[Paso 4: El agente ejecuta tarea por tarea]**

> **[Muestra: el agente empieza a ejecutar, mostrando cada tarea y su diff]**
>
> "Fíjense en el flujo:
> 1. **Task 1/10**: Limpiar boilerplate → muestra diff → ✅ Aprobar
> 2. **Task 2/10**: Crear carpeta components/ → muestra diff → ✅ Aprobar
> 3. **Task 3/10**: Crear Header → muestra el código del Header → ✅ Aprobar
> 4. **Task 4/10**: Crear Footer → muestra el código del Footer → ✅ Aprobar
> ..."
>
> "**No estoy escribiendo código. Estoy aprobando decisiones.** "

**[Paso 5: Validación post-ejecución]**

> "Cuando termina, ejecuto las validaciones:"
>
> ```bash
> npm run build
> ```
>
> **[Muestra: build exitoso]**
>
> > "Build exitoso. Sin errores. **Zero alucinaciones** porque revisé cada diff."

**[Paso 6: Ver navegación en el navegador]**

> **[Muestra: navegador con localhost:3000, navegación funcional entre páginas]**
>
> "La navegación funciona. Las 4 páginas están servidas."
>
> "Esto, sin Antigravity, habría sido una sesión de 30 minutos con 15 turns y ~$1.50 en Sonnet.
>
> Con Antigravity: **10 minutos, 0 errores, costo en el dashboard**. Y tienes control de cada línea que se escribió."

**[SLIDE 15: Tabla comparativa de la demo]**

| Métrica | Sin Antigravity | Con Antigravity |
|---------|----------------|-----------------|
| Tiempo | ~30 min | ~10 min |
| Turns | ~15 | ~8 |
| Errores post-ejecución | 2-3 (comunes) | 0 (validado en cada paso) |
| Control humano | Bajo (ve el resultado final) | Alto (aprueba cada cambio) |
| Curva de aprendizaje | Baja | Media (requiere revisar) |

> "Antigravity no es más lento. Es **más preciso**. Previenes errores antes de que ocurran."

---

## 🚀 BLOQUE 6: PREVIEW DEL LAB 3 (3 min)

**[CÁMARA: Talking head]**

> "**Lab 3: Andamiaje Principal de TaskFlow AI con Agent Manager**.
>
> En este lab vas a **replicar exactamente lo que acabo de hacer**:
>
> 1. Crearás un proyecto Next.js 15 con Tailwind CSS
> 2. Activarás Antigravity con `claude --antigravity`
> 3. Definirás una **Task List** completa para el andamiaje
> 4. Ejecutarás el agente, **aprobando cada diff** paso a paso
> 5. Verificarás con `npm run build` que no hay errores
> 6. Las métricas de tokens viajan **automáticamente al dashboard** via Helicone
> 7. Harás push a GitHub
>
> **Duración estimada**: 3-4 horas.
> **Requisito**: Tener los Labs 1 y 2 completados.
> **Stack**: Claude Code + Antigravity + Next.js 15 + Dashboard
>
> **El resultado**: Tu proyecto TaskFlow AI vivo, con estructura profesional, navegación funcional, y **tú tuviste control de cada línea** que se escribió."

---

## 🎯 BLOQUE 7: CIERRE Y TAREA (2 min)

**[SLIDE 16: Resumen]**

> "Resumen de hoy:
> 1. **Un agente solo no es suficiente** — la orquestación multiplica tu productividad
> 2. **Antigravity/Agent Manager** — convierte tu IDE en un equipo de trabajo
> 3. **Task Lists e Implementation Plans** — son la memoria estructurada del agente
> 4. **3 estrategias anti-alucinaciones**: aislamiento, aprobación de Diffs, validación automática
> 5. **El control nunca lo pierdes** — el agente propone, tú apruebas"

**[SLIDE 17: Tarea antes del Módulo 2]**

> **Tu tarea**:
> 1. Completar el **Lab 3: Andamiaje de TaskFlow AI** con Agent Manager
> 2. Verificar que el proyecto corre localmente con `npm run dev`
> 3. Confirmar que las 4 rutas navegan correctamente
> 4. Hacer push a GitHub
> 5. Verificar que el dashboard registró los tokens del agente (via Helicone)
>
> En el **Módulo 2** vamos a: **Spec-Driven Development**. Vamos a aprender a escribir especificaciones atómicas que la IA ejecuta sin ambigüedad. Crearemos el modelo de datos de TaskFlow AI con un Spec que luego implementaremos en Supabase.
>
> ¿Dudas? Deja un comentario. Nos vemos en el Módulo 2. **¡A orquestar se ha dicho!**"

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: Misma configuración que sesiones anteriores (1080p, 30fps, micrófono direccional)
- **Pantalla**: Enfocar la interfaz de Antigravity durante la demo — es el elemento nuevo
- **Zoom**: En los Diffs y botones de aprobar/rechazar

### Post-producción
- **Overlay**: Mostrar la Task List completa durante el Bloque 3
- **Split screen**: Terminal + Antigravity lado a lado durante la demo
- **Subtítulos**: Español (auto-generados + revisión)
- **Highlight**: Iluminar los botones "Aprobar" y "Rechazar" cuando aparecen en pantalla

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-1/sesion-1.3-multi-agente.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-1/sesion-1.3-multi-agente.md` |
| Demo code | Markdown | `assets/modulo-1/sesion-1.3/demo-code/` |
| Lab | Markdown | `labs/modulo-1/lab-3-agent-manager.md` |
| Recursos | Markdown | `assets/modulo-1/sesion-1.3/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS (para description del video)

1. **Antigravity**: incluido en Claude Code CLI (`claude --antigravity`)
2. **Claude Code CLI**: https://docs.anthropic.com/en/docs/claude-code/overview
3. **Consola Anthropic (API keys)**: https://console.anthropic.com
4. **Continue.dev**: https://continue.dev
5. **Aider**: https://aider.chat
6. **Next.js 15**: https://nextjs.org/docs
7. **Repo del curso**: https://github.com/tu-usuario/curso-ai-engineer
8. **Dashboard Lab 1**: desplegado por el estudiante

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 55 min.*
