# Comparativa: Prompt vs Spec — El mismo problema, dos enfoques

Este archivo muestra la **diferencia práctica** entre resolver un problema con prompt hacking vs con un spec. Es el material de apoyo para la demo de la Sesión 2.1.

---

## El problema

"Crear una tabla de productos para una tienda online, con precio, stock y categoría."

---

## Enfoque 1: Prompt hacking

### Intento 1 — Prompt vago
```
Crea una tabla de productos
```
> El agente crea algo genérico. Sin precio, sin stock, sin categoría.

### Intento 2 — Agregar detalles
```
Crea una tabla de productos con nombre, precio, stock y categoría
```
> El agente crea los campos pero los tipos son incorrectos: `precio` como TEXT, `stock` como VARCHAR.

### Intento 3 — Especificar tipos
```
Crea una tabla de productos con:
- id (UUID)
- nombre (TEXT)
- precio (DECIMAL)
- stock (INTEGER)
- categoria_id (UUID, referencia a categories)
```
> Ahora sí se acerca. Pero falta el CHECK de precio >= 0, el DEFAULT de stock, el ON DELETE...

**Resultado**: 3 intentos, ~15 minutos, ~8K tokens, y aún falta pulir.

---

## Enfoque 2: Spec-Driven Development

### El spec
```markdown
### Entidad: products

```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Reglas de negocio**:
- No se puede eliminar una categoría si tiene productos
- price debe ser >= 0
- stock = 0 → producto "Agotado"
```

### La ejecución
```bash
claude -p "Lee specs/database-spec.md y genera las migraciones SQL"
```

**Resultado**: 1 intento, ~30 segundos, ~1.5K tokens de contexto. El agente genera el SQL exacto, sin preguntar nada.

---

## Comparativa lado a lado

| Aspecto | Prompt hacking | SDD con Spec |
|---------|---------------|--------------|
| Intentos | 3+ | 1 |
| Tiempo | ~15 min | ~30 seg |
| Tokens | ~8K | ~1.5K |
| Costo | ~$0.12 (Sonnet) | ~$0.02 (Sonnet) |
| Precisión | 70% (hay que corregir) | 100% (sigue el spec) |
| Reutilizable | No | Sí (vive en specs/) |
| Versionable | No | Sí (git) |

---

## Conclusión

> **El spec no es más trabajo. Es inversión.**
>
> Inviertes 20 minutos en escribir el spec y ahorras horas de rework.
> Y el spec sirve para todo el proyecto, no solo para una tarea.
