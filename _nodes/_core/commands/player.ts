import { CodeNode } from '@flyde/core'
import { getCurrentContext } from '../../context-manager'

const STYLE = { color: '#0078D7' }

export const GetPlayerLocation: CodeNode = {
  id: 'GetPlayerLocation',
  displayName: 'GetPlayerLocation',
  menuDisplayName: 'GetPlayerLocation',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: {
    position:  {},
    direction: {},
  },
  run: async (_, { position, direction }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    position.next(result.position)
    direction.next(result.yRot)
  },
}

export const GetPlayerOrientation: CodeNode = {
  id: 'GetPlayerOrientation',
  displayName: 'GetPlayerOrientation',
  menuDisplayName: 'GetPlayerOrientation',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: {
    angle: {},
  },
  run: async (_, { angle }) => {
    const { player } = getCurrentContext()
    const result = await player.query()
    angle.next(result.yRot)
  },
}

export const GetPlayerTags: CodeNode = {
  id: 'GetPlayerTags',
  displayName: 'GetPlayerTags',
  menuDisplayName: 'GetPlayerTags',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { tags: {} },
  run: async (_, { tags }) => {
    const { player } = getCurrentContext()
    tags.next(await player.getTags())
  },
}

export const PlayerHasTag: CodeNode = {
  id: 'PlayerHasTag',
  displayName: 'PlayerHasTag',
  menuDisplayName: 'PlayerHasTag',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
    tag:     { description: 'Tag name to check' },
  },
  outputs: { result: {} },
  run: async ({ tag }, { result }) => {
    const { player } = getCurrentContext()
    result.next(await player.hasTag(String(tag)))
  },
}

export const GetPlayerLevel: CodeNode = {
  id: 'GetPlayerLevel',
  displayName: 'GetPlayerLevel',
  menuDisplayName: 'GetPlayerLevel',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { level: {} },
  run: async (_, { level }) => {
    const { player } = getCurrentContext()
    level.next(await player.getLevel())
  },
}

export const GetGameMode: CodeNode = {
  id: 'GetGameMode',
  displayName: 'GetGameMode',
  menuDisplayName: 'GetGameMode',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { game_mode: {} },
  run: async (_, { game_mode }) => {
    const { player } = getCurrentContext()
    game_mode.next(await player.getGameMode())
  },
}

export const GetPlayerAbilities: CodeNode = {
  id: 'GetPlayerAbilities',
  displayName: 'GetPlayerAbilities',
  menuDisplayName: 'GetPlayerAbilities',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { abilities: {} },
  run: async (_, { abilities }) => {
    const { player } = getCurrentContext()
    abilities.next(await player.getAbilities())
  },
}

export const GetPlayers: CodeNode = {
  id: 'GetPlayers',
  displayName: 'GetPlayers',
  menuDisplayName: 'GetPlayers',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { players: {} },
  run: async (_, { players }) => {
    const { world } = getCurrentContext()
    players.next(await world.getPlayers())
  },
}

export const GetLocalPlayer: CodeNode = {
  id: 'GetLocalPlayer',
  displayName: 'GetLocalPlayer',
  menuDisplayName: 'GetLocalPlayer',
  icon: 'magnifying-glass',
  defaultStyle: STYLE,
  inputs: {
    trigger: { description: 'Trigger (optional)' },
  },
  outputs: { player: {} },
  run: async (_, { player }) => {
    const { world } = getCurrentContext()
    player.next(await world.getLocalPlayer())
  },
}
