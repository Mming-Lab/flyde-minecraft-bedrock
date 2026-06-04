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
    O_ﾓﾌﾞ: { description: 'WorldMob オブジェクト（交流したモブ）' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
    E_交流種別: { description: 'モブ交流種別の数値コード（Enum）→ enum名称変換ノードへ' },
  },
  run: ({ ワールド }, { O_ﾓﾌﾞ, O_ﾌﾟﾚｲﾔｰ, E_交流種別 }, adv) => {
    const world = ワールド as World
    const handler = (ev: MobInteractedSignal) => {
      setCurrentContext(world, ev.player)
      O_ﾓﾌﾞ.next(ev.mob)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
      E_交流種別.next(ev.interactionType)
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
    強さ: { description: 'レッドストーン信号の強さ（0〜15）' },
    O_ﾌﾟﾚｲﾔｰ: { description: 'WorldPlayer オブジェクト → プレイヤー情報取得ノードへ' },
  },
  run: ({ ワールド }, { 強さ, O_ﾌﾟﾚｲﾔｰ }, adv) => {
    const world = ワールド as World
    const handler = (ev: TargetBlockHitSignal) => {
      setCurrentContext(world, ev.player)
      強さ.next(ev.redstoneLevel)
      O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)
    }
    world.server.on(ServerEvent.TargetBlockHit, handler)
    adv.onCleanup(() => world.server.remove(ServerEvent.TargetBlockHit, handler))
  },
}
