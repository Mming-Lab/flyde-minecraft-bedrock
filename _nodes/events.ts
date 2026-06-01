import { CodeNode } from '@flyde/core'
import { ServerEvent, type World } from 'socket-be'
import { setCurrentContext } from './context-manager'

const STYLE = { color: '#25567D' } // events

export const チャット受信: CodeNode = {
  id: 'OnPlayerChat',
  displayName: 'チャット受信',
  menuDisplayName: 'ﾁｬｯﾄ受信',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    送信者名: {},
    メッセージ: {},
  },
  run: ({ ワールド }, { 送信者名, メッセージ }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.sender)
      送信者名.next(ev.sender.name)
      メッセージ.next(ev.message)
    }
    world.server.on(ServerEvent.PlayerChat, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerChat, handler))
  },
}

export const プレイヤー参加: CodeNode = {
  id: 'OnPlayerJoin',
  displayName: 'プレイヤー参加',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ参加',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
  },
  run: ({ ワールド }, { プレイヤー名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
    }
    world.server.on(ServerEvent.PlayerJoin, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerJoin, handler))
  },
}

export const プレイヤー退出: CodeNode = {
  id: 'OnPlayerLeave',
  displayName: 'プレイヤー退出',
  menuDisplayName: 'ﾌﾟﾚｲﾔ退出',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
  },
  run: ({ ワールド }, { プレイヤー名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
    }
    world.server.on(ServerEvent.PlayerLeave, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerLeave, handler))
  },
}

export const ブロック破壊: CodeNode = {
  id: 'OnBlockBroken',
  displayName: 'ブロック破壊',
  menuDisplayName: 'ﾌﾞﾛｯｸ破壊',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    ブロック種別: {},
    プレイヤー: {},
    ブロック: {},
  },
  run: ({ ワールド }, { プレイヤー名, ブロック種別, プレイヤー, ブロック }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      ブロック種別.next(ev.brokenBlockType.id)
      プレイヤー.next(ev.rawPlayer)
      ブロック.next(ev.brokenBlockType)
    }
    world.server.on(ServerEvent.BlockBroken, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.BlockBroken, handler))
  },
}

export const ブロック設置イベント: CodeNode = {
  id: 'OnBlockPlaced',
  displayName: 'ブロック設置イベント',
  menuDisplayName: 'ﾌﾞﾛｯｸ設置イベント',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    ブロック種別: {},
    プレイヤー: {},
    ブロック: {},
  },
  run: ({ ワールド }, { プレイヤー名, ブロック種別, プレイヤー, ブロック }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      ブロック種別.next(ev.placedBlockType.id)
      プレイヤー.next(ev.rawPlayer)
      ブロック.next(ev.placedBlockType)
    }
    world.server.on(ServerEvent.BlockPlaced, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.BlockPlaced, handler))
  },
}

export const プレイヤーが移動: CodeNode = {
  id: 'OnPlayerTravelled',
  displayName: 'プレイヤーが移動',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ移動',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    移動距離: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, 移動距離, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      移動距離.next(ev.metersTravelled)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.PlayerTravelled, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerTravelled, handler))
  },
}

export const テレポート完了: CodeNode = {
  id: 'OnPlayerTeleported',
  displayName: 'テレポート完了',
  menuDisplayName: 'ﾃﾚﾎﾟｰﾄ完了',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.PlayerTeleported, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerTeleported, handler))
  },
}

export const アイテムを使った: CodeNode = {
  id: 'OnItemInteracted',
  displayName: 'アイテムを使った',
  menuDisplayName: 'ｱｲﾃﾑ使用',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    プレイヤー: {},
    アイテム: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, プレイヤー, アイテム }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.itemStack?.typeId ?? '')
      プレイヤー.next(ev.rawPlayer)
      アイテム.next(ev.itemStack ?? null)
    }
    world.server.on(ServerEvent.ItemInteracted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemInteracted, handler))
  },
}

export const アイテム取得: CodeNode = {
  id: 'OnItemAcquired',
  displayName: 'アイテム取得',
  menuDisplayName: 'ｱｲﾃﾑ取得',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    個数: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, 個数, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.itemType.id)
      個数.next(ev.acquiredAmount)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.ItemAcquired, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemAcquired, handler))
  },
}

