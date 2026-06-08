import { CodeNode } from '@flyde/core'
import { BLOCK_ALL, ITEM_ALL, MOB_ALL, enumOpts } from '../../utils/_catalog'

const STYLE = { color: '#767676' }

export const Selector: CodeNode = {
  id: 'Selector',
  displayName: 'Selector',
  menuDisplayName: 'Selector',
  icon: 'hand-pointer',
  defaultStyle: STYLE,
  inputs: {
    type: {
      description: 'Type of value to select',
      defaultValue: 'block',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'Block',            value: 'block' },
          { label: 'Item',             value: 'item' },
          { label: 'Mob',              value: 'mob' },
          { label: 'Travel Method',    value: 'TravelMethod' },
          { label: 'Teleport Cause',   value: 'TeleportCause' },
          { label: 'Mob Interaction',  value: 'MobInteraction' },
          { label: 'Item Use Method',  value: 'ItemUseMethod' },
          { label: 'Item Acq Method',  value: 'ItemAcqMethod' },
          { label: 'Equip Slot',       value: 'EquipSlot' },
          { label: 'Block Break',      value: 'BlockBreakMethod' },
          { label: 'Block Place',      value: 'BlockPlaceMethod' },
        ],
      },
    },
    block: {
      description: 'Block ID',
      condition: "type === 'block'",
      defaultValue: 'minecraft:stone',
      editorType: 'select',
      editorTypeData: { options: BLOCK_ALL },
    },
    item: {
      description: 'Item ID',
      condition: "type === 'item'",
      defaultValue: 'minecraft:apple',
      editorType: 'select',
      editorTypeData: { options: ITEM_ALL },
    },
    mob: {
      description: 'Mob (entity) ID',
      condition: "type === 'mob'",
      defaultValue: 'minecraft:cow',
      editorType: 'select',
      editorTypeData: { options: MOB_ALL },
    },
    TravelMethod:    { description: 'Travel method',          condition: "type === 'TravelMethod'",    defaultValue: 'Walk',     editorType: 'select', editorTypeData: { options: enumOpts('TravelMethod') } },
    TeleportCause:   { description: 'Teleport cause',         condition: "type === 'TeleportCause'",   defaultValue: 'Command',  editorType: 'select', editorTypeData: { options: enumOpts('TeleportCause') } },
    MobInteraction:  { description: 'Mob interaction type',   condition: "type === 'MobInteraction'",  defaultValue: 'Feeding',  editorType: 'select', editorTypeData: { options: enumOpts('MobInteraction') } },
    ItemUseMethod:   { description: 'Item use method',        condition: "type === 'ItemUseMethod'",   defaultValue: 'Use',      editorType: 'select', editorTypeData: { options: enumOpts('ItemUseMethod') } },
    ItemAcqMethod:   { description: 'Item acquisition method', condition: "type === 'ItemAcqMethod'",  defaultValue: 'Pickedup', editorType: 'select', editorTypeData: { options: enumOpts('ItemAcqMethod') } },
    EquipSlot:       { description: 'Equipment slot',         condition: "type === 'EquipSlot'",       defaultValue: 'Head',     editorType: 'select', editorTypeData: { options: enumOpts('EquipSlot') } },
    BlockBreakMethod:{ description: 'Block break method',     condition: "type === 'BlockBreakMethod'",defaultValue: 'Player',   editorType: 'select', editorTypeData: { options: enumOpts('BlockBreakMethod') } },
    BlockPlaceMethod:{ description: 'Block place method',     condition: "type === 'BlockPlaceMethod'",defaultValue: 'Player',   editorType: 'select', editorTypeData: { options: enumOpts('BlockPlaceMethod') } },
  },
  outputs: {
    value: { description: 'Selected value (block/item/mob ID or event value)' },
  },
  run: (inputs, { value }) => {
    const s = String(inputs['type'])
    if      (s === 'block') value.next(String(inputs['block']))
    else if (s === 'item')  value.next(String(inputs['item']))
    else if (s === 'mob')   value.next(String(inputs['mob']))
    else                    value.next(String(inputs[s]))
  },
}
