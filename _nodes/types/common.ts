// micro:bit シリアル通信ハンドル
export interface MicroBitHandle {
  port: {
    write(data: string, callback: (err?: Error | null) => void): void
  }
  parser: {
    on(event: 'data', handler: (data: string) => void): void
  }
}
