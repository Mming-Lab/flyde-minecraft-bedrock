import { CodeNode } from '@flyde/core'
import { MinecraftEntityTypes } from '@minecraft/vanilla-data'
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

export const メッセージ送信: CodeNode = {
  id: 'SendMessage',
  displayName: 'メッセージ送信',
  menuDisplayName: 'ﾒｯｾｰｼﾞ送信',
  defaultStyle: PLAYER_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    メッセージ: { description: '送信するテキスト' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ メッセージ }, { 完了 }) => {
    const { player } = getCurrentContext()
    await player.sendMessage(メッセージ)
    完了.next(true)
  },
}

export const 全員にメッセージ: CodeNode = {
  id: 'SendMessageAll',
  displayName: '全員にメッセージ',
  menuDisplayName: '全員送信',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    テキスト: { description: '全員に送るテキスト' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ テキスト }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`say ${テキスト}`)
    完了.next(true)
  },
}

export const エフェクト付与: CodeNode = {
  id: 'ApplyEffect',
  displayName: 'エフェクト付与',
  menuDisplayName: 'ｴﾌｪｸﾄ付与',
  defaultStyle: PLAYER_STYLE,
  inputs: {
    エフェクト名: { description: 'エフェクト名（speed / jump_boost / regeneration 等）' },
    秒数: { description: '持続時間（秒）' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ エフェクト名, 秒数 }, { 完了 }) => {
    const { player } = getCurrentContext()
    await player.runCommand(`effect @s ${エフェクト名} ${秒数 ?? 30}`)
    完了.next(true)
  },
}

export const テレポート: CodeNode = {
  id: 'TeleportPlayer',
  displayName: 'テレポート',
  menuDisplayName: 'ﾃﾚﾎﾟｰﾄ',
  defaultStyle: PLAYER_STYLE,
  inputs: {
    座標: { description: '座標 {x, y, z}' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ 座標: pos }, { 完了 }) => {
    const { player } = getCurrentContext()
    const { x, y, z } = pos as { x: number; y: number; z: number }
    await player.runCommand(`tp @s ${x} ${y} ${z}`)
    完了.next(true)
  },
}

export const 時刻変更: CodeNode = {
  id: 'SetTime',
  displayName: '時刻変更',
  menuDisplayName: '時刻変更',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    時刻: { description: '0=夜明け / 6000=正午 / 12000=夕方 / 18000=深夜' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ 時刻 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`time set ${時刻}`)
    完了.next(true)
  },
}

export const エンティティ召喚: CodeNode = {
  id: 'SummonEntity',
  displayName: 'エンティティ召喚',
  menuDisplayName: 'ｴﾝﾃｨﾃｨ召喚',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    座標: { description: '召喚する座標 {x, y, z}' },
    エンティティ名: {
      description: 'エンティティID',
      defaultValue: MinecraftEntityTypes.Chicken,
      editorType: 'select',
      editorTypeData: {
        options: Object.entries(MinecraftEntityTypes).map(([label, value]) => ({ label, value })),
      },
    },
  },
  outputs: {
    完了: {},
  },
  run: async ({ エンティティ名, 座標: pos }, { 完了 }) => {
    const { world } = getCurrentContext()
    const { x, y, z } = pos as { x: number; y: number; z: number }
    await world.runCommand(`summon ${エンティティ名} ${x} ${y} ${z}`)
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
  },
  run: async (_, { 座標 }) => {
    const { player } = getCurrentContext()
    const pos = await player.getLocation()
    座標.next(pos)
  },
}

export const プレイヤーコマンド実行: CodeNode = {
  id: 'RunPlayerCommand',
  displayName: 'プレイヤーコマンド実行',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰｺﾏﾝﾄﾞ',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    コマンド: { description: '実行するコマンド（~ で相対座標可、/ 不要）' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ コマンド }, { 完了 }) => {
    const { player } = getCurrentContext()
    await player.runCommand(コマンド)
    完了.next(true)
  },
}

export const 天気変更: CodeNode = {
  id: 'ChangeWeather',
  displayName: '天気変更',
  menuDisplayName: '天気変更',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    天気: { description: '天気（clear / rain / thunder）' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ 天気 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`weather ${天気}`)
    完了.next(true)
  },
}

export const ブロックを置く: CodeNode = {
  id: 'SetBlock',
  displayName: 'ブロックを置く',
  menuDisplayName: 'ﾌﾞﾛｯｸ設置',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    座標: { description: '設置する座標 {x, y, z}' },
    ブロックID: { description: 'ブロックID（例: minecraft:stone）' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ 座標: pos, ブロックID }, { 完了 }) => {
    const { world } = getCurrentContext()
    const { x, y, z } = pos as { x: number; y: number; z: number }
    await world.runCommand(`setblock ${x} ${y} ${z} ${ブロックID}`)
    完了.next(true)
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
  },
  run: async (_, { 角度 }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    角度.next(result.yRot)
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

export const ブロックを確認: CodeNode = {
  id: 'TestForBlock',
  displayName: 'ブロックを確認',
  menuDisplayName: 'ﾌﾞﾛｯｸ確認',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    座標: { description: '確認する座標 {x, y, z}' },
    ブロックID: { description: 'ブロックID（例: minecraft:stone）' },
  },
  outputs: {
    一致: {},
  },
  run: async ({ 座標: pos, ブロックID }, { 一致 }) => {
    const { world } = getCurrentContext()
    const { x, y, z } = pos as { x: number; y: number; z: number }
    const res = await world.runCommand(`testforblock ${x} ${y} ${z} ${ブロックID}`)
    一致.next(res.statusCode === 0)
  },
}

export const 範囲ブロック確認: CodeNode = {
  id: 'TestForBlocks',
  displayName: '範囲ブロック確認',
  menuDisplayName: '範囲確認',
  defaultStyle: GAMEPLAY_STYLE,
  inputs: {
    始点: { description: '比較元の始点 {x, y, z}' },
    終点: { description: '比較元の終点 {x, y, z}' },
    目標: { description: '比較先の始点 {x, y, z}' },
  },
  outputs: {
    一致: {},
  },
  run: async ({ 始点, 終点, 目標 }, { 一致 }) => {
    const { world } = getCurrentContext()
    const s = 始点 as { x: number; y: number; z: number }
    const e = 終点 as { x: number; y: number; z: number }
    const d = 目標 as { x: number; y: number; z: number }
    const res = await world.runCommand(
      `testforblocks ${s.x} ${s.y} ${s.z} ${e.x} ${e.y} ${e.z} ${d.x} ${d.y} ${d.z}`
    )
    一致.next(res.statusCode === 0)
  },
}
