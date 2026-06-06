import { CodeNode } from '@flyde/core'
import { BLOCK_ALL, ITEM_ALL, MOB_ALL, enumOpts } from './_catalog'

const STYLE = { color: '#767676' }

export const 選択: CodeNode = {
  id: 'Selector',
  displayName: '選択',
  menuDisplayName: '選択',
  icon: 'hand-pointer',
  defaultStyle: STYLE,
  inputs: {
    種別: {
      description: '選択する値の種別',
      defaultValue: 'ブロック',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '🧱 ブロック', value: 'ブロック' },
          { label: '🎒 アイテム', value: 'アイテム' },
          { label: '🐾 モブ',     value: 'モブ' },
          { label: '🚶 移動方法',         value: '移動方法' },
          { label: '✨ テレポート原因',   value: 'テレポート原因' },
          { label: '🐄 モブ交流',         value: 'モブ交流' },
          { label: '🤚 アイテム使用',     value: 'アイテム使用' },
          { label: '📦 アイテム取得',     value: 'アイテム取得' },
          { label: '🪖 装備スロット',     value: '装備スロット' },
          { label: '⛏️ 破壊方法',        value: '破壊方法' },
          { label: '🏗️ 設置方法',        value: '設置方法' },
        ]
      }
    },
    ブロック: {
      description: 'ブロックID',
      condition: "種別 === 'ブロック'",
      defaultValue: 'minecraft:stone',
      editorType: 'select',
      editorTypeData: { options: BLOCK_ALL },
    },
    アイテム: {
      description: 'アイテムID',
      condition: "種別 === 'アイテム'",
      defaultValue: 'minecraft:apple',
      editorType: 'select',
      editorTypeData: { options: ITEM_ALL },
    },
    モブ: {
      description: 'モブ（エンティティ）ID',
      condition: "種別 === 'モブ'",
      defaultValue: 'minecraft:cow',
      editorType: 'select',
      editorTypeData: { options: MOB_ALL },
    },
    移動方法:     { description: '移動方法',         condition: "種別 === '移動方法'",     defaultValue: 'Walk',     editorType: 'select', editorTypeData: { options: enumOpts('移動方法') } },
    テレポート原因: { description: 'テレポート原因', condition: "種別 === 'テレポート原因'", defaultValue: 'Command',  editorType: 'select', editorTypeData: { options: enumOpts('テレポート原因') } },
    モブ交流:     { description: 'モブ交流種別',     condition: "種別 === 'モブ交流'",     defaultValue: 'Feeding',  editorType: 'select', editorTypeData: { options: enumOpts('モブ交流') } },
    アイテム使用: { description: 'アイテム使用方法', condition: "種別 === 'アイテム使用'", defaultValue: 'Use',      editorType: 'select', editorTypeData: { options: enumOpts('アイテム使用') } },
    アイテム取得: { description: 'アイテム取得方法', condition: "種別 === 'アイテム取得'", defaultValue: 'Pickedup', editorType: 'select', editorTypeData: { options: enumOpts('アイテム取得') } },
    装備スロット: { description: '装備スロット',     condition: "種別 === '装備スロット'", defaultValue: 'Head',     editorType: 'select', editorTypeData: { options: enumOpts('装備スロット') } },
    破壊方法:     { description: 'ブロック破壊方法', condition: "種別 === '破壊方法'",     defaultValue: 'Player',   editorType: 'select', editorTypeData: { options: enumOpts('破壊方法') } },
    設置方法:     { description: 'ブロック設置方法', condition: "種別 === '設置方法'",     defaultValue: 'Player',   editorType: 'select', editorTypeData: { options: enumOpts('設置方法') } },
  },
  outputs: {
    値: { description: '選択した値（ブロック/アイテム/モブIDまたはイベント値）' },
  },
  run: (inputs, { 値 }) => {
    const s = String(inputs['種別'])
    if (s === 'ブロック')      値.next(String(inputs['ブロック']))
    else if (s === 'アイテム') 値.next(String(inputs['アイテム']))
    else if (s === 'モブ')     値.next(String(inputs['モブ']))
    else                       値.next(String(inputs[s]))
  },
}
