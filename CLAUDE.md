# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 配置場所
このファイルは `mc-flow-template/CLAUDE.md` に置く。

---

## プロジェクト概要

Minecraft Education Edition と micro:bit をビジュアルフロープログラミングで操作する教室用ツール。  
子どもたちが Flyde のノードをワイヤーで繋ぐだけで Minecraft と連携できる。

## ディレクトリ構成

```
mc-flow-template/
├── CLAUDE.md              ← このファイル
├── package.json
├── tsconfig.json
├── .claude/
│   └── agents/
│       ├── node-implementer.md  ← ノード実装エージェント
│       └── doc-updater.md       ← 設計書更新エージェント
├── .vscode/
│   └── settings.json      ← _nodes/ を VSCode エクスプローラーから非表示にする
├── _nodes/                ← ノードの実装（生徒は触らない）
│   ├── index.ts           ← Node.js 実行用（microbit / http 含む）
│   ├── index.flyde.ts     ← Flyde エディタ用（math 含む）
│   ├── context-manager.ts ← McContext シングルトン（内部用）
│   ├── connection.ts      ← 接続系（MC接続・切断）
│   ├── events.ts          ← イベント系（Minecraft → フロー）
│   ├── commands.ts        ← コマンド系（フロー → Minecraft）
│   ├── agent.ts           ← エージェント系
│   ├── math.ts            ← 座標・ベクトル演算ノード
│   ├── transforms.ts      ← 変換・条件分岐ノード
│   ├── microbit.ts        ← micro:bit シリアル通信（未実装）
│   ├── http.ts            ← REST API 連携（未実装）
│   ├── socketbe-instance.ts ← SocketBE シングルトン
│   └── types/
│       └── common.ts      ← 共通型定義（MicroBitHandle）
└── flows/                 ← 生徒が .flyde ファイルを作る場所
    ├── sample.flyde       ← サンプル（昼夜切り替え）
    └── sample2.flyde      ← サンプル（座標取得・エンティティ召喚）
```

**重要：`flows/` は生徒の作業領域。明示的に依頼されない限り Claude Code が変更しないこと。**

---

## コマンド

```bash
npm install        # 依存パッケージのインストール
npm run typecheck  # TypeScript 型チェック（tsc --noEmit）
```

ユニットテストなし。動作確認は Minecraft 実機で行う（後述）。

---

## アーキテクチャ：暗黙コンテキスト方式

ROP（Railway Oriented Programming）と `Result<Ok, Err>` 型は**廃止**。  
シンプルな「暗黙コンテキスト＋例外スロー」方式を採用する。

### McContext シングルトン

```typescript
// context-manager.ts（内部用、外部公開しない）
setCurrentContext(world, player)  // イベントノードが呼ぶ
getCurrentContext()               // コマンドノードが呼ぶ
                                  // 未接続なら例外をスロー
```

- **イベントノード**：ハンドラ内で `setCurrentContext(world, ev.player)` を呼んでからデータを流す
- **コマンドノード**：`getCurrentContext()` で world/player を取得して使う
- 教室用途（1人ずつ使用）を前提。同時複数接続は考慮しない

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
| 変換系 | 変換結果 | コンテキスト不要（純粋関数） |
| 接続系 | `ワールド`（socket-be World オブジェクト） | シングルトン経由でサーバー起動 |

### Result 型について

**Result 型（`Ok`/`Err`）は使わない。** エラーは例外として伝播させる。

### イベントノードのパターン

```typescript
import { ServerEvent, type World } from 'socket-be'
import { setCurrentContext } from './context-manager'

run: ({ ワールド }, { 出力ポート }, adv) => {
  const world = ワールド as World
  const handler = (ev: any) => {
    setCurrentContext(world, ev.player)
    出力ポート.next(ev.someData)
  }
  world.server.on(ServerEvent.XxxEvent, handler)
  adv.onCleanup(() => world.server.remove(ServerEvent.XxxEvent, handler))
},
```

### スタイル色の定義

| 種別 | 色 |
|---|---|
| イベント系 | `#25567D` |
| コマンド・ゲームプレイ系 | `#8F6D40` |
| プレイヤー操作系 | `#0078D7` |
| エージェント系 | `#D83B01` |
| 変換・ユーティリティ系 | `#767676` |

### ノード追加時の手順

1. 対応する `.ts` ファイルに `CodeNode` を追加
2. `_nodes/index.ts` に export を追加（必要なら）
3. `_nodes/index.flyde.ts` に export を追加（Flyde で使うノード）
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
# config.コマンド に書くと「座標」という入力ピンが自動生成される
コマンド:
  type: string
  value: "summon chicken {{座標.x}} {{座標.y}} {{座標.z}}"
```

接続で `repeat.値 → summon.座標` のようにオブジェクト `{x, y, z}` を流すと、
実行時に `"summon chicken 10 74 20"` のように展開される。

### 接続の構造

```yaml
connections:
  - from:
      insId: source-node-id   # インスタンス ID
      pinId: 出力ポート名
    to:
      insId: target-node-id
      pinId: 入力ポート名     # dynamic なポートのみ接続できる
```

接続できるのは `type: dynamic`（または config 未設定）なポートのみ。  
IIP（boolean/number/string/json/select）で焼き込んだポートはワイヤー接続不可。

---

## 主要パッケージと役割

| パッケージ | 役割 |
|---|---|
| `socket-be` | Minecraft WebSocket 通信 |
| `@minecraft/vanilla-data` | ブロック・エンティティ名の enum |
| `@flyde/core` | Flyde の CodeNode 型定義・ランタイム |
| `serialport` | micro:bit USB シリアル通信（未実装） |
| `@serialport/parser-readline` | シリアルの行単位パーサー（未実装） |
| `express` | REST API（未実装） |

---

## SocketBE シングルトン

```typescript
// 必ずこの関数経由でインスタンスを取得する
import { getServer } from './socketbe-instance'
const server = getServer(8080)
```

直接 `new Server()` しない。同一プロセスで複数インスタンスが起動するのを防ぐため。

---

## テスト方針

**ユニットテストなし。手動テストのみ。**

動作確認手順：
1. `npm install`
2. VSCode で .flyde ファイルを開いて Flyde エディタを起動
3. フローを実行（SocketBE が localhost:8080 で起動）
4. Minecraft で `/connect localhost:8080`
5. フローの動作を確認

---

## 設計書の場所

```
\\as6702t-7258\Public\01_mming\11_議事録\80_情報\技術資料\Flyde-Minecraft-WS\
├── 01_技術選定経緯.md
├── 02_システムアーキテクチャ.md
├── 03_Flydeノード設計.md   ← ノード一覧はここ
└── 04_統合設計.md          ← 実装パターンはここ
```

ノードを追加・変更したときは設計書も更新する（doc-updater エージェントを使う）。
