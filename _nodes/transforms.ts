import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' } // utility

export const プレイヤー情報取得: CodeNode = {
  id: 'GetFromPlayerSnapshot',
  displayName: 'プレイヤー情報取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    プレイヤー: { description: 'イベントノードのプレイヤー出力（WorldPlayer）' },
    項目: {
      description: '取得する情報',
      defaultValue: 'name',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '名前',           value: 'name' },
          { label: '座標 (Vector3)', value: 'position' },
          { label: '向き (yRot)',    value: 'yRot' },
          { label: 'ディメンション', value: 'dimension' },
          { label: 'uniqueId',       value: 'uniqueId' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ プレイヤー, 項目 }, { 値 }) => {
    値.next((プレイヤー as any)[項目 as string])
  }
}

export const ItemType情報取得: CodeNode = {
  id: 'GetFromItemType',
  displayName: 'ItemType情報取得',
  menuDisplayName: 'ItemType情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    アイテム: { description: 'ItemType（アイテム取得・精錬イベントのアイテム出力）' },
    項目: {
      description: '取得する情報',
      defaultValue: 'id',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'アイテムID', value: 'id' },
          { label: 'データ値',   value: 'data' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ アイテム, 項目 }, { 値 }) => {
    値.next((アイテム as any)[項目 as string])
  }
}

export const ItemStack情報取得: CodeNode = {
  id: 'GetFromItemStack',
  displayName: 'ItemStack情報取得',
  menuDisplayName: 'ItemStack情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    アイテム: { description: 'ItemStack（使用・装備・クラフト・取引イベントのアイテム出力）' },
    項目: {
      description: '取得する情報',
      defaultValue: 'typeId',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'アイテムID', value: 'typeId' },
          { label: '個数',       value: 'amount' },
          { label: '最大個数',   value: 'maxAmount' },
          { label: 'データ値',   value: 'data' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ アイテム, 項目 }, { 値 }) => {
    値.next((アイテム as any)[項目 as string])
  }
}

export const ブロック情報取得: CodeNode = {
  id: 'GetFromBlockType',
  displayName: 'ブロック情報取得',
  menuDisplayName: 'ﾌﾞﾛｯｸ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    ブロック: { description: 'BlockType（ブロック・バウンスイベントのブロック出力）' },
    項目: {
      description: '取得する情報',
      defaultValue: 'id',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: 'ブロックID', value: 'id' },
          { label: 'データ値',   value: 'data' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ ブロック, 項目 }, { 値 }) => {
    値.next((ブロック as any)[項目 as string])
  }
}

export const 村人情報取得: CodeNode = {
  id: 'GetFromVillager',
  displayName: '村人情報取得',
  menuDisplayName: '村人情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    村人: { description: 'WorldVillager（アイテム取引イベントの村人出力）' },
    項目: {
      description: '取得する情報',
      defaultValue: 'trader.name',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '名前',   value: 'trader.name' },
          { label: 'ランク', value: 'trader.tier' },
          { label: '座標',   value: 'position' },
          { label: '向き',   value: 'yRot' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ 村人, 項目 }, { 値 }) => {
    const parts = String(項目).split('.')
    let result: any = 村人
    for (const p of parts) result = result?.[p]
    値.next(result)
  }
}
