export interface ModelCost {
  input: number
  output: number
}

const MODEL_COSTS: Record<string, ModelCost> = {
  'claude-sonnet-4': { input: 3.00, output: 15.00 },
  'claude-haiku-3.5': { input: 0.80, output: 4.00 },
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
}

export function getModelCost(model: string): ModelCost | undefined {
  const key = Object.keys(MODEL_COSTS).find(
    (k) => model.toLowerCase().includes(k.replace(/[.-]/g, ''))
    || k.includes(model.replace(/[.-]/g, ''))
  )
  return key ? MODEL_COSTS[key] : undefined
}

export function estimateCost(model: string, inputTokens: number, outputTokens: number): number | null {
  const cost = getModelCost(model)
  if (!cost) return null
  return (inputTokens * cost.input + outputTokens * cost.output) / 1_000_000
}

export function registerModelCost(model: string, inputCost: number, outputCost: number): void {
  MODEL_COSTS[model] = { input: inputCost, output: outputCost }
}
