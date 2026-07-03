import type { OpenAIUsage, TrackOptions } from '../types.ts'
import { estimateCost } from '../costs.ts'
import { report } from '../reporter.ts'

export async function trackOpenAI<T extends { usage: OpenAIUsage; model: string }>(
  promise: Promise<T>,
  opts: TrackOptions,
): Promise<T> {
  const result = await promise
  const model = opts.model ?? result.model
  const input_tokens = result.usage.prompt_tokens
  const output_tokens = result.usage.completion_tokens
  const cached_tokens = result.usage.cached_tokens ?? 0
  const cost = opts.cost ?? estimateCost(model, input_tokens, output_tokens) ?? 0

  await report({
    project: opts.project,
    model,
    input_tokens,
    output_tokens,
    cached_tokens: opts.cost !== undefined ? 0 : cached_tokens,
    cost,
    endpoint: opts.endpoint ?? '/api/openai',
    dashboardUrl: opts.dashboardUrl,
  })

  return result
}
