import { CodeNode } from '@flyde/core'
import { getCurrentContext } from './context-manager'

const STYLE = { color: '#D83B01' } // agent

const SIX_DIR_OPTIONS = [
  { label: 'forward（前）', value: 'forward' },
  { label: 'back（後）',    value: 'back' },
  { label: 'left（左）',   value: 'left' },
  { label: 'right（右）',  value: 'right' },
  { label: 'up（上）',     value: 'up' },
  { label: 'down（下）',   value: 'down' },
]

const TURN_DIR_OPTIONS = [
  { label: 'left（左）',  value: 'left' },
  { label: 'right（右）', value: 'right' },
]

export const エージェント移動: CodeNode = {
  id: 'AgentMove',
  displayName: 'エージェント移動',
  menuDisplayName: 'Agent移動',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    方向: {
      description: '移動方向',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: SIX_DIR_OPTIONS },
    },
    歩数: { description: '移動する歩数（IIP可）', defaultValue: 1 },
  },
  outputs: { 完了: {} },
  run: async ({ 方向, 歩数 }, { 完了 }) => {
    const { world } = getCurrentContext()
    const steps = Number(歩数 ?? 1)
    for (let i = 0; i < steps; i++) {
      await world.runCommand(`agent move ${方向 ?? 'forward'}`)
    }
    完了.next(true)
  },
}

export const エージェント回転: CodeNode = {
  id: 'AgentTurn',
  displayName: 'エージェント回転',
  menuDisplayName: 'Agent回転',
  defaultStyle: STYLE,
  inputs: {
    方向: {
      description: '回転方向',
      defaultValue: 'left',
      editorType: 'select',
      editorTypeData: { options: TURN_DIR_OPTIONS },
    },
  },
  outputs: { 完了: {} },
  run: async ({ 方向 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`agent turn ${方向 ?? 'left'}`)
    完了.next(true)
  },
}

export const エージェントコマンド: CodeNode = {
  id: 'AgentCommand',
  displayName: 'エージェントコマンド',
  menuDisplayName: 'Agent命令',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    コマンド: { description: 'agent コマンド本体（例: move forward / place 1）' },
  },
  outputs: { 完了: {} },
  run: async ({ コマンド }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`agent ${コマンド}`)
    完了.next(true)
  },
}

export const エージェントがブロック設置: CodeNode = {
  id: 'AgentPlace',
  displayName: 'エージェントがブロック設置',
  menuDisplayName: 'Agent設置',
  defaultStyle: STYLE,
  inputs: {
    方向: {
      description: '設置方向',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: SIX_DIR_OPTIONS },
    },
  },
  outputs: { 完了: {} },
  run: async ({ 方向 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`agent place ${方向 ?? 'forward'}`)
    完了.next(true)
  },
}

export const エージェントがブロック破壊: CodeNode = {
  id: 'AgentDestroy',
  displayName: 'エージェントがブロック破壊',
  menuDisplayName: 'Agent破壊',
  defaultStyle: STYLE,
  inputs: {
    方向: {
      description: '破壊方向',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: SIX_DIR_OPTIONS },
    },
  },
  outputs: { 完了: {} },
  run: async ({ 方向 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`agent destroy ${方向 ?? 'forward'}`)
    完了.next(true)
  },
}

export const エージェントの座標を取得: CodeNode = {
  id: 'AgentGetPosition',
  displayName: 'エージェントの座標を取得',
  menuDisplayName: 'Agent座標',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 座標: {} },
  run: async (_, { 座標 }) => {
    const { world } = getCurrentContext()
    const res = await world.runCommand('agent getPosition')
    座標.next(res)
  },
}

export const エージェント向き取得: CodeNode = {
  id: 'AgentGetOrientation',
  displayName: 'エージェント向き取得',
  menuDisplayName: 'Agent向き',
  defaultStyle: STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: { 向き: {} },
  run: async (_, { 向き }) => {
    const { world } = getCurrentContext()
    const res = await world.runCommand('agent getOrientation')
    向き.next(res.facing ?? res.orientation ?? 0)
  },
}

export const エージェントブロック検知: CodeNode = {
  id: 'AgentDetect',
  displayName: 'エージェントブロック検知',
  menuDisplayName: 'Agent検知',
  defaultStyle: STYLE,
  inputs: {
    方向: {
      description: '検知方向',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: SIX_DIR_OPTIONS },
    },
  },
  outputs: { 検知: {} },
  run: async ({ 方向 }, { 検知 }) => {
    const { world } = getCurrentContext()
    const res = await world.runCommand(`agent detect ${方向 ?? 'forward'}`)
    検知.next(!!(res.detected))
  },
}

export const エージェントブロック検査: CodeNode = {
  id: 'AgentInspect',
  displayName: 'エージェントブロック検査',
  menuDisplayName: 'Agent検査',
  defaultStyle: STYLE,
  inputs: {
    方向: {
      description: '検査方向',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: SIX_DIR_OPTIONS },
    },
  },
  outputs: { ブロックID: {} },
  run: async ({ 方向 }, { ブロックID }) => {
    const { world } = getCurrentContext()
    const res = await world.runCommand(`agent inspect ${方向 ?? 'forward'}`)
    ブロックID.next(String(res.block ?? res.blockId ?? ''))
  },
}

export const エージェントアイテム数取得: CodeNode = {
  id: 'AgentGetItemCount',
  displayName: 'エージェントアイテム数取得',
  menuDisplayName: 'Agentｱｲﾃﾑ数',
  defaultStyle: STYLE,
  inputs: {
    スロット: { description: 'インベントリスロット番号（1〜）', defaultValue: 1 },
  },
  outputs: { 個数: {} },
  run: async ({ スロット }, { 個数 }) => {
    const { world } = getCurrentContext()
    const res = await world.runCommand(`agent getItemCount ${スロット ?? 1}`)
    個数.next(Number(res.count ?? res.itemCount ?? 0))
  },
}
