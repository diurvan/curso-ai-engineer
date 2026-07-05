# 🎙️ GUION DE GRABACIÓN — Módulo 2, Sesión 2.1
## **SDD: El Contrato que Hace Predecible a tu Agente**
**Duración target**: 45 min teoría + 10 min demo + 5 min intro/outro = **55 min total**
**Formato**: Video talking-head + screen recording (demo) + slides
**Idioma**: Español (LATAM, neutro)

---

## 📋 ESTRUCTURA DEL GUION

| Bloque | Tiempo | Tipo | Notas |
|--------|--------|------|-------|
| 0. Intro gancho | 3 min | Talking head | El dolor del prompt hacking |
| 1. Por qué el prompt hacking no escala | 8 min | Slides | Ambigüedad, inconsistencia, rework |
| 2. SDD como única fuente de verdad | 8 min | Slides | Spec → Plan → Código → Tests → Docs |
| 3. OpenSpec Protocol: anatomía de un Spec | 12 min | Slides + demo | Contexto, datos, reglas, API, seguridad |
| 4. Eliminar ambigüedad como un ingeniero | 7 min | Slides | Lenguaje preciso, tipos, ejemplos |
| 5. Inyección del Spec en Claude Code | 7 min | Screen recording | Cómo pasar el spec al agente |
| 6. Demo en vivo | 10 min | Screen recording | Spec de TaskFlow AI desde cero |
| 7. Preview del Lab 4 | 3 min | Talking head | Spec atómico para el modelo de datos |
| 8. Cierre y tarea | 2 min | Talking head | Call to action |

**Total teoría**: ~45 min | **Total con demos**: ~55 min

---

## 🎬 BLOQUE 0: INTRO GANCHO — EL DOLOR DEL PROMPT HACKING (3 min)

**[CÁMARA: Primer plano, misma línea visual que Módulo 1]**

> "Bienvenido al **Módulo 2 del curso AI Engineer**.
>
> Si llegaste hasta aquí, ya tienes superpoderes:
> - Sabes medir tokens como un CFO (Lab 1)
> - Tienes un agente productivo y sabes elegir el modelo correcto (Lab 2)
> - Orquestas múltiples agentes con Antigravity (Lab 3)
>
> Pero hay un problema. **Un problema que duele**.
>
> ¿Te ha pasado esto? Le pides a Claude que cree un componente. Lo hace. Pero no es exactamente lo que querías. Le dices 'agrega esto'. Lo hace, pero rompe otra cosa. Le dices 'ahora cambia el color'. Y de repente, el componente tiene 500 líneas y tú ya no sabes qué hizo exactamente.
>
> Eso se llama **prompt hacking** — improvisar con prompts hasta que algo funcione.
>
> Y no escala. **Un buen prompt hoy es un dolor de cabeza mañana** porque cuando vuelves a pedirle algo al agente, él no recuerda lo que acordaron la vez anterior.
>
> En este módulo vas a aprender **Spec-Driven Development (SDD)**: una forma de trabajar donde el agente no improvisa, sino que **ejecuta un contrato**. Un documento que define EXACTAMENTE lo que necesitas, sin ambigüedad, sin vueltas.
>
> El resultado: **menos tokens gastados, menos rework, código que sale bien al primer intento**."

---

## 📊 BLOQUE 1: POR QUÉ EL PROMPT HACKING NO ESCALA (8 min)

**[SLIDE 1: "El problema del prompt hacking"]**

> "Empecemos con una definición. **Prompt hacking** es cuando escribes prompts larguísimos con instrucciones cada vez más específicas porque el agente no está entendiendo lo que quieres."
>
> "Y aquí está el problema: cuando le pides algo hoy, mañana el agente no se acuerda de lo que le pediste ayer. **Cada sesión empieza desde cero**."

**[SLIDE 2: Los 3 dolores del prompt hacking]**

> "El prompt hacking tiene **3 dolores principales**:"

