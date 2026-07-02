import { MinecraftBlockTypes, MinecraftItemTypes, MinecraftEntityTypes } from '@minecraft/vanilla-data'
import maps from './_maps/ja_JP.json'  // set-lang.js で書き換え
import makecodeIds from './_makecode-ids.json'  // MakeCode に存在するID（セレクタ選択肢の絞り込み用）

export type SelectOption = { value: string; label: string }

// ── ロケール設定（set-lang.js が import 行と同時に書き換える）─────────────

const locale = 'ja_JP'

// ── ID一覧の生成 ──────────────────────────────────────────────────
//
// ・セレクタの選択肢（BLOCK_ALL 等）は MakeCode 準拠に絞り込む（使わない遺物を隠す）
// ・逆引きマップ（BLOCK_ID_TO 等）は全ID保持（ToJa がイベントで届く任意IDを日本語化するため）

function toOpts(enumObj: object, nameMap: Record<string, string>, allow?: Set<string>): SelectOption[] {
  return Object.values(enumObj)
    .filter(id => !allow || allow.has(id as string))
    .map(id => {
      const label = nameMap[id as string]
      return { value: id as string, label: label ?? id, hasJa: label !== undefined }
    })
    .sort((a, b) => {
      if (a.hasJa && !b.hasJa) return -1
      if (!a.hasJa && b.hasJa) return 1
      return a.label.localeCompare(b.label, locale.split('_')[0])
    })
    .map(({ value, label }) => ({ value, label }))
}

// MakeCode 絞り込みセット
const BLOCK_ALLOW = new Set<string>(makecodeIds.BLOCK)
const ITEM_ALLOW  = new Set<string>(makecodeIds.ITEM)
const MOB_ALLOW   = new Set<string>(makecodeIds.MOB)

// セレクタ選択肢（MakeCode 絞り込み）
export const BLOCK_ALL: SelectOption[] = toOpts(MinecraftBlockTypes, maps.BLOCK ?? {}, BLOCK_ALLOW)
export const ITEM_ALL:  SelectOption[] = toOpts(MinecraftItemTypes,  maps.ITEM  ?? {}, ITEM_ALLOW)
export const MOB_ALL:   SelectOption[] = toOpts(MinecraftEntityTypes, maps.MOB  ?? {}, MOB_ALLOW)

// 逆引きマップ（ID → ロケール名、全ID保持）
export const BLOCK_ID_TO: Record<string, string> = Object.fromEntries(toOpts(MinecraftBlockTypes,  maps.BLOCK ?? {}).map(o => [o.value, o.label]))
export const ITEM_ID_TO:  Record<string, string> = Object.fromEntries(toOpts(MinecraftItemTypes,   maps.ITEM  ?? {}).map(o => [o.value, o.label]))
export const MOB_ID_TO:   Record<string, string> = Object.fromEntries(toOpts(MinecraftEntityTypes, maps.MOB   ?? {}).map(o => [o.value, o.label]))

// ── ENUM ─────────────────────────────────────────────────────────

const ENUM: Record<string, Record<string, string>> = maps.ENUM ?? {}

export function enumOpts(kind: string): SelectOption[] {
  return Object.entries(ENUM[kind] ?? {}).map(([en, local]) => ({ label: String(local), value: en }))
}

/** イベント値（英語キー名）をロケール名に変換 */
export function getEnumLabel(kind: string, value: string): string | undefined {
  return (ENUM[kind] ?? {})[value]
}
