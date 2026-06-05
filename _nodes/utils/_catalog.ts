export type SelectOption = { value: string; label: string }

export const BLOCK_CATS: Record<string, SelectOption[]> = {
  '石材': [
    { label: '石', value: 'minecraft:stone' },
    { label: '丸石', value: 'minecraft:cobblestone' },
    { label: '石レンガ', value: 'minecraft:stone_bricks' },
    { label: '苔むした丸石', value: 'minecraft:mossy_cobblestone' },
    { label: '苔むした石レンガ', value: 'minecraft:mossy_stone_bricks' },
    { label: 'ひび割れた石レンガ', value: 'minecraft:cracked_stone_bricks' },
    { label: '模様入り石レンガ', value: 'minecraft:chiseled_stone_bricks' },
    { label: '花崗岩', value: 'minecraft:granite' },
    { label: '閃緑岩', value: 'minecraft:diorite' },
    { label: '安山岩', value: 'minecraft:andesite' },
    { label: '砂岩', value: 'minecraft:sandstone' },
    { label: '赤い砂岩', value: 'minecraft:red_sandstone' },
    { label: 'ブラックストーン', value: 'minecraft:blackstone' },
    { label: '深層岩', value: 'minecraft:deepslate' },
    { label: '丸石の塀', value: 'minecraft:cobblestone_wall' },
  ],
  '木材': [
    { label: 'オークの原木', value: 'minecraft:oak_log' },
    { label: 'オークの板材', value: 'minecraft:oak_planks' },
    { label: '樺の原木', value: 'minecraft:birch_log' },
    { label: '樺の板材', value: 'minecraft:birch_planks' },
    { label: 'トウヒの原木', value: 'minecraft:spruce_log' },
    { label: 'トウヒの板材', value: 'minecraft:spruce_planks' },
    { label: 'ジャングルの原木', value: 'minecraft:jungle_log' },
    { label: 'ジャングルの板材', value: 'minecraft:jungle_planks' },
    { label: 'アカシアの原木', value: 'minecraft:acacia_log' },
    { label: 'アカシアの板材', value: 'minecraft:acacia_planks' },
    { label: 'ダークオークの原木', value: 'minecraft:dark_oak_log' },
    { label: 'ダークオークの板材', value: 'minecraft:dark_oak_planks' },
    { label: 'マングローブの原木', value: 'minecraft:mangrove_log' },
    { label: 'サクラの原木', value: 'minecraft:cherry_log' },
    { label: 'サクラの板材', value: 'minecraft:cherry_planks' },
    { label: '竹', value: 'minecraft:bamboo' },
    { label: '竹の板材', value: 'minecraft:bamboo_planks' },
  ],
  '鉱石': [
    { label: '石炭鉱石', value: 'minecraft:coal_ore' },
    { label: '鉄鉱石', value: 'minecraft:iron_ore' },
    { label: '金鉱石', value: 'minecraft:gold_ore' },
    { label: 'ダイヤモンド鉱石', value: 'minecraft:diamond_ore' },
    { label: 'エメラルド鉱石', value: 'minecraft:emerald_ore' },
    { label: 'レッドストーン鉱石', value: 'minecraft:redstone_ore' },
    { label: 'ラピスラズリ鉱石', value: 'minecraft:lapis_ore' },
    { label: '深層石炭鉱石', value: 'minecraft:deepslate_coal_ore' },
    { label: '深層鉄鉱石', value: 'minecraft:deepslate_iron_ore' },
    { label: '深層金鉱石', value: 'minecraft:deepslate_gold_ore' },
    { label: '深層ダイヤモンド鉱石', value: 'minecraft:deepslate_diamond_ore' },
    { label: '深層エメラルド鉱石', value: 'minecraft:deepslate_emerald_ore' },
    { label: 'ネザークォーツ鉱石', value: 'minecraft:quartz_ore' },
    { label: 'ネザー金鉱石', value: 'minecraft:nether_gold_ore' },
    { label: '古代のがれき', value: 'minecraft:ancient_debris' },
  ],
  '自然': [
    { label: '草ブロック', value: 'minecraft:grass_block' },
    { label: '土', value: 'minecraft:dirt' },
    { label: '粗い土', value: 'minecraft:coarse_dirt' },
    { label: '砂', value: 'minecraft:sand' },
    { label: '赤い砂', value: 'minecraft:red_sand' },
    { label: '砂利', value: 'minecraft:gravel' },
    { label: '雪', value: 'minecraft:snow' },
    { label: '氷', value: 'minecraft:ice' },
    { label: '氷塊', value: 'minecraft:packed_ice' },
    { label: '青氷', value: 'minecraft:blue_ice' },
    { label: 'オークの葉', value: 'minecraft:oak_leaves' },
    { label: '樺の葉', value: 'minecraft:birch_leaves' },
    { label: 'ジャングルの葉', value: 'minecraft:jungle_leaves' },
    { label: 'アカシアの葉', value: 'minecraft:acacia_leaves' },
    { label: 'ダークオークの葉', value: 'minecraft:dark_oak_leaves' },
    { label: 'サクラの葉', value: 'minecraft:cherry_leaves' },
    { label: 'サボテン', value: 'minecraft:cactus' },
    { label: 'ソウルサンド', value: 'minecraft:soul_sand' },
    { label: 'ネザーラック', value: 'minecraft:netherrack' },
    { label: 'エンドストーン', value: 'minecraft:end_stone' },
  ],
  '建材': [
    { label: 'レンガ ブロック', value: 'minecraft:brick_block' },
    { label: 'ガラス', value: 'minecraft:glass' },
    { label: 'ハードガラス（MEE）', value: 'minecraft:hard_glass' },
    { label: '白色の羊毛', value: 'minecraft:white_wool' },
    { label: '赤色の羊毛', value: 'minecraft:red_wool' },
    { label: '青色の羊毛', value: 'minecraft:blue_wool' },
    { label: '黄色の羊毛', value: 'minecraft:yellow_wool' },
    { label: '緑色の羊毛', value: 'minecraft:green_wool' },
    { label: '黒色の羊毛', value: 'minecraft:black_wool' },
    { label: '白色のコンクリート', value: 'minecraft:white_concrete' },
    { label: '赤色のコンクリート', value: 'minecraft:red_concrete' },
    { label: '青色のコンクリート', value: 'minecraft:blue_concrete' },
    { label: '黄色のコンクリート', value: 'minecraft:yellow_concrete' },
    { label: '緑色のコンクリート', value: 'minecraft:green_concrete' },
    { label: '黒色のコンクリート', value: 'minecraft:black_concrete' },
    { label: 'テラコッタ', value: 'minecraft:hardened_clay' },
    { label: 'ネザーレンガ', value: 'minecraft:nether_brick' },
    { label: 'エンドストーンレンガ', value: 'minecraft:end_bricks' },
  ],
  'その他': [
    { label: '空気', value: 'minecraft:air' },
    { label: '岩盤', value: 'minecraft:bedrock' },
    { label: '黒曜石', value: 'minecraft:obsidian' },
    { label: '泣く黒曜石', value: 'minecraft:crying_obsidian' },
    { label: 'TNT', value: 'minecraft:tnt' },
    { label: 'チェスト', value: 'minecraft:chest' },
    { label: 'かまど', value: 'minecraft:furnace' },
    { label: 'クラフトテーブル', value: 'minecraft:crafting_table' },
    { label: '石炭ブロック', value: 'minecraft:coal_block' },
    { label: '鉄ブロック', value: 'minecraft:iron_block' },
    { label: '金ブロック', value: 'minecraft:gold_block' },
    { label: 'ダイヤモンドブロック', value: 'minecraft:diamond_block' },
    { label: 'エメラルドブロック', value: 'minecraft:emerald_block' },
    { label: 'ビーコン', value: 'minecraft:beacon' },
  ],
}

