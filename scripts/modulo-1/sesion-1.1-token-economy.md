# 🎙️ GUION DE GRABACIÓN — Módulo 1, Sesión 1.1
## **Token Economy: Mide antes de Construir**
**Duración target**: 40 min teoría + 10 min intro/outro = **50 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 2 min | Talking head | Promesa + dolor real |
| 1. Por qué el token es la nueva moneda | 6 min | Slides + ejemplos | Contexto 2026 |
| 2. Anatomía de un token | 5 min | Demo visual | Tokenizer en vivo |
| 3. Comparativa de modelos y costos | 7 min | Tabla + cálculo real | Calculadora en vivo |
| 4. Métricas clave que debes monitorear | 6 min | Dashboard mockup | Qué medir y por qué |
| 5. Herramientas gratuitas de monitoreo | 4 min | Screen recording | Helicone, LangSmith, OpenRouter |
| 6. Preview del Lab 1 | 3 min | Talking head | Qué vamos a construir |
| 7. Cierre y tarea | 2 min | Talking head | Call to action |

**Total teoría**: ~40 min | **Total con transiciones**: ~50 min

---

## 🎬 BLOQUE 0: INTRO GANCHO (2 min)

**[CÁMARA: Primer plano, iluminación cálida, fondo limpio con logo del curso sutil]**

> **(Sonríe, tono conversacional, energía media-alta)**
>
> "Hola, ¿qué tal? Soy [Tu Nombre] y bienvenido a la **Sesión 1.1 del curso AI Engineer**.
>
> Antes de escribir una sola línea de código con IA, antes de crear tu primer agente, antes de hacer RAG o fine-tuning... **hay una pregunta que nadie se hace y que te va a ahorrar miles de dólares**: **¿Cuánto me va a costar esto realmente?**
>
> En 2024, un desarrollador junior en mi equipo gastó **$847 dólares en una tarde** probando prompts con GPT-4. Sin métricas. Sin límites. Solo 'a ver qué pasa'. El CTO casi le da un infarto.
>
> En 2025, ese mismo desarrollador —ahora con dashboards de tokens— construyó **el mismo feature por $12**. Misma calidad. 70x menos costo.
>
> **La diferencia no fue el modelo. Fue la visibilidad.**
>
> Hoy vas a aprender por qué **el token es la nueva moneda del desarrollo**, cómo diseccionar su anatomía, comparar modelos como un comprador inteligente, y —lo más importante— **vas a construir tu propio dashboard de monitoreo** que usarás en *cada* lab de este curso.
>
> ¿Listo para dejar de adivinar y empezar a medir? Vamos."

---

## 📊 BLOQUE 1: POR QUÉ EL TOKEN ES LA NUEVA MONEDA (6 min)

**[SLIDE 1: Título "Token Economy: Mide antes de Construir"]**

> "Empecemos con contexto. Hace 10 años, el cuello de botella era **CPU**. Hace 5, **GPU**. Hoy, en 2026, el recurso escaso y caro es **el token**."

**[SLIDE 2: Evolución — CPU → GPU → Token (gráfico simple con flechas)]**

> "Cada vez que llamas a un LLM —sea Claude, GPT, Gemini, Llama— **pagas por tokens**. No por tiempo. No por requests. Por tokens.
>
> Y aquí está el truco: **la mayoría de desarrolladores no sabe qué es un token realmente**. Piensan que es 'una palabra'. **Error**. Un token en español promedio son **1.5 caracteres**. En inglés, 0.75 palabras.
>
> Eso significa que **un prompt de 500 palabras en español puede ser 1,000+ tokens**. Y la respuesta de 300 palabras, otros 600. **1,600 tokens por una interacción simple**.
>
> A precios de 2026: **Claude Sonnet 4 cobra $3 por millón de tokens de entrada y $15 por millón de salida**.
>
> Hagamos cuentas rápidas: 1,600 tokens × 100 llamadas al día = 160,000 tokens/día. En un mes: **4.8 millones de tokens**. Solo en entrada: **$14.40**. En salida: **$72**. **$86/mes por UN feature**.
>
> Multiplica por 10 features. Por 5 desarrolladores. **$4,300/mes**. Sin darte cuenta."

**[SLIDE 3: "El costo invisible" — Iceberg: código visible arriba, tokens invisibles abajo]**

> "El código que ves es la punta del iceberg. **El 90% del costo está bajo el agua: en los tokens que tu agente consume silenciosamente**.
>
> Por eso la **Token Economy** no es opcional. Es **supervivencia profesional**. Un AI Engineer que no mide tokens, no es ingeniero. Es un turista gastando la tarjeta de crédito de la empresa."