export const モブと交流: CodeNode = {
  id: 'OnMobInteracted',
  displayName: 'モブと交流',
  menuDisplayName: 'ﾓﾌﾞ交流',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.MobInteracted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.MobInteracted, handler))
  },
}

export const 的ブロック命中: CodeNode = {
  id: 'OnTargetBlockHit',
  displayName: '的ブロック命中',
  menuDisplayName: '的命中',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    強さ: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, 強さ, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      強さ.next(ev.redstoneLevel)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.TargetBlockHit, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.TargetBlockHit, handler))
  },
}

export const プレイヤータイトル: CodeNode = {
  id: 'OnPlayerTitle',
  displayName: 'プレイヤータイトル',
  menuDisplayName: 'ﾀｲﾄﾙ受信',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    送信者名: {},
    メッセージ: {},
    受信者名: {},
  },
  run: ({ ワールド }, { 送信者名, メッセージ, 受信者名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.sender)
      送信者名.next(ev.sender.name)
      メッセージ.next(ev.message)
      受信者名.next(ev.receiver.name)
    }
    world.server.on(ServerEvent.PlayerTitle, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerTitle, handler))
  },
}

export const プレイヤーメッセージ: CodeNode = {
  id: 'OnPlayerMessage',
  displayName: 'プレイヤーメッセージ',
  menuDisplayName: 'ﾒｯｾｰｼﾞ受信',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    送信者名: {},
    メッセージ: {},
  },
  run: ({ ワールド }, { 送信者名, メッセージ }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.sender)
      送信者名.next(ev.sender.name)
      メッセージ.next(ev.message)
    }
    world.server.on(ServerEvent.PlayerMessage, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerMessage, handler))
  },
}

export const アイテムをクラフト: CodeNode = {
  id: 'OnItemCrafted',
  displayName: 'アイテムをクラフト',
  menuDisplayName: 'ｸﾗﾌﾄ',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    プレイヤー: {},
    アイテム: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, プレイヤー, アイテム }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.craftedItemStack?.typeId ?? '')
      プレイヤー.next(ev.rawPlayer)
      アイテム.next(ev.craftedItemStack)
    }
    world.server.on(ServerEvent.ItemCrafted, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemCrafted, handler))
  },
}

export const アイテムを装備: CodeNode = {
  id: 'OnItemEquipped',
  displayName: 'アイテムを装備',
  menuDisplayName: 'ｱｲﾃﾑ装備',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    プレイヤー: {},
    アイテム: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, プレイヤー, アイテム }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.itemStack?.typeId ?? '')
      プレイヤー.next(ev.rawPlayer)
      アイテム.next(ev.itemStack)
    }
    world.server.on(ServerEvent.ItemEquipped, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemEquipped, handler))
  },
}

export const アイテムを精錬: CodeNode = {
  id: 'OnItemSmelted',
  displayName: 'アイテムを精錬',
  menuDisplayName: 'ｱｲﾃﾑ精錬',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.smeltedItemType?.id ?? '')
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
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    アイテム名: {},
    プレイヤー: {},
    アイテム: {},
    村人: {},
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, プレイヤー, アイテム, 村人 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.receivedItemStack?.typeId ?? '')
      プレイヤー.next(ev.rawPlayer)
      アイテム.next(ev.receivedItemStack)
      村人.next(ev.trader)
    }
    world.server.on(ServerEvent.ItemTraded, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.ItemTraded, handler))
  },
}

export const バウンス: CodeNode = {
  id: 'OnPlayerBounced',
  displayName: 'バウンス',
  menuDisplayName: 'ﾊﾞｳﾝｽ',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    高さ: {},
    プレイヤー: {},
    ブロック: {},
  },
  run: ({ ワールド }, { プレイヤー名, 高さ, プレイヤー, ブロック }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      高さ.next(ev.bounceHeight)
      プレイヤー.next(ev.rawPlayer)
      ブロック.next(ev.blockType)
    }
    world.server.on(ServerEvent.PlayerBounced, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerBounced, handler))
  },
}
