import { appendFileSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { CodeNode } from '@flyde/core'

const LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 } as const
type LogLevel = keyof typeof LEVELS

function loadLogLevel(): LogLevel {
  try {
    const config = JSON.parse(readFileSync(join(process.cwd(), 'flyde-mc.config.json'), 'utf8'))
    if (config.logLevel in LEVELS) return config.logLevel as LogLevel
  } catch {}
  return 'INFO'
}

const currentLevel = LEVELS[loadLogLevel()]

const logsDir = join(process.cwd(), 'logs')
mkdirSync(logsDir, { recursive: true })

// モジュールが複数インスタンスでロードされても同一ファイルに書き続けるよう
// セッション開始時のファイルパスを process に退避して共有する
const LOG_FILE: string = (() => {
  if (!(process as any).__fmcLogFile) {
    const now = new Date()
    const stamp = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-')
    ;(process as any).__fmcLogFile = join(logsDir, `flyde-mc-${stamp}_1.log`)
  }
  return (process as any).__fmcLogFile
})()

export function diagLog(level: LogLevel, prefix: string, msg: string): void {
  if (LEVELS[level] < currentLevel) return
  const line = `[${new Date().toISOString()}] [${level}] [${prefix}] ${msg}\n`
  try { appendFileSync(LOG_FILE, line) } catch {}
}

function safeStringify(v: unknown): string {
  try { return JSON.stringify(v) } catch { return String(v) }
}

export function withDiagLog(node: CodeNode): CodeNode {
  if (currentLevel > LEVELS.DEBUG) return node
  return {
    ...node,
    run: (inputs, outputs, adv) => {
      diagLog('DEBUG', node.id, `IN: ${safeStringify(inputs)}`)
      const wrapped = Object.fromEntries(
        Object.entries(outputs as Record<string, any>).map(([k, pin]) => [
          k,
          { next: (v: unknown) => { diagLog('DEBUG', node.id, `OUT[${k}]: ${safeStringify(v)}`); pin.next(v) } }
        ])
      )
      return (node.run as any)(inputs, wrapped, adv)
    }
  }
}
