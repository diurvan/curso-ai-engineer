## Ruta de Aprendizaje

7 módulos para dominar AI Agentic Engineer

5 Semanas · Ritmo Sugerido

### Módulo 1 - Fundamentos Agentic: Arquitectura, Estrategia y Costos

- Sesión 1. Tu Primer Agente Productivo: Arquitectura Real y Control de Costos
- Estructura y arquitectura del proyecto TaskFlow AI.
- Instalación y configuración de la CLI de Claude Code.
- Análisis de capacidades. cuándo usar Haiku, Sonnet u Opus.
- Técnicas de optimización de prompts y reducción de consumo de tokens.
- Creación de métricas base y control de gastos en el entorno de desarrollo.
- STACK: Claude Code CLI, Google Antigravity Next.js 15
- Entregable: Lab Configuración inicial del entorno. Script automatizado para ejecutar un test A/B de rendimiento y costos entre Haiku y Sonnet generando contenido dinámico (meta-descripciones SEO o copys) para las páginas de la plataforma web.
- Sesión 2. Orquesta Múltiples Agentes: Cómo Antigravity Convierte tu IDE en un Equipo de Trabajo
- Interfaz bidireccional de Antigravity. Editor tradicional vs. Agent Manager.
- Gestión del sistema de Artifacts (Task Lists e Implementation Plans).
- Orquestación de múltiples agentes para resolver problemas asíncronos.
- Evaluación y aprobación de Diffs generados por IA.
- Estrategias de aislamiento para prevenir alucinaciones de código en el IDE.
- STACK: Claude Code CLI, Google Antigravity Next.js 15
- Entregable: Lab: Uso del Agent Manager de Antigravity para planificar y estructurar el andamiaje principal de la página web en Next.js, aprobando los Diffs paso a paso (Header, Footer, Navegación y estructura de la Landing Page).

### Módulo 2 - Spec-Driven Development (SDD): El Contrato que Ejecuta la IA

- Sesión 1. El Fin del Prompt Hacking: SDD como el Contrato que Hace Predecible a tu Agente
- Del "prompt hacking" a la ingeniería predecible. el Spec como única fuente de verdad.
- Técnicas para eliminar la ambigüedad y evitar el rework del agente.
- Definición de contratos de datos e interfaces antes de escribir la lógica.
- Inyección del Spec en el flujo de trabajo de Claude Code.
- STACK: Spec-Driven Development (SDD), Claude Code, Antigravity
- Entregable: Lab: Redactar un Spec atómico para el modelo de base de datos de la plataforma web (tablas de usuarios, catálogo de productos/servicios y carrito de compras) y validarlo en el entorno para comprobar que no tiene ambigüedades.
- Sesión 2. El Agente Ejecuta el Contrato: Backend Funcional y Seguro en Supabase
- Fundamentos de App Router y Server/Client Components en Next.js 15.
- Configuración y despliegue del proyecto Supabase.
- Generación y ejecución de migraciones SQL asistida por Claude.
- Implementación y pruebas de políticas de seguridad Row Level Security (RLS).
- Estrategias guiadas por agentes para poblar la base con datos de prueba.
- STACK: Next.js 15, Supabase, PostgreSQL, Claude Code
- Entregable: Lab: El agente ejecuta el Spec del Lab 3 para crear las tablas del catálogo y de usuarios en Supabase, aplicando y testeando las reglas de seguridad de acceso (RLS).

### Módulo 3 - Frontend Multimodal e Interfaces Inteligentes

