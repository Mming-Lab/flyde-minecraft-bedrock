import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' } // utility

export const プレイヤー情報取得: CodeNode = {
  id: 'GetFromPlayerSnapshot',
  displayName: 'プレイヤー情報取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ情報',
  defaultStyle: STYLE,
  inputs: {
    スナップショット: { description: 'WorldPlayer または QueryTargetResult' },
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
  run: ({ スナップショット, 項目 }, { 値 }) => {
    値.next((スナップショット as any)[項目 as string])
  }
}

export const アイテム情報取得: CodeNode = {
  id: 'GetFromItemStack',
  displayName: 'アイテム情報取得',
  menuDisplayName: 'ｱｲﾃﾑ情報',
  defaultStyle: STYLE,
  inputs: {
    アイテム: { description: 'ItemStack スナップショット' },
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
  defaultStyle: STYLE,
  inputs: {
    ブロック: { description: 'BlockType スナップショット' },
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
  defaultStyle: STYLE,
  inputs: {
    村人: { description: 'WorldVillager スナップショット（アイテム取引イベント）' },
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
