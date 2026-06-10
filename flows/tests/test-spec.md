# テスト仕様書

対象：フル版（`index.flyde.ts`）全ノード  
更新日：2026-06-10（TC-052〜TC-059 自動テスト結果反映）

---

## テスト環境

### 必要なもの

- Minecraft 統合版（Windows PC 推奨）
- VSCode + Flyde 拡張機能
- Creative モードのワールド（コマンド実行権限あり）
- エージェント系テスト用：Education Edition モードを有効にしてエージェントを召喚しておく

---

## テスト実行手順

### A. npm link テスト（推奨）

npm 版・zip 版ともに `dist/` を使う構成に統一されているため、`npm link` で同じ環境が再現できる。

#### 1. ビルド

```bash
# flyde-minecraft-bedrock リポジトリで実行
npm run build:full   # dist/index.flyde.js を生成
```

#### 2. テスト環境を作成

```bash
# flyde-minecraft-bedrock をグローバルにリンク登録
cd flyde-minecraft-bedrock
npm link

# テスト用フォルダを作成
mkdir flyde-mc-test
cd flyde-mc-test
```

`flyde-mc-test/package.json` を作成：

```json
{
  "name": "flyde-mc-test",
  "version": "1.0.0",
  "dependencies": {
    "flyde-minecraft-bedrock": "*"
  }
}
```

```bash
# リンクを接続 + テストフローをコピー
npm link flyde-minecraft-bedrock
mkdir -p flows/tests
copy ..\flyde-minecraft-bedrock\flows\tests\*.flyde flows\tests\
```

#### 3. VSCode でテスト環境を開く

```
flyde-mc-test/ を VSCode で開く
flows/tests/test-XX-*.flyde を開いてフロー実行
```

#### 4. Minecraft に接続してテスト実行

1. フローを実行（SocketBE が localhost:8080 で起動）
2. Minecraft で `/connect localhost:8080`
3. 接続メッセージを確認
4. 自動テストの場合：チャットでメッセージ送信 → ログで PASS/FAIL 確認

---

### B. npm pack テスト（リリース前最終確認）

実際に publish される `.tgz` をインストールしてテストする：

```bash
cd flyde-minecraft-bedrock
npm run build:full
npm pack   # → flyde-minecraft-bedrock-x.x.x.tgz を生成

cd flyde-mc-test
npm install ../flyde-minecraft-bedrock/flyde-minecraft-bedrock-x.x.x.tgz
```

---

### 自動テストの結果確認

`logs/flyde-mc-YYYY-MM-DD_HH-mm-ss_N.log` を確認：

```
[INFO] [[TC-052]] PASS
[INFO] [[TC-056]] PASS
[INFO] [[TC-057]] FAIL  ← 失敗の場合
```

---

### フロー表記の読み方

```
[ノードA] → [ノードB]          # ノードAの出力をノードBに接続
[ノードA: 設定値]              # ノードAに値を設定
[SendMessage: "{変数}"]       # 変数の内容をチャットに表示して確認
```

---

## 1. 接続系

| ID | ノード | フロー構成 | Minecraft での操作 | 確認内容 | 結果 |
|---|---|---|---|---|---|
| TC-001 | MinecraftConnect | `[MinecraftConnect]` を配置してフロー実行 | `/connect localhost:8080` | world ポートに値が流れる / チャットに接続メッセージが出る | □ |
| TC-002 | MinecraftDisconnect | `[ボタン] → [MinecraftDisconnect]` | ボタンをクリック | MC との接続が切れる / 再接続できる | □ |

---

## 2. プレイヤーイベント系

**共通前提：** MC に接続済み、プレイヤーが1名いる  
**共通フロー：** `[OnXxx: 出力ポート] → [SendMessage: "{出力}"]` で MC チャットに表示して確認

| ID | ノード | 操作 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-011 | OnPlayerChat（チャット受信時） | MC でチャットメッセージを送信 | sender（送信者名）・message（内容）が正しく出力される | □ |
| TC-012 | OnPlayerTravelled（プレイヤー移動時） | MC でプレイヤーを歩かせる | distanceTraveled が出力される | □ |
| TC-013 | OnPlayerTeleported（テレポート時） | MC で `/tp 0 64 0` を実行 | player ポートが発火する | □ |
| TC-014 | OnPlayerBounced（バウンド時） | MC でスライムブロックの上でジャンプ | player ポートが発火する | □ |
| TC-015 | OnPlayerJoin（プレイヤー参加時） | 別のプレイヤーがワールドに参加 | player ポートが発火する、名前が正しい | □ |
| TC-016 | OnPlayerLeave（プレイヤー退出時） | 別のプレイヤーがワールドを退出 | player ポートが発火する | □ |
| TC-017 | OnPlayerTitle（タイトル受信時） | MC で `/title @a title "test"` を実行 | titleText が "test" で出力される | □ |
| TC-018 | OnPlayerMessage（メッセージ受信時） | MC で `/tell @a hello` を実行 | message が出力される | □ |
| TC-019 | OnPlayerTransform（プレイヤー位置変化時） | MC でプレイヤーを移動させる | position（x/y/z）が出力される | □ |

