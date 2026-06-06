import { CodeNode } from '@flyde/core'

// @minecraft/math は @minecraft/server（Bedrock専用）に依存するためNode.jsで動かない。
// 同等の純関数を自前で実装する。

const STYLE = { color: '#107C10' }

type Vec3 = { x: number; y: number; z: number }
type AABB = { min: Vec3; max: Vec3 }

// Vec3 を出力する6演算をまとめる。出力ピンは「座標」1本に統一。
export const 座標演算: CodeNode = {
  id: 'Vector3Op',
  displayName: '座標演算',
  menuDisplayName: '座標演算',
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    演算: {
      description: '演算の種類',
      defaultValue: '足す',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '🔧 組み立てる', value: '組み立てる' },
          { label: '➕ 足す',       value: '足す' },
          { label: '➖ 引く',       value: '引く' },
          { label: '✖️ スケール',   value: 'スケール' },
          { label: '⬇️ 切り捨て', value: '切り捨て' },
          { label: '📐 Y補完',      value: 'Y補完' },
        ]
      }
    },
    // 組み立てる
    x: { description: 'X座標', condition: "演算 === '組み立てる'", defaultValue: 0 },
    y: { description: 'Y座標', condition: "演算 === '組み立てる'", defaultValue: 0 },
    z: { description: 'Z座標', condition: "演算 === '組み立てる'", defaultValue: 0 },
    // 足す / 引く
    座標A: { description: 'ベース座標 {x,y,z}', condition: "演算 === '足す' || 演算 === '引く'" },
    座標B: { description: '相手座標 {x,y,z}',   condition: "演算 === '足す' || 演算 === '引く'" },
    // スケール / 切り捨て
    座標: { description: '座標 {x,y,z}', condition: "演算 === 'スケール' || 演算 === '切り捨て'" },
    倍率: { description: 'スカラー倍率（例: 2 で2倍）', condition: "演算 === 'スケール'", defaultValue: 1 },
    // Y補完
    座標XZ: { description: '2D座標 {x,z}', condition: "演算 === 'Y補完'" },
    Y:      { description: 'Y座標の値',    condition: "演算 === 'Y補完'", defaultValue: 64 },
  },
  outputs: {
    座標: { description: '演算結果の座標 {x,y,z}' },
  },
  run: (inputs, { 座標 }) => {
    const op = String(inputs['演算'])
    if (op === '組み立てる') {
      座標.next({ x: Number(inputs['x'] ?? 0), y: Number(inputs['y'] ?? 0), z: Number(inputs['z'] ?? 0) })
    } else if (op === '足す') {
      const a = inputs['座標A'] as Vec3, b = inputs['座標B'] as Vec3
      座標.next({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })
    } else if (op === '引く') {
      const a = inputs['座標A'] as Vec3, b = inputs['座標B'] as Vec3
      座標.next({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z })
    } else if (op === 'スケール') {
      const v = inputs['座標'] as Vec3, s = Number(inputs['倍率'])
      座標.next({ x: v.x * s, y: v.y * s, z: v.z * s })
    } else if (op === '切り捨て') {
      const v = inputs['座標'] as Vec3
      座標.next({ x: Math.floor(v.x), y: Math.floor(v.y), z: Math.floor(v.z) })
    } else if (op === 'Y補完') {
      const v = inputs['座標XZ'] as { x: number; z: number }
      座標.next({ x: v.x, y: Number(inputs['Y'] ?? 64), z: v.z })
    }
  },
}

export const 座標間の距離: CodeNode = {
  id: 'Vector3Distance',
  displayName: '座標間の距離',
  menuDisplayName: '距離',
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    座標A: { description: '始点 {x,y,z}' },
    座標B: { description: '終点 {x,y,z}' },
  },
  outputs: {
    距離: {},
  },
  run: ({ 座標A, 座標B }, { 距離 }) => {
    const a = 座標A as Vec3, b = 座標B as Vec3
    const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z
    距離.next(Math.sqrt(dx * dx + dy * dy + dz * dz))
  },
}

export const 座標を文字列に変換: CodeNode = {
  id: 'Vector3ToString',
  displayName: '座標を文字列に変換',
  menuDisplayName: '座標→文字列',
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '変換する座標 {x,y,z}' },
  },
  outputs: {
    文字列: {},
  },
  run: ({ 座標 }, { 文字列 }) => {
    const v = 座標 as Vec3
    文字列.next(`${v.x} ${v.y} ${v.z}`)
  },
}

export const 座標を分解: CodeNode = {
  id: 'Vector3Split',
  displayName: '座標を分解',
  menuDisplayName: '座標分解',
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    座標: { description: '分解する座標 {x,y,z}' },
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

export const 数値を範囲に収める: CodeNode = {
  id: 'ClampNumber',
  displayName: '数値を範囲に収める',
  menuDisplayName: '数値Clamp',
  icon: 'calculator',
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

export const エリアを作る: CodeNode = {
  id: 'AABBCreate',
  displayName: 'エリアを作る',
  menuDisplayName: 'AABB作成',
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    角座標A: { description: 'エリアの角1 {x,y,z}（順序不問）' },
    角座標B: { description: 'エリアの角2 {x,y,z}（順序不問）' },
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
  icon: 'calculator',
  defaultStyle: STYLE,
  inputs: {
    エリア: { description: 'AABBエリア {min,max}' },
    座標: { description: '判定する座標 {x,y,z}' },
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
