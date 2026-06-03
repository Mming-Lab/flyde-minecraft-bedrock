import { CodeNode } from '@flyde/core'
import { getCurrentContext } from './context-manager'

const AGENT_STYLE = { color: '#D83B01' }

export const エージェント座標取得: CodeNode = {
  id: 'GetAgentLocation',
  displayName: 'エージェント座標取得',
  menuDisplayName: 'AG座標取得',
  icon: 'robot',
  defaultStyle: AGENT_STYLE,
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
  },
  outputs: {
    座標: {},
  },
  run: async (_, { 座標 }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    座標.next(await agent.getLocation())
  },
}