---

## 3. ブロックイベント系

| ID | ノード | 操作 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-021 | OnBlockBroken（ブロック破壊時） | MC でブロックを壊す | blockType（ブロック名）・position が正しく出力される | □ |
| TC-022 | OnBlockPlaced（ブロック設置時） | MC でブロックを置く | blockType・position が正しく出力される | □ |

---

## 4. アイテムイベント系

| ID | ノード | 前提 | 操作 | 確認内容 | 結果 |
|---|---|---|---|---|---|
| TC-031 | OnItemInteracted（アイテム使用時） | 使えるアイテムを持つ | アイテムを右クリック | item ポートが発火する | □ |
| TC-032 | OnItemAcquired（アイテム取得時） | — | ブロックを壊してドロップを拾う | item（アイテム名）が出力される | □ |
| TC-033 | OnItemCrafted（クラフト時） | 材料を持つ | クラフトテーブルでアイテムを作る | item が出力される | □ |
| TC-034 | OnItemEquipped（アイテム装備時） | 装備できるアイテムを持つ | 防具・ツールをホットバーに持つ | item が出力される | □ |
| TC-035 | OnItemSmelted（精錬時） | かまど + 精錬できる素材を持つ | かまどで精錬が完了する | item が出力される | □ |
| TC-036 | OnItemTraded（取引時） | 村人の近く | 村人と取引する | item が出力される | □ |

---

## 5. モブイベント系

| ID | ノード | 前提 | 操作 | 確認内容 | 結果 |
|---|---|---|---|---|---|
| TC-041 | OnMobInteracted（モブ交流時） | 動物（ウシ・ニワトリ等）の近く | モブを右クリック | mob（モブ名）が出力される | □ |
| TC-042 | OnTargetBlockHit（的命中時） | 的ブロックを設置する | 矢を的に当てる | signal strength が出力される | □ |

---

## 6. ゲームプレイコマンド系

**共通前提：** MC に接続済み  
**自動テスト（TC-052〜TC-059）：** `flows/tests/test-06-gameplay.flyde` を開いてフロー実行 → チャット送信1回で自動実行

| ID | ノード | フロー構成 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-051 | RunCommand（コマンド実行） | `[ボタン] → [RunCommand: "time set day"]` | 昼になる | □ |
| TC-052 | SetTimeOfDay + GetGameTime | 自動テスト：SetTimeOfDay(6000) → GetGameTime の戻り値 ≈ 6000 を確認（許容差500） | 設定した時刻が正しく取得できる | ✓ |
| TC-053 | IsDaytime（昼判定） | 自動テスト：SetTimeOfDay(6000) 後に IsDaytime = true を確認 | 昼時刻（6000）で true が返る | ✓ |
| TC-054 | GetWeather（天気取得） | `[ボタン] → [GetWeather] → [SendMessage]` / TC-056 にて合わせて確認 | "Rain" / "Clear" 等が返る | □ |
| TC-055 | SetTimeOfDay（時刻設定） | `[ボタン] → [SetTimeOfDay: "noon"]` / TC-052 にて合わせて確認 | 昼正午になる | □ |
| TC-056 | SetWeather(Rain) + GetWeather | 自動テスト：SetWeather(Rain) → GetWeather = "Rain" を確認 | 雨設定後すぐ天気が "Rain" になる | ✓ |
| TC-057 | SetWeather(Clear) + GetWeather | 自動テスト：SetWeather(Clear) → GetWeather = "Clear" を確認（Rain設定の前に実行） | Rain設定前に Clear をテストすることで即時反映を確認 | ✓ |
| TC-058 | SetGameMode(Creative) + GetGameMode | 自動テスト：SetGameMode(Creative) → GetGameMode = "Creative" を確認 | Creative 設定後 "Creative" が返る | ✓ |
| TC-059 | SetGameMode(Survival) + GetGameMode | 自動テスト：SetGameMode(Survival) → GetGameMode = "Survival" を確認 | Survival 設定後 "Survival" が返る | ✓ |
| TC-060 | GetTopSolidBlock（最上部ブロック取得） | — | `[ボタン] → [GetTopSolidBlock: x/z を設定] → [SendMessage]` で y 座標が表示 | □ |
| TC-061 | WorldQuery（ワールド情報取得） | — | `[ボタン] → [WorldQuery: 項目選択] → [SendMessage]` で値が表示 | □ |
| TC-062 | BroadcastCommand（全員コマンド実行） | 複数プレイヤー接続 | `[ボタン] → [BroadcastCommand: "give @a apple 1"]` | 全員にリンゴが渡る | □ |
| TC-063 | BroadcastMessage（全員メッセージ） | 複数プレイヤー接続 | `[ボタン] → [BroadcastMessage: "Hello All"]` | 全員のチャットに表示 | □ |
| TC-064 | FillBlocks（エリア塗りつぶし） | `[ボタン] → [FillBlocks: from/to/block を設定]` | 指定範囲がブロックで埋まる | □ |
| TC-065 | SetBlock（ブロック設置） | `[ボタン] → [SetBlock: position/block を設定]` | 指定座標にブロックが置かれる | □ |
| TC-066 | SendMessage（メッセージ送信） | `[ボタン] → [SendMessage: "Hello"]` | MC チャットに "Hello" と表示される | □ |

