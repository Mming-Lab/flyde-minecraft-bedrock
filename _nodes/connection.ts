import { CodeNode } from '@flyde/core'
import { ServerEvent } from 'socket-be'
import { getServer, stopServer } from './socketbe-instance'

const STYLE = { color: '#5C5C5C' } // connection

// Flyde の内部テレメトリ(reportEvent)が fetch を投げっぱなしにする。
// fetch エラーだけ無視し、それ以外はコンソールに表示する。
process.on('unhandledRejection', (reason: unknown) => {
  if (String(reason).includes('fetch')) return
  console.error('\n[エラーが発生しました]', reason, '\n')
})

// Flyde は mode:'optional' 入力があると run() を繰り返し呼ぶため、
// モジュールレベルのフラグと pending Promise でループを止める。
let _mcConnectRunning = false

export const Minecraft接続: CodeNode = {
  id: 'MinecraftConnect',
  displayName: 'Minecraft接続',
  menuDisplayName: 'Minecraft接続',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ポート: { description: 'WebSocketポート番号（デフォルト: 8080）', mode: 'optional' },
  },
  outputs: {
    ワールド: {},
    エラー: {},
  },
  run: ({ ポート }, { ワールド, エラー }, adv) => {
    if (_mcConnectRunning) {
      return new Promise<void>(() => {})
    }
    _mcConnectRunning = true
    return new Promise<void>((resolve) => {
      try {
        const port = ポート ?? 8080
        const server = getServer(port, (msg) => エラー.next(msg))
        console.log(`\n[Minecraft接続] Minecraftで次のコマンドを入力してください: /connect localhost:${port}\n`)
        const handler = (signal: any) => ワールド.next(signal.world)
        server.on(ServerEvent.WorldAdd, handler)
        adv.onCleanup(async () => {
          server.remove(ServerEvent.WorldAdd, handler)
          await stopServer()   // ポートを解放してから次のフローが起動できるようにする
          _mcConnectRunning = false
          resolve()
        })
      } catch (e) {
        エラー.next(String(e))
        _mcConnectRunning = false
        resolve()
      }
    })
  },
}

export const Minecraft切断: CodeNode = {
  id: 'MinecraftDisconnect',
  displayName: 'Minecraft切断',
  menuDisplayName: 'Minecraft切断',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    トリガー: { description: 'トリガー（例: チャットで「stop」と入力）' },
  },
  outputs: {},
  run: async () => {
    await stopServer()
    process.exit(0)
  },
}
