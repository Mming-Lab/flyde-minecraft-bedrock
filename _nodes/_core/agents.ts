import { CodeNode } from '@flyde/core'
import { getCurrentContext } from '../context-manager'

const STYLE = { color: '#D83B01' }

const DIR_OPTS = [
  { label: 'Forward', value: 'forward' },
  { label: 'Back',    value: 'back' },
  { label: 'Left',    value: 'left' },
  { label: 'Right',   value: 'right' },
  { label: 'Up',      value: 'up' },
  { label: 'Down',    value: 'down' },
]

const TURN_OPTS = [
  { label: 'Left',  value: 'left' },
  { label: 'Right', value: 'right' },
]

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
    position: { description: 'Agent position {x,y,z}' },
  },
  run: async (_, { position }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    position.next(await agent.getLocation())
  },
}

export const AgentMove: CodeNode = {
  id: 'AgentMove',
  displayName: 'AgentMove',
  menuDisplayName: 'AgentMove',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    direction: {
      description: 'Direction to move',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
  },
  outputs: { done: {} },
  run: async ({ direction }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.move(direction as any)
    done.next(true)
  },
}

export const AgentTurn: CodeNode = {
  id: 'AgentTurn',
  displayName: 'AgentTurn',
  menuDisplayName: 'AgentTurn',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    direction: {
      description: 'Turn direction (left or right)',
      defaultValue: 'left',
      editorType: 'select',
      editorTypeData: { options: TURN_OPTS },
    },
  },
  outputs: { done: {} },
  run: async ({ direction }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.turn(direction as any)
    done.next(true)
  },
}

export const AgentTeleport: CodeNode = {
  id: 'AgentTeleport',
  displayName: 'AgentTeleport',
  menuDisplayName: 'AgentTeleport',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    trigger:  { description: 'Trigger' },
    position: { description: 'Target position {x,y,z} (default: player location)', defaultValue: null },
  },
  outputs: { done: {} },
  run: async ({ position }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.teleport(position != null ? (position as any) : undefined)
    done.next(true)
  },
}

// attack / destroyBlock / till / dropAllItems are all (direction → done)
export const AgentAction: CodeNode = {
  id: 'AgentAction',
  displayName: 'AgentAction',
  menuDisplayName: 'AgentAction',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    action: {
      description: 'Action to perform',
      defaultValue: 'attack',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'Attack',            value: 'attack' },
          { label: 'Destroy Block',     value: 'destroyBlock' },
          { label: 'Till',              value: 'till' },
          { label: 'Drop All Items',    value: 'dropAllItems' },
        ],
      },
    },
    direction: {
      description: 'Direction',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
  },
  outputs: { done: {} },
  run: async ({ action, direction }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    const dir = direction as any
    switch (String(action)) {
      case 'attack':       await agent.attack(dir);       break
      case 'destroyBlock': await agent.destroyBlock(dir); break
      case 'till':         await agent.till(dir);         break
      case 'dropAllItems':    await agent.dropAllItems(dir);    break
    }
    done.next(true)
  },
}

export const AgentPlaceBlock: CodeNode = {
  id: 'AgentPlaceBlock',
  displayName: 'AgentPlaceBlock',
  menuDisplayName: 'AgentPlaceBlock',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    direction: {
      description: 'Direction to place block',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
    slot: { description: 'Inventory slot (1–27)', defaultValue: 1 },
  },
  outputs: { done: {} },
  run: async ({ direction, slot }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.placeBlock(direction as any, Number(slot))
    done.next(true)
  },
}

export const AgentDropItem: CodeNode = {
  id: 'AgentDropItem',
  displayName: 'AgentDropItem',
  menuDisplayName: 'AgentDropItem',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    direction: {
      description: 'Direction to drop item',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
    slot:   { description: 'Inventory slot (1–27)', defaultValue: 1 },
    amount: { description: 'Number of items to drop', defaultValue: 1 },
  },
  outputs: { done: {} },
  run: async ({ direction, slot, amount }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.dropItem(direction as any, Number(slot), Number(amount))
    done.next(true)
  },
}

export const AgentMoveItem: CodeNode = {
  id: 'AgentMoveItem',
  displayName: 'AgentMoveItem',
  menuDisplayName: 'AgentMoveItem',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    from_slot: { description: 'Source slot (1–27)', defaultValue: 1 },
    to_slot:   { description: 'Destination slot (1–27)', defaultValue: 2 },
    amount:    { description: 'Number of items to move', defaultValue: 1 },
  },
  outputs: { done: {} },
  run: async ({ from_slot, to_slot, amount }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.moveItem(Number(from_slot), Number(to_slot), Number(amount))
    done.next(true)
  },
}