export const ITEM_CATS: Record<string, SelectOption[]> = {
  '武器': [
    { label: '木の剣', value: 'minecraft:wooden_sword' },
    { label: '石の剣', value: 'minecraft:stone_sword' },
    { label: '鉄の剣', value: 'minecraft:iron_sword' },
    { label: '金の剣', value: 'minecraft:golden_sword' },
    { label: 'ダイヤモンドの剣', value: 'minecraft:diamond_sword' },
    { label: '弓', value: 'minecraft:bow' },
    { label: '矢', value: 'minecraft:arrow' },
    { label: 'トライデント', value: 'minecraft:trident' },
  ],
  '道具': [
    { label: '木のツルハシ', value: 'minecraft:wooden_pickaxe' },
    { label: '石のツルハシ', value: 'minecraft:stone_pickaxe' },
    { label: '鉄のツルハシ', value: 'minecraft:iron_pickaxe' },
    { label: 'ダイヤモンドのツルハシ', value: 'minecraft:diamond_pickaxe' },
    { label: '木の斧', value: 'minecraft:wooden_axe' },
    { label: '石の斧', value: 'minecraft:stone_axe' },
    { label: '鉄の斧', value: 'minecraft:iron_axe' },
    { label: 'ダイヤモンドの斧', value: 'minecraft:diamond_axe' },
    { label: '木のシャベル', value: 'minecraft:wooden_shovel' },
    { label: '鉄のシャベル', value: 'minecraft:iron_shovel' },
    { label: 'ハサミ', value: 'minecraft:shears' },
    { label: '釣竿', value: 'minecraft:fishing_rod' },
  ],
  '防具': [
    { label: '鉄のヘルメット', value: 'minecraft:iron_helmet' },
    { label: 'ダイヤモンドのヘルメット', value: 'minecraft:diamond_helmet' },
    { label: '革のブーツ', value: 'minecraft:leather_boots' },
    { label: '鉄のブーツ', value: 'minecraft:iron_boots' },
    { label: 'ダイヤモンドのブーツ', value: 'minecraft:diamond_boots' },
    { label: '盾', value: 'minecraft:shield' },
  ],
  '食料': [
    { label: 'リンゴ', value: 'minecraft:apple' },
    { label: 'パン', value: 'minecraft:bread' },
    { label: '生の牛肉', value: 'minecraft:beef' },
    { label: '生の豚肉', value: 'minecraft:porkchop' },
    { label: '生の鶏肉', value: 'minecraft:chicken' },
    { label: '生鱈', value: 'minecraft:cod' },
    { label: '生鮭', value: 'minecraft:salmon' },
    { label: 'ニンジン', value: 'minecraft:carrot' },
    { label: 'ジャガイモ', value: 'minecraft:potato' },
    { label: '焼き鱈', value: 'minecraft:cooked_cod' },
    { label: '小麦', value: 'minecraft:wheat' },
  ],
  '素材': [
    { label: '石炭', value: 'minecraft:coal' },
    { label: '鉄インゴット', value: 'minecraft:iron_ingot' },
    { label: '金インゴット', value: 'minecraft:gold_ingot' },
    { label: 'ダイヤモンド', value: 'minecraft:diamond' },
    { label: 'エメラルド', value: 'minecraft:emerald' },
    { label: 'ラピスラズリ', value: 'minecraft:lapis_lazuli' },
    { label: 'レッドストーン', value: 'minecraft:redstone' },
    { label: '棒', value: 'minecraft:stick' },
    { label: '鉄の原石', value: 'minecraft:raw_iron' },
    { label: '金の原石', value: 'minecraft:raw_gold' },
    { label: 'ネザライトインゴット', value: 'minecraft:netherite_ingot' },
    { label: 'ブレイズロッド', value: 'minecraft:blaze_rod' },
  ],
}

