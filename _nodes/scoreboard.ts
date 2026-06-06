import { CodeNode } from '@flyde/core'
import { getCurrentContext } from './context-manager'

const SCOREBOARD_STYLE = { color: '#8F6D40' }

export const スコアボード目標一覧取得: CodeNode = {
  id: 'GetScoreboardObjectives',
  displayName: 'スコアボード目標一覧取得',
  menuDisplayName: 'SB目標一覧',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 目標一覧: {} },
  run: async (_, { 目標一覧 }) => {
    const { world } = getCurrentContext()
    目標一覧.next(await world.scoreboard.getObjectives())
  },
}

export const スコアボード目標取得: CodeNode = {
  id: 'GetScoreboardObjective',
  displayName: 'スコアボード目標取得',
  menuDisplayName: 'SB目標取得',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    目標ID: { description: 'スコアボード目標のID' },
  },
  outputs: { 目標: {} },
  run: async ({ 目標ID }, { 目標 }) => {
    const { world } = getCurrentContext()
    目標.next(await world.scoreboard.getObjective(String(目標ID)))
  },
}

export const スコアボード目標追加: CodeNode = {
  id: 'AddScoreboardObjective',
  displayName: 'スコアボード目標追加',
  menuDisplayName: 'SB目標追加',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    目標ID: { description: 'スコアボード目標のID' },
    表示名: { description: '表示名（省略可）' },
  },
  outputs: { 目標: {} },
  run: async ({ 目標ID, 表示名 }, { 目標 }) => {
    const { world } = getCurrentContext()
    目標.next(await world.scoreboard.addObjective(
      String(目標ID),
      表示名 != null ? String(表示名) : undefined
    ))
  },
}

export const スコアボード目標削除: CodeNode = {
  id: 'RemoveScoreboardObjective',
  displayName: 'スコアボード目標削除',
  menuDisplayName: 'SB目標削除',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    目標ID: { description: 'スコアボード目標のID' },
  },
  outputs: { 結果: {} },
  run: async ({ 目標ID }, { 結果 }) => {
    const { world } = getCurrentContext()
    結果.next(await world.scoreboard.removeObjective(String(目標ID)))
  },
}

export const 全スコア取得: CodeNode = {
  id: 'GetScores',
  displayName: '全スコア取得',
  menuDisplayName: '全スコア',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    プレイヤー名: { description: 'プレイヤー名' },
  },
  outputs: { スコア一覧: {} },
  run: async ({ プレイヤー名 }, { スコア一覧 }) => {
    const { world } = getCurrentContext()
    スコア一覧.next(await world.scoreboard.getScores(String(プレイヤー名)))
  },
}

export const スコア取得: CodeNode = {
  id: 'GetScore',
  displayName: 'スコア取得',
  menuDisplayName: 'スコア取得',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    プレイヤー名: { description: 'プレイヤー名' },
    目標ID: { description: 'スコアボード目標のID' },
  },
  outputs: { スコア: {} },
  run: async ({ プレイヤー名, 目標ID }, { スコア }) => {
    const { world } = getCurrentContext()
    スコア.next(await world.scoreboard.getScore(String(プレイヤー名), String(目標ID)))
  },
}

export const スコア演算: CodeNode = {
  id: 'ScoreOperation',
  displayName: 'スコア演算',
  menuDisplayName: 'スコア演算',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    操作: {
      description: '演算の種類',
      defaultValue: 'add',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '加算', value: 'add' },
          { label: '減算', value: 'remove' },
          { label: '設定', value: 'set' },
        ],
      },
    },
    プレイヤー名: { description: 'プレイヤー名' },
    目標ID: { description: 'スコアボード目標のID' },
    値: { description: '演算する値' },
  },
  outputs: { 新スコア: {} },
  run: async ({ 操作, プレイヤー名, 目標ID, 値 }, { 新スコア }) => {
    const { world } = getCurrentContext()
    const p = String(プレイヤー名)
    const id = String(目標ID)
    const v = Number(値)
    const k = String(操作)
    if      (k === 'add')    新スコア.next(await world.scoreboard.addScore(p, id, v))
    else if (k === 'remove') 新スコア.next(await world.scoreboard.removeScore(p, id, v))
    else if (k === 'set')    新スコア.next(await world.scoreboard.setScore(p, id, v))
  },
}
