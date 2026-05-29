import { CodeNode } from '@flyde/core'

// @minecraft/math は @minecraft/server（Bedrock専用）に依存するためNode.jsで動かない。
// 同等の純関数を自前で実装する。

const STYLE = { color: '#107C10' } // math / green

type Vec3 = { x: number; y: number; z: number }
type Vec2 = { x: number; y: number }
type VecXZ = { x: number; z: number }
type AABB = { min: Vec3; max: Vec3 }

export const 座標を組み立てる: CodeNode = {
  id: 'Vector3Create',
  displayName: '座標を組み立てる',
  menuDisplayName: '座標作成',
  defaultStyle: STYLE,
  inputs: {
    x: { description: 'X座標', defaultValue: 0 },
    y: { description: 'Y座標', defaultValue: 0 },
    z: { description: 'Z座標', defaultValue: 0 },
  },
  outputs: {
    座標: {},
  },
  run: ({ x, y, z }, { 座標 }) => {
    座標.next({ x: Number(x ?? 0), y: Number(y ?? 0), z: Number(z ?? 0) })
  },
}

export const 座標を足す: CodeNode = {
  id: 'Vector3Add',
  displayName: '座標を足す',
  menuDisplayName: '座標+',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベース座標 {x, y, z}' },
    座標B: { description: '加算する座標 {x, y, z}' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as Vec3
    const b = 座標B as Vec3
    結果.next({ x: a.x + (b.x ?? 0), y: a.y + (b.y ?? 0), z: a.z + (b.z ?? 0) })
  },
}

export const 座標を引く: CodeNode = {
  id: 'Vector3Subtract',
  displayName: '座標を引く',
  menuDisplayName: '座標-',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベース座標 {x, y, z}' },
    座標B: { description: '減算する座標 {x, y, z}' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as Vec3
    const b = 座標B as Vec3
    結果.next({ x: a.x - (b.x ?? 0), y: a.y - (b.y ?? 0), z: a.z - (b.z ?? 0) })
  },
}

export const 座標をスケール: CodeNode = {
  id: 'Vector3Scale',
  displayName: '座標をスケール',
  menuDisplayName: '座標×',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: 'スケールする座標 {x, y, z}' },
    倍率: { description: 'スカラー倍率（例: 2 で2倍）' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標, 倍率 }, { 結果 }) => {
    const v = 座標 as Vec3
    const s = Number(倍率)
    結果.next({ x: v.x * s, y: v.y * s, z: v.z * s })
  },
}

export const 座標間の距離: CodeNode = {
  id: 'Vector3Distance',
  displayName: '座標間の距離',
  menuDisplayName: '距離',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, y, z}' },
    座標B: { description: '終点 {x, y, z}' },
  },
  outputs: {
    距離: {},
  },
  run: ({ 座標A, 座標B }, { 距離 }) => {
    const a = 座標A as Vec3
    const b = 座標B as Vec3
    const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z
    距離.next(Math.sqrt(dx * dx + dy * dy + dz * dz))
  },
}

export const 座標を切り捨て: CodeNode = {
  id: 'Vector3Floor',
  displayName: '座標を切り捨て',
  menuDisplayName: '座標Floor',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '切り捨てる座標 {x, y, z}' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as Vec3
    結果.next({ x: Math.floor(v.x), y: Math.floor(v.y), z: Math.floor(v.z) })
  },
}

export const 座標を補間: CodeNode = {
  id: 'Vector3Lerp',
  displayName: '座標を補間',
  menuDisplayName: '座標lerp',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, y, z}' },
    座標B: { description: '終点 {x, y, z}' },
    割合: { description: '0.0（始点）〜 1.0（終点）。0.5 で中点' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標A, 座標B, 割合 }, { 結果 }) => {
    const a = 座標A as Vec3
    const b = 座標B as Vec3
    const t = Number(割合)
    結果.next({
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t,
    })
  },
}

export const 座標を文字列に変換: CodeNode = {
  id: 'Vector3ToString',
  displayName: '座標を文字列に変換',
  menuDisplayName: '座標→文字列',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '変換する座標 {x, y, z}' },
  },
  outputs: {
    文字列: {},
  },
  run: ({ 座標 }, { 文字列 }) => {
    const v = 座標 as Vec3
    文字列.next(`${v.x} ${v.y} ${v.z}`)
  },
}

