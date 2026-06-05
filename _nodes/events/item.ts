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
import { setCurrentContext } from '../context-manager'
import { getCurrentWorld } from '../socketbe-instance'
import { toEnumString } from '../enum-utils'

const STYLE = { color: '#25567D' }

export const アイテムを使った: CodeNode = {
  id: 'OnItemInteracted',
  displayName: 'アイテムを使った',
  menuDisplayName: 'ｱｲﾃﾑ使用',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    O_ｱｲﾃﾑ: { description: '【null許容】所持アイテム。アイテムなしの場合 null → Conditional(EXISTS)で分岐' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    使用方法: { description: 'アイテム使用方法名' },
  },
  run: ({ ワールド }, { O_ｱｲﾃﾑ, O_ﾌﾟﾚｲﾔｰ, 使用方法 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemInteractedSignal) => {
      setCurrentContext(world, ev.player)
      O_ｱｲﾃﾑ.next(ev.itemStack ?? null)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      使用方法.next(toEnumString('interactMethod', ev.method))
    }
    world.server.on(ServerEvent.ItemInteracted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemInteracted, handler))
  },
}

export const アイテム取得: CodeNode = {
  id: 'OnItemAcquired',
  displayName: 'アイテム取得',
  menuDisplayName: 'ｱｲﾃﾑ取得',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    個数: { description: '取得したアイテムの個数' },
    O_ｱｲﾃﾑ: { description: 'アイテム種別 → アイテム種別情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    取得方法: { description: 'アイテム取得方法名' },
  },
  run: ({ ワールド }, { 個数, O_ｱｲﾃﾑ, O_ﾌﾟﾚｲﾔｰ, 取得方法 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemAcquiredSignal) => {
      setCurrentContext(world, ev.player)
      個数.next(ev.acquiredAmount)
      O_ｱｲﾃﾑ.next(ev.itemType)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      取得方法.next(toEnumString('acquisitionMethod', ev.acquisitionMethod))
    }
    world.server.on(ServerEvent.ItemAcquired, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemAcquired, handler))
  },
}

export const アイテムをクラフト: CodeNode = {
  id: 'OnItemCrafted',
  displayName: 'アイテムをクラフト',
  menuDisplayName: 'ｸﾗﾌﾄ',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    O_ｱｲﾃﾑ: { description: '所持アイテム（クラフトしたアイテム）→ 所持アイテム情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    ｸﾗﾌﾄ台使用: { description: 'クラフトテーブルを使用したか（true/false）' },
  },
  run: ({ ワールド }, { O_ｱｲﾃﾑ, O_ﾌﾟﾚｲﾔｰ, ｸﾗﾌﾄ台使用 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemCraftedSignal) => {
      setCurrentContext(world, ev.player)
      O_ｱｲﾃﾑ.next(ev.craftedItemStack)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      ｸﾗﾌﾄ台使用.next(ev.usedCraftingTable)
    }
    world.server.on(ServerEvent.ItemCrafted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemCrafted, handler))
  },
}

export const アイテムを装備: CodeNode = {
  id: 'OnItemEquipped',
  displayName: 'アイテムを装備',
  menuDisplayName: 'ｱｲﾃﾑ装備',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    O_ｱｲﾃﾑ: { description: '所持アイテム → 所持アイテム情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    装備スロット: { description: '装備スロット名' },
  },
  run: ({ ワールド }, { O_ｱｲﾃﾑ, O_ﾌﾟﾚｲﾔｰ, 装備スロット }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemEquippedSignal) => {
      setCurrentContext(world, ev.player)
      O_ｱｲﾃﾑ.next(ev.itemStack)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      装備スロット.next(toEnumString('equipmentSlot', ev.slot))
    }
    world.server.on(ServerEvent.ItemEquipped, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemEquipped, handler))
  },
}

export const アイテムを精錬: CodeNode = {
  id: 'OnItemSmelted',
  displayName: 'アイテムを精錬',
  menuDisplayName: 'ｱｲﾃﾑ精錬',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    O_ｱｲﾃﾑ: { description: 'アイテム種別（精錬されたアイテム）→ アイテム種別情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    O_燃料ｱｲﾃﾑ: { description: 'アイテム種別（燃料アイテム）→ アイテム種別情報取得ノードへ' },
  },
  run: ({ ワールド }, { O_ｱｲﾃﾑ, O_ﾌﾟﾚｲﾔｰ, O_燃料ｱｲﾃﾑ }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemSmeltedSignal) => {
      setCurrentContext(world, ev.player)
      O_ｱｲﾃﾑ.next(ev.smeltedItemType)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      O_燃料ｱｲﾃﾑ.next(ev.fueledItemType)
    }
    world.server.on(ServerEvent.ItemSmelted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemSmelted, handler))
  },
}

export const アイテムを取引: CodeNode = {
  id: 'OnItemTraded',
  displayName: 'アイテムを取引',
  menuDisplayName: 'ｱｲﾃﾑ取引',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    O_ｱｲﾃﾑ: { description: '所持アイテム（受け取ったアイテム）→ 所持アイテム情報取得ノードへ' },
    O_村人: { description: 'WorldVillager オブジェクト → 村人情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    O_支払A: { description: 'アイテム種別（支払いアイテムA）→ アイテム種別情報取得ノードへ' },
    O_支払B: { description: '【null許容】アイテム種別（支払いアイテムB）。不要な取引では null → Conditional(EXISTS)で分岐' },
    ﾌﾟﾚｲﾔｰEM数: { description: 'プレイヤーが取引後に持っているエメラルド数' },
    村人EM数: { description: '村人が取引後に持っているエメラルド数' },
  },
  run: ({ ワールド }, { O_ｱｲﾃﾑ, O_村人, O_ﾌﾟﾚｲﾔｰ, O_支払A, O_支払B, ﾌﾟﾚｲﾔｰEM数, 村人EM数 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: ItemTradedSignal) => {
      setCurrentContext(world, ev.player)
      O_ｱｲﾃﾑ.next(ev.receivedItemStack)
      O_村人.next(ev.trader)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      O_支払A.next(ev.itemTypeA)
      O_支払B.next(ev.itemTypeB ?? null)
      ﾌﾟﾚｲﾔｰEM数.next(ev.playerEmeraldCount)
      村人EM数.next(ev.traderEmeraldCount)
    }
    world.server.on(ServerEvent.ItemTraded, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemTraded, handler))
  },
}