export const AgentSetItem: CodeNode = {
  id: 'AgentSetItem',
  displayName: 'AgentSetItem',
  menuDisplayName: 'AgentSetItem',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    slot:    { description: 'Inventory slot (1–27)', defaultValue: 1 },
    item_id: { description: 'Item ID (e.g. minecraft:diamond)' },
    amount:  { description: 'Item count', defaultValue: 1 },
    data:    { description: 'Aux / data value', defaultValue: 0 },
  },
  outputs: { done: {} },
  run: async ({ slot, item_id, amount, data }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.setItem(Number(slot), String(item_id), Number(amount), Number(data))
    done.next(true)
  },
}

export const AgentCollect: CodeNode = {
  id: 'AgentCollect',
  displayName: 'AgentCollect',
  menuDisplayName: 'AgentCollect',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    item_id: { description: 'Item ID to collect (e.g. minecraft:diamond)' },
  },
  outputs: { done: {} },
  run: async ({ item_id }, { done }) => {
    const { world } = getCurrentContext()
    const agent = await world.getOrCreateAgent()
    await agent.collect(String(item_id))
    done.next(true)
  },
}

export const AgentDetect: CodeNode = {
  id: 'AgentDetect',
  displayName: 'AgentDetect',
  menuDisplayName: 'AgentDetect',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    type: {
      description: 'Detection type',
      defaultValue: 'block',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'Block',     value: 'block' },
          { label: 'Redstone',  value: 'redstone' },
        ],
      },
    },
    direction: {
      description: 'Direction to detect',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
  },
  outputs: {
    detected: { description: 'true if something detected in that direction' },
  },
  run: async ({ type, direction }, { detected }) => {
    const { world } = getCurrentContext()
    await world.getOrCreateAgent()
    const cmd = String(type) === 'redstone'
      ? `agent detectredstone ${direction}`
      : `agent detect ${direction}`
    const res = await world.runCommand(cmd) as any
    detected.next(!!(res.detected ?? res.statusCode === 0))
  },
}

export const AgentInspect: CodeNode = {
  id: 'AgentInspect',
  displayName: 'AgentInspect',
  menuDisplayName: 'AgentInspect',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    type: {
      description: 'Inspection type',
      defaultValue: 'block',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'Block ID',    value: 'block' },
          { label: 'Data value',  value: 'data' },
        ],
      },
    },
    direction: {
      description: 'Direction to inspect',
      defaultValue: 'forward',
      editorType: 'select',
      editorTypeData: { options: DIR_OPTS },
    },
  },
  outputs: {
    value: { description: 'Block ID string (block) or data number (data)' },
  },
  run: async ({ type, direction }, { value }) => {
    const { world } = getCurrentContext()
    await world.getOrCreateAgent()
    const cmd = String(type) === 'data'
      ? `agent inspectdata ${direction}`
      : `agent inspect ${direction}`
    const res = await world.runCommand(cmd) as any
    const v = res.block ?? res.blockId ?? res.data ?? res.value ?? null
    value.next(v)
  },
}

export const AgentGetItemCount: CodeNode = {
  id: 'AgentGetItemCount',
  displayName: 'AgentGetItemCount',
  menuDisplayName: 'AgentGetItemCount',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    slot: { description: 'Inventory slot (1–27)', defaultValue: 1 },
  },
  outputs: {
    count: { description: 'Number of items in the slot' },
  },
  run: async ({ slot }, { count }) => {
    const { world } = getCurrentContext()
    await world.getOrCreateAgent()
    const res = await world.runCommand(`agent getitemcount ${Number(slot)}`) as any
    count.next(res.count ?? res.itemCount ?? 0)
  },
}

export const AgentGetItemSpace: CodeNode = {
  id: 'AgentGetItemSpace',
  displayName: 'AgentGetItemSpace',
  menuDisplayName: 'AgentGetItemSpace',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    slot: { description: 'Inventory slot (1–27)', defaultValue: 1 },
  },
  outputs: {
    space: { description: 'Remaining space in the slot' },
  },
  run: async ({ slot }, { space }) => {
    const { world } = getCurrentContext()
    await world.getOrCreateAgent()
    const res = await world.runCommand(`agent getitemspace ${Number(slot)}`) as any
    space.next(res.space ?? res.itemSpace ?? 0)
  },
}

export const AgentGetItemDetail: CodeNode = {
  id: 'AgentGetItemDetail',
  displayName: 'AgentGetItemDetail',
  menuDisplayName: 'AgentGetItemDetail',
  icon: 'robot',
  defaultStyle: STYLE,
  inputs: {
    slot: { description: 'Inventory slot (1–27)', defaultValue: 1 },
  },
  outputs: {
    item_id: { description: 'Item ID in the slot (e.g. minecraft:diamond). null if empty' },
  },
  run: async ({ slot }, { item_id }) => {
    const { world } = getCurrentContext()
    await world.getOrCreateAgent()
    const res = await world.runCommand(`agent getitemdetail ${Number(slot)}`) as any
    item_id.next(res.item ?? res.id ?? null)
  },
}
