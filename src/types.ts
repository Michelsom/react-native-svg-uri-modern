export interface SvgUriCache {
  get(key: string): string | undefined
  set(key: string, value: string): void
  has(key: string): boolean
  clear(): void
  delete(key: string): boolean
}

export interface SvgUriConfig {
  defaultTimeout: number
  defaultHeaders: Record<string, string>
  cacheEnabled: boolean
  maxCacheSize: number
}
