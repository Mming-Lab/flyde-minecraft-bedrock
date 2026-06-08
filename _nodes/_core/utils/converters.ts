import { CodeNode } from '@flyde/core'
import { BLOCK_ID_TO, ITEM_ID_TO, MOB_ID_TO, getEnumLabel } from '../../utils/_catalog'

const STYLE = { color: '#767676' }

export const LocaleName: CodeNode = {
  id: 'ToJa',
  displayName: 'LocaleName',
  menuDisplayName: 'LocaleName',
  icon: 'language',
  defaultStyle: STYLE,
  inputs: {
    value: { description: 'Minecraft ID (e.g. "minecraft:stone") or event value (e.g. "Walk")' },
    type: {
      description: 'Lookup type',
      defaultValue: 'block',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'Block ID',         value: 'block' },
          { label: 'Item ID',          value: 'item' },
          { label: 'Mob ID',           value: 'mob' },
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
  },
  outputs: {
    name: { description: 'Localized name (returns input value if not found)' },
  },
  run: ({ value, type }, { name }) => {
    const v = String(value)
    const k = String(type)
    let result: string | undefined
    if (k === 'block' || k === 'item' || k === 'mob') {
      const order = k === 'item' ? [ITEM_ID_TO, BLOCK_ID_TO, MOB_ID_TO]
                  : k === 'mob'  ? [MOB_ID_TO,  ITEM_ID_TO,  BLOCK_ID_TO]
                  :                [BLOCK_ID_TO, ITEM_ID_TO,  MOB_ID_TO]
      result = order.reduce<string | undefined>((found, map) => found ?? map[v], undefined)
    } else {
      result = getEnumLabel(k, v)
    }
    name.next(result ?? v)
  },
}
