export type Result<T = unknown> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string }

export function Ok<T>(value: T): { readonly ok: true; readonly value: T } {
  return { ok: true, value }
}

export function Err(error: string): { readonly ok: false; readonly error: string } {
  return { ok: false, error }
}

// micro:bit シリアル通信ハンドル
export interface MicroBitHandle {
  port: {
    write(data: string, callback: (err?: Error | null) => void): void
  }
  parser: {
    on(event: 'data', handler: (data: string) => void): void
  }
}