export const Y座標を補完: CodeNode = {
  id: 'Vector3FromXZ',
  displayName: 'Y座標を補完',
  menuDisplayName: 'XZ→XYZ',
  defaultStyle: STYLE,
  inputs: {
    座標XZ: { description: '2D座標 {x, z}' },
    Y: { description: 'Y座標の値（IIP可）' },
  },
  outputs: {
    座標: {},
  },
  run: ({ 座標XZ, Y }, { 座標 }) => {
    const v = 座標XZ as { x: number; z: number }
    座標.next({ x: v.x, y: Number(Y ?? 64), z: v.z })
  },
}

export const ベクトルの長さ: CodeNode = {
  id: 'Vector3Magnitude',
  displayName: 'ベクトルの長さ',
  menuDisplayName: '座標magnitude',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '長さを求める座標 {x, y, z}' },
  },
  outputs: {
    長さ: {},
  },
  run: ({ 座標 }, { 長さ }) => {
    const v = 座標 as Vec3
    長さ.next(Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z))
  },
}

export const 単位ベクトル化: CodeNode = {
  id: 'Vector3Normalize',
  displayName: '単位ベクトル化',
  menuDisplayName: '座標normalize',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '正規化する座標 {x, y, z}' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as Vec3
    const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
    if (mag === 0) { 結果.next({ x: 0, y: 0, z: 0 }); return }
    結果.next({ x: v.x / mag, y: v.y / mag, z: v.z / mag })
  },
}

export const 数値を範囲に収める: CodeNode = {
  id: 'ClampNumber',
  displayName: '数値を範囲に収める',
  menuDisplayName: '数値Clamp',
  defaultStyle: STYLE,
  inputs: {
    値: { description: 'クランプする数値' },
    最小: { description: '下限値' },
    最大: { description: '上限値' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 値, 最小, 最大 }, { 結果 }) => {
    結果.next(Math.min(Math.max(Number(値), Number(最小)), Number(最大)))
  },
}

// ── Vector2 演算（{x, y} ── 回転角・2D座標）──────────────────────────────

export const 二次元座標を足す: CodeNode = {
  id: 'Vector2Add',
  displayName: '2D座標を足す',
  menuDisplayName: '2D座標+',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベース2D座標 {x, y}' },
    座標B: { description: '加算する2D座標 {x, y}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as Vec2, b = 座標B as Vec2
    結果.next({ x: a.x + (b.x ?? 0), y: a.y + (b.y ?? 0) })
  },
}

export const 二次元座標を引く: CodeNode = {
  id: 'Vector2Subtract',
  displayName: '2D座標を引く',
  menuDisplayName: '2D座標-',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベース2D座標 {x, y}' },
    座標B: { description: '減算する2D座標 {x, y}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as Vec2, b = 座標B as Vec2
    結果.next({ x: a.x - (b.x ?? 0), y: a.y - (b.y ?? 0) })
  },
}

export const 二次元座標をスケール: CodeNode = {
  id: 'Vector2Scale',
  displayName: '2D座標をスケール',
  menuDisplayName: '2D座標×',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: 'スケールする2D座標 {x, y}' },
    倍率: { description: 'スカラー倍率' },
  },
  outputs: { 結果: {} },
  run: ({ 座標, 倍率 }, { 結果 }) => {
    const v = 座標 as Vec2, s = Number(倍率)
    結果.next({ x: v.x * s, y: v.y * s })
  },
}

export const 二次元座標間の距離: CodeNode = {
  id: 'Vector2Distance',
  displayName: '2D座標間の距離',
  menuDisplayName: '2D距離',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, y}' },
    座標B: { description: '終点 {x, y}' },
  },
  outputs: { 距離: {} },
  run: ({ 座標A, 座標B }, { 距離 }) => {
    const a = 座標A as Vec2, b = 座標B as Vec2
    const dx = a.x - b.x, dy = a.y - b.y
    距離.next(Math.sqrt(dx * dx + dy * dy))
  },
}

