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
  },
  run: ({ ワールド }, { プレイヤー名, ブロック種別 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      ブロック種別.next(ev.brokenBlockType)
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
  },
  run: ({ ワールド }, { プレイヤー名, ブロック種別 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      ブロック種別.next(ev.placedBlockType)
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
  },
  run: ({ ワールド }, { プレイヤー名, 移動距離 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      移動距離.next(ev.metersTravelled)
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
  },
  run: ({ ワールド }, { プレイヤー名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
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
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.itemStack?.typeId ?? '')
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
  },
  run: ({ ワールド }, { プレイヤー名, アイテム名, 個数 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      アイテム名.next(ev.itemType.id)
      個数.next(ev.acquiredAmount)
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
  },
  run: ({ ワールド }, { プレイヤー名 }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
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
  },
  run: ({ ワールド }, { プレイヤー名, 強さ }, adv) => {
    const world = ワールド as World
    const handler = (ev: any) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
      強さ.next(ev.redstoneLevel)
    }
    world.server.on(ServerEvent.TargetBlockHit, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.TargetBlockHit, handler))
  },
}
