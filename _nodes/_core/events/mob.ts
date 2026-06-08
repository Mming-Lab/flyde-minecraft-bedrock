import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type MobInteractedSignal,
  type TargetBlockHitSignal,
} from 'socket-be'
import { setCurrentContext } from '../../context-manager'
import { getCurrentWorld } from '../../socketbe-instance'
import { toEnumString } from '../enum-utils'

const STYLE = { color: '#25567D' }

export const OnMobInteracted: CodeNode = {
  id: 'OnMobInteracted',
  displayName: 'OnMobInteracted',
  menuDisplayName: 'OnMobInteracted',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_mob:            { description: 'WorldMob object (interacted mob)' },
    O_player:         { description: 'WorldPlayer object → pass to player info node' },
    interaction_type: { description: 'Mob interaction type name' },
  },
  run: ({ world }, { O_mob, O_player, interaction_type }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: MobInteractedSignal) => {
      setCurrentContext(w, ev.player)
      O_mob.next(ev.mob)
      O_player.next(ev.rawPlayer)
      interaction_type.next(toEnumString('MobInteraction', ev.interactionType))
    }
    w.server.on(ServerEvent.MobInteracted, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.MobInteracted, handler))
  },
}

export const OnTargetBlockHit: CodeNode = {
  id: 'OnTargetBlockHit',
  displayName: 'OnTargetBlockHit',
  menuDisplayName: 'OnTargetBlockHit',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    strength: { description: 'Redstone signal level (0–15)' },
    O_player: { description: 'WorldPlayer object → pass to player info node' },
  },
  run: ({ world }, { strength, O_player }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: TargetBlockHitSignal) => {
      setCurrentContext(w, ev.player)
      strength.next(ev.redstoneLevel)
      O_player.next(ev.rawPlayer)
    }
    w.server.on(ServerEvent.TargetBlockHit, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.TargetBlockHit, handler))
  },
}
