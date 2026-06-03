import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type World,
  type MobInteractedSignal,
  type TargetBlockHitSignal,
} from 'socket-be'
import { setCurrentContext } from '../context-manager'

const STYLE = { color: '#25567D' }

export const モブと交流: CodeNode = {
  id: 'OnMobInteracted',
  displayName: 'モブと交流',
  menuDisplayName: 'ﾓﾌﾞ交流',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    ワールド: { description: 'Minecraft接続ノードのワールド出力' },
  },
  outputs: {
    プレイヤー名: {},
    モブ: {},
    プレイヤー: {},
  },
  run: ({ ワールド }, { プレイヤー名, モブ, プレイヤー }, adv) => {
    const world = ワールド as World
    const handler = (ev: MobInteractedSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      モブ.next(ev.mob)
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
  icon: 'bolt',
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
    const handler = (ev: TargetBlockHitSignal) => {
      setCurrentContext(world, ev.player)
      プレイヤー名.next(ev.rawPlayer.name)
      強さ.next(ev.redstoneLevel)
      プレイヤー.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.TargetBlockHit, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.TargetBlockHit, handler))
  },
}