---

## 7. プレイヤーコマンド系

**自動テスト（TC-071,TC-072,TC-079）：** `flows/tests/test-07a-player-query.flyde` を開いてフロー実行 → チャット送信1回で自動実行  
**自動テスト（TC-076,TC-080,TC-084,TC-085,TC-086）：** `flows/tests/test-07b-player-actions.flyde` を開いてフロー実行

| ID | ノード | フロー構成 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-071 | GetLocalPlayer（ローカルプレイヤー取得） | `[ボタン] → [GetLocalPlayer] → [SendMessage: "{player}"]` | プレイヤー名が表示 | □ |
| TC-072 | GetPlayerLocation（座標取得） | `[ボタン] → [GetPlayerLocation] → [SendMessage]` | x/y/z 座標が表示 | □ |
| TC-073 | GetPlayerOrientation（向き取得） | `[ボタン] → [GetPlayerOrientation] → [SendMessage]` | yaw/pitch が表示 | □ |
| TC-074 | GetGameMode（ゲームモード取得） | `[ボタン] → [GetGameMode] → [SendMessage]` | "creative" / "survival" 等が表示（TC-058/TC-059 で自動確認済み） | ✓ |
| TC-075 | SetGameMode（ゲームモード設定） | `[ボタン] → [SetGameMode: "survival"]` | サバイバルモードになる（TC-058/TC-059 で自動確認済み） | ✓ |
| TC-076 | GiveItem（アイテム付与） | `[ボタン] → [GiveItem: "apple" / count: 5]` | インベントリにリンゴ5個が追加される | □ |
| TC-077 | GetPlayerTags（タグ取得） | プレイヤーに `/tag @s add test` を実行済み | `[ボタン] → [GetPlayerTags] → [SendMessage]` で ["test"] が表示 | □ |
| TC-078 | PlayerHasTag（タグ判定） | プレイヤーに "test" タグがある | `[ボタン] → [PlayerHasTag: "test"] → [SendMessage]` で true が表示 | □ |
| TC-079 | GetPlayerLevel（レベル取得） | — | `[ボタン] → [GetPlayerLevel] → [SendMessage]` で数値が表示 | □ |
| TC-080 | AddPlayerLevel（レベル加算） | `[ボタン] → [AddPlayerLevel: 5]` | 経験値レベルが5増える | □ |
| TC-081 | GetPlayerAbilities（アビリティ取得） | — | `[ボタン] → [GetPlayerAbilities] → [SendMessage]` でオブジェクトが表示 | □ |
| TC-082 | UpdateAbility（アビリティ更新） | `[ボタン] → [UpdateAbility: "mayfly" / true]` | フライが有効になる | □ |
| TC-083 | GetPlayers（プレイヤー一覧） | 複数接続 | `[ボタン] → [GetPlayers] → [SendMessage]` でプレイヤー名一覧が表示 | □ |
| TC-084 | SetTitle（タイトル表示） | `[ボタン] → [SetTitle: "テスト"]` | 画面中央に "テスト" と大きく表示 | □ |
| TC-085 | SetActionBar（アクションバー） | `[ボタン] → [SetActionBar: "HP: 100"]` | ホットバー上に "HP: 100" と表示 | □ |
| TC-086 | ClearTitle（タイトル消去） | TC-084 の後に実行 | タイトルが消える | □ |

