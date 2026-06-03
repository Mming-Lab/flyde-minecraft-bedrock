import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type World,
  type BlockBrokenSignal,
  type BlockPlacedSignal,
} from 'socket-be'
import { setCurrentContext } from '../context-manager'

const STYLE = { color: '#25567D' }

export const ブロック破壊: CodeNode = {
  id: 'OnBlockBroken',
  displayName: 'ブロック破壊',
  menuDisplayName: 'ﾌﾞﾛｯｸ破壊',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    ブロック: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, ブロック, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: BlockBrokenSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      ブロック.next(ev.brokenBlockType)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.BlockBroken, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.BlockBroken, handler))
  },
}

export const ブロック設置イベント: CodeNode = {
  id: 'OnBlockPlaced',
  displayName: 'ブロック設置イベント',
  menuDisplayName: 'ﾌﾞﾛｯｸ設置イベント',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    ブロック: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, ブロック, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: BlockPlacedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      ブロック.next(ev.placedBlockType)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.BlockPlaced, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.BlockPlaced, handler))
  },
}
