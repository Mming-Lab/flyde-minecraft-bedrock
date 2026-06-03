import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type World,
  type PlayerBouncedSignal,
  type PlayerChatSignal,
  type PlayerJoinSignal,
  type PlayerLeaveSignal,
  type PlayerMessageSignal,
  type PlayerTeleportedSignal,
  type PlayerTitleSignal,
  type PlayerTravelledSignal,
} from 'socket-be'
import { setCurrentContext } from '../context-manager'

const STYLE = { color: '#25567D' }

export const チャット受信: CodeNode = {
  id: 'OnPlayerChat',
  displayName: 'チャット受信',
  menuDisplayName: 'ﾁｬｯﾄ受信',
  icon: 'bolt',
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
    const handler = (ev: PlayerChatSignal) => {
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
  icon: 'bolt',
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
    const handler = (ev: PlayerJoinSignal) => {
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
  icon: 'bolt',
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
    const handler = (ev: PlayerLeaveSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.player.name)
    }
    world.server.on(ServerEvent.PlayerLeave, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerLeave, handler))
  },
}

export const プレイヤーが移動: CodeNode = {
  id: 'OnPlayerTravelled',
  displayName: 'プレイヤーが移動',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ移動',
  icon: 'bolt',
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
    const handler = (ev: PlayerTravelledSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
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
  icon: 'bolt',
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
    const handler = (ev: PlayerTeleportedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.PlayerTeleported, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerTeleported, handler))
  },
}

export const プレイヤータイトル: CodeNode = {
  id: 'OnPlayerTitle',
  displayName: 'プレイヤータイトル',
  menuDisplayName: 'ﾀｲﾄﾙ受信',
  icon: 'bolt',
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
    const handler = (ev: PlayerTitleSignal) => {
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
  icon: 'bolt',
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
    const handler = (ev: PlayerMessageSignal) => {
      setCurrentContext(world, ev.sender)
      送信者名.next(ev.sender.name)
      メッセージ.next(ev.message)
    }
    world.server.on(ServerEvent.PlayerMessage, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerMessage, handler))
  },
}

export const バウンス: CodeNode = {
  id: 'OnPlayerBounced',
  displayName: 'バウンス',
  menuDisplayName: 'ﾊﾞｳﾝｽ',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    高さ: {},
    ブロック: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, 高さ, ブロック, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: PlayerBouncedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      高さ.next(ev.bounceHeight)
      ブロック.next(ev.blockType)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.PlayerBounced, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerBounced, handler))
  },
}
