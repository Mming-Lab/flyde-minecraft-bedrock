import { CodeNode } from '@flyde/core'
import {
  ServerEvent,
  type BlockBrokenSignal,
  type BlockPlacedSignal,
} from 'socket-be'
import { setCurrentContext } from '../../context-manager'
import { getCurrentWorld } from '../../socketbe-instance'
import { toEnumString } from '../enum-utils'

const STYLE = { color: '#25567D' }

export const OnBlockBroken: CodeNode = {
  id: 'OnBlockBroken',
  displayName: 'OnBlockBroken',
  menuDisplayName: 'OnBlockBroken',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_block:        { description: 'BlockType object → pass to block info node' },
    O_player:       { description: 'WorldPlayer object → pass to player info node' },
    destroy_method: { description: 'Block destruction method name' },
    O_item:         { description: '[nullable] Held item before breaking. null if bare-handed' },
  },
  run: ({ world }, { O_block, O_player, destroy_method, O_item }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: BlockBrokenSignal) => {
      setCurrentContext(w, ev.player)
      O_block.next(ev.brokenBlockType)
      O_player.next(ev.rawPlayer)
      destroy_method.next(toEnumString('BlockBreakMethod', ev.destructionMethod))
      O_item.next(ev.itemStackBeforeBreak ?? null)
    }
    w.server.on(ServerEvent.BlockBroken, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.BlockBroken, handler))
  },
}

export const OnBlockPlaced: CodeNode = {
  id: 'OnBlockPlaced',
  displayName: 'OnBlockPlaced',
  menuDisplayName: 'OnBlockPlaced',
  icon: 'bolt',
  defaultStyle: STYLE,
  completionOutputs: [],
  inputs: {
    world: { description: 'World output from MinecraftConnect node' },
  },
  outputs: {
    O_block:       { description: 'BlockType object → pass to block info node' },
    O_player:      { description: 'WorldPlayer object → pass to player info node' },
    underwater:    { description: 'Whether placed underwater (true/false)' },
    place_method:  { description: 'Block placement method name' },
    O_item:        { description: 'Held item before placing → pass to item info node' },
  },
  run: ({ world }, { O_block, O_player, underwater, place_method, O_item }, adv) => {
    const w = getCurrentWorld()!
    const handler = (ev: BlockPlacedSignal) => {
      setCurrentContext(w, ev.player)
      O_block.next(ev.placedBlockType)
      O_player.next(ev.rawPlayer)
      underwater.next(ev.placedUnderwater)
      place_method.next(toEnumString('BlockPlaceMethod', ev.placementMethod))
      O_item.next(ev.itemStackBeforePlace)
    }
    w.server.on(ServerEvent.BlockPlaced, handler)
    adv.onCleanup(() => w.server.remove(ServerEvent.BlockPlaced, handler))
  },
}
