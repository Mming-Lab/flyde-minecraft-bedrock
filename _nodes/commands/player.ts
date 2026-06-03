import { CodeNode } from '@flyde/core'
import { getCurrentContext } from '../context-manager'

const STYLE = { color: '#0078D7' }

export const プレイヤー座標取得: CodeNode = {
  id: 'GetPlayerLocation',
  displayName: 'プレイヤー座標取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ座標',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    座標: {},
    向き: {},
  },
  run: async (_, { 座標, 向き }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    座標.next(result.position)
    向き.next(result.yRot)
  },
}

export const プレイヤー向き取得: CodeNode = {
  id: 'GetPlayerOrientation',
  displayName: 'プレイヤー向き取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ向き',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    角度: {},
  },
  run: async (_, { 角度 }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    角度.next(result.yRot)
  },
}

export const プレイヤータグ一覧取得: CodeNode = {
  id: 'GetPlayerTags',
  displayName: 'プレイヤータグ一覧取得',
  menuDisplayName: 'PLタグ一覧',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { タグ一覧: {} },
  run: async (_, { タグ一覧 }) => {
    const { player } = getCurrentContext()
    タグ一覧.next(await player.getTags())
  },
}

export const プレイヤータグ判定: CodeNode = {
  id: 'PlayerHasTag',
  displayName: 'プレイヤータグ判定',
  menuDisplayName: 'PLタグ判定',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    タグ: { description: '判定するタグ名' },
  },
  outputs: { 結果: {} },
  run: async ({ タグ }, { 結果 }) => {
    const { player } = getCurrentContext()
    結果.next(await player.hasTag(String(タグ)))
  },
}

export const プレイヤーレベル取得: CodeNode = {
  id: 'GetPlayerLevel',
  displayName: 'プレイヤーレベル取得',
  menuDisplayName: 'PLレベル',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { レベル: {} },
  run: async (_, { レベル }) => {
    const { player } = getCurrentContext()
    レベル.next(await player.getLevel())
  },
}

export const ゲームモード取得: CodeNode = {
  id: 'GetGameMode',
  displayName: 'ゲームモード取得',
  menuDisplayName: 'ゲームモード',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { ゲームモード: {} },
  run: async (_, { ゲームモード }) => {
    const { player } = getCurrentContext()
    ゲームモード.next(await player.getGameMode())
  },
}

export const プレイヤーアビリティ取得: CodeNode = {
  id: 'GetPlayerAbilities',
  displayName: 'プレイヤーアビリティ取得',
  menuDisplayName: 'PLアビリティ',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { アビリティ: {} },
  run: async (_, { アビリティ }) => {
    const { player } = getCurrentContext()
    アビリティ.next(await player.getAbilities())
  },
}

export const プレイヤー一覧取得: CodeNode = {
  id: 'GetPlayers',
  displayName: 'プレイヤー一覧取得',
  menuDisplayName: 'PL一覧',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { プレイヤー一覧: {} },
  run: async (_, { プレイヤー一覧 }) => {
    const { world } = getCurrentContext()
    プレイヤー一覧.next(await world.getPlayers())
  },
}

export const ローカルプレイヤー取得: CodeNode = {
  id: 'GetLocalPlayer',
  displayName: 'ローカルプレイヤー取得',
  menuDisplayName: 'ローカルPL',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { プレイヤー: {} },
  run: async (_, { プレイヤー }) => {
    const { world } = getCurrentContext()
    プレイヤー.next(await world.getLocalPlayer())
  },
}
