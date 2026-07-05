# 🚀 Development Track — Curso AI Engineer

**Estrategia**: SDD — cada módulo tiene un spec que guía la creación de contenido.

---

## Progreso General

| Módulo | Estado | Sesiones | Labs | Spec | Plan |
|--------|--------|----------|------|------|------|
| 1 — Fundamentos Agentic | ✅ **100%** | 3/3 | 3/3 | ✅ | ✅ |
| 2 — Spec-Driven Development | ✅ **100%** | 2/2 | 2/2 | ✅ | ✅ |
| 3 — Frontend Multimodal | ✅ **Completo** | 2/2 | 2/2 | ✅ | ✅ |
| 4 — RAG y Bases Vectoriales | ⬜ Pendiente | 0/2 | 0/2 | ⬜ | ⬜ |
| 5 — MCP, Skills y Gobernanza | ⬜ Pendiente | 0/2 | 0/2 | ⬜ | ⬜ |
| 6 — Testing, CI/CD y Producción | ⬜ Pendiente | 0/4 | 0/4 | ⬜ | ⬜ |
| 7 — Pipeline Completo + Proyecto | ⬜ Pendiente | 0/2 | 0/2 | ⬜ | ⬜ |

---

## Flujo de trabajo por módulo

```
1. Leer course-spec.md → entender contexto global
2. Leer/crear modulo-N-spec.md → entender alcance del módulo
3. Generar Implementation Plan → desglosar sesiones
4. Por cada sesión:
   a. Script Agent (Sonnet) → genera guión
   b. Slides Agent (Haiku) → genera slides desde guión
   c. Lab Agent (Sonnet) → genera lab desde spec técnico
   d. Assets Agent (Haiku) → genera demo code + recursos
5. Validar consistencia → cross-references, paths, prerequisitos
6. Actualizar dev-track.md → marcar progreso
7. Actualizar AI-Engineer-Roadmap-2026.md → reflejar archivos
```

---

## Próximos pasos

### Módulo 3 — Frontend Multimodal ✅ **Completo**

**Sesión 3.1 — De Boceto a Producto con Claude Vision**
- Guión: `scripts/modulo-3/sesion-3.1-vision.md`
- Slides: `slides/modulo-3/sesion-3.1-vision.md`
- Lab 6: `labs/modulo-3/lab-6-landing-wireframe.md`
- Assets: `assets/modulo-3/sesion-3.1/` (recursos, demo-code/wireframe.excalidraw)
- Stack: Claude Vision + Tailwind CSS + Shadcn/UI
- Tokens: ~30K-60K

**Sesión 3.2 — Frontend Vivo: CRUD y Code Review**
- Guión: `scripts/modulo-3/sesion-3.2-frontend-crud.md`
- Slides: `slides/modulo-3/sesion-3.2-frontend-crud.md`
- Lab 7: `labs/modulo-3/lab-7-frontend-crud.md`
- Assets: `assets/modulo-3/sesion-3.2/` (recursos, demo-code con 4 archivos)
- Stack: Next.js 15 + Supabase SSR + Claude Sonnet
- Tokens: ~25K-50K

### Siguiente: Módulo 4 — RAG y Bases Vectoriales (Semanas 5-6)
- Sesión 4.1: Embeddings y búsqueda semántica
- Sesión 4.2: Chatbot con memoria y contexto

---

## Notas

- Los specs retroactivos de M1 y M2 se crearon después del contenido (documentación)
- A partir de M3, el spec se crea **antes** del contenido (SDD real)
- Sub-agentes son roles conceptuales: el agente principal orquesta según el tipo de tarea
