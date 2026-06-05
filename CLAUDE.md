# CLAUDE.md

## プロジェクト概要

Minecraft Education Edition をビジュアルフロープログラミングで操作する教室用ツール。  
子どもたちが Flyde のノードをワイヤーで繋ぐだけで Minecraft と連携できる。

| パッケージ | 役割 |
|---|---|
| `socket-be` | Minecraft WebSocket 通信 |
| `@minecraft/vanilla-data` | ブロック・エンティティ名の enum |
| `@flyde/core` | Flyde の CodeNode 型定義・ランタイム |

## ディレクトリ構成

```
mc-flow-template/
├── CLAUDE.md
├── package.json
├── tsconfig.json          ← "types": ["node"] が必須（process/console の型解決）
├── _nodes/                ← ノードの実装（生徒は触らない）
│   ├── index.ts           ← Node.js 実行用エントリ
│   ├── index.flyde.ts     ← Flyde エディタ用エントリ（index.ts と同内容）
│   ├── context-manager.ts ← McContext シングルトン（内部用）
│   ├── socketbe-instance.ts ← SocketBE シングルトン（内部用）
│   ├── enum-utils.ts      ← イベント数値→文字列変換ユーティリティ（内部用）
│   ├── connection.ts      ← 接続系
│   ├── agents.ts          ← エージェント系
│   ├── scoreboard.ts      ← スコアボード系
│   ├── utils/             ← ユーティリティ系（データ操作・変換・選択・数学）
│   │   ├── _catalog.ts    ← ブロック/アイテム/モブ/イベントのカタログデータ（内部用）
│   │   ├── info.ts        ← スナップショット情報取得系
│   │   ├── selectors.ts   ← ID・イベント値選択系
│   │   ├── converters.ts  ← 日本語変換系
│   │   ├── math.ts        ← 座標・ベクトル演算系
│   │   └── index.ts
│   ├── events/            ← イベント系（Minecraft → フロー）
│   │   ├── player.ts
│   │   ├── block.ts
│   │   ├── item.ts
│   │   └── mob.ts
│   └── commands/          ← コマンド・クエリ系（フロー → Minecraft）
│       ├── gameplay.ts    ← コマンド実行・時刻・天気・エリア塗りつぶし等
│       └── player.ts      ← 座標・タグ・レベル・ゲームモード等
└── flows/                 ← 生徒が .flyde ファイルを作る場所
    ├── sample.flyde
    ├── sample2.flyde
    └── sample3.flyde
```

**重要：`flows/` は生徒の作業領域。明示的に依頼されない限り Claude Code が変更しないこと。**

---

## 開発コマンド・動作確認

```bash
npm install        # 依存パッケージのインストール
npm run typecheck  # TypeScript 型チェック（tsc --noEmit）
```

ユニットテストなし。動作確認は Minecraft 実機で行う：

1. VSCode で .flyde ファイルを開いて Flyde エディタを起動
2. フローを実行（SocketBE が localhost:8080 で起動、コンソールに接続コマンドが表示される）
3. Minecraft で `/connect localhost:8080`
4. フローの動作を確認

---

## アーキテクチャ：暗黙コンテキスト方式

シンプルな「暗黙コンテキスト＋例外スロー」方式を採用する。

### McContext シングルトン

```typescript
// context-manager.ts（内部用、外部公開しない）
setCurrentContext(world, player)  // イベントノードが呼ぶ
getCurrentContext()               // コマンドノードが呼ぶ（未接続なら例外をスロー）
```

- **イベントノード**：ハンドラ内で `setCurrentContext(world, ev.player)` を呼んでからデータを流す
- **コマンドノード**：`getCurrentContext()` で world/player を取得して使う
- 教室用途（1人ずつ使用）を前提。同時複数接続は考慮しない

### SocketBE シングルトン

```typescript
import { getServer, getCurrentWorld } from './socketbe-instance'
const server = getServer(8080)   // 接続系ノードのみ使用。直接 new Server() しない
const world = getCurrentWorld()  // イベントノードが world.server.on() 登録時に使用
```

