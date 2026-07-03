export interface AnthropicUsage {
  input_tokens: number
  output_tokens: number
  cache_read_input_tokens?: number
  cache_creation_input_tokens?: number
}

export interface OpenAIUsage {
  prompt_tokens: number
  completion_tokens: number
  cached_tokens?: number
}

export interface ReportData {
  project: string
  model: string
  input_tokens: number
  output_tokens: number
  cached_tokens: number
  cost: number
  endpoint: string
  timestamp?: string
  dashboardUrl: string
}

export interface TrackOptions {
  project: string
  dashboardUrl: string
  endpoint?: string
  model?: string
  cost?: number
}

export interface HeliconeSyncOptions {
  heliconeApiKey: string
  dashboardUrl: string
  project: string
  since?: string
  limit?: number
}
