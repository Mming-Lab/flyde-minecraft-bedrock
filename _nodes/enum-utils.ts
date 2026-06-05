import {
  TravelMethod,
  TeleportationCause,
  MobInteractionType,
  ItemInteractMethod,
  ItemAcquisitionMethod,
  PlayerEquipmentSlot,
} from 'socket-be'

// 数値 enum を「値 → キー名」に逆引きするヘルパー
export function enumKeyName(enumObj: Record<string, string | number>, value: number): string {
  const entry = Object.entries(enumObj).find(([, v]) => v === value)
  return entry ? entry[0] : String(value)
}

// socket-be に enum 定義がない数値フィールド用マッピング
// Bedrock プロトコルの BlockDestroyedByPlayer / BlockPlaced パケット仕様に基づく
export const DESTRUCTION_METHOD: Record<number, string> = {
  0: 'Player',
  1: 'Explosion',
  2: 'Mob',
  3: 'Piston',
  4: 'Other',
}

export const PLACEMENT_METHOD: Record<number, string> = {
  0: 'Player',
  1: 'Other',
}

// Bedrock Edition バイオーム数値 ID → 名称
// 出典: Bedrock プロトコル仕様 / LeviLamina / @minecraft/vanilla-data の MinecraftBiomeTypes
// バージョンによって一部 ID が異なる場合あり
export const BIOME_NAMES: Record<number, string> = {
  0:   'Ocean',
  1:   'Plains',
  2:   'Desert',
  3:   'ExtremeHills',
  4:   'Forest',
  5:   'Taiga',
  6:   'Swampland',
  7:   'River',
  8:   'Hell',
  9:   'TheEnd',
  10:  'LegacyFrozenOcean',
  11:  'FrozenRiver',
  12:  'IcePlains',
  13:  'IceMountains',
  14:  'MushroomIsland',
  15:  'MushroomIslandShore',
  16:  'Beach',
  17:  'DesertHills',
  18:  'ForestHills',
  19:  'TaigaHills',
  20:  'ExtremeHillsEdge',
  21:  'Jungle',
  22:  'JungleHills',
  23:  'JungleEdge',
  24:  'DeepOcean',
  25:  'StoneBeach',
  26:  'ColdBeach',
  27:  'BirchForest',
  28:  'BirchForestHills',
  29:  'RoofedForest',
  30:  'ColdTaiga',
  31:  'ColdTaigaHills',
  32:  'MegaTaiga',
  33:  'MegaTaigaHills',
  34:  'ExtremeHillsPlusTrees',
  35:  'Savanna',
  36:  'SavannaPlateau',
  37:  'Mesa',
  38:  'MesaPlateauStone',
  39:  'MesaPlateau',
  40:  'WarmOcean',
  41:  'LukewarmOcean',
  42:  'ColdOcean',
  43:  'DeepWarmOcean',
  44:  'DeepLukewarmOcean',
  45:  'DeepColdOcean',
  46:  'DeepFrozenOcean',
  47:  'FrozenPeaks',
  48:  'SnowySlopes',
  49:  'StonyPeaks',
  50:  'JaggedPeaks',
  51:  'Meadow',
  52:  'Grove',
  53:  'LushCaves',
  54:  'DripstoneCaves',
  55:  'DeepDark',
  56:  'MangroveSwamp',
  57:  'CherryGrove',
  58:  'PaleGarden',
  129: 'SunflowerPlains',
  130: 'DesertMutated',
  131: 'ExtremeHillsMutated',
  132: 'FlowerForest',
  133: 'TaigaMutated',
  134: 'SwamplandMutated',
  140: 'IcePlainsSpikes',
  149: 'JungleMutated',
  151: 'JungleEdgeMutated',
  155: 'BirchForestMutated',
  156: 'BirchForestHillsMutated',
  157: 'RoofedForestMutated',
  158: 'ColdTaigaMutated',
  160: 'RedwoodTaigaMutated',
  161: 'RedwoodTaigaHillsMutated',
  162: 'ExtremeHillsPlusTreesMutated',
  163: 'SavannaMutated',
  164: 'SavannaPlateauMutated',
  165: 'MesaBryce',
  166: 'MesaPlateauStoneMutated',
  167: 'MesaPlateauMutated',
  168: 'BambooJungle',
  169: 'BambooJungleHills',
  177: 'SoulsandValley',
  178: 'CrimsonForest',
  179: 'WarpedForest',
  180: 'BasaltDeltas',
}

// イベント数値を文字列名に変換する統一インターフェース
export function toEnumString(kind: string, value: number): string {
  switch (kind) {
    case 'travelMethod':       return enumKeyName(TravelMethod as any, value)
    case 'teleportationCause': return enumKeyName(TeleportationCause as any, value)
    case 'mobInteractionType': return enumKeyName(MobInteractionType as any, value)
    case 'acquisitionMethod':  return enumKeyName(ItemAcquisitionMethod as any, value)
    case 'interactMethod':     return enumKeyName(ItemInteractMethod as any, value)
    case 'equipmentSlot':      return enumKeyName(PlayerEquipmentSlot as any, value)
    case 'destructionMethod':  return DESTRUCTION_METHOD[value] ?? String(value)
    case 'placementMethod':    return PLACEMENT_METHOD[value] ?? String(value)
    case 'biome':              return BIOME_NAMES[value] ?? String(value)
    default:                   return String(value)
  }
}