export const 二次元座標を切り捨て: CodeNode = {
  id: 'Vector2Floor',
  displayName: '2D座標を切り捨て',
  menuDisplayName: '2D座標Floor',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '切り捨てる2D座標 {x, y}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as Vec2
    結果.next({ x: Math.floor(v.x), y: Math.floor(v.y) })
  },
}

export const 二次元座標を補間: CodeNode = {
  id: 'Vector2Lerp',
  displayName: '2D座標を補間',
  menuDisplayName: '2D座標lerp',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, y}' },
    座標B: { description: '終点 {x, y}' },
    割合: { description: '0.0〜1.0（0.5で中点）' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B, 割合 }, { 結果 }) => {
    const a = 座標A as Vec2, b = 座標B as Vec2, t = Number(割合)
    結果.next({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
  },
}

export const 二次元ベクトルの長さ: CodeNode = {
  id: 'Vector2Magnitude',
  displayName: '2Dベクトルの長さ',
  menuDisplayName: '2D magnitude',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '長さを求める2D座標 {x, y}' },
  },
  outputs: { 長さ: {} },
  run: ({ 座標 }, { 長さ }) => {
    const v = 座標 as Vec2
    長さ.next(Math.sqrt(v.x * v.x + v.y * v.y))
  },
}

export const 二次元単位ベクトル化: CodeNode = {
  id: 'Vector2Normalize',
  displayName: '2D単位ベクトル化',
  menuDisplayName: '2D normalize',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '正規化する2D座標 {x, y}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as Vec2
    const mag = Math.sqrt(v.x * v.x + v.y * v.y)
    if (mag === 0) { 結果.next({ x: 0, y: 0 }); return }
    結果.next({ x: v.x / mag, y: v.y / mag })
  },
}

// ── Vector3 追加演算 ──────────────────────────────────────────────────────

export const 座標を分解: CodeNode = {
  id: 'Vector3Split',
  displayName: '座標を分解',
  menuDisplayName: '座標分解',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '分解する座標 {x, y, z}' },
  },
  outputs: {
    x: {},
    y: {},
    z: {},
  },
  run: ({ 座標 }, { x, y, z }) => {
    const v = 座標 as Vec3
    x.next(v.x)
    y.next(v.y)
    z.next(v.z)
  },
}

export const 座標を切り上げ: CodeNode = {
  id: 'Vector3Ceil',
  displayName: '座標を切り上げ',
  menuDisplayName: '座標Ceil',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '切り上げる座標 {x, y, z}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as Vec3
    結果.next({ x: Math.ceil(v.x), y: Math.ceil(v.y), z: Math.ceil(v.z) })
  },
}

export const 座標を要素積: CodeNode = {
  id: 'Vector3Multiply',
  displayName: '座標を要素積',
  menuDisplayName: '座標×(要素)',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '座標A {x, y, z}' },
    座標B: { description: '座標B {x, y, z}（各軸を個別に掛ける）' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as Vec3, b = 座標B as Vec3
    結果.next({ x: a.x * b.x, y: a.y * b.y, z: a.z * b.z })
  },
}

export const 内積を計算: CodeNode = {
  id: 'Vector3Dot',
  displayName: '内積を計算',
  menuDisplayName: '内積(dot)',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '座標A {x, y, z}' },
    座標B: { description: '座標B {x, y, z}' },
  },
  outputs: { 内積: {} },
  run: ({ 座標A, 座標B }, { 内積 }) => {
    const a = 座標A as Vec3, b = 座標B as Vec3
    内積.next(a.x * b.x + a.y * b.y + a.z * b.z)
  },
}

export const 座標をY軸回転: CodeNode = {
  id: 'Vector3RotateY',
  displayName: '座標をY軸回転',
  menuDisplayName: '座標rotateY',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '回転する座標 {x, y, z}' },
    角度: { description: '回転角（ラジアン）。度数法は Math.PI/180 を掛ける' },
  },
  outputs: { 結果: {} },
  run: ({ 座標, 角度 }, { 結果 }) => {
    const v = 座標 as Vec3, a = Number(角度)
    const cos = Math.cos(a), sin = Math.sin(a)
    結果.next({ x: v.x * cos - v.z * sin, y: v.y, z: v.x * sin + v.z * cos })
  },
}

