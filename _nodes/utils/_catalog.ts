import { MinecraftBlockTypes, MinecraftItemTypes, MinecraftEntityTypes } from '@minecraft/vanilla-data'
import jaMaps from './_ja_maps.json'

export type SelectOption = { value: string; label: string }

// 日本語ラベルマップ（pxt-mc/core-strings.json から自動生成 → _ja_maps.json）
export const BLOCK_JA: Record<string, string> = jaMaps.BLOCK_JA
export const ITEM_JA:  Record<string, string> = jaMaps.ITEM_JA
export const MOB_JA:   Record<string, string> = jaMaps.MOB_JA

// ── 全ID一覧の生成 ────────────────────────────────────────────────

function formatId(id: string): string {
  return id.replace('minecraft:', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function toOpts(enumObj: object, jaMap: Record<string, string>): SelectOption[] {
  return Object.values(enumObj)
    .map(id => ({ value: id as string, label: jaMap[id as string] ?? formatId(id as string), hasJa: (id as string) in jaMap }))
    .sort((a, b) => {
      if (a.hasJa && !b.hasJa) return -1
      if (!a.hasJa && b.hasJa) return 1
      return a.label.localeCompare(b.label, 'ja')
    })
    .map(({ value, label }) => ({ value, label }))
}

export const BLOCK_ALL: SelectOption[] = toOpts(MinecraftBlockTypes, BLOCK_JA)
export const ITEM_ALL:  SelectOption[] = toOpts(MinecraftItemTypes,  ITEM_JA)
export const MOB_ALL:   SelectOption[] = toOpts(MinecraftEntityTypes, MOB_JA)

// converters.ts から使う逆引きマップ（全IDをカバー）
export const BLOCK_ID_TO_JA: Record<string, string> = Object.fromEntries(BLOCK_ALL.map(o => [o.value, o.label]))
export const ITEM_ID_TO_JA:  Record<string, string> = Object.fromEntries(ITEM_ALL.map(o  => [o.value, o.label]))
export const MOB_ID_TO_JA:   Record<string, string> = Object.fromEntries(MOB_ALL.map(o   => [o.value, o.label]))

// ── イベントenum ─────────────────────────────────────────────────

export const ENUM_JA: Record<string, Record<string, string>> = jaMaps.ENUM_JA

export function enumOpts(kind: string): SelectOption[] {
  return Object.entries(ENUM_JA[kind] ?? {}).map(([en, ja]) => ({ label: ja, value: en }))
}

export const ENUM_CAT_OPTS: SelectOption[] = [
  { label: '移動方法',         value: '移動方法' },
  { label: 'テレポート原因',   value: 'テレポート原因' },
  { label: 'モブ交流種別',     value: 'モブ交流' },
  { label: 'アイテム使用方法', value: 'アイテム使用' },
  { label: 'アイテム取得方法', value: 'アイテム取得' },
  { label: '装備スロット',     value: '装備スロット' },
  { label: 'ブロック破壊方法', value: '破壊方法' },
  { label: 'ブロック設置方法', value: '設置方法' },
]