---

## 8. 情報取得系（GetFrom*）

**共通前提：** 対応するイベントノードから player / block / item / mob スナップショットを受け取る  
**共通フロー：** `[OnXxx: player/block 等] → [GetFromXxx: フィールド選択] → [SendMessage]`

| ID | ノード | テスト方法 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-091 | GetFromPlayerSnapshot | OnPlayerChat の player → GetFromPlayerSnapshot で "name" を選択 | プレイヤー名が表示 | □ |
| TC-092 | GetFromEntity | OnPlayerChat の player → GetFromEntity で "id" を選択 | エンティティ ID が表示 | □ |
| TC-093 | GetFromBlockType | OnBlockBroken の block → GetFromBlockType で "id" を選択 | ブロック ID（例: "minecraft:stone"）が表示 | □ |
| TC-094 | GetFromItemType | OnItemAcquired の item → GetFromItemType で "id" を選択 | アイテム ID が表示 | □ |
| TC-095 | GetFromItemStack | OnItemAcquired の item → GetFromItemStack で "amount" を選択 | 個数が表示 | □ |
| TC-096 | GetFromMob | OnMobInteracted の mob → GetFromMob で "type" を選択 | モブ種別（例: "minecraft:cow"）が表示 | □ |
| TC-097 | GetFromVillager | OnItemTraded の villager → GetFromVillager で "profession" を選択 | 職業が表示 | □ |
| TC-098 | GetFromScoreboardObjective | TC-121 でスコアボード作成後、objective → GetFromScoreboardObjective で "id" を選択 | スコアボード名が表示 | □ |

---

## 9. セレクター / コンバーター系

| ID | ノード | フロー構成 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-101 | Selector（ID 選択） | `[Selector: ブロック/アイテム/モブ カテゴリ選択] → [RunCommand: "give @a {id} 1"]` のように接続 | プルダウンで ID が選択できる。接続先で正しい ID 文字列が使われる | □ |
| TC-102 | LocaleName（ロケール名変換） | `[OnBlockBroken: blockId] → [LocaleName] → [SendMessage]` | ブロック ID が日本語名（例: "石"）に変換されて表示 | □ |

---

## 10. 数学・座標系

**共通前提：** MC への接続不要（純粋関数）  
**自動テスト：** `flows/tests/test-10-math.flyde` を開いてフロー実行 → `logs/` のログで PASS/FAIL 確認

| ID | ノード | 設定値 | 期待される出力 | 結果 |
|---|---|---|---|---|
| TC-111 | Vector3Op（add） | 座標A:`{1,2,3}` / 座標B:`{4,5,6}` / 演算:add | `{x:5,y:7,z:9}` | ✓ |
| TC-112 | Vector3Op（subtract） | 座標A:`{5,7,9}` / 座標B:`{1,2,3}` / 演算:subtract | `{x:4,y:5,z:6}` | ✓ |
| TC-113 | Vector3Op（scale） | 座標:`{2,4,6}` / 倍率:3 / 演算:scale | `{x:6,y:12,z:18}` | ✓ |
| TC-114 | Vector3Op（assemble） | x:10 / y:20 / z:30 / 演算:assemble | `{x:10,y:20,z:30}` | ✓ |
| TC-115 | Vector3Op（floor） | 座標:`{1.7,2.3,3.9}` / 演算:floor | `{x:1,y:2,z:3}` | ✓ |
| TC-116 | Vector3Op（fill_y） | 座標XZ:`{x:5,z:10}` / Y:64 / 演算:fill_y | `{x:5,y:64,z:10}` | ✓ |
| TC-117 | Vector3Distance | 座標A:`{0,0,0}` / 座標B:`{3,4,0}` | `5`（3-4-5 三角形） | ✓ |
| TC-118 | Vector3ToString | 座標:`{1,64,-3}` | `"1 64 -3"` | ✓ |
| TC-119 | Vector3Split | 座標:`{10,20,30}` | x=10 / y=20 / z=30（3つ同時確認） | ✓ |
| TC-120a | ClampNumber（上限超え） | 値:150 / 最小:0 / 最大:100 | `100` | ✓ |
| TC-120b | ClampNumber（下限超え） | 値:-10 / 最小:0 / 最大:100 | `0` | ✓ |
| TC-120c | ClampNumber（範囲内） | 値:50 / 最小:0 / 最大:100 | `50` | ✓ |
| TC-121 | AABBCreate | 角座標A:`{0,0,0}` / 角座標B:`{5,5,5}` | `{min:{0,0,0},max:{5,5,5}}` | ✓ |
| TC-122a | AABBIsInside（内部） | エリア:0-5 / 座標:`{2,2,2}` | `true` | ✓ |
| TC-122b | AABBIsInside（外部） | エリア:0-5 / 座標:`{10,10,10}` | `false` | ✓ |
| TC-123 | AABBTranslate | エリア:0-5 / 移動量:`{5,0,0}` | `{min:{5,0,0},max:{10,5,5}}` | ✓ |
| TC-124a | AABBIntersects（重複あり） | エリアA:0-5 / エリアB:3-8 | `true` | ✓ |
| TC-124b | AABBIntersects（重複なし） | エリアA:0-3 / エリアB:5-8 | `false` | ✓ |
| TC-125 | Vector3Lerp | 座標A:`{0,0,0}` / 座標B:`{10,0,0}` / t:0.5 | `{x:5,y:0,z:0}` | ✓ |
| TC-126 | Vector3Normalize | 座標:`{3,0,0}` | `{x:1,y:0,z:0}` | ✓ |
| TC-127a | Vector3Dot（直交） | 座標A:`{1,0,0}` / 座標B:`{0,1,0}` | `0` | ✓ |
| TC-127b | Vector3Dot（平行） | 座標A:`{1,0,0}` / 座標B:`{1,0,0}` | `1` | ✓ |

