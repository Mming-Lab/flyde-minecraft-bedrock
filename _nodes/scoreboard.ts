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

export const スコア設定: CodeNode = {
  id: 'SetScore',
  displayName: 'スコア設定',
  menuDisplayName: 'スコア設定',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    プレイヤー名: { description: 'プレイヤー名' },
    目標ID: { description: 'スコアボード目標のID' },
    値: { description: '設定するスコア値' },
  },
  outputs: { 新スコア: {} },
  run: async ({ プレイヤー名, 目標ID, 値 }, { 新スコア }) => {
    const { world } = getCurrentContext()
    新スコア.next(await world.scoreboard.setScore(String(プレイヤー名), String(目標ID), Number(値)))
  },
}

export const スコア加算: CodeNode = {
  id: 'AddScore',
  displayName: 'スコア加算',
  menuDisplayName: 'スコア加算',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    プレイヤー名: { description: 'プレイヤー名' },
    目標ID: { description: 'スコアボード目標のID' },
    値: { description: '加算する値' },
  },
  outputs: { 新スコア: {} },
  run: async ({ プレイヤー名, 目標ID, 値 }, { 新スコア }) => {
    const { world } = getCurrentContext()
    新スコア.next(await world.scoreboard.addScore(String(プレイヤー名), String(目標ID), Number(値)))
  },
}

export const スコア減算: CodeNode = {
  id: 'RemoveScore',
  displayName: 'スコア減算',
  menuDisplayName: 'スコア減算',
  icon: 'list-ol',
  defaultStyle: SCOREBOARD_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    プレイヤー名: { description: 'プレイヤー名' },
    目標ID: { description: 'スコアボード目標のID' },
    値: { description: '減算する値' },
  },
  outputs: { 新スコア: {} },
  run: async ({ プレイヤー名, 目標ID, 値 }, { 新スコア }) => {
    const { world } = getCurrentContext()
    新スコア.next(await world.scoreboard.removeScore(String(プレイヤー名), String(目標ID), Number(値)))
  },
}