- Sesión 1. De Boceto a Producto: Claude Vision Convierte tus Wireframes en Interfaces Reales
- Integración de Tailwind CSS y la biblioteca de componentes Shadcn/UI.
- Flujo multimodal. conversión de wireframes (imágenes) a código React usando Claude Vision.
- Diseño de interfaces interactivas. lógica de Drag & Drop.
- Aislamiento y modularidad del estado mediante React Custom Hooks.
- Adaptación de Specs visuales para que el agente respete el sistema de diseño.
- STACK: Tailwind CSS, Shadcn/UI, React (Custom Hooks, Drag & Drop), Claude Vision
- Entregable: Lab: Subir un boceto o wireframe de la interfaz a Claude Vision para que el agente genere una Landing Page moderna y una galería de productos/servicios funcional con diseño responsivo.
- Sesión 2. Frontend Vivo: CRUD, Code Review Automático y Cero Errores Silenciosos
- Contextualización del código heredado para que el agente comprenda el ecosistema actual.
- Ejecución de lógica de negocio (CRUD) conectando el frontend con Supabase.
- Manejo de estados de carga (Loading) y prevención de errores silenciosos.
- Independencia de frameworks. mantener el control en procesos generativos.
- Ciclos de Code Review automatizados utilizando Sonnet como revisor técnico.
- STACK: Supabase — conexión CRUD desde el frontend, Claude Sonnet — como revisor técnico automatizado
- Entregable: Lab: El agente implementa la conexión asíncrona para que la galería del Lab 5 consuma y muestre dinámicamente los datos reales del catálogo alojado en Supabase.

### Módulo 4 - RAG y Bases Vectoriales: Productos con Memoria Propia

- Sesión 1. Dale Memoria a tu Producto: RAG, pgvector y Embeddings que Entienden tu Negocio
- Arquitectura y flujos de trabajo de sistemas Retrieval Augmented Generation (RAG).
- Configuración e integración de pgvector en bases de datos PostgreSQL.
- Generación de Embeddings a partir de texto utilizando la API de Claude.
- Métodos de chunking y partición de datos para mejorar el contexto.
- Enlace entre conocimiento privado (datos de usuario) y consultas externas.
- STACK: pgvector — almacenamiento de embeddings en PostgreSQL, API de Claude — generación de embeddings
- Entregable: Lab: Script automatizado que escucha la creación de nuevos ítems en la base de datos, genera sus embeddings a partir de descripciones y características, y los almacena en pgvector.
- Sesión 2. El Asistente que Cierra Ventas: Chatbot RAG Embebido con Conocimiento Real del Catálogo
- Desarrollo de interfaces de chat inteligente embebidas en el producto.
- Inyección dinámica del contexto recuperado en el prompt de sistema del modelo.
- Búsqueda de similitud semántica y filtros RLS combinados.
- Refinamiento de interacciones naturales y prevención de alucinaciones en el chat.
- UX para interacciones con el agente de IA integrado en la plataforma.
- STACK: Supabase, Claude, pgvector
- Entregable: Lab: Construcción de un "Asistente de Navegación/Ventas" embebido que permite al visitante preguntar cosas como "¿Qué servicios tienen para pequeñas empresas?" respondiendo con el catálogo real del sitio.

### Módulo 5 - Extensibilidad Agentic: MCP, Custom Skills y Gobernanza

- Sesión 1. MCP: Conecta tu Agente al Mundo Real. File System, Terminal y Herramientas Propias
- Conceptos fundamentales del Model Context Protocol (MCP).
- Ciclo de vida de un servidor MCP para conectar Claude al entorno de desarrollo.
- Gestión de permisos y seguridad al dar acceso local al modelo.
- Interacción de la IA con el File System y herramientas de la terminal.
- Casos prácticos de automatización de tareas tediosas con MCP.
- STACK: MCP (Model Context Protocol), Claude
- Entregable: Lab: Crear un servidor MCP que permite a Claude leer en tiempo real la carpeta de assets públicos y el mapa del sitio para mejorar el contexto al construir nuevas secciones de la web.
- Sesión 2. Programa tu Propio Tech Lead. Skills que Auditan, Corrigen y Gobiernan tu Código Solos
- Arquitectura de Custom Skills para extender el razonamiento del modelo.
- Lógica y programación de validadores automáticos de código.
- Integración de Skills de revisión en el flujo Spec-Driven Development.
- Delegación estructurada de reducción de deuda técnica a los agentes.
- Monitoreo de ejecución de Skills personalizadas.
- Entregable: Programar un Skill tipo "Tech Lead" que intercepta el código recién generado y exige correcciones automáticas si viola principios de accesibilidad web (a11y) o buenas prácticas de SEO técnico.

### Módulo 6 - Testing, CI/CD y Despliegue a Producción

