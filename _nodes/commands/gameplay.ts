import { CodeNode } from '@flyde/core'
import { getCurrentContext } from '../context-manager'

const STYLE = { color: '#8F6D40' }

export const コマンド実行: CodeNode = {
  id: 'RunCommand',
  displayName: 'コマンド実行',
  menuDisplayName: 'ｺﾏﾝﾄﾞ実行',
  icon: 'play',
  defaultStyle: STYLE,
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

export const 時刻を取得: CodeNode = {
  id: 'GetTimeOfDay',
  displayName: '時刻を取得',
  menuDisplayName: '時刻取得',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
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
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
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
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
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
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
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
  icon: 'play',
  defaultStyle: STYLE,
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
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
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

export const 現在ティック取得: CodeNode = {
  id: 'GetCurrentTick',
  displayName: '現在ティック取得',
  menuDisplayName: 'ティック取得',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { ティック: {} },
  run: async (_, { ティック }) => {
    const { world } = getCurrentContext()
    ティック.next(await world.getCurrentTick())
  },
}

export const エンティティクエリ: CodeNode = {
  id: 'QueryMobs',
  displayName: 'エンティティクエリ',
  menuDisplayName: 'ENTクエリ',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { エンティティ一覧: {} },
  run: async (_, { エンティティ一覧 }) => {
    const { world } = getCurrentContext()
    エンティティ一覧.next(await world.queryData('mob'))
  },
}

export const ブロッククエリ: CodeNode = {
  id: 'QueryBlocks',
  displayName: 'ブロッククエリ',
  menuDisplayName: 'BLKクエリ',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { ブロック一覧: {} },
  run: async (_, { ブロック一覧 }) => {
    const { world } = getCurrentContext()
    ブロック一覧.next(await world.queryData('block'))
  },
}

export const アイテムクエリ: CodeNode = {
  id: 'QueryItems',
  displayName: 'アイテムクエリ',
  menuDisplayName: 'ITMクエリ',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { アイテム一覧: {} },
  run: async (_, { アイテム一覧 }) => {
    const { world } = getCurrentContext()
    アイテム一覧.next(await world.queryData('item'))
  },
}
