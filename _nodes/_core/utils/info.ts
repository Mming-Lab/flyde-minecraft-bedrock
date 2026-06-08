import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' }

export const GetFromEntity: CodeNode = {
  id: 'GetFromEntity',
  displayName: 'GetFromEntity',
  menuDisplayName: 'GetFromEntity',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    entity: { description: 'Player or villager object (player / villager output)' },
  },
  outputs: {
    position:  { description: 'Position (position)' },
    direction: { description: 'Y-axis rotation (yRot)' },
    dimension: { description: 'Dimension number (dimension)' },
    type:      { description: 'Type string (type)' },
    variant:   { description: 'Variant number (variant)' },
    ID:        { description: 'Entity ID number (id)' },
  },
  run: ({ entity }, { position, direction, dimension, type, variant, ID }) => {
    const e = entity as any
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
    player: { description: 'Player object from event node player output' },
  },
  outputs: {
    name:     { description: 'Player name (name)' },
    color:    { description: 'Map marker color (color)' },
    entity: { description: 'Pass-through to entity info node' },
  },
  run: ({ player }, { name, color, entity }) => {
    const p = player as any
    name.next(p.name)
    color.next(p.color)
    entity.next(p)
  },
}

export const GetFromItemType: CodeNode = {
  id: 'GetFromItemType',
  displayName: 'GetFromItemType',
  menuDisplayName: 'GetFromItemType',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    item: { description: 'Item type (item from acquire/smelt events)' },
  },
  outputs: {
    item_id: { description: 'Item ID (id)' },
    data:    { description: 'Data value (data)' },
  },
  run: ({ item }, { item_id, data }) => {
    const a = item as any
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
    item: { description: 'Item stack (item from use/equip/craft/trade events)' },
  },
  outputs: {
    item_id:   { description: 'Item ID (typeId)' },
    count:     { description: 'Item count (amount)' },
    max_count: { description: 'Max stack size (maxAmount)' },
    data:      { description: 'Data value (data)' },
  },
  run: ({ item }, { item_id, count, max_count, data }) => {
    const a = item as any
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
    block: { description: 'Block type object (block from block/bounce events)' },
  },
  outputs: {
    block_id: { description: 'Block ID (id)' },
    data:     { description: 'Data value (data)' },
  },
  run: ({ block }, { block_id, data }) => {
    const b = block as any
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
    mob: { description: 'Mob object (mob from mob interaction event)' },
  },
  outputs: {
    type:    { description: 'Type number (type)' },
    color:   { description: 'Color number (color)' },
    variant: { description: 'Variant number (variant)' },
  },
  run: ({ mob }, { type, color, variant }) => {
    const m = mob as any
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
    villager: { description: 'Villager object (villager from trade event)' },
  },
  outputs: {
    name:     { description: 'Villager name (trader.name)' },
    rank:     { description: 'Trade rank (trader.tier)' },
    entity: { description: 'Pass-through to entity info node' },
  },
  run: ({ villager }, { name, rank, entity }) => {
    const v = villager as any
    name.next(v.trader?.name)
    rank.next(v.trader?.tier)
    entity.next(v)
  },
}