---

## 🔬 BLOQUE 2: ANATOMÍA DE UN TOKEN (5 min)

**[SLIDE 4: "¿Qué es un token?" — Definición técnica simple]**

> "Vamos a lo técnico, pero práctico. Un **token** es la unidad mínima que el modelo 'entiende'. No letras. No palabras. **Subpalabras**."

**[DEMO EN VIVO: Abrir https://platform.openai.com/tokenizer]**

> "Abro el tokenizer oficial de OpenAI. Escribo: **'Hola mundo'**.
>
> **[Escribe y muestra resultado: 3 tokens — 'Hol', 'a', ' mund', 'o']**
>
> ¿Ven? 'Hola' se rompió en 'Hol' + 'a'. 'mundo' en ' mund' + 'o'. **4 tokens para 10 caracteres**.
>
> Ahora: **'const usuario = await db.query(sql`SELECT * FROM users`)'**.
>
> **[Muestra: ~25 tokens]**
>
> Código denso = más tokens por carácter. Texto natural = menos.
>
> **Regla práctica**: En español, **1 token ≈ 1.5 caracteres ≈ 0.6 palabras**.
>
> Ahora, **tres tipos de tokens que pagas distinto**:"

**[SLIDE 5: Input vs Output vs Cached — tres cajas con precios]**

> 1. **Input tokens** — Lo que *tú* mandas (prompt, contexto, archivos). **Más baratos**.
> 2. **Output tokens** — Lo que *el modelo* genera. **3-5x más caros**. Por eso: **prompts cortos, respuestas largas = mala idea**.
> 3. **Cached tokens** — Contexto reutilizado (prompt caching). **Gratis o 90% descuento**. **Clave para ahorrar**."

**[DEMO: Prompt caching en Anthropic Console]**

> "Miren: si mando el mismo system prompt de 2,000 tokens 10 veces... **solo pago la primera**. Las 9 siguientes usan cache. **Ahorro del 90%**.
>
> **Truco pro**: Pon tu system prompt, specs, y documentación **al inicio** y no los cambies. El cache hace el resto."

---

## 💰 BLOQUE 3: COMPARATIVA DE MODELOS Y COSTOS (7 min)

**[SLIDE 6: Tabla comparativa grande — Modelos 2026]**

> "No todos los modelos cuestan igual. Ni sirven para lo mismo. **Elegir mal = quemar dinero**. Elegir bien = **ROI positivo**."

**[MUESTRA TABLA EN PANTALLA — La misma del plan]**

| Modelo | Input/1M | Output/1M | Contexto | Ideal para |
|--------|----------|-----------|----------|------------|
| **Claude Sonnet 4** | $3.00 | $15.00 | 200K | Desarrollo general, features complejas |
| **Claude Haiku 3.5** | $0.80 | $4.00 | 200K | Tareas rápidas, formateo, clasificación |
| **GPT-4o** | $2.50 | $10.00 | 128K | Multimodal, visión, uso general |
| **GPT-4o Mini** | $0.15 | $0.60 | 128K | Alto volumen, tareas simples |
| **Llama 3 70B (local)** | $0 | $0 | 128K | Privacidad total, costo cero marginal |

**[CÁLCULO EN VIVO: "La calculadora del AI Engineer"]**

> "Abro mi calculadora. Caso real: **Generar 50 meta-descripciones SEO de 160 chars c/u**.
>
> **Prompt**: ~200 tokens. **Respuesta esperada**: ~100 tokens cada una = 5,000 tokens output.
>
> **Con Sonnet 4**: (200 × $3 + 5,000 × $15) / 1,000,000 = **$0.0756** — 7.5 centavos.
>
> **Con Haiku 3.5**: (200 × $0.80 + 5,000 × $4) / 1,000,000 = **$0.0216** — 2.1 centavos.
>
> **Con GPT-4o Mini**: (200 × $0.15 + 5,000 × $0.60) / 1,000,000 = **$0.0033** — **0.3 centavos**.
>
> **Diferencia: 23x más barato con Mini**. ¿Calidad? Para meta-descripciones, **casi idéntica**.
>
> **Regla de oro**: **Usa el modelo más barato que resuelva tu tarea**. Escala hacia arriba solo si falla."

**[SLIDE 7: Decision tree — "¿Qué modelo elijo?"]**

> "Árbol de decisión simple:
> 1. **¿Tarea simple, repetitiva, alto volumen?** → Haiku / GPT-4o Mini / Llama local
> 2. **¿Razonamiento complejo, código nuevo, arquitectura?** → Sonnet / GPT-4o
> 3. **¿Visión, audio, multimodal?** → GPT-4o / Claude 3.5 Sonnet (vision)
> 4. **¿Privacidad absoluta, cero costo marginal?** → Ollama + Llama 3 / Mistral
>
> Y **siempre**: mide con tu dashboard. Los números mandan."

---

## 📈 BLOQUE 4: MÉTRICAS CLAVE QUE DEBES MONITOREAR (6 min)

**[SLIDE 8: "Las 5 métricas que separan a los pros de los amateurs"]**

> "No necesitas 50 métricas. Necesitas **estas 5**, bien medidas:"

**[SLIDE 9: Métrica 1 — Tokens por Request (promedio, P50, P95)]**

> "1. **Tokens por request** — Promedio, mediana (P50), y percentil 95.
>    - Si tu P95 es 3x tu promedio → **tienes outliers**. Requests que se van de madre.
>    - Objetivo: P95 < 2x promedio."

**[SLIDE 10: Métrica 2 — Costo por Tarea Completada]**

> "2. **Costo por tarea** — No por token. **Por outcome**.
>    - 'Generar una meta-descripción': $0.003
>    - 'Crear un CRUD completo': $0.45
>    - 'Refactorizar todo el frontend': $2.30
>    - Esto te permite **presupuestar features** como si fueran historias de usuario."

**[SLIDE 11: Métrica 3 — Eficiencia de Prompt]**

> "3. **Eficiencia de prompt** = (Tokens útiles en respuesta) / (Tokens totales gastados).
>    - Si mandas 5,000 tokens de contexto para obtener 200 de respuesta → **eficiencia 4%**. Malo.
>    - Objetivo: **>20%**. Cómo: RAG preciso, specs atómicas, cache inteligente."

**[SLIDE 12: Métrica 4 — Ratio de Caché]**

> "4. **Ratio de caché** = (Tokens cacheados) / (Tokens totales input).
>    - Objetivo: **>60%** en flujos repetitivos (code review, tests, docs).
>    - Si es <20% → **revisa tu system prompt**. Lo estás cambiando cada vez."

**[SLIDE 13: Métrica 5 — Costo por Deployment / Proyecto / Usuario]**

> "5. **Costo agregado por unidad de negocio**.
>    - ¿Cuánto cuesta en IA **un deploy a producción**?
>    - ¿Cuánto cuesta **un usuario activo al mes** en features de IA?
>    - Esto es lo que tu CFO va a pedir. **Ten la respuesta lista**."

**[MOCKUP EN PANTALLA: Dashboard ideal con estas 5 métricas]**

> "Este es el dashboard que **vamos a construir en el Lab 1**. No es bonito por bonito. **Cada gráfica responde a una decisión de negocio**."

---

## 🛠️ BLOQUE 5: HERRAMIENTAS GRATUITAS DE MONITOREO (4 min)

**[SCREEN RECORDING: Navegación real por cada herramienta]**

> "Antes de construir el nuestro, veamos qué existe **gratis hoy**:"

**[1. Helicone — proxy.openrouter.ai/helicone]**

> "Helicone: pones tu API key, cambias la base URL a `helicone.ai`, y **automáticamente** loggea todo: tokens, latencia, errores, costos. **100k requests/mes gratis**.
>
> **[Muestra dashboard: gráficos por modelo, por día, alertas]**
>
> Ideal para: **empezar ya, sin código**."

**[2. LangSmith — smith.langchain.com]**

> "LangSmith: más orientado a **trazas completas**. Ves el árbol de llamadas: agente → tool → sub-agente → LLM. **Free tier generoso**.
>
> Ideal para: **debugging de agentes complejos**."

**[3. OpenRouter — openrouter.ai]**

> "OpenRouter: **una API para todos los modelos**. Anthropic, OpenAI, Google, Meta, modelos open-source. **Analytics incluidos gratis**.
>
> Ideal para: **probar modelos sin cambiar código**."

**[SLIDE 14: "¿Por qué construir el nuestro entonces?"]**

> "Buena pregunta. Tres razones:
> 1. **Aprendes construyéndolo** — Entiendes qué se mide y cómo.
> 2. **Lo integras en TU stack** — Next.js + Supabase = tu infra.
> 3. **API reutilizable** — Tus futuros proyectos mandan métricas a *tu* dashboard. **Propiedad total**.
>
> Además: **Helicone no sabe qué es un 'proyecto' para ti**. Tu dashboard sí."

---

## 🚀 BLOQUE 6: PREVIEW DEL LAB 1 (3 min)

**[CÁMARA: Talking head, energía subiendo]**

> "Bien. **Lab 1: Dashboard de Monitoreo de Tokens (Web + API)**.
>
> Vamos a construir **esto** — **[muestra screenshot del dashboard final]** — en **4-6 horas**.
>
> **Stack**: Next.js 15 App Router + Supabase (PostgreSQL) + Tailwind CSS + Recharts.
>
> **Arquitectura**:
> - **Frontend**: Dashboard con gráfico de líneas (consumo diario), tabla de logs, filtros por proyecto/modelo, alertas configurables.
> - **API REST**: `POST /api/logs` (recibe métricas), `GET /api/stats` (agregaciones), `POST /api/alerts` (configura umbrales).
> - **Base de datos**: Dos tablas — `token_logs` y `alerts` — con RLS para multi-proyecto.
> - **Despliegue**: Vercel (gratis). **API pública** para que cualquier proyecto tuyo envíe datos.
>
> **Lo mejor**: Al terminar, **copias el script de ejemplo**, lo corres en tu siguiente lab, y **empiezas a ver datos reales en tu propio dashboard**.
>
> Es el **primer ladrillo** de tu infraestructura de AI Engineer. **Sin él, vas a ciegas**. Con él, tomas decisiones con datos."

---

## 🎯 BLOQUE 7: CIERRE Y TAREA (2 min)

**[SLIDE 15: Resumen + Próximos pasos]**

> "Resumen rápido de hoy:
> 1. **El token es tu moneda**. No la ignores.
> 2. **Input ≠ Output ≠ Cache**. Cada uno cuesta distinto.
> 3. **Elige el modelo por ROI**, no por marca.
> 4. **5 métricas** te dan control total.
> 5. **Herramientas gratis existen** — úsalas mientras construyes la tuya.
>
> **Tu tarea antes de la Sesión 1.2**:
> 1. Crea cuentas gratis: **GitHub, Vercel, Supabase, Helicone, Anthropic (API key)**.
> 2. Instala: **Node.js 20+, Git, VS Code, Claude Code CLI**.
> 3. Opcional: **Ollama** (`curl -fsSL https://ollama.ai/install.sh | sh`) para modelos locales.
>
> En la **Sesión 1.2** vamos a: **Instalar Claude Code, crear tu primer agente productivo, y hacer un test A/B real Haiku vs Sonnet midiendo con tu dashboard**.
>
> ¿Dudas? Deja un comentario. Nos vemos en la siguiente. **¡A medir se ha dicho!**"

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo del Lab 1]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: 1080p mínimo, 30fps. Audio: micrófono direccional (ej. Rode NT-USB).
- **Pantalla**: 1440p o 4K escalado, cursor visible, zoom en código.
- **Iluminación**: Key light 45°, fill light opuesto, fondo neutro.

