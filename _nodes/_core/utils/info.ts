import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' }

export const GetFromEntity: CodeNode = {
  id: 'GetFromEntity',
  displayName: 'GetFromEntity',
  menuDisplayName: 'GetFromEntity',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_entity: { description: 'Player or villager object (O_player / O_villager output)' },
  },
  outputs: {
    position:  { description: 'Position (position)' },
    direction: { description: 'Y-axis rotation (yRot)' },
    dimension: { description: 'Dimension number (dimension)' },
    type:      { description: 'Type string (type)' },
    variant:   { description: 'Variant number (variant)' },
    ID:        { description: 'Entity ID number (id)' },
  },
  run: ({ O_entity }, { position, direction, dimension, type, variant, ID }) => {
    const e = O_entity as any
    position.next(e.position)
    direction.next(e.yRot)
    dimension.next(e.dimension)
    type.next(e.type)
    variant.next(e.variant)
    ID.next(e.id)
  },
}

export const GetFromPlayerSnapshot: CodeNode = {
  id: 'GetFromPlayerSnapshot',
  displayName: 'GetFromPlayerSnapshot',
  menuDisplayName: 'GetFromPlayerSnapshot',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_player: { description: 'Player object from event node O_player output' },
  },
  outputs: {
    name:     { description: 'Player name (name)' },
    color:    { description: 'Map marker color (color)' },
    O_entity: { description: 'Pass-through to entity info node' },
  },
  run: ({ O_player }, { name, color, O_entity }) => {
    const p = O_player as any
    name.next(p.name)
    color.next(p.color)
    O_entity.next(p)
  },
}

export const GetFromItemType: CodeNode = {
  id: 'GetFromItemType',
  displayName: 'GetFromItemType',
  menuDisplayName: 'GetFromItemType',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_item: { description: 'Item type (O_item from acquire/smelt events)' },
  },
  outputs: {
    item_id: { description: 'Item ID (id)' },
    data:    { description: 'Data value (data)' },
  },
  run: ({ O_item }, { item_id, data }) => {
    const a = O_item as any
    item_id.next(a.id)
    data.next(a.data)
  },
}

export const GetFromItemStack: CodeNode = {
  id: 'GetFromItemStack',
  displayName: 'GetFromItemStack',
  menuDisplayName: 'GetFromItemStack',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_item: { description: 'Item stack (O_item from use/equip/craft/trade events)' },
  },
  outputs: {
    item_id:   { description: 'Item ID (typeId)' },
    count:     { description: 'Item count (amount)' },
    max_count: { description: 'Max stack size (maxAmount)' },
    data:      { description: 'Data value (data)' },
  },
  run: ({ O_item }, { item_id, count, max_count, data }) => {
    const a = O_item as any
    item_id.next(a.typeId)
    count.next(a.amount)
    max_count.next(a.maxAmount)
    data.next(a.data)
  },
}

export const GetFromBlockType: CodeNode = {
  id: 'GetFromBlockType',
  displayName: 'GetFromBlockType',
  menuDisplayName: 'GetFromBlockType',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_block: { description: 'Block type object (O_block from block/bounce events)' },
  },
  outputs: {
    block_id: { description: 'Block ID (id)' },
    data:     { description: 'Data value (data)' },
  },
  run: ({ O_block }, { block_id, data }) => {
    const b = O_block as any
    block_id.next(b.id)
    data.next(b.data)
  },
}

export const GetFromScoreboardObjective: CodeNode = {
  id: 'GetFromScoreboardObjective',
  displayName: 'GetFromScoreboardObjective',
  menuDisplayName: 'GetFromScoreboardObjective',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    objective: { description: 'Scoreboard objective (from add/get objective nodes)' },
  },
  outputs: {
    objective_id: { description: 'Objective ID (id)' },
    display_name: { description: 'Display name (displayName)' },
  },
  run: ({ objective }, { objective_id, display_name }) => {
    const o = objective as any
    objective_id.next(o.id)
    display_name.next(o.displayName)
  },
}

export const GetFromMob: CodeNode = {
  id: 'GetFromMob',
  displayName: 'GetFromMob',
  menuDisplayName: 'GetFromMob',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_mob: { description: 'Mob object (O_mob from mob interaction event)' },
  },
  outputs: {
    type:    { description: 'Type number (type)' },
    color:   { description: 'Color number (color)' },
    variant: { description: 'Variant number (variant)' },
  },
  run: ({ O_mob }, { type, color, variant }) => {
    const m = O_mob as any
    type.next(m.type)
    color.next(m.color)
    variant.next(m.variant)
  },
}

export const GetFromVillager: CodeNode = {
  id: 'GetFromVillager',
  displayName: 'GetFromVillager',
  menuDisplayName: 'GetFromVillager',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_villager: { description: 'Villager object (O_villager from trade event)' },
  },
  outputs: {
    name:     { description: 'Villager name (trader.name)' },
    rank:     { description: 'Trade rank (trader.tier)' },
    O_entity: { description: 'Pass-through to entity info node' },
  },
  run: ({ O_villager }, { name, rank, O_entity }) => {
    const v = O_villager as any
    name.next(v.trader?.name)
    rank.next(v.trader?.tier)
    O_entity.next(v)
  },
}