同一プロセスで複数インスタンスが起動するのを防ぐため、必ずこれらの関数経由で取得する。

### エラーハンドリング

- 接続前にコマンドを実行 → `getCurrentContext()` が例外をスロー
- Minecraft コマンドの失敗 → socket-be が例外をスロー
- 例外は Flyde ランタイムにそのまま伝播させる（握り潰さない）

---

## ノードの実装規則

### 基本パターン（CodeNode）

```typescript
import { CodeNode } from '@flyde/core'
import { getCurrentContext } from './context-manager'

export const ノード名: CodeNode = {
  id: 'EnglishId',
  displayName: '日本語の表示名',
  menuDisplayName: 'ﾒﾆｭｰ表示名',
  icon: 'play',
  defaultStyle: { color: '#色コード' },
  inputs: {
    トリガー: { description: 'トリガー（任意）' },
    値: { description: '説明' },
  },
  outputs: {
    完了: {},
  },
  run: async ({ 値 }, { 完了 }) => {
    const { world } = getCurrentContext()
    await world.runCommand(`コマンド ${値}`)
    完了.next(true)
  },
}
```

### ノード種別ごとの規則

| 種別 | 出力 | コンテキスト |
|---|---|---|
| コマンド系 | `完了`（true） | `getCurrentContext()` で取得 |
| クエリ系 | データ値（座標・数値・真偽値など） | `getCurrentContext()` で取得 |
| イベント系 | データ値（名前・種別など）、`completionOutputs: []` | ハンドラ内で `setCurrentContext()` を呼ぶ |
| ユーティリティ系 | 変換・選択結果 | コンテキスト不要（純粋関数） |
| 接続系 | `ワールド`（socket-be World オブジェクト） | シングルトン経由でサーバー起動 |

### イベントノードのパターン

```typescript
import { ServerEvent } from 'socket-be'
import { setCurrentContext } from '../context-manager'
import { getCurrentWorld } from '../socketbe-instance'

run: ({ ワールド }, { 出力ポート }, adv) => {
  const world = getCurrentWorld()!
  const handler = (ev: any) => {
    setCurrentContext(world, ev.player)
    出力ポート.next(ev.someData)
  }
  world.server.on(ServerEvent.XxxEvent, handler)
  adv.onCleanup(() => world.server.remove(ServerEvent.XxxEvent, handler))
},
```

### スナップショット出力のパターン

イベントノードは個別フィールドに加え、オブジェクト全体を `O_ﾌﾟﾚｲﾔｰ` / `O_ｱｲﾃﾑ` / `O_ﾌﾞﾛｯｸ` ポートで出力する。  
ユーザーはそれを `utils/info.ts` の情報取得ノード（プルダウン選択）に繋いで任意のフィールドを取り出す。

```typescript
O_ﾌﾟﾚｲﾔｰ.next(ev.rawPlayer)       // WorldPlayer スナップショット全体
O_ﾌﾞﾛｯｸ.next(ev.brokenBlockType)  // BlockType スナップショット全体
```

### アイコンとスタイル色

```typescript
// icon フィールドに FontAwesome 6 Free のアイコン名を指定
icon: 'bolt'             // イベント系
icon: 'play'             // コマンド実行
icon: 'magnifying-glass' // クエリ系
icon: 'shuffle'          // 情報取得系
icon: 'language'         // 変換系
icon: 'cube'             // ブロック選択系
icon: 'list-check'       // イベント値選択系
icon: 'robot'            // エージェント系
icon: 'list-ol'          // スコアボード系
icon: 'calculator'       // 数学・座標系
icon: 'plug'             // 接続系
```

| 種別 | 色 |
|---|---|
| イベント系 | `#25567D` |
| コマンド・ゲームプレイ系・スコアボード系 | `#8F6D40` |
| プレイヤー操作系 | `#0078D7` |
| エージェント系 | `#D83B01` |
| ユーティリティ系（info / selectors / converters） | `#767676` |
| 座標・数学系 | `#107C10` |
| 接続系 | `#5C5C5C` |

