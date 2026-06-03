import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type World,
  type ItemAcquiredSignal,
  type ItemCraftedSignal,
  type ItemEquippedSignal,
  type ItemInteractedSignal,
  type ItemSmeltedSignal,
  type ItemTradedSignal,
} from 'socket-be'
import { setCurrentContext } from '../context-manager'

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
    プレイヤー名: {},
    アイテム名: {},
    アイテム: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, アイテム, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemInteractedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.itemStack?.typeId ?? '')
      if (ev.itemStack) アイテム.next(ev.itemStack)
      プレイヤー.next(ev.rawPlayer)
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
    プレイヤー名: {},
    アイテム名: {},
    個数: {},
    アイテム: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, 個数, アイテム, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemAcquiredSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.itemType.id)
      個数.next(ev.acquiredAmount)
      アイテム.next(ev.itemType)
      プレイヤー.next(ev.rawPlayer)
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
    プレイヤー名: {},
    アイテム名: {},
    アイテム: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, アイテム, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemCraftedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.craftedItemStack?.typeId ?? '')
      アイテム.next(ev.craftedItemStack)
      プレイヤー.next(ev.rawPlayer)
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
    プレイヤー名: {},
    アイテム名: {},
    アイテム: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, アイテム, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemEquippedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.itemStack?.typeId ?? '')
      アイテム.next(ev.itemStack)
      プレイヤー.next(ev.rawPlayer)
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
    プレイヤー名: {},
    アイテム名: {},
    アイテム: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, アイテム, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemSmeltedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.smeltedItemType.id)
      アイテム.next(ev.smeltedItemType)
      プレイヤー.next(ev.rawPlayer)
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
    プレイヤー名: {},
    アイテム名: {},
    アイテム: {},
    村人: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, アイテム, 村人, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: ItemTradedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      アイテム名.next(ev.receivedItemStack?.typeId ?? '')
      アイテム.next(ev.receivedItemStack)
      村人.next(ev.trader)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.ItemTraded, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemTraded, handler))
  },
}