---

## 11. エージェント系

**共通前提：** Education Edition モードを有効化 → `/summon agent` でエージェントを召喚済み

| ID | ノード | フロー構成 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-131 | GetAgentLocation（位置取得） | `[ボタン] → [GetAgentLocation] → [SendMessage]` | エージェントの座標が表示 | □ |
| TC-132 | AgentMove（移動） | `[ボタン] → [AgentMove: direction="forward" / steps=1]` | エージェントが前に1マス移動 | □ |
| TC-133 | AgentTurn（回転） | `[ボタン] → [AgentTurn: direction="left"]` | エージェントが左に向く | □ |
| TC-134 | AgentTeleport（テレポート） | `[ボタン] → [AgentTeleport: プレイヤー位置を設定]` | エージェントが指定座標に移動 | □ |
| TC-135 | AgentDetect（障害物検知） | エージェントの前にブロックを置く | `[ボタン] → [AgentDetect: direction="forward"] → [SendMessage]` で `true` | □ |
| TC-136 | AgentInspect（ブロック調査） | エージェントの前にブロックを置く | `[ボタン] → [AgentInspect: direction="forward"] → [SendMessage]` でブロック名表示 | □ |
| TC-137 | AgentPlaceBlock（ブロック設置） | エージェントのスロット1にブロックをセット済み | `[ボタン] → [AgentPlaceBlock: direction="forward" / slot=1]` | 前にブロックが置かれる | □ |
| TC-138 | AgentAction（アクション） | — | `[ボタン] → [AgentAction: action="attack"]` | エージェントが攻撃アクション | □ |
| TC-139 | AgentCollect（アイテム収集） | 近くにドロップアイテムがある | `[ボタン] → [AgentCollect: "apple"]` | エージェントがリンゴを拾う | □ |
| TC-140 | AgentDropItem（アイテムドロップ） | エージェントのスロット1にアイテムがある | `[ボタン] → [AgentDropItem: slot=1 / count=1]` | アイテムがドロップされる | □ |
| TC-141 | AgentGetItemCount（アイテム個数取得） | エージェントのスロット1にアイテムがある | `[ボタン] → [AgentGetItemCount: slot=1] → [SendMessage]` | 個数が表示 | □ |
| TC-142 | AgentGetItemSpace（空きスペース取得） | — | `[ボタン] → [AgentGetItemSpace: slot=1] → [SendMessage]` | 空きスペース数が表示 | □ |
| TC-143 | AgentGetItemDetail（アイテム詳細） | エージェントのスロット1にアイテムがある | `[ボタン] → [AgentGetItemDetail: slot=1] → [SendMessage]` | アイテム名/個数/損傷値が表示 | □ |
| TC-144 | AgentMoveItem（アイテム移動） | スロット1にアイテムがある | `[ボタン] → [AgentMoveItem: fromSlot=1 / toSlot=2 / count=1]` | スロット2にアイテムが移動 | □ |
| TC-145 | AgentSetItem（アイテムセット） | — | `[ボタン] → [AgentSetItem: item="apple" / count=5 / slot=1]` | スロット1にリンゴ5個がセット | □ |