### ノード追加時の手順

1. 追加先ファイルを選ぶ
   - スナップショット情報取得 → `utils/info.ts`
   - ID・イベント値選択 → `utils/selectors.ts`
   - 日本語変換 → `utils/converters.ts`
   - 座標・数値演算 → `utils/math.ts`
   - プレイヤーイベント → `events/player.ts`、ブロック/アイテム/モブ → 対応する `events/*.ts`
   - ゲームプレイ系コマンド/クエリ → `commands/gameplay.ts`
   - プレイヤー操作コマンド/クエリ → `commands/player.ts`
   - エージェント操作 → `agents.ts`
   - スコアボード → `scoreboard.ts`
2. `utils/` 配下のノードは `utils/index.ts` が `export *` で自動再エクスポートするため、`_nodes/index.ts` / `index.flyde.ts` の変更は不要
3. `utils/` 以外の新ファイルを追加した場合は `_nodes/index.ts` と `index.flyde.ts` 両方に export を追加する
4. `03_Flydeノード設計.md` のノード一覧テーブルを更新

---

## .flyde ファイル形式

`flows/*.flyde` は YAML 形式。**Flyde エディタが自動生成する**が、手動編集や AI による生成も可能。

### インスタンスの構造

```yaml
instances:
  - id: my-node          # フロー内でユニークな ID（任意の文字列）
    type: code
    nodeId: RunCommand   # CodeNode の id フィールドと一致させる
    source:
      type: file
      data: "../_nodes/index.flyde.ts"   # .flyde ファイルからの相対パス
    config:              # 各入力ポートの値を ConfigurableValue 形式で設定
      コマンド:
        type: string
        value: "time set day"
      トリガー:
        type: dynamic    # ワイヤー接続を受け取るピンになる
    inputConfig: {}      # キュー/スティッキー制御（通常 {} で OK）
    pos:
      x: 300
      y: 200
```

### ConfigurableValue（config フィールドの値）

| type | 用途 | value の型 |
|---|---|---|
| `dynamic` | ワイヤーで受け取る（ピンを生成） | 不要（省略可） |
| `string` | 文字列 IIP | `"文字列"` |
| `number` | 数値 IIP | `123` |
| `boolean` | 真偽値 IIP | `true` / `false` |
| `select` | 選択肢 IIP（`editorType: 'select'` のポート） | `"選択値"` |
| `json` | オブジェクト/配列 IIP | YAML マッピング/シーケンス |

`config` に指定しないポートは自動的に `dynamic` 扱いになる（ピンが生成される）。  
`type: boolean/number/select/json` を指定したポートはピンが生成されず、値が焼き込まれる（ワイヤー不要）。

### 文字列テンプレートで座標を展開する

`type: string` の value に `{{ポート名.フィールド}}` を書くと、そのポート名のピンが生成される。

```yaml
コマンド:
  type: string
  value: "summon chicken {{座標.x}} {{座標.y}} {{座標.z}}"
```

接続で `vec-add.結果 → summon.座標` のようにオブジェクト `{x, y, z}` を流すと、  
実行時に `"summon chicken 10 74 20"` のように展開される。

### 接続の構造

```yaml
connections:
  - from:
      insId: source-node-id
      pinId: 出力ポート名
    to:
      insId: target-node-id
      pinId: 入力ポート名     # dynamic なポートのみ接続できる
```

接続できるのは `type: dynamic`（または config 未設定）なポートのみ。  
IIP（boolean/number/string/json/select）で焼き込んだポートはワイヤー接続不可。

---

## 設計書の場所

```
\\as6702t-7258\Public\01_mming\14_研究開発\技術資料\Flyde-Minecraft-WS\
├── 01_技術選定経緯.md
├── 02_システムアーキテクチャ.md
├── 03_Flydeノード設計.md   ← ノード一覧はここ
└── 04_統合設計.md          ← 実装パターンはここ
```

ノードを追加・変更したときは設計書も更新する（doc-updater エージェントを使う）。
