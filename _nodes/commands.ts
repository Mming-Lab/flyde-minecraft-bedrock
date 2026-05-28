import { CodeNode } from '@flyde/core'
import { Ok, Err } from './types/common'

export const コマンド実行: CodeNode = {
  id: 'RunCommand',
  displayName: 'コマンド実行',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    コマンド: { description: '実行するコマンド（/ は不要）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, コマンド }, { Result: result }) => {
    try {
      await ワールド.runCommand(コマンド)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const メッセージ送信: CodeNode = {
  id: 'SendMessage',
  displayName: 'メッセージ送信',
  inputs: {
    プレイヤー: { description: '送信先プレイヤー' },
    メッセージ: { description: '送信するテキスト' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ プレイヤー, メッセージ }, { Result: result }) => {
    try {
      await プレイヤー.sendMessage(メッセージ)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const テレポート: CodeNode = {
  id: 'TeleportPlayer',
  displayName: 'テレポート',
  inputs: {
    プレイヤー: { description: 'テレポートするプレイヤー' },
    x座標: { description: 'X座標' },
    y座標: { description: 'Y座標' },
    z座標: { description: 'Z座標' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ プレイヤー, x座標, y座標, z座標 }, { Result: result }) => {
    try {
      await プレイヤー.runCommand(`tp @s ${x座標} ${y座標} ${z座標}`)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const 時刻変更: CodeNode = {
  id: 'SetTime',
  displayName: '時刻変更',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    時刻: { description: '0=夜明け / 6000=正午 / 12000=夕方 / 18000=深夜' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, 時刻 }, { Result: result }) => {
    try {
      await ワールド.runCommand(`time set ${時刻}`)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const 天気変更: CodeNode = {
  id: 'ChangeWeather',
  displayName: '天気変更',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    天気: { description: '天気（clear / rain / thunder）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, 天気 }, { Result: result }) => {
    try {
      await ワールド.runCommand(`weather ${天気}`)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}