- Sesión 1. Programa tu Propio Tech Lead. Skills que Auditan, Corrigen y Gobiernan tu Código Solos
- Comandos internos de Claude Code para análisis de trazas y depuración.
- Tests unitarios rápidos y efectivos usando Vitest.
- Generación de baterías de pruebas basadas en los criterios de los Specs (SDD).
- Interpretación de logs de consola y flujos de resolución recursiva guiados por IA.
- El principio. "el test es la única fuente de verdad".
- STACK: Vitest, Claude Code
- Entregable: El agente lee las especificaciones de la web y genera de forma autónoma una suite completa de pruebas con Vitest para validar la lógica del frontend (filtros de búsqueda del catálogo y cálculo de totales del carrito).
- Sesión 2. Playwright + IA. Si el Test Falla, el Agente lo Corrige Solo Sin Intervención
- Configuración de entornos de prueba completos con Playwright.
- Diseño de flujos de simulación de comportamiento de usuarios reales.
- Generación de selectores estables y scripts asíncronos con asistencia multimodal.
- Ejecución de validaciones de outputs antes de fusionar el código generado.
- Retroalimentación automática. si el test E2E falla, el agente recibe el error y lo corrige sin intervención.
- STACK: Playwright
- Entregable: Lab: Prueba E2E automatizada que levanta la página, simula un visitante navegando por la Landing Page, interactuando con el chatbot RAG y completando un formulario de contacto o carrito de compras.
- Sesión 3. Listo para el Mundo Real. Core Web Vitals, Secrets y Costos de IA Bajo Control
- Auditorías asíncronas de rendimiento y mejora de Core Web Vitals apoyadas por IA.
- Refactorización de componentes ineficientes o cuellos de botella en la base de datos.
- Gestión y protección de variables de entorno (Secrets) para entornos cloud.
- Estrategias de caché y límites de consumo de IA para reducir costos en producción.
- Prácticas seguras para exponer APIs que consumen servicios de Anthropic.
- Entregable: Lab: El agente escanea toda la web, documenta cuellos de botella (imágenes pesadas, renderizado bloqueante) y aplica parches para optimizar SEO y Core Web Vitals (LCP, CLS).
- Sesión 4. Push y Olvídate. GitHub Actions + Vercel Despliegan tu Producto en Cada Push
- Flujos de integración continua (CI) mediante GitHub Actions.
- Pasos obligatorios de Linting y Testing automatizado en el pipeline.
- Despliegues continuos (CD) vinculados a Vercel.
- Generación de documentación técnica autónoma con Claude.
- Ciclos de revisión de Pull Requests realizados íntegramente por agentes.
- STACK: GitHub Actions, Vercel, Vitest, Playwright, Claude
- Entregable: Lab: Archivo YAML de GitHub Actions que ante cada Push ejecuta Vitest, corre la prueba E2E de Playwright y, si todo pasa, publica una versión viva de la página en Vercel.

### Módulo 7 - Pipeline Agentic Completo: De Spec a Producción y Proyecto Final

- Sesión 1. War Room. De Spec a Producción en Minutos. el Pipeline Completo en Tiempo Real
- Revisión end-to-end del flujo. Spec → Plan Antigravity → Skills MCP → Código → CI/CD.
- Identificación y depuración de edge cases en el ciclo de vida de la aplicación.
- Simulación de una adición de feature en vivo. de Spec a Producción en minutos.
- Preparación de métricas e hitos para la demostración final del producto.
- Congelamiento de código y estabilización de la versión de lanzamiento de TaskFlow AI.
- STACK: Antigravity, MCP
- Entregable: Lab: "War Room" simulado. El instructor introduce un bug visual y una spec de feature rápida (banner promocional de última hora); el estudiante usa el agente para resolver ambas y empujar a producción.
- Sesión 2. Showcase. Tu Producto Inteligente en Vivo, Funcional y Listo para el Portafolio
- Técnicas para presentar arquitecturas generadas por IA a stakeholders técnicos.
- Áreas de mejora estructurales en la base de código resultante.
- Roadmap del desarrollador. integración de APIs híbridas y sistemas multi-agente.
- Retroalimentación grupal y lecciones aprendidas sobre el desarrollo SDD.
- Entregable: Lab: Proyecto Final / Showcase. Cada participante presenta su Página Web Inteligente end-to-end en vivo. frontend interactivo consumiendo la base de datos, tests E2E pasando, chatbot RAG funcionando y pipeline CI/CD de publicación activo.