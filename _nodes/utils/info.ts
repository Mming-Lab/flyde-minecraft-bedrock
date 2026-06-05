import { CodeNode } from '@flyde/core'

const STYLE = { color: '#767676' }

export const プレイヤー情報取得: CodeNode = {
  id: 'GetFromPlayerSnapshot',
  displayName: 'プレイヤー情報取得',
  menuDisplayName: 'ﾌﾟﾚｲﾔｰ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_ﾌﾟﾚｲﾔｰ: { description: 'イベントノードの O_ﾌﾟﾚｲﾔｰ 出力（WorldPlayer オブジェクト）' },
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
  run: ({ O_ﾌﾟﾚｲﾔｰ, 項目 }, { 値 }) => {
    値.next((O_ﾌﾟﾚｲﾔｰ as any)[項目 as string])
  }
}

export const アイテム種別情報取得: CodeNode = {
  id: 'GetFromItemType',
  displayName: 'アイテム種別情報取得',
  menuDisplayName: 'ｱｲﾃﾑ種別情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_ｱｲﾃﾑ: { description: 'アイテム種別（アイテム取得・精錬イベントの O_ｱｲﾃﾑ 出力）' },
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
  run: ({ O_ｱｲﾃﾑ, 項目 }, { 値 }) => {
    値.next((O_ｱｲﾃﾑ as any)[項目 as string])
  }
}

export const 所持アイテム情報取得: CodeNode = {
  id: 'GetFromItemStack',
  displayName: '所持アイテム情報取得',
  menuDisplayName: '所持ｱｲﾃﾑ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_ｱｲﾃﾑ: { description: '所持アイテム（使用・装備・クラフト・取引イベントの O_ｱｲﾃﾑ 出力）' },
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
  run: ({ O_ｱｲﾃﾑ, 項目 }, { 値 }) => {
    値.next((O_ｱｲﾃﾑ as any)[項目 as string])
  }
}

export const ブロック情報取得: CodeNode = {
  id: 'GetFromBlockType',
  displayName: 'ブロック情報取得',
  menuDisplayName: 'ﾌﾞﾛｯｸ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_ﾌﾞﾛｯｸ: { description: 'BlockType（ブロック・バウンスイベントの O_ﾌﾞﾛｯｸ 出力）' },
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
  run: ({ O_ﾌﾞﾛｯｸ, 項目 }, { 値 }) => {
    値.next((O_ﾌﾞﾛｯｸ as any)[項目 as string])
  }
}

export const スコアボード目標情報取得: CodeNode = {
  id: 'GetFromScoreboardObjective',
  displayName: 'スコアボード目標情報取得',
  menuDisplayName: 'SB目標情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    目標: { description: 'スコアボード目標追加・取得ノードの 目標 出力' },
    項目: {
      description: '取得する情報',
      defaultValue: 'id',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '目標ID (id)',          value: 'id' },
          { label: '表示名 (displayName)', value: 'displayName' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ 目標, 項目 }, { 値 }) => {
    値.next((目標 as any)[項目 as string])
  }
}

export const モブ情報取得: CodeNode = {
  id: 'GetFromMob',
  displayName: 'モブ情報取得',
  menuDisplayName: 'ﾓﾌﾞ情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_ﾓﾌﾞ: { description: 'モブと交流イベントの O_ﾓﾌﾞ 出力' },
    項目: {
      description: '取得する情報',
      defaultValue: 'type',
      editorType: 'select',
      editorTypeData: {
        options: [
          { label: '種別名 (type)',       value: 'type' },
          { label: 'ID (identifier)',      value: 'identifier' },
          { label: 'バリアント (variant)', value: 'variant' },
          { label: 'カラー (color)',       value: 'color' },
          { label: 'カラー2 (color2)',     value: 'color2' },
        ]
      }
    }
  },
  outputs: { 値: {} },
  run: ({ O_ﾓﾌﾞ, 項目 }, { 値 }) => {
    値.next((O_ﾓﾌﾞ as any)[項目 as string])
  }
}

export const 村人情報取得: CodeNode = {
  id: 'GetFromVillager',
  displayName: '村人情報取得',
  menuDisplayName: '村人情報',
  icon: 'shuffle',
  defaultStyle: STYLE,
  inputs: {
    O_村人: { description: 'WorldVillager（アイテム取引イベントの O_村人 出力）' },
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
  run: ({ O_村人, 項目 }, { 値 }) => {
    const parts = String(項目).split('.')
    let result: any = O_村人
    for (const p of parts) result = result?.[p]
    値.next(result)
  }
}
