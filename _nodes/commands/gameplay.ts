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

export const ゲーム内時刻取得: CodeNode = {
  id: 'GetGameTime',
  displayName: 'ゲーム内時刻取得',
  menuDisplayName: 'ゲーム時刻',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    種別: {
      description: '取得する時刻の種別',
      defaultValue: 'time',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '時刻 (0〜24000)', value: 'time' },
          { label: '日数',            value: 'day' },
          { label: 'ティック数',      value: 'tick' },
        ],
      },
    },
  },
  outputs: { 値: {} },
  run: async ({ 種別 }, { 値 }) => {
    const { world } = getCurrentContext()
    const k = String(種別)
    if      (k === 'time') 値.next(await world.getTimeOfDay())
    else if (k === 'day')  値.next(await world.getDay())
    else if (k === 'tick') 値.next(await world.getCurrentTick())
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


export const ワールドクエリ: CodeNode = {
  id: 'WorldQuery',
  displayName: 'ワールドクエリ',
  menuDisplayName: 'ﾜｰﾙﾄﾞｸｴﾘ',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    種別: {
      description: '取得する種別',
      defaultValue: 'mob',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'エンティティ', value: 'mob' },
          { label: 'ブロック',     value: 'block' },
          { label: 'アイテム',     value: 'item' },
        ],
      },
    },
  },
  outputs: { 一覧: {} },
  run: async ({ 種別 }, { 一覧 }) => {
    const { world } = getCurrentContext()
    一覧.next(await (world.queryData as any)(種別))
  },
}