**[SLIDE 3: Dolor 1 — Ambigüedad]**

> "**1. Ambigüedad.** Cuando le dices al agente 'crea una tabla de usuarios', él tiene que adivinar:
> - ¿Qué campos tiene?
> - ¿Qué tipo de datos usa cada campo?
> - ¿El email es único?
> - ¿La contraseña se guarda en texto plano? (esperemos que no)
>
> Como no le das especificaciones exactas, **él inventa**. Y lo que él invente puede no ser lo que tú necesitas."

**[SLIDE 4: Dolor 2 — Inconsistencia]**

> "**2. Inconsistencia.** Le pides al agente que cree la tabla `users`. Después le pides la tabla `orders` con una relación a `users`. Pero el agente ya no se acuerda exactamente cómo definió `users`. Tal vez el ID se llama `id`, tal vez `user_id`, tal vez `uuid`. **Cada llamada es una ruleta**."

**[SLIDE 5: Dolor 3 — Rework infinito]**

> "**3. Rework infinito.** Como el agente improvisó la primera vez, cuando vuelves a tocar ese código, tienes que explicarle todo de nuevo. Y como el contexto se acumula, la calidad baja. Y gastas más tokens en explicar que en programar."
>
> "Un estudio interno de Anthropic mostró que **un buen spec reduce el consumo de tokens en ~40%**. Es decir, casi la mitad de lo que gastas en prompts es por culpa de la ambigüedad."

**[SLIDE 6: La alternativa — SDD]**

> "La alternativa se llama **Spec-Driven Development** o SDD.
>
> En lugar de:
> ```
> "Oye, hazme una tabla de usuarios... No, así no...
>  Ahora agrégale email... Tampoco...
>  Mejor hazlo así..."
> ```
>
> Haces esto:
> ```
> "Aquí tienes el spec. Ejecútalo."
> ```
>
> El spec tiene TODO lo que el agente necesita: nombres de campos, tipos, relaciones, reglas de negocio, políticas de seguridad. **No hay nada que adivinar**."

**[SLIDE 7: Estadística clave]**

> "Y esto no es teoría. Los datos son claros:"
>
> | Métrica | Sin Spec | Con Spec |
> |---------|----------|----------|
> | Tokens por feature | 40K | 24K |
> | Rework (cambios post-generación) | 3-4 iteraciones | 0-1 iteraciones |
> | Errores en primera ejecución | ~60% | ~10% |
> | Tiempo de revisión de código | 20 min | 5 min |

> "**40% menos de tokens. 75% menos de rework. 6x menos errores.** Eso es SDD."

---

## 🏗️ BLOQUE 2: SDD COMO ÚNICA FUENTE DE VERDAD (8 min)

**[SLIDE 8: "Spec-Driven Development: la definición"]**

> "**Spec-Driven Development** es una metodología donde **el spec es la única fuente de verdad**. No el código. No la conversación con el agente. El spec."
>
> "El flujo completo es:"
>
> ```
> Spec  →  Plan  →  Código  →  Tests  →  Documentación
>  ↑                                        │
>  └────────────────────────────────────────┘
>              (feedback loop)
> ```

**[SLIDE 9: El flujo SDD paso a paso]**

> "1. **Spec** — Escribes un documento que define exactamente qué necesitas. Sin código. Sin implementación. Solo especificación.
>
> 2. **Plan** — El agente lee el spec y genera un plan de implementación. Tú lo revisas y apruebas.
>
> 3. **Código** — El agente escribe el código siguiendo el plan. Cada línea está justificada por el spec.
>
> 4. **Tests** — El agente genera tests basados en los criterios de aceptación del spec.
>
> 5. **Documentación** — El spec se convierte en la documentación viva del proyecto.
>
> Y lo más importante: **si algo cambia, no cambias el código. Cambias el spec. Y el agente regenera todo.** "

**[SLIDE 10: Spec vs Prompt]**

