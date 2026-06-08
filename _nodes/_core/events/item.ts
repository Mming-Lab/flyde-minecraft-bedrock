import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type ItemAcquiredSignal,
  type ItemCraftedSignal,
  type ItemEquippedSignal,
  type ItemInteractedSignal,
  type ItemSmeltedSignal,
  type ItemTradedSignal,
} from 'socket-be'
import { setCurrentContext } from '../../context-manager'
import { getCurrentWorld } from '../../socketbe-instance'
import { toEnumString } from '../enum-utils'

const STYLE = { color: '#25567D' }

export const OnItemInteracted: CodeNode = {
  id: 'OnItemInteracted',
  displayName: 'OnItemInteracted',
  menuDisplayName: 'OnItemInteracted',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_item:     { description: '[nullable] Held item. null if no item' },
    O_player:   { description: 'WorldPlayer object → pass to player info node' },
    use_method: { description: 'Item use method name' },
  },
  run: ({ world }, { O_item, O_player, use_method }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemInteractedSignal) => {
      setCurrentContext(w, ev.player)
      O_item.next(ev.itemStack ?? null)
      O_player.next(ev.rawPlayer)
      use_method.next(toEnumString('ItemUseMethod', ev.method))
    }
    w.server.on(ServerEvent.ItemInteracted, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemInteracted, handler))
  },
}

export const OnItemAcquired: CodeNode = {
  id: 'OnItemAcquired',
  displayName: 'OnItemAcquired',
  menuDisplayName: 'OnItemAcquired',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    count:      { description: 'Number of items acquired' },
    O_item:     { description: 'Item type → pass to item type info node' },
    O_player:   { description: 'WorldPlayer object → pass to player info node' },
    acq_method: { description: 'Item acquisition method name' },
  },
  run: ({ world }, { count, O_item, O_player, acq_method }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemAcquiredSignal) => {
      setCurrentContext(w, ev.player)
      count.next(ev.acquiredAmount)
      O_item.next(ev.itemType)
      O_player.next(ev.rawPlayer)
      acq_method.next(toEnumString('ItemAcqMethod', ev.acquisitionMethod))
    }
    w.server.on(ServerEvent.ItemAcquired, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemAcquired, handler))
  },
}

export const OnItemCrafted: CodeNode = {
  id: 'OnItemCrafted',
  displayName: 'OnItemCrafted',
  menuDisplayName: 'OnItemCrafted',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_item:      { description: 'Item stack (crafted item) → pass to item stack info node' },
    O_player:    { description: 'WorldPlayer object → pass to player info node' },
    used_table:  { description: 'Whether a crafting table was used (true/false)' },
  },
  run: ({ world }, { O_item, O_player, used_table }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemCraftedSignal) => {
      setCurrentContext(w, ev.player)
      O_item.next(ev.craftedItemStack)
      O_player.next(ev.rawPlayer)
      used_table.next(ev.usedCraftingTable)
    }
    w.server.on(ServerEvent.ItemCrafted, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemCrafted, handler))
  },
}

export const OnItemEquipped: CodeNode = {
  id: 'OnItemEquipped',
  displayName: 'OnItemEquipped',
  menuDisplayName: 'OnItemEquipped',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_item:     { description: 'Item stack → pass to item stack info node' },
    O_player:   { description: 'WorldPlayer object → pass to player info node' },
    equip_slot: { description: 'Equipment slot name' },
  },
  run: ({ world }, { O_item, O_player, equip_slot }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemEquippedSignal) => {
      setCurrentContext(w, ev.player)
      O_item.next(ev.itemStack)
      O_player.next(ev.rawPlayer)
      equip_slot.next(toEnumString('EquipSlot', ev.slot))
    }
    w.server.on(ServerEvent.ItemEquipped, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemEquipped, handler))
  },
}

export const OnItemSmelted: CodeNode = {
  id: 'OnItemSmelted',
  displayName: 'OnItemSmelted',
  menuDisplayName: 'OnItemSmelted',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_item:   { description: 'Item type (smelted item) → pass to item type info node' },
    O_player: { description: 'WorldPlayer object → pass to player info node' },
    O_fuel:   { description: 'Item type (fuel item) → pass to item type info node' },
  },
  run: ({ world }, { O_item, O_player, O_fuel }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemSmeltedSignal) => {
      setCurrentContext(w, ev.player)
      O_item.next(ev.smeltedItemType)
      O_player.next(ev.rawPlayer)
      O_fuel.next(ev.fueledItemType)
    }
    w.server.on(ServerEvent.ItemSmelted, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemSmelted, handler))
  },
}

export const OnItemTraded: CodeNode = {
  id: 'OnItemTraded',
  displayName: 'OnItemTraded',
  menuDisplayName: 'OnItemTraded',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_item:       { description: 'Item stack (received item) → pass to item stack info node' },
    O_villager:   { description: 'WorldVillager object → pass to villager info node' },
    O_player:     { description: 'WorldPlayer object → pass to player info node' },
    O_payment_a:  { description: 'Item type (payment item A) → pass to item type info node' },
    O_payment_b:  { description: '[nullable] Item type (payment item B). null if unused' },
    player_xp:    { description: 'Emerald count held by player after trade' },
    villager_xp:  { description: 'Emerald count held by villager after trade' },
  },
  run: ({ world }, { O_item, O_villager, O_player, O_payment_a, O_payment_b, player_xp, villager_xp }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: ItemTradedSignal) => {
      setCurrentContext(w, ev.player)
      O_item.next(ev.receivedItemStack)
      O_villager.next(ev.trader)
      O_player.next(ev.rawPlayer)
      O_payment_a.next(ev.itemTypeA)
      O_payment_b.next(ev.itemTypeB ?? null)
      player_xp.next(ev.playerEmeraldCount)
      villager_xp.next(ev.traderEmeraldCount)
    }
    w.server.on(ServerEvent.ItemTraded, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.ItemTraded, handler))
  },
}
