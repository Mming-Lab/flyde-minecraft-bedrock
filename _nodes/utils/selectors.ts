import { CodeNode } from '@flyde/core'
import { BLOCK_CATS, ITEM_CATS, MOB_CATS, ENUM_CAT_OPTS, enumOpts } from './_catalog'

const STYLE = { color: '#767676' }

export const ブロック選択: CodeNode = {
  id: 'BlockSelector',
  displayName: 'ブロック選択',
  menuDisplayName: 'ﾌﾞﾛｯｸ選択',
  icon: 'cube',
  defaultStyle: STYLE,
  inputs: {
    カテゴリ: {
      description: 'ブロックのカテゴリ',
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
      condition: "カテゴリ === '石材'",
      defaultValue: 'minecraft:stone',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['石材'] }
    },
    木材: {
      description: '木材ブロックの種類',
      condition: "カテゴリ === '木材'",
      defaultValue: 'minecraft:oak_log',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['木材'] }
    },
    鉱石: {
      description: '鉱石ブロックの種類',
      condition: "カテゴリ === '鉱石'",
      defaultValue: 'minecraft:coal_ore',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['鉱石'] }
    },
    自然: {
      description: '自然ブロックの種類',
      condition: "カテゴリ === '自然'",
      defaultValue: 'minecraft:grass_block',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['自然'] }
    },
    建材: {
      description: '建材ブロックの種類',
      condition: "カテゴリ === '建材'",
      defaultValue: 'minecraft:brick_block',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['建材'] }
    },
    その他: {
      description: 'その他ブロックの種類',
      condition: "カテゴリ === 'その他'",
      defaultValue: 'minecraft:air',
      editorType: 'select',
      editorTypeData: { options: BLOCK_CATS['その他'] }
    },
  },
  outputs: {
    ブロックID: { description: '"minecraft:stone" 形式のブロックID' },
  },
  run: ({ カテゴリ, 石材, 木材, 鉱石, 自然, 建材, その他 }, { ブロックID }) => {
    const cat = String(カテゴリ)
    let result: string
    switch (cat) {
      case '石材': result = String(石材); break
      case '木材': result = String(木材); break
      case '鉱石': result = String(鉱石); break
      case '自然': result = String(自然); break
      case '建材': result = String(建材); break
      case 'その他': result = String(その他); break
      default: result = 'minecraft:stone'
    }
    ブロックID.next(result)
  },
}

export const アイテム選択: CodeNode = {
  id: 'ItemSelector',
  displayName: 'アイテム選択',
  menuDisplayName: 'ｱｲﾃﾑ選択',
  icon: 'box-open',
  defaultStyle: STYLE,
  inputs: {
    カテゴリ: {
      description: 'アイテムのカテゴリ',
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
      condition: "カテゴリ === '武器'",
      defaultValue: 'minecraft:wooden_sword',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['武器'] }
    },
    道具: {
      description: '道具の種類',
      condition: "カテゴリ === '道具'",
      defaultValue: 'minecraft:wooden_pickaxe',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['道具'] }
    },
    防具: {
      description: '防具の種類',
      condition: "カテゴリ === '防具'",
      defaultValue: 'minecraft:iron_helmet',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['防具'] }
    },
    食料: {
      description: '食料の種類',
      condition: "カテゴリ === '食料'",
      defaultValue: 'minecraft:apple',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['食料'] }
    },
    素材: {
      description: '素材の種類',
      condition: "カテゴリ === '素材'",
      defaultValue: 'minecraft:iron_ingot',
      editorType: 'select',
      editorTypeData: { options: ITEM_CATS['素材'] }
    },
  },
  outputs: {
    アイテムID: { description: '"minecraft:apple" 形式のアイテムID' },
  },
  run: ({ カテゴリ, 武器, 道具, 防具, 食料, 素材 }, { アイテムID }) => {
    const cat = String(カテゴリ)
    let result: string
    switch (cat) {
      case '武器': result = String(武器); break
      case '道具': result = String(道具); break
      case '防具': result = String(防具); break
      case '食料': result = String(食料); break
      case '素材': result = String(素材); break
      default: result = 'minecraft:wooden_sword'
    }
    アイテムID.next(result)
  },
}

export const モブ選択: CodeNode = {
  id: 'MobSelector',
  displayName: 'モブ選択',
  menuDisplayName: 'ﾓﾌﾞ選択',
  icon: 'paw',
  defaultStyle: STYLE,
  inputs: {
    カテゴリ: {
      description: 'モブのカテゴリ',
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
      condition: "カテゴリ === '動物'",
      defaultValue: 'minecraft:cow',
      editorType: 'select',
      editorTypeData: { options: MOB_CATS['動物'] }
    },
    モンスター: {
      description: 'モンスターの種類',
      condition: "カテゴリ === 'モンスター'",
      defaultValue: 'minecraft:zombie',
      editorType: 'select',
      editorTypeData: { options: MOB_CATS['モンスター'] }
    },
  },
  outputs: {
    モブID: { description: '"minecraft:cow" 形式のモブID' },
  },
  run: ({ カテゴリ, 動物, モンスター }, { モブID }) => {
    const cat = String(カテゴリ)
    let result: string
    switch (cat) {
      case '動物': result = String(動物); break
      case 'モンスター': result = String(モンスター); break
      default: result = 'minecraft:cow'
    }
    モブID.next(result)
  },
}

export const イベントenum選択: CodeNode = {
  id: 'EventEnumSelector',
  displayName: 'イベント値選択',
  menuDisplayName: 'ｲﾍﾞﾝﾄ値選択',
  icon: 'list-check',
  defaultStyle: STYLE,
  inputs: {
    種別: {
      description: '選択するイベント値の種別',
      defaultValue: '移動方法',
      editorType: 'select',
      editorTypeData: { options: ENUM_CAT_OPTS },
    },
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
    値: { description: 'イベントノードの出力と比較できる文字列（例: "Walk"）' },
  },
  run: ({ 種別, 移動方法, テレポート原因, モブ交流, アイテム使用, アイテム取得, 装備スロット, 破壊方法, 設置方法 }, { 値 }) => {
    const cat = String(種別)
    const v = cat === '移動方法'       ? 移動方法
            : cat === 'テレポート原因' ? テレポート原因
            : cat === 'モブ交流'       ? モブ交流
            : cat === 'アイテム使用'   ? アイテム使用
            : cat === 'アイテム取得'   ? アイテム取得
            : cat === '装備スロット'   ? 装備スロット
            : cat === '破壊方法'       ? 破壊方法
            :                            設置方法
    値.next(String(v))
  },
}