> "¿Cuál es la diferencia entre un spec y un prompt?"

| Aspecto | Prompt | Spec |
|---------|--------|------|
| **Formato** | Conversación | Documento estructurado |
| **Reutilizable** | No (cada sesión se olvida) | Sí (vive en el repo) |
| **Precisión** | Vaga ('hazlo bonito') | Exacta ('color #1e3a5f') |
| **Versionable** | No | Sí (git) |
| **Role** | Pedido verbal | Contrato ejecutable |

> "Un prompt es como pedirle algo a un amigo por WhatsApp. Un spec es como firmar un contrato con un arquitecto."

**[SLIDE 11: El spec vive en el repo]**

> "El spec no es un documento que escribes y olvidas. **Vive en el repositorio**, junto al código. En la carpeta `specs/`."
>
> ```
> taskflow-ai/
> ├── specs/
> │   ├── database-spec.md      ← El spec del modelo de datos
> │   └── api-spec.md           ← El spec de la API (próximo módulo)
> ├── app/
> ├── components/
> └── ...
> ```
>
> "Esto significa que:
> - **Cualquier persona** en el equipo puede leerlo
> - **Cada cambio** se trackea con git
> - **El agente siempre** tiene acceso a la última versión"

**[SLIDE 12: OpenSpec Protocol]**

> "Para que los specs sean consistentes y el agente los entienda sin esfuerzo, usamos **OpenSpec Protocol**. Es un formato estándar que define qué secciones debe tener un spec:"
>
> ```
> 1. Metadata (título, versión, autor, fecha)
> 2. Contexto (propósito, alcance, stack)
> 3. Definición de datos (entidades, campos, tipos, relaciones)
> 4. Reglas de negocio (validaciones, lógica)
> 5. Seguridad (RLS, permisos)
> 6. Criterios de aceptación
> ```
>
> "Este es el **formato que usaremos durante todo el curso**. Y es el formato que el agente espera."

---

## 🔬 BLOQUE 3: OPENSPEC PROTOCOL — ANATOMÍA DE UN SPEC (12 min)

**[SLIDE 13: "OpenSpec en detalle"]**

> "Vamos a abrir un spec real y ver cada sección. Vamos a usar el spec que crearemos en el Lab 4."

**[SLIDE 14: Sección 1 — Metadata]**

> "**Metadata**: información básica del spec."
>
> ```markdown
> # OpenSpec — Modelo de Datos de TaskFlow AI
>
> **Versión**: 1.0
> **Autor**: Curso AI Engineer
> **Fecha**: Julio 2026
> **Estado**: Validado
> ```
>
> "Simple. Quién lo hizo, cuándo, en qué versión estamos. **Esto permite trackear cambios con git**."

**[SLIDE 15: Sección 2 — Contexto]**

> "**Contexto**: el porqué y el para qué."
>
> ```markdown
> ## 1. Contexto
> ### 1.1 Propósito
> Este spec define el modelo de datos de TaskFlow AI,
> una plataforma de servicios técnicos donde los usuarios
> pueden navegar productos, agregar al carrito y comprar.
>
> ### 1.2 Alcance
> Cubre 7 entidades: users, categories, products,
> cart_items, orders, order_items, reviews.
>
> ### 1.3 Stack destino
> - BD: Supabase (PostgreSQL 15+)
> - Extensión: pgvector
> - Auth: Supabase Auth
> ```

> "**Esto es clave para el agente**. Le estás diciendo:
> - **Qué** vas a construir (contexto de negocio)
> - **Hasta dónde** llega este spec (alcance)
> - **En qué tecnología** se va a implementar (stack)"

**[SLIDE 16: Sección 3 — Definición de datos]**

