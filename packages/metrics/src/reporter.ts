import type { ReportData } from './types.ts'

export async function report(data: ReportData): Promise<Response> {
  const url = data.dashboardUrl?.replace(/\/$/, '') + '/api/logs'
  const payload = {
    project: data.project,
    model: data.model,
    input_tokens: data.input_tokens,
    output_tokens: data.output_tokens,
    cached_tokens: data.cached_tokens ?? 0,
    cost: data.cost,
    endpoint: data.endpoint ?? '/api/generic',
    timestamp: data.timestamp ?? new Date().toISOString(),
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    console.warn(`[curso-ai/metrics] Dashboard returned ${res.status}: ${text}`)
  }

  return res
}
