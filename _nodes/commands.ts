import { CodeNode } from '@flyde/core'
import { getCurrentContext } from './context-manager'

const PLAYER_STYLE = { color: '#0078D7' }   // player
const GAMEPLAY_STYLE = { color: '#8F6D40' } // gameplay

export const コマンド実行: CodeNode = {
  id: 'RunCommand',
  displayName: 'コマンド実行',
  menuDisplayName: 'ｺﾏﾝﾄﾞ実行',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    コマンド: { description: '実行するコマンド（/ は不要）' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ コマンド }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(コマンド)
    完了.next(true)
  },
}

export const プレイヤー座標取得: CodeNode = {
  id: 'GetPlayerLocation',
  displayName: 'プレイヤー座標取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ座標',
  defaultStyle: PLAYER_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    座標: {},
    向き: {},
    プレイヤー: {},
  },
  run: async (_, { 座標, 向き, プレイヤー }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    座標.next(result.position)
    向き.next(result.yRot)
    プレイヤー.next(result)
  },
}

export const プレイヤー向き取得: CodeNode = {
  id: 'GetPlayerOrientation',
  displayName: 'プレイヤー向き取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ向き',
  defaultStyle: PLAYER_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    角度: {},
    プレイヤー: {},
  },
  run: async (_, { 角度, プレイヤー }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    角度.next(result.yRot)
    プレイヤー.next(result)
  },
}

export const 時刻を取得: CodeNode = {
  id: 'GetTimeOfDay',
  displayName: '時刻を取得',
  menuDisplayName: '時刻取得',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    時刻: {},
  },
  run: async (_, { 時刻 }) => {
    const { world } = getCurrentContext()
    時刻.next(await world.getTimeOfDay())
  },
}

export const 昼夜判定: CodeNode = {
  id: 'IsDaytime',
  displayName: '昼夜判定',
  menuDisplayName: '昼夜判定',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    昼: {},
  },
  run: async (_, { 昼 }) => {
    const { world } = getCurrentContext()
    const t = await world.getTimeOfDay()
    昼.next(t < 12000)
  },
}

export const 天気を取得: CodeNode = {
  id: 'GetWeather',
  displayName: '天気を取得',
  menuDisplayName: '天気取得',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 天気: {} },
  run: async (_, { 天気 }) => {
    const { world } = getCurrentContext()
    天気.next(await world.getWeather())
  },
}

export const 日数を取得: CodeNode = {
  id: 'GetDay',
  displayName: '日数を取得',
  menuDisplayName: '日数取得',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 日数: {} },
  run: async (_, { 日数 }) => {
    const { world } = getCurrentContext()
    日数.next(await world.getDay())
  },
}

export const エリアを塗りつぶす: CodeNode = {
  id: 'FillBlocks',
  displayName: 'エリアを塗りつぶす',
  menuDisplayName: 'ｴﾘｱ塗りつぶし',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    始点: { description: '始点 {x, y, z}' },
    終点: { description: '終点 {x, y, z}' },
    ブロックID: { description: 'ブロックID（例: minecraft:stone）' },
  },
  outputs: { 完了: {}, 個数: {} },
  run: async ({ 始点, 終点, ブロックID }, { 完了, 個数 }) => {
    const { world } = getCurrentContext()
    const count = await world.fillBlocks(
      始点 as { x: number; y: number; z: number },
      終点 as { x: number; y: number; z: number },
      String(ブロックID)
    )
    個数.next(count)
    完了.next(true)
  },
}

export const 地面の高さを取得: CodeNode = {
  id: 'GetTopSolidBlock',
  displayName: '地面の高さを取得',
  menuDisplayName: '地面高さ',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 座標: {}, ブロック名: {} },
  run: async (_, { 座標, ブロック名 }) => {
    const { world } = getCurrentContext()
    const result = await world.getTopSolidBlock()
    座標.next(result.location)
    ブロック名.next(result.blockName)
  },
}