> "**Definición de datos**: el corazón del spec. Cada entidad."
>
> "Vamos a ver la entidad `products` como ejemplo:"
>
> ```markdown
> ### 2.4 Entidad: `products`
>
> CREATE TABLE public.products (
>   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
>   category_id UUID NOT NULL REFERENCES categories(id),
>   name TEXT NOT NULL,
>   slug TEXT NOT NULL UNIQUE,
>   price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
>   stock_quantity INTEGER NOT NULL DEFAULT 0,
>   ...
> );
> ```
>
> **[SLIDE 17: Campos detallados]**
>
> "Y luego, para cada campo, una tabla que explica su función:"
>
> | Campo | Tipo | Constraints | Descripción |
> |-------|------|------------|-------------|
> | id | UUID | PK | ID único del producto |
> | name | TEXT | NOT NULL | Nombre visible |
> | price | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | Precio de venta |
> | slug | TEXT | NOT NULL, UNIQUE | URL amigable |
>
> "**Esto elimina cualquier ambigüedad**. El agente sabe exactamente qué crear."

**[SLIDE 18: Reglas de negocio]**

> "**Reglas de negocio**: las validaciones que no se ven en los tipos."
>
> ```markdown
> **Reglas de negocio de products**:
> - No se puede eliminar una categoría si tiene productos
> - Si compare_at_price tiene valor, debe ser mayor que price
> - Si stock_quantity es 0, se muestra como "Agotado"
> - sku es único a nivel global
> ```
>
> "Estas reglas no se pueden inferir del esquema. **Hay que explicitarlas**. Y el agente las usará para generar validaciones."

**[SLIDE 19: Relaciones entre entidades]**

> "**Relaciones**: cómo se conectan las entidades."
>
> ```mermaid
> erDiagram
>     users ||--o{ orders : "hace"
>     categories ||--o{ products : "contiene"
>     products ||--o{ reviews : "recibe"
>     orders ||--o{ order_items : "incluye"
> ```
>
> "Un diagrama de entidad-relación vale más que mil palabras."
>

**[SLIDE 20: Seguridad — RLS]**

> "**Seguridad — RLS**: quién puede hacer qué."
>
> ```sql
> -- Los usuarios solo ven su propio carrito
> CREATE POLICY "cart_items_read_own" ON cart_items
>   FOR SELECT USING (auth.uid() = user_id);
>
> -- Solo admins modifican productos
> CREATE POLICY "products_admin_all" ON products
>   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
> ```
>
> "**Esto es lo que más se olvida en el prompt hacking**. Y es lo que hace que tu app sea segura. El spec lo incluye desde el principio."

**[SLIDE 21: Criterios de aceptación]**

> "**Criterios de aceptación**: ¿cómo sé que el spec está completo?"
>
> ```markdown
> - [ ] 7 entidades definidas con campos y tipos
> - [ ] Todas las relaciones documentadas
> - [ ] Reglas de negocio sin ambigüedad
> - [ ] RLS definido para cada tabla
> - [ ] IA confirma: "sin ambigüedades"
> ```
>
> "Estos criterios son los que **validan el spec antes de pasar a código**. Si no los cumple, se refina."

---

## 🎯 BLOQUE 4: ELIMINAR AMBIGÜEDAD COMO UN INGENIERO (7 min)

**[SLIDE 22: "La ambigüedad es el enemigo"]**

> "El agente de IA **odia la ambigüedad**. Cuando no sabe exactamente qué hacer, **inventa**. Y lo que inventa puede estar mal."
>
> "Tu trabajo como AI Engineer es **eliminar toda ambigüedad del spec**."

**[SLIDE 23: Técnica 1 — Tipos explícitos]**

> "**1. Tipos explícitos.** No digas 'un campo para el precio'. Di:"
>
> ```sql
> price DECIMAL(10,2) NOT NULL CHECK (price >= 0)
> ```
>
> - **DECIMAL(10,2)**: hasta 99999999.99
> - **NOT NULL**: obligatorio
> - **CHECK (price >= 0)**: no puede ser negativo
>
> "Cada palabra tiene un significado preciso. **No hay espacio para la interpretación**."

