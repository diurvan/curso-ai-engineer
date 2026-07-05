#!/bin/bash
# Script de validación de Spec para el Lab 4
# Uso: bash validacion-spec.sh
#
# Este script ejecuta las validaciones recomendadas
# sobre el spec del modelo de datos.

echo "🔍 Validando spec de TaskFlow AI..."
echo ""

SPEC_FILE="specs/database-spec.md"

# 1. Verificar que el archivo existe
if [ ! -f "$SPEC_FILE" ]; then
  echo "❌ ERROR: No se encuentra $SPEC_FILE"
  echo "   Crea el archivo spec antes de validar."
  exit 1
fi
echo "✅ Archivo $SPEC_FILE encontrado"

# 2. Verificar secciones obligatorias
echo ""
echo "📋 Verificando secciones OpenSpec..."

check_section() {
  local section="$1"
  if grep -q "$section" "$SPEC_FILE"; then
    echo "  ✅ Sección encontrada: $section"
  else
    echo "  ⚠️  Sección NO encontrada: $section"
  fi
}

check_section "Contexto"
check_section "Propósito"
check_section "Stack"
check_section "users"
check_section "categories"
check_section "products"
check_section "cart_items"
check_section "orders"
check_section "order_items"
check_section "reviews"
check_section "Reglas de negocio"
check_section "RLS"
check_section "Criterios de Aceptación"

# 3. Contar entidades
echo ""
ENTITY_COUNT=$(grep -c "^### 2\." "$SPEC_FILE" 2>/dev/null || echo "0")
echo "📊 Entidades encontradas: $ENTITY_COUNT (esperado: 7)"

# 4. Verificar que cada entidad tiene CREATE TABLE
echo ""
echo "📝 Verificando CREATE TABLE por entidad..."
TABLE_COUNT=$(grep -c "CREATE TABLE" "$SPEC_FILE" 2>/dev/null || echo "0")
echo "  Sentencias CREATE TABLE: $TABLE_COUNT (esperado: 7)"

# 5. Verificar políticas RLS
echo ""
echo "🔐 Verificando políticas RLS..."
RLS_COUNT=$(grep -c "CREATE POLICY" "$SPEC_FILE" 2>/dev/null || echo "0")
echo "  Políticas RLS definidas: $RLS_COUNT"

# 6. Verificar criterios de aceptación
echo ""
if grep -q "sin ambigüedades\|validado\|Criterios" "$SPEC_FILE"; then
  echo "✅ Criterios de aceptación definidos"
else
  echo "⚠️  No se encontraron criterios de aceptación"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 Próximo paso: Validar con Claude Code"
echo ""
echo "  claude -p \"Lee $SPEC_FILE y dime"
echo "    qué ambigüedades encuentras\""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
