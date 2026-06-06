import { CodeNode } from '@flyde/core'
import { BLOCK_CATS, ITEM_CATS, MOB_CATS, ENUM_CAT_OPTS, enumOpts } from './_catalog'

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
          { label: '🐾 モブ', value: 'モブ' },
          { label: '🚶 移動方法', value: '移動方法' },
          { label: '✨ テレポート原因', value: 'テレポート原因' },
          { label: '🐄 モブ交流', value: 'モブ交流' },
          { label: '🤚 アイテム使用', value: 'アイテム使用' },
          { label: '📦 アイテム取得', value: 'アイテム取得' },
          { label: '🪖 装備スロット', value: '装備スロット' },
          { label: '⛏️ 破壊方法', value: '破壊方法' },
          { label: '🏗️ 設置方法', value: '設置方法' },
        ]
      }
    },

    // ── ブロック ──
    ブロックカテゴリ: {
      description: 'ブロックのカテゴリ',
      condition: "種別 === 'ブロック'",
      defaultValue: '石材',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '🪨 石材', value: '石材' },
          { label: '🪵 木材', value: '木材' },
          { label: '💎 鉱石', value: '鉱石' },
          { label: '🌿 自然', value: '自然' },
          { label: '🧱 建材', value: '建材' },
          { label: '⚙️ その他', value: 'その他' },
        ]
      }
    },
    石材: {
      description: '石材ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === '石材'",
      defaultValue: 'minecraft:stone',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['石材'] }
    },
    木材: {
      description: '木材ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === '木材'",
      defaultValue: 'minecraft:oak_log',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['木材'] }
    },
    鉱石: {
      description: '鉱石ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === '鉱石'",
      defaultValue: 'minecraft:coal_ore',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['鉱石'] }
    },
    自然: {
      description: '自然ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === '自然'",
      defaultValue: 'minecraft:grass_block',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['自然'] }
    },
    建材: {
      description: '建材ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === '建材'",
      defaultValue: 'minecraft:brick_block',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['建材'] }
    },
    その他: {
      description: 'その他ブロックの種類',
      condition: "種別 === 'ブロック' && ブロックカテゴリ === 'その他'",
      defaultValue: 'minecraft:air',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['その他'] }
    },

    // ── アイテム ──
    アイテムカテゴリ: {
      description: 'アイテムのカテゴリ',
      condition: "種別 === 'アイテム'",
      defaultValue: '武器',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '⚔️ 武器', value: '武器' },
          { label: '⛏️ 道具', value: '道具' },
          { label: '🛡️ 防具', value: '防具' },
          { label: '🍎 食料', value: '食料' },
          { label: '🧪 素材', value: '素材' },
        ]
      }
    },
    武器: {
      description: '武器の種類',
      condition: "種別 === 'アイテム' && アイテムカテゴリ === '武器'",
      defaultValue: 'minecraft:wooden_sword',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['武器'] }
    },
    道具: {
      description: '道具の種類',
      condition: "種別 === 'アイテム' && アイテムカテゴリ === '道具'",
      defaultValue: 'minecraft:wooden_pickaxe',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['道具'] }
    },
    防具: {
      description: '防具の種類',
      condition: "種別 === 'アイテム' && アイテムカテゴリ === '防具'",
      defaultValue: 'minecraft:iron_helmet',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['防具'] }
    },
    食料: {
      description: '食料の種類',
      condition: "種別 === 'アイテム' && アイテムカテゴリ === '食料'",
      defaultValue: 'minecraft:apple',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['食料'] }
    },
    素材: {
      description: '素材の種類',
      condition: "種別 === 'アイテム' && アイテムカテゴリ === '素材'",
      defaultValue: 'minecraft:iron_ingot',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['素材'] }
    },

    // ── モブ ──
    モブカテゴリ: {
      description: 'モブのカテゴリ',
      condition: "種別 === 'モブ'",
      defaultValue: '動物',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '🐄 動物', value: '動物' },
          { label: '👾 モンスター', value: 'モンスター' },
        ]
      }
    },
    動物: {
      description: '動物の種類',
      condition: "種別 === 'モブ' && モブカテゴリ === '動物'",
      defaultValue: 'minecraft:cow',
      editorType: 'select',
      editorTypeData: { options: MOB_CATS['動物'] }
    },
    モンスター: {
      description: 'モンスターの種類',
      condition: "種別 === 'モブ' && モブカテゴリ === 'モンスター'",
      defaultValue: 'minecraft:zombie',
      editorType: 'select',
      editorTypeData: { options: MOB_CATS['モンスター'] }
    },

    // ── イベント値 ──
    移動方法: {
      description: '移動方法',
      condition: "種別 === '移動方法'",
      defaultValue: 'Walk',
      editorType: 'select',
      editorTypeData: { options: enumOpts('移動方法') },
    },
    テレポート原因: {
      description: 'テレポート原因',
      condition: "種別 === 'テレポート原因'",
      defaultValue: 'Command',
      editorType: 'select',
      editorTypeData: { options: enumOpts('テレポート原因') },
    },
    モブ交流: {
      description: 'モブ交流種別',
      condition: "種別 === 'モブ交流'",
      defaultValue: 'Feeding',
      editorType: 'select',
      editorTypeData: { options: enumOpts('モブ交流') },
    },
    アイテム使用: {
      description: 'アイテム使用方法',
      condition: "種別 === 'アイテム使用'",
      defaultValue: 'Use',
      editorType: 'select',
      editorTypeData: { options: enumOpts('アイテム使用') },
    },
    アイテム取得: {
      description: 'アイテム取得方法',
      condition: "種別 === 'アイテム取得'",
      defaultValue: 'Pickedup',
      editorType: 'select',
      editorTypeData: { options: enumOpts('アイテム取得') },
    },
    装備スロット: {
      description: '装備スロット',
      condition: "種別 === '装備スロット'",
      defaultValue: 'Head',
      editorType: 'select',
      editorTypeData: { options: enumOpts('装備スロット') },
    },
    破壊方法: {
      description: 'ブロック破壊方法',
      condition: "種別 === '破壊方法'",
      defaultValue: 'Player',
      editorType: 'select',
      editorTypeData: { options: enumOpts('破壊方法') },
    },
    設置方法: {
      description: 'ブロック設置方法',
      condition: "種別 === '設置方法'",
      defaultValue: 'Player',
      editorType: 'select',
      editorTypeData: { options: enumOpts('設置方法') },
    },
  },
  outputs: {
    値: { description: '選択した値（ブロック/アイテム/モブIDまたはイベント値）' },
  },
  run: (inputs, { 値 }) => {
    const s = String(inputs['種別'])
    let result: string

    if (s === 'ブロック') {
      const cat = String(inputs['ブロックカテゴリ'])
      switch (cat) {
        case '石材': result = String(inputs['石材']); break
        case '木材': result = String(inputs['木材']); break
        case '鉱石': result = String(inputs['鉱石']); break
        case '自然': result = String(inputs['自然']); break
        case '建材': result = String(inputs['建材']); break
        default:     result = String(inputs['その他'])
      }
    } else if (s === 'アイテム') {
      const cat = String(inputs['アイテムカテゴリ'])
      switch (cat) {
        case '武器': result = String(inputs['武器']); break
        case '道具': result = String(inputs['道具']); break
        case '防具': result = String(inputs['防具']); break
        case '食料': result = String(inputs['食料']); break
        default:     result = String(inputs['素材'])
      }
    } else if (s === 'モブ') {
      const cat = String(inputs['モブカテゴリ'])
      result = cat === '動物' ? String(inputs['動物']) : String(inputs['モンスター'])
    } else {
      // イベント値：種別名 === 入力キー名
      result = String(inputs[s])
    }

    値.next(result)
  },
}