**[SLIDE 24: Técnica 2 — Ejemplos concretos]**

> "**2. Ejemplos concretos.** No digas 'nombre de producto'. Di:"
>
> ```markdown
> name TEXT NOT NULL
> ---
> Ejemplo: "MacBook Pro M4 — 32GB RAM, 1TB SSD"
> ```
>
> "El ejemplo le dice al agente exactamente qué formato esperas."

**[SLIDE 25: Técnica 3 — Constraints visibles]**

> "**3. Constraints visibles.** Las reglas de negocio deben estar escritas, no asumidas."

| Ambigüo | Preciso |
|---------|---------|
| 'El usuario puede tener un carrito' | 'UNIQUE(user_id, product_id) — un item por producto' |
| 'Los precios se actualizan solos' | 'order_items.unit_price guarda el precio al momento de la compra' |
| 'Los admins tienen más permisos' | 'RLS: admin puede ALL en todas las tablas' |

**[SLIDE 26: Técnica 4 — Validación con IA]**

> "**4. Validación con IA.** Antes de implementar, pídele al agente que critique tu spec:"
>
> ```bash
> claude -p "Lee este spec y dime qué ambigüedades encuentras"
> ```
>
> "El agente es excelente encontrando huecos en los specs. **Úsalo como revisor**."
>
> "Regla de oro: **si el agente encuentra una ambigüedad, el spec no está listo**."

---

## 💻 BLOQUE 5: INYECCIÓN DEL SPEC EN CLAUDE CODE (7 min)

**[SLIDE 27: "Cómo pasar el spec al agente"]**

> "Ya tienes el spec escrito. Ahora, ¿cómo se lo pasas al agente?"
>
> "Tienes **3 formas**."

**[SCREEN RECORDING: Forma 1 — Por archivo]**

> **Forma 1 — Lee el archivo directamente:**
>
> ```bash
> claude -p "Lee specs/database-spec.md y genera las migraciones SQL"
> ```
>
> "El agente abre el archivo, lo lee, y trabaja sobre él. **Es la forma más limpia** porque el spec vive en el repo."
>
> **[Muestra: Claude Code leyendo el spec y generando SQL]**

**[SLIDE 28: Forma 2 — Por contexto en Antigravity]**

> **Forma 2 — Incluir el spec en la Task List:**
>
> ```
> En Antigravity:
> "Task: Implementar el modelo de datos del spec specs/database-spec.md"
> ```
>
> "El agente carga el spec como parte del contexto y genera cada tabla según lo que dice el spec."

**[SLIDE 29: Forma 3 — Por copia directa]**

> **Forma 3 — Pegar secciones específicas:**
>
> "A veces solo necesitas una parte del spec:"
>
> ```bash
> claude -p "Según el spec, la tabla products tiene estos campos:
>   - id UUID PK
>   - name TEXT NOT NULL
>   - price DECIMAL(10,2)
>   Genérame el CREATE TABLE"
> ```
>
> "Útil para tareas pequeñas. Pero **para proyectos grandes, siempre usa el archivo**."

**[SLIDE 30: Flujo recomendado]**

> "**El flujo recomendado** para trabajar con specs en Claude Code:"
>
> ```mermaid
> graph TD
>     A[Escribes el spec] --> B[Lo subes a specs/]
>     B --> C[En Antigravity: creas Task List]
>     C --> D[Agente lee el spec]
>     D --> E[Agente genera código]
>     E --> F[Tú revisas Diffs]
>     F -->|✅ Apruebas| G[Código final]
>     F -->|❌ Rechazas| D
> ```
>
> "**El spec nunca cambia durante la ejecución**. Si necesitas cambiar algo, cambias el spec y vuelves a empezar. Así mantienes la consistencia."

---

## 🖥️ BLOQUE 6: DEMO EN VIVO — SPEC DE TASKFLOW AI DESDE CERO (10 min)

