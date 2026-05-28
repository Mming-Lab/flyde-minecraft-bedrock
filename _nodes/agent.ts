import { CodeNode } from '@flyde/core'
import { Ok, Err } from './types/common'

export const エージェント前進: CodeNode = {
  id: 'AgentMoveForward',
  displayName: 'エージェント前進',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    歩数: { description: '前進する歩数（デフォルト: 1）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, 歩数 }, { Result: result }) => {
    try {
      const steps: number = 歩数 ?? 1
      for (let i = 0; i < steps; i++) {
        await ワールド.runCommand('agent move forward')
      }
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const エージェント回転: CodeNode = {
  id: 'AgentTurn',
  displayName: 'エージェント回転',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    方向: { description: '回転方向（left / right）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, 方向 }, { Result: result }) => {
    try {
      await ワールド.runCommand(`agent turn ${方向}`)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}

export const エージェントコマンド: CodeNode = {
  id: 'AgentCommand',
  displayName: 'エージェントコマンド',
  inputs: {
    ワールド: { description: 'Minecraftワールド' },
    コマンド: { description: 'agentコマンド本体（例: move forward / place 1）' },
  },
  outputs: {
    Result: {},
  },
  run: async ({ ワールド, コマンド }, { Result: result }) => {
    try {
      await ワールド.runCommand(`agent ${コマンド}`)
      result.next(Ok(true))
    } catch (e) {
      result.next(Err(String(e)))
    }
  },
}
