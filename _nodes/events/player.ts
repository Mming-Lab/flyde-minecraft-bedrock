import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
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
import { getCurrentWorld } from '../socketbe-instance'

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
    送信者名: { description: '送信したプレイヤーの名前（文字列）' },
    メッセージ: { description: 'チャットメッセージの内容（文字列）' },
  },
  run: ({ ワールド }, { 送信者名, メッセージ }, adv) => {
    const world = getCurrentWorld()!
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
    ﾌﾟﾚｲﾔｰ名: { description: '参加したプレイヤーの名前（文字列）' },
  },
  run: ({ ワールド }, { ﾌﾟﾚｲﾔｰ名 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerJoinSignal) => {
      setCurrentContext(world, ev.player)
      ﾌﾟﾚｲﾔｰ名.next(ev.player.name)
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
    ﾌﾟﾚｲﾔｰ名: { description: '退出したプレイヤーの名前（文字列）' },
  },
  run: ({ ワールド }, { ﾌﾟﾚｲﾔｰ名 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerLeaveSignal) => {
      setCurrentContext(world, ev.player)
      ﾌﾟﾚｲﾔｰ名.next(ev.player.name)
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
    移動距離: { description: '今回の移動距離（メートル）' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    水中: { description: '水中を移動中か（true/false）' },
    E_ﾊﾞｲｵｰﾑ: { description: '現在いるバイオームの数値コード（Enum）→ enum名称変換（バイオーム）ノードへ' },
    E_移動方法: { description: '移動方法の数値コード（Enum）→ enum名称変換（移動方法）ノードへ' },
  },
  run: ({ ワールド }, { 移動距離, O_ﾌﾟﾚｲﾔｰ, 水中, E_ﾊﾞｲｵｰﾑ, E_移動方法 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerTravelledSignal) => {
      setCurrentContext(world, ev.player)
      移動距離.next(ev.metersTravelled)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      水中.next(ev.isUnderwater)
      E_ﾊﾞｲｵｰﾑ.next(ev.newBiome)
      E_移動方法.next(ev.travelMethod)
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
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    E_原因: { description: 'テレポート原因の数値コード（Enum）→ enum名称変換（テレポート原因）ノードへ' },
    移動距離: { description: 'テレポートした距離（メートル）' },
  },
  run: ({ ワールド }, { O_ﾌﾟﾚｲﾔｰ, E_原因, 移動距離 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerTeleportedSignal) => {
      setCurrentContext(world, ev.player)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      E_原因.next(ev.cause)
      移動距離.next(ev.metersTravelled)
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
    送信者名: { description: '送信したプレイヤーの名前（文字列）' },
    メッセージ: { description: 'タイトルのメッセージ内容（文字列）' },
    受信者名: { description: '受信したプレイヤーの名前（文字列）' },
  },
  run: ({ ワールド }, { 送信者名, メッセージ, 受信者名 }, adv) => {
    const world = getCurrentWorld()!
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
    送信者名: { description: '送信したプレイヤーの名前（文字列）' },
    メッセージ: { description: 'メッセージの内容（文字列）' },
    種別: { description: 'メッセージの種別（chat / tell 等）' },
    受信者名: { description: '【null許容】受信者の名前。tell 以外では null → Conditional(EXISTS)で分岐' },
  },
  run: ({ ワールド }, { 送信者名, メッセージ, 種別, 受信者名 }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerMessageSignal) => {
      setCurrentContext(world, ev.sender)
      送信者名.next(ev.sender.name)
      メッセージ.next(ev.message)
      種別.next(ev.type)
      受信者名.next(ev.receiver?.name ?? null)
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
    高さ: { description: 'バウンスの高さ（ブロック数）' },
    O_ﾌﾞﾛｯｸ: { description: 'BlockType オブジェクト（バウンスしたブロック）→ ブロック情報取得ノードへ' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
  },
  run: ({ ワールド }, { 高さ, O_ﾌﾞﾛｯｸ, O_ﾌﾟﾚｲﾔｰ }, adv) => {
    const world = getCurrentWorld()!
    const handler = (ev: PlayerBouncedSignal) => {
      setCurrentContext(world, ev.player)
      高さ.next(ev.bounceHeight)
      O_ﾌﾞﾛｯｸ.next(ev.blockType)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.PlayerBounced, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.PlayerBounced, handler))
  },
}
