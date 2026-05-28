import { CodeNode } from '@flyde/core'
import { ServerEvent, type World } from 'socket-be'

const STYLE = { color: '#25567D' } // events

export const チャット受信: CodeNode = {
  id: 'OnPlayerChat',
  displayName: 'チャット受信',
  defaultStyle: STYLE,
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    送信者: {},
    メッセージ: {},
  },
  run: ({ ワールド }, { 送信者, メッセージ }) => {
    const world = ワールド as World
    world.server.on(ServerEvent.PlayerChat, (ev) => {
      送信者.next(ev.sender)
      メッセージ.next(ev.message)
    })
  },
}

export const プレイヤー参加: CodeNode = {
  id: 'OnPlayerJoin',
  displayName: 'プレイヤー参加',
  defaultStyle: STYLE,
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー }) => {
    const world = ワールド as World
    world.server.on(ServerEvent.PlayerJoin, (ev) => {
      プレイヤー.next(ev.player)
    })
  },
}

export const プレイヤー退出: CodeNode = {
  id: 'OnPlayerLeave',
  displayName: 'プレイヤー退出',
  defaultStyle: STYLE,
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー }) => {
    const world = ワールド as World
    world.server.on(ServerEvent.PlayerLeave, (ev) => {
      プレイヤー.next(ev.player)
    })
  },
}

export const ブロック破壊: CodeNode = {
  id: 'OnBlockBroken',
  displayName: 'ブロック破壊',
  defaultStyle: STYLE,
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー: {},
    ブロック種別: {},
  },
  run: ({ ワールド }, { プレイヤー, ブロック種別 }) => {
    const world = ワールド as World
    world.server.on(ServerEvent.BlockBroken, (ev) => {
      プレイヤー.next(ev.player)
      ブロック種別.next(ev.brokenBlockType)
    })
  },
}