---

## 12. スコアボード系

**共通前提：** MC に接続済み  
**自動テスト（TC-154,TC-156,TC-157）：** `flows/tests/test-12a-scoreboard-ops.flyde` を開いてフロー実行 → チャット送信1回で自動実行（TC-SB02〜TC-SB05）  
**自動テスト（TC-151,TC-153）：** `flows/tests/test-12b-scoreboard-query.flyde` を開いてフロー実行

| ID | ノード | フロー構成 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-151 | AddScoreboardObjective（追加） | 自動テスト：AddScoreboardObjective("mcflowtest2") → GetFromScoreboardObjective → id = "mcflowtest2" を確認 | スコアボード目標を追加し、ID が正しく返る | □ |
| TC-152 | GetScoreboardObjectives（一覧取得） | 自動テスト（test-scoreboard2.flyde）：目標追加後 GetScoreboardObjectives → 目標一覧が返る（implicit） | 例外なく一覧が取得できる | □ |
| TC-153 | GetScoreboardObjective（単体取得） | 自動テスト：GetScoreboardObjective("mcflowtest2") → id = "mcflowtest2" を確認 | 指定IDの目標が取得できる | □ |
| TC-154 | ScoreOperation（スコア操作） | 自動テスト（test-12a-scoreboard-ops.flyde）：set 42 → 新スコア=42（TC-SB02）、add 8 → 50（TC-SB04） | スコアの set/add が正しく動作する | ✓ |
| TC-155 | GetScores（全スコア取得） | 自動テスト（test-12b-scoreboard-query.flyde）：スコア設定後 GetScores → スコア一覧が返る（implicit） | 例外なく一覧が取得できる | □ |
| TC-156 | GetScore（単一取得） | 自動テスト（test-12a-scoreboard-ops.flyde）：set 42 後 GetScore → 42（TC-SB03） | スコアが正しく取得できる | ✓ |
| TC-157 | RemoveScoreboardObjective（削除） | 自動テスト（test-12a-scoreboard-ops.flyde）：RemoveScoreboardObjective → true（TC-SB05） | スコアボード目標を削除できる | ✓ |

---

## 13. ビルド・言語切替テスト

MC との接続不要。ターミナルで実行。

| ID | テスト内容 | 手順 | 確認内容 | 結果 |
|---|---|---|---|---|
| TC-161 | 型チェック | `npm run typecheck` | エラーなしで完了 | □ |
| TC-162 | 無料版ビルド | `npm run build` | `dist/index.free.flyde.js` が生成される | □ |
| TC-163 | フル版ビルド | `node scripts/build.js --full` | `dist/index.flyde.js` が生成される | □ |
| TC-164 | 英語切替 | `npm run lang:en` | 3ファイルが en_US に書き換わる / Flyde リロード後ノード名が英語になる | □ |
| TC-165 | 日本語切替 | `npm run lang:ja` | 3ファイルが ja_JP に書き換わる / Flyde リロード後ノード名が日本語になる | □ |

---

## テスト結果サマリー

| カテゴリ | 件数 | Pass | Fail | 未実施 |
|---|---|---|---|---|
| 1. 接続系 | 2 | 0 | 0 | 2 |
| 2. プレイヤーイベント系 | 9 | 0 | 0 | 9 |
| 3. ブロックイベント系 | 2 | 0 | 0 | 2 |
| 4. アイテムイベント系 | 6 | 0 | 0 | 6 |
| 5. モブイベント系 | 2 | 0 | 0 | 2 |
| 6. ゲームプレイコマンド系 | 16 | 6 | 0 | 10 |
| 7. プレイヤーコマンド系 | 16 | 2 | 0 | 14 |
| 8. 情報取得系 | 8 | 0 | 0 | 8 |
| 9. セレクター/コンバーター系 | 2 | 0 | 0 | 2 |
| 10. 数学・座標系 | 22 | 22 | 0 | 0 |
| 11. エージェント系 | 15 | 0 | 0 | 15 |
| 12. スコアボード系 | 7 | 3 | 0 | 4 |
| 13. ビルド・言語切替 | 5 | 0 | 0 | 5 |
| **合計** | **112** | **33** | **0** | **79** |
