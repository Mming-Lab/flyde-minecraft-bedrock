import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' } // utility

export const 文字列結合: CodeNode = {
  id: 'StringConcat',
  displayName: '文字列結合',
  menuDisplayName: '文字列結合',
  defaultStyle: STYLE,
  inputs: {
    前: { description: '前半の文字列' },
    後: { description: '後半の文字列' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 前, 後 }, { 結果 }) => {
    結果.next(String(前) + String(後))
  },
}

export const 数値から文字列: CodeNode = {
  id: 'NumberToString',
  displayName: '数値から文字列',
  menuDisplayName: '数値→文字列',
  defaultStyle: STYLE,
  inputs: {
    数値: { description: '変換する数値' },
  },
  outputs: {
    文字列: {},
  },
  run: ({ 数値 }, { 文字列 }) => {
    文字列.next(String(数値))
  },
}

export const 文字列から数値: CodeNode = {
  id: 'StringToNumber',
  displayName: '文字列から数値',
  menuDisplayName: '文字列→数値',
  defaultStyle: STYLE,
  inputs: {
    文字列: { description: '変換する文字列' },
  },
  outputs: {
    数値: {},
  },
  run: ({ 文字列 }, { 数値 }) => {
    const n = Number(文字列)
    数値.next(isNaN(n) ? 0 : n)
  },
}

export const 一致したら通す: CodeNode = {
  id: 'PassIfMatch',
  displayName: '一致したら通す',
  menuDisplayName: '一致通過',
  defaultStyle: STYLE,
  inputs: {
    値: { description: '条件が合った時だけ通す値' },
    テキスト: { description: '比較するテキスト' },
    キーワード: { description: '一致させるキーワード（IIP可）' },
  },
  outputs: {
    値: {},
  },
  run: ({ 値, テキスト, キーワード }, { 値: output }) => {
    if (String(テキスト) === String(キーワード)) output.next(値)
  },
}

export const N回繰り返す: CodeNode = {
  id: 'Repeat',
  displayName: 'N回繰り返す',
  menuDisplayName: 'N回繰り返す',
  defaultStyle: STYLE,
  inputs: {
    値: { description: 'N回通す値' },
    回数: { description: '繰り返す回数（IIP可）' },
  },
  outputs: {
    値: {},
    完了: {},
  },
  run: ({ 値, 回数 }, { 値: output, 完了 }) => {
    for (let i = 0; i < Number(回数); i++) {
      output.next(値)
    }
    完了.next(true)
  },
}

export const テキスト整形: CodeNode = {
  id: 'FormatText',
  displayName: 'テキスト整形',
  menuDisplayName: 'ﾃｷｽﾄ整形',
  defaultStyle: STYLE,
  inputs: {
    テンプレート: { description: 'テンプレート文字列（{値} を置換）' },
    値: { description: '置換する値' },
  },
  outputs: {
    結果: {},
  },
  run: ({ テンプレート, 値 }, { 結果 }) => {
    結果.next(String(テンプレート).replace('{値}', String(値)))
  },
}

export const 条件で切り替え: CodeNode = {
  id: 'Conditional',
  displayName: '条件で切り替え',
  menuDisplayName: '条件切替',
  defaultStyle: STYLE,
  inputs: {
    条件: { description: '真偽値（true / false）' },
    真: { description: '条件が true の時に出力する値（IIP可）' },
    偽: { description: '条件が false の時に出力する値（IIP可）' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 条件, 真: trueVal, 偽: falseVal }, { 結果 }) => {
    結果.next(条件 ? trueVal : falseVal)
  },
}

export const データ一括変換: CodeNode = {
  id: 'ArrayMap',
  displayName: 'データ一括変換',
  menuDisplayName: 'データMap',
  defaultStyle: STYLE,
  inputs: {
    配列: { description: '変換する配列' },
    式: { description: '変換式（item が各要素にバインドされる。例: item.x, item * 2）' },
  },
  outputs: {
    結果: {},
  },
  run: ({ 配列, 式 }, { 結果 }) => {
    const fn = new Function('item', 'return (' + 式 + ')') as (item: any) => any
    const arr = Array.isArray(配列) ? 配列 : [配列]
    結果.next(arr.map(fn))
  },
}