// ── VectorXZ 演算（{x, z} ── 水平座標・テレポート先など）────────────────

export const XZ座標を足す: CodeNode = {
  id: 'VectorXZAdd',
  displayName: 'XZ座標を足す',
  menuDisplayName: 'XZ座標+',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベースXZ座標 {x, z}' },
    座標B: { description: '加算するXZ座標 {x, z}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as VecXZ, b = 座標B as VecXZ
    結果.next({ x: a.x + (b.x ?? 0), z: a.z + (b.z ?? 0) })
  },
}

export const XZ座標を引く: CodeNode = {
  id: 'VectorXZSubtract',
  displayName: 'XZ座標を引く',
  menuDisplayName: 'XZ座標-',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: 'ベースXZ座標 {x, z}' },
    座標B: { description: '減算するXZ座標 {x, z}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B }, { 結果 }) => {
    const a = 座標A as VecXZ, b = 座標B as VecXZ
    結果.next({ x: a.x - (b.x ?? 0), z: a.z - (b.z ?? 0) })
  },
}

export const XZ座標をスケール: CodeNode = {
  id: 'VectorXZScale',
  displayName: 'XZ座標をスケール',
  menuDisplayName: 'XZ座標×',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: 'スケールするXZ座標 {x, z}' },
    倍率: { description: 'スカラー倍率' },
  },
  outputs: { 結果: {} },
  run: ({ 座標, 倍率 }, { 結果 }) => {
    const v = 座標 as VecXZ, s = Number(倍率)
    結果.next({ x: v.x * s, z: v.z * s })
  },
}

export const XZ座標間の距離: CodeNode = {
  id: 'VectorXZDistance',
  displayName: 'XZ座標間の距離',
  menuDisplayName: 'XZ距離',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, z}' },
    座標B: { description: '終点 {x, z}' },
  },
  outputs: { 距離: {} },
  run: ({ 座標A, 座標B }, { 距離 }) => {
    const a = 座標A as VecXZ, b = 座標B as VecXZ
    const dx = a.x - b.x, dz = a.z - b.z
    距離.next(Math.sqrt(dx * dx + dz * dz))
  },
}

export const XZ座標を切り捨て: CodeNode = {
  id: 'VectorXZFloor',
  displayName: 'XZ座標を切り捨て',
  menuDisplayName: 'XZ座標Floor',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '切り捨てるXZ座標 {x, z}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as VecXZ
    結果.next({ x: Math.floor(v.x), z: Math.floor(v.z) })
  },
}

export const XZ座標を補間: CodeNode = {
  id: 'VectorXZLerp',
  displayName: 'XZ座標を補間',
  menuDisplayName: 'XZ座標lerp',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x, z}' },
    座標B: { description: '終点 {x, z}' },
    割合: { description: '0.0〜1.0（0.5で中点）' },
  },
  outputs: { 結果: {} },
  run: ({ 座標A, 座標B, 割合 }, { 結果 }) => {
    const a = 座標A as VecXZ, b = 座標B as VecXZ, t = Number(割合)
    結果.next({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t })
  },
}

export const XZベクトルの長さ: CodeNode = {
  id: 'VectorXZMagnitude',
  displayName: 'XZベクトルの長さ',
  menuDisplayName: 'XZ magnitude',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '長さを求めるXZ座標 {x, z}' },
  },
  outputs: { 長さ: {} },
  run: ({ 座標 }, { 長さ }) => {
    const v = 座標 as VecXZ
    長さ.next(Math.sqrt(v.x * v.x + v.z * v.z))
  },
}

export const XZ単位ベクトル化: CodeNode = {
  id: 'VectorXZNormalize',
  displayName: 'XZ単位ベクトル化',
  menuDisplayName: 'XZ normalize',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '正規化するXZ座標 {x, z}' },
  },
  outputs: { 結果: {} },
  run: ({ 座標 }, { 結果 }) => {
    const v = 座標 as VecXZ
    const mag = Math.sqrt(v.x * v.x + v.z * v.z)
    if (mag === 0) { 結果.next({ x: 0, z: 0 }); return }
    結果.next({ x: v.x / mag, z: v.z / mag })
  },
}