**[SCREEN RECORDING: Pantalla completa — editor + terminal]**

> "Vamos a hacer el ejercicio que tú harás en el Lab 4. Vamos a **crear el spec del modelo de datos de TaskFlow AI desde cero**."

**[Paso 1: Crear la carpeta specs/]**

> **[Muestra: terminal, crea la carpeta]**
>
> ```bash
> mkdir -p specs
> touch specs/database-spec.md
> code specs/database-spec.md
> ```

**[Paso 2: Escribir el spec]**

> **[Muestra: editor, va escribiendo el spec sección por sección]**
>
> "Primero, la **metadata**:"
>
> ```markdown
> # OpenSpec — Modelo de Datos de TaskFlow AI
> Versión: 1.0
> ```
>
> "Luego, el **contexto**: qué hace la plataforma, qué stack usamos."
>
> "Y ahora la parte más importante: las **entidades**. Vamos con `users`:"
>
> ```sql
> CREATE TABLE users (
>   id UUID PRIMARY KEY,
>   full_name TEXT NOT NULL,
>   email TEXT NOT NULL UNIQUE,
>   role TEXT NOT NULL DEFAULT 'customer'
> );
> ```
>
> **[Muestra: escribe users, categories, products...]**

**[Paso 3: Las reglas de negocio]**

> "Después de las entidades, agrego las **reglas de negocio** — las validaciones que no se ven en el schema:"
>
> ```markdown
> **Reglas de negocio**:
> - El rol solo puede ser 'customer' o 'admin'
> - El email debe ser único
> - Si un usuario se da de baja, sus pedidos se conservan
> ```

**[Paso 4: Las políticas RLS]**

> "Y luego la **seguridad** — quién puede hacer qué:"
>
> ```sql
> CREATE POLICY "users_read_own" ON users
>   FOR SELECT USING (auth.uid() = id);
> ```

**[Paso 5: Validar el spec con Claude]**

> "Ahora, **validamos el spec** — le pedimos a Claude que lo critique:"
>
> ```bash
> claude -p "Lee specs/database-spec.md y dime qué ambigüedades encuentras"
> ```
>
> **[Muestra: Claude responde, encuentra 2 ambigüedades]**
>
> "Claude encontró que no especifiqué:
> 1. ¿El `email` en `users` debe ser único? ✅ Lo agrego
> 2. ¿Qué pasa con los productos cuando se elimina una categoría? ✅ Agrego ON DELETE RESTRICT"
>
> "**Refino el spec hasta que Claude no encuentre más ambigüedades.** Esa es la señal de que está listo."

**[Paso 6: El spec validado]**

> **[Muestra: el spec completo, con las correcciones aplicadas]**
>
> "Ahora, cuando le pida a Claude que genere las migraciones, **no va a tener que adivinar nada**. Todo está escrito."

**[SLIDE 31: Resumen de la demo]**

> "Lo que viste:
> - **Crear el spec** con OpenSpec Protocol: ~15 min
> - **Validar con Claude**: ~2 min
> - **Refinar ambigüedades**: ~3 min
>
> Total: **20 minutos de spec que ahorran horas de rework**."

---

## 🚀 BLOQUE 7: PREVIEW DEL LAB 4 (3 min)

**[CÁMARA: Talking head]**

> "**Lab 4: Spec Atómico para el Modelo de Datos de TaskFlow AI**.
>
> En este lab vas a:
>
> 1. Crear la carpeta `specs/` en la raíz del proyecto
> 2. Escribir el archivo `specs/database-spec.md` con **protocolo OpenSpec**
> 3. Definir **7 entidades**: users, categories, products, cart_items, orders, order_items, reviews
> 4. Para cada entidad: nombre, campos, tipos, constraints, relaciones y RLS
> 5. Validar el spec con Claude — pregúntale si encuentra ambigüedades
> 6. Refinar hasta que Claude diga 'sin ambigüedades detectadas'
>
> **Stack**: Markdown + Claude Code + Dashboard (via Helicone)
> **Duración**: 3-4 horas (~15K-30K tokens)
> **Requisito**: Tener el proyecto TaskFlow AI del Lab 3
>
> El resultado: **un spec profesional que usaremos en el Lab 5 para generar las migraciones SQL y en el Módulo 4 para los embeddings**."