### Post-producción
- **Intro/outro**: 5 seg con música royalty-free (ej. Epidemic Sound).
- **Lower thirds**: Nombre del tema al cambiar de bloque.
- **Zoom-ins**: En código y números clave (auto-zoom en edición).
- **Subtítulos**: Español (auto-generados + revisión manual).

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-1/sesion-1.1-token-economy.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-1/sesion-1.1-token-economy.md` |
| Demo code | TypeScript/TSX | `assets/modulo-1/sesion-1.1/` |
| Lab walkthrough | Markdown | `labs/modulo-1/lab-1-dashboard-tokens.md` |
| Recursos | Markdown | `assets/modulo-1/sesion-1.1/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS (para description del video)

1. **Tokenizer OpenAI**: https://platform.openai.com/tokenizer
2. **Tokenizer Anthropic**: https://www.anthropic.com/token-counter
3. **Precios OpenAI**: https://openai.com/api/pricing/
4. **Precios Anthropic**: https://www.anthropic.com/pricing
5. **Helicone**: https://helicone.ai (free tier: 100k req/mes)
6. **LangSmith**: https://smith.langchain.com
7. **OpenRouter**: https://openrouter.ai
8. **Ollama**: https://ollama.ai
8. **Repo del curso**: https://github.com/tu-usuario/curso-ai-engineer
9. **Lab 1 Starter**: https://github.com/tu-usuario/curso-ai-engineer/lab-1-starter

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 50 min.*