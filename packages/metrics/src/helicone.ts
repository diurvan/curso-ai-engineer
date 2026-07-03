import type { HeliconeSyncOptions } from './types.ts'
import { estimateCost } from './costs.ts'
import { report } from './reporter.ts'

interface HeliconeRequest {
  request_id: string
  model: string
  prompt_tokens: number
  completion_tokens: number
  cost?: number
  time_created: string
  user_id?: string
}

export async function syncHelicone(opts: HeliconeSyncOptions): Promise<{ synced: number }> {
  const params = new URLSearchParams()
  if (opts.since) params.set('since', opts.since)
  if (opts.limit) params.set('limit', String(opts.limit))

  const url = `https://www.helicone.ai/api/usage?${params}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${opts.heliconeApiKey}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Helicone API error: ${res.status} ${await res.text()}`)
  }

  const data: HeliconeRequest[] = await res.json()
  let synced = 0

  for (const req of data) {
    const input_tokens = req.prompt_tokens
    const output_tokens = req.completion_tokens
    const cost = req.cost ?? estimateCost(req.model, input_tokens, output_tokens) ?? 0

    await report({
      project: opts.project,
      model: req.model,
      input_tokens,
      output_tokens,
      cached_tokens: 0,
      cost,
      endpoint: '/helicone',
      timestamp: req.time_created,
      dashboardUrl: opts.dashboardUrl,
    })

    synced++
  }

  return { synced }
}
