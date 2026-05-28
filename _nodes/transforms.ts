import { CodeNode } from '@flyde/core'

export const 文字列結合: CodeNode = {
  id: 'StringConcat',
  displayName: '文字列結合',
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

export const テキスト整形: CodeNode = {
  id: 'FormatText',
  displayName: 'テキスト整形',
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
