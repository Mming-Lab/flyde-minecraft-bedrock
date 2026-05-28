import { CodeNode } from '@flyde/core'
import { Ok, Err, type MicroBitHandle } from './types/common'

export const MicroBit受信: CodeNode = {
  id: 'MicroBitReceive',
  displayName: 'micro:bit受信',
  inputs: {
    ハンドル: { description: 'micro:bit接続ノードの接続完了出力' },
  },
  outputs: {
    データ: {},
  },
  run: ({ ハンドル }, { データ }) => {
    const handle = ハンドル as MicroBitHandle
    handle.parser.on('data', (line: string) => {
      データ.next(line.trim())
    })
  },
}

export const MicroBit送信: CodeNode = {
  id: 'MicroBitSend',
  displayName: 'micro:bit送信',
  inputs: {
    ハンドル: { description: 'micro:bit接続ノードの接続完了出力' },
    テキスト: { description: '送信するテキスト' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ハンドル, テキスト }, { Result: result }) => {
    const handle = ハンドル as MicroBitHandle
    try {
      await new Promise<void>((resolve, reject) => {
        handle.port.write(`${テキスト}\n`, (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}
