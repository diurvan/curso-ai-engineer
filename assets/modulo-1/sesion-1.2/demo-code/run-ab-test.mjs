// run-ab-test.mjs
// A/B Test: Haiku vs Sonnet — genera meta-descriptions y reporta al dashboard
// Uso: ANTHROPIC_API_KEY="sk-..." DASHBOARD_URL="https://..." node run-ab-test.mjs

import Anthropic from '@anthropic-ai/sdk'
import { trackAnthropic } from '@curso-ai/metrics'

const client = new Anthropic()
const dashboardUrl = process.env.DASHBOARD_URL
const project = 'lab-2'

const prompt = `Genera una meta-description SEO de máximo 160 caracteres para cada una de estas 10 páginas de una tienda de tecnología:

1. Inicio — Tienda de tecnología con envío gratis
2. Categoría Laptops — Gaming, office y ultrabooks
3. Producto: MacBook Pro M4 — 32GB RAM, 1TB SSD
4. Categoría Audífonos — Inalámbricos, diadema, deportivos
5. Producto: Sony WH-1000XM6 — Cancelación de ruido
6. Categoría Monitores — 4K, gaming, ultrawide
7. Producto: Samsung Odyssey G9 — 49" curvo, 240Hz
8. Página "Sobre Nosotros" — 10 años en el mercado
9. Página de Contacto — Soporte técnico y ventas
10. Blog: "Cómo elegir tu primera laptop gaming"

Formato: Página: [nombre] | Meta: [descripción]`

const messages = [{ role: 'user', content: prompt }]

async function run() {
  // --- HAIKU ---
  console.log('▶ Ejecutando Haiku...')
  const startHaiku = Date.now()
  const haiku = await trackAnthropic(
    client.messages.create({ model: 'claude-haiku-3.5', messages, max_tokens: 2000 }),
    { project, dashboardUrl, endpoint: '/ab-test/haiku' }
  )
  const haikuTime = ((Date.now() - startHaiku) / 1000).toFixed(1)
  console.log(`  Hecho en ${haikuTime}s`)

  // --- SONNET ---
  console.log('▶ Ejecutando Sonnet...')
  const startSonnet = Date.now()
  const sonnet = await trackAnthropic(
    client.messages.create({ model: 'claude-sonnet-4', messages, max_tokens: 2000 }),
    { project, dashboardUrl, endpoint: '/ab-test/sonnet' }
  )
  const sonnetTime = ((Date.now() - startSonnet) / 1000).toFixed(1)
  console.log(`  Hecho en ${sonnetTime}s`)

  // --- RESULTADOS ---
  console.log('\n=== RESULTADOS ===')
  console.log(`Haiku:  ${haiku.usage.input_tokens} in / ${haiku.usage.output_tokens} out | ${haikuTime}s`)
  console.log(`Sonnet: ${sonnet.usage.input_tokens} in / ${sonnet.usage.output_tokens} out | ${sonnetTime}s`)
  console.log('\nAbre tu dashboard para ver la comparativa.')
}

run().catch(console.error)
