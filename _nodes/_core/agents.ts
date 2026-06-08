import { CodeNode } from '@flyde/core'
import { getCurrentContext } from '../context-manager'

const STYLE = { color: '#D83B01' }

export const GetAgentLocation: CodeNode = {
  id: 'GetAgentLocation',
  displayName: 'GetAgentLocation',
  menuDisplayName: 'GetAgentLocation',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: {
    position: {},
  },
  run: async (_, { position }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    position.next(await agent.getLocation())
  },
}