export const MOB_CATS: Record<string, SelectOption[]> = {
  '動物': [
    { label: 'ウシ', value: 'minecraft:cow' },
    { label: 'ブタ', value: 'minecraft:pig' },
    { label: 'ニワトリ', value: 'minecraft:chicken' },
    { label: '羊', value: 'minecraft:sheep' },
    { label: 'オオカミ', value: 'minecraft:wolf' },
    { label: 'ネコ', value: 'minecraft:cat' },
    { label: 'ウマ', value: 'minecraft:horse' },
    { label: 'キツネ', value: 'minecraft:fox' },
    { label: 'パンダ', value: 'minecraft:panda' },
    { label: 'イルカ', value: 'minecraft:dolphin' },
    { label: 'イカ', value: 'minecraft:squid' },
    { label: 'ミツバチ', value: 'minecraft:bee' },
    { label: 'ウーパールーパー', value: 'minecraft:axolotl' },
    { label: 'ヤギ', value: 'minecraft:goat' },
    { label: 'カエル', value: 'minecraft:frog' },
    { label: 'アレイ', value: 'minecraft:allay' },
  ],
  'モンスター': [
    { label: 'ゾンビ', value: 'minecraft:zombie' },
    { label: 'クリーパー', value: 'minecraft:creeper' },
    { label: 'スケルトン', value: 'minecraft:skeleton' },
    { label: 'クモ', value: 'minecraft:spider' },
    { label: 'エンダーマン', value: 'minecraft:enderman' },
    { label: 'スライム', value: 'minecraft:slime' },
    { label: 'ガスト', value: 'minecraft:ghast' },
    { label: 'ブレイズ', value: 'minecraft:blaze' },
    { label: 'ウィッチ', value: 'minecraft:witch' },
    { label: 'ハスク', value: 'minecraft:husk' },
    { label: '溺死ゾンビ', value: 'minecraft:drowned' },
    { label: 'ガーディアン', value: 'minecraft:guardian' },
    { label: 'ホグリン', value: 'minecraft:hoglin' },
  ],
}