// ── AABB 演算（エリア判定・バウンディングボックス）──────────────────────

export const エリアを作る: CodeNode = {
  id: 'AABBCreate',
  displayName: 'エリアを作る',
  menuDisplayName: 'AABB作成',
  defaultStyle: STYLE,
  inputs: {
    角座標A: { description: 'エリアの角1 {x, y, z}（順序不問）' },
    角座標B: { description: 'エリアの角2 {x, y, z}（順序不問）' },
  },
  outputs: { エリア: {} },
  run: ({ 角座標A, 角座標B }, { エリア }) => {
    const a = 角座標A as Vec3, b = 角座標B as Vec3
    エリア.next({
      min: { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), z: Math.min(a.z, b.z) },
      max: { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y), z: Math.max(a.z, b.z) },
    })
  },
}

export const エリア内判定: CodeNode = {
  id: 'AABBIsInside',
  displayName: 'エリア内判定',
  menuDisplayName: 'AABB内判定',
  defaultStyle: STYLE,
  inputs: {
    エリア: { description: 'AABBエリア {min, max}' },
    座標: { description: '判定する座標 {x, y, z}' },
  },
  outputs: { 結果: {} },
  run: ({ エリア, 座標 }, { 結果 }) => {
    const box = エリア as AABB, p = 座標 as Vec3
    結果.next(
      p.x >= box.min.x && p.x <= box.max.x &&
      p.y >= box.min.y && p.y <= box.max.y &&
      p.z >= box.min.z && p.z <= box.max.z
    )
  },
}

export const エリアが重なるか: CodeNode = {
  id: 'AABBIntersects',
  displayName: 'エリアが重なるか',
  menuDisplayName: 'AABB重なり',
  defaultStyle: STYLE,
  inputs: {
    エリアA: { description: 'AABBエリアA {min, max}' },
    エリアB: { description: 'AABBエリアB {min, max}' },
  },
  outputs: { 結果: {} },
  run: ({ エリアA, エリアB }, { 結果 }) => {
    const a = エリアA as AABB, b = エリアB as AABB
    結果.next(
      a.min.x <= b.max.x && a.max.x >= b.min.x &&
      a.min.y <= b.max.y && a.max.y >= b.min.y &&
      a.min.z <= b.max.z && a.max.z >= b.min.z
    )
  },
}

export const エリアを移動: CodeNode = {
  id: 'AABBTranslate',
  displayName: 'エリアを移動',
  menuDisplayName: 'AABB移動',
  defaultStyle: STYLE,
  inputs: {
    エリア: { description: '移動するAABBエリア {min, max}' },
    移動量: { description: '移動ベクトル {x, y, z}' },
  },
  outputs: { 結果: {} },
  run: ({ エリア, 移動量 }, { 結果 }) => {
    const box = エリア as AABB, d = 移動量 as Vec3
    結果.next({
      min: { x: box.min.x + d.x, y: box.min.y + d.y, z: box.min.z + d.z },
      max: { x: box.max.x + d.x, y: box.max.y + d.y, z: box.max.z + d.z },
    })
  },
}

export const エリアの最小座標: CodeNode = {
  id: 'AABBGetMin',
  displayName: 'エリアの最小座標',
  menuDisplayName: 'AABB最小座標',
  defaultStyle: STYLE,
  inputs: {
    エリア: { description: 'AABBエリア {min, max}' },
  },
  outputs: { 座標: {} },
  run: ({ エリア }, { 座標 }) => {
    座標.next((エリア as AABB).min)
  },
}

export const エリアの最大座標: CodeNode = {
  id: 'AABBGetMax',
  displayName: 'エリアの最大座標',
  menuDisplayName: 'AABB最大座標',
  defaultStyle: STYLE,
  inputs: {
    エリア: { description: 'AABBエリア {min, max}' },
  },
  outputs: { 座標: {} },
  run: ({ エリア }, { 座標 }) => {
    座標.next((エリア as AABB).max)
  },
}