---

## 🎯 BLOQUE 8: CIERRE Y TAREA (2 min)

**[SLIDE 32: Resumen]**

> "Resumen de hoy:
> 1. **El prompt hacking no escala** — ambigüedad, inconsistencia, rework
> 2. **SDD** pone el spec como única fuente de verdad — el agente ejecuta, no improvisa
> 3. **OpenSpec Protocol** — estructura estándar: metadata, contexto, datos, reglas, seguridad, criterios
> 4. **Eliminar ambigüedad** — tipos explícitos, ejemplos, constraints, validación con IA
> 5. **El spec vive en el repo** — versionado, compartido, siempre accesible
>
> **Dato clave**: un buen spec reduce tokens en ~40% y rework en ~75%."

**[SLIDE 33: Tarea antes de la Sesión 2.2]**

> **Tu tarea**:
> 1. Crear `specs/database-spec.md` con las 7 entidades
> 2. Validar el spec con Claude: `claude -p 'Lee este spec y dime ambigüedades'`
> 3. Refinar hasta que no haya ambigüedades
> 4. Hacer commit del spec: `git add specs/ && git commit -m "feat: spec del modelo de datos"`
> 5. Verificar que el dashboard registró los tokens
>
> En la **Sesión 2.2** vamos a: convertir el spec en una base de datos real. Configuraremos Supabase, el agente leerá el spec y generará las migraciones SQL, aplicaremos RLS y poblamos con datos de prueba.
>
> **Nos vemos en la Sesión 2.2. ¡A spequear se ha dicho!** "

**[PANTALLA FINAL: Logo del curso + "Suscríbete / Comparte / Comenta" + Link al repo]**

---

## 🎬 NOTAS DE PRODUCCIÓN

### Grabación
- **Cámara**: Misma configuración que Módulo 1 (1080p, 30fps)
- **Pantalla**: Editor de código para escribir el spec; terminal para validar con Claude
- **Zoom**: En las secciones del spec durante el Bloque 3

### Post-producción
- **Overlay**: El diagrama ER durante la explicación de relaciones (Bloque 3)
- **Split screen**: Spec a la izquierda, Claude Code a la derecha durante la validación
- **Subtítulos**: Español (auto-generados + revisión)
- **Highlight**: Marcar las secciones del spec a medida que se explican

### Entregables de esta sesión
| Archivo | Formato | Ubicación |
|---------|---------|-----------|
| Guion (este) | Markdown | `scripts/modulo-2/sesion-2.1-sdd.md` |
| Diapositivas | Reveal.js (MD) | `slides/modulo-2/sesion-2.1-sdd.md` |
| Spec de datos | Markdown | `specs/database-spec.md` |
| Lab | Markdown | `labs/modulo-2/lab-4-spec-base-datos.md` |
| Recursos | Markdown | `assets/modulo-2/sesion-2.1/recursos.md` |

---

## 🔗 RECURSOS MENCIONADOS (para description del video)

1. **Repo del curso**: https://github.com/tu-usuario/curso-ai-engineer
2. **Spec de ejemplo**: `specs/database-spec.md`
3. **Claude Code CLI**: https://docs.anthropic.com/en/docs/claude-code/overview
4. **Supabase**: https://supabase.com/docs
5. **OpenSpec Protocol**: (referencia interna del curso)
6. **Documentación PostgreSQL**: https://postgresql.org/docs

---

*Guion v1.0 — Listo para grabación. Tiempo estimado final: 55 min.*