export const ENUM_JA: Record<string, Record<string, string>> = {
  移動方法: {
    Walk: '歩く', SwimWater: '水泳', Fall: '落下', Climb: '登る',
    SwimLava: '溶岩泳ぎ', Fly: '飛ぶ', Riding: '乗り物', Sneak: 'しゃがむ',
    Sprint: '走る', Bounce: 'バウンス', FrostWalk: '氷上歩行', Teleport: 'テレポート',
  },
  テレポート原因: {
    Projectile: '飛び道具', ChorusFruit: 'コーラスフルーツ',
    Command: 'コマンド', Behavior: 'ビヘイビア',
  },
  モブ交流: {
    Breeding: '繁殖', Taming: '手なずけ', Curing: '治療', Crafted: 'クラフト',
    Shearing: 'ハサミ', Milking: 'ミルク', Trading: '取引', Feeding: 'えさやり',
    Igniting: '着火', Coloring: '染色', Naming: '命名', Leashing: 'リード',
    Unleashing: 'リード外す', PetSleep: 'ペット就寝', Trusting: '信頼', Commanding: '命令',
  },
  アイテム使用: {
    Use: '使用', Place: '設置',
  },
  アイテム取得: {
    Pickedup: '拾った', Crafted: 'クラフト', TakenFromChest: 'チェストから取得',
    TakenFromEnderChest: 'エンダーチェストから取得', Bought: '購入', Anvil: '金床',
    Smelted: '精錬', Brewed: '醸造', Filled: 'バケツで汲んだ', Trading: '取引',
    Fishing: '釣り', Container: 'コンテナ', Feeding: 'えさやり',
  },
  装備スロット: {
    Offhand: 'オフハンド', Head: '頭', Chest: '胴体', Legs: '脚', Feet: '足',
  },
  破壊方法: {
    Player: 'プレイヤー', Explosion: '爆発', Mob: 'モブ', Piston: 'ピストン', Other: 'その他',
  },
  設置方法: {
    Player: 'プレイヤー', Other: 'その他',
  },
}

function createReverseMap(cats: Record<string, SelectOption[]>): Record<string, string> {
  const map: Record<string, string> = {}
  for (const options of Object.values(cats)) {
    for (const opt of options) {
      map[opt.value] = opt.label
    }
  }
  return map
}

export const BLOCK_ID_TO_JA = createReverseMap(BLOCK_CATS)
export const ITEM_ID_TO_JA = createReverseMap(ITEM_CATS)
export const MOB_ID_TO_JA = createReverseMap(MOB_CATS)

export function enumOpts(kind: string): { label: string; value: string }[] {
  return Object.entries(ENUM_JA[kind] ?? {}).map(([en, ja]) => ({ label: ja, value: en }))
}

export const ENUM_CAT_OPTS = [
  { label: '移動方法',         value: '移動方法' },
  { label: 'テレポート原因',   value: 'テレポート原因' },
  { label: 'モブ交流種別',     value: 'モブ交流' },
  { label: 'アイテム使用方法', value: 'アイテム使用' },
  { label: 'アイテム取得方法', value: 'アイテム取得' },
  { label: '装備スロット',     value: '装備スロット' },
  { label: 'ブロック破壊方法', value: '破壊方法' },
  { label: 'ブロック設置方法', value: '設置方法' },
]
