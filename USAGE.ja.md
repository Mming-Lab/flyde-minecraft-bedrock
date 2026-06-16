[🇺🇸 English](USAGE.md) | 🇯🇵 日本語

# 使い方

## 1. 準備するもの

- [VSCode](https://code.visualstudio.com/)
- VSCode拡張機能「[Flyde](https://marketplace.visualstudio.com/items?itemName=flyde.flyde-vscode)」
- Node.js（npm が使えること）
- Minecraft Education Edition または Bedrock Edition（WebSocket 接続が有効なもの）

## 2. プロジェクトの準備（zipインストール）

zipファイルでの配布のみです（npmでは公開していません）。これは意図的なものです：Flyde VSCode拡張（v1.0.45時点）は、開いているワークスペース内のファイルを直接スキャンして検出したノードしかメニューに表示しません。npm依存パッケージとして`node_modules`配下に置かれたノードは、拡張側の制限により表示されません。そのため、**展開したフォルダ自体をVSCodeのワークスペースルートとして開く**必要があります（別のプロジェクトフォルダの中に入れ子にしないこと）。

1. zip をダウンロードして展開すると `flyde-minecraft-bedrock` フォルダが手に入ります
2. そのフォルダ内でターミナルを開き、依存パッケージをインストール

```bash
cd flyde-minecraft-bedrock
npm install
```

3. `flyde-minecraft-bedrock` フォルダ自体をVSCodeで開く（フォルダを開く）

この手順はフル版（購入後）でも同じです。

## 3. フローファイルを作る

`flyde-minecraft-bedrock` フォルダ内のどこか（例：`flows/`）に `.flyde` ファイルを新規作成すると、Flyde エディタが起動します。

`build/index.flyde.js` のノードが自動でノードメニューに表示されるので、ドラッグ＆ドロップでフローを組み立てます。

最小構成の例：

```
MinecraftConnect（ポート: 8080）
   └─ done → OnPlayerChat（player接続後に有効）
              └─ message → RunCommand（command: "say Hello!"）
```

## 4. 実行と接続

1. Flyde エディタでフローを実行（▶ボタン）
2. コンソールに接続用コマンドが表示されます（例：`/connect localhost:8080`）
3. Minecraft 内のチャット欄でそのコマンドを実行
4. 接続が完了すると、フローが Minecraft 内のイベントに反応し始めます

## 5. よくあるノードの組み合わせ

| やりたいこと | 使うノード |
|---|---|
| プレイヤーが発言したらコマンドを実行する | `OnPlayerChat` → `RunCommand` |
| プレイヤーの座標を取得する | `GetPlayerLocation` |
| 指定範囲をブロックで塗りつぶす | `FillBlocks` |
| 座標同士の距離や四則演算をする | `Vector3Op` / `Vector3Distance` |
| イベントで受け取ったスナップショットから値を取り出す | `GetFromEntity` / `GetFromPlayerSnapshot` など |

各ノードの入出力ポートの説明は、Flyde エディタ上でノードを選択すると確認できます。

## トラブルシューティング

- **ノードメニューに表示されない**：`flyde-minecraft-bedrock` フォルダ自体をVSCodeのワークスペースルートとして開いているか（それを含む親フォルダを開いていないか）、フォルダ内で `npm install` を実行済みか、`flyde-minecraft-bedrock/build/` にビルド済みJSが存在するかを確認してください。
- **接続できない**：Minecraft 側でチート（コマンド）が有効になっているか、ポート番号が一致しているか確認してください。
- **フローが反応しない**：イベント系ノード（`On~`）は接続後に発生したイベントにのみ反応します。フロー実行 → Minecraft 接続の順序を確認してください。

## ライセンスについて

このパッケージは [PolyForm Noncommercial License 1.0.0](LICENSE.md) のもとで提供されています。非商用目的（個人の学習・趣味など）であれば無料で利用できます。プログラミング教室など営利目的の教育事業での利用は商用利用に該当するため、フル機能版（有料）をご利用ください。

商用利用やエージェント操作・スコアボードなどを含むフル機能版は、~~[Gumroad](#)~~ / ~~[BOOTH](#)~~（準備中）にて販売予定です。
