🇺🇸 English | [🇯🇵 日本語](USAGE.ja.md)

# Usage

## 1. Requirements

- [VSCode](https://code.visualstudio.com/)
- VSCode extension "[Flyde](https://marketplace.visualstudio.com/items?itemName=flyde.flyde-vscode)"
- Node.js (with npm available)
- Minecraft Education Edition or Bedrock Edition (with WebSocket connections enabled)

## 2. Project setup (zip installation)

Distributed as a zip file only — not via npm. This is intentional: the Flyde VSCode extension (as of v1.0.45) only shows nodes in the node menu when they're detected by scanning files directly inside the open workspace. Nodes installed as an npm dependency (i.e. living under `node_modules/`) are never shown, due to a limitation in the extension itself. So **open the extracted folder itself as your VSCode workspace root** — don't nest it inside another project folder.

1. Download and extract the zip — this gives you a `flyde-minecraft-bedrock` folder
2. Open a terminal inside that folder and install its dependencies

```bash
cd flyde-minecraft-bedrock
npm install
```

3. Open the `flyde-minecraft-bedrock` folder itself in VSCode (File > Open Folder)

This is the same procedure for the Full Edition (after purchase).

## 3. Create a flow file

Creating a new `.flyde` file anywhere inside the `flyde-minecraft-bedrock` folder (e.g. in `flows/`) launches the Flyde editor.

Nodes from `build/index.flyde.js` automatically appear in the node menu, so you can build flows by dragging and dropping them.

Minimal example:

```
MinecraftConnect (port: 8080)
   └─ done → OnPlayerChat (active once a player is connected)
              └─ message → RunCommand (command: "say Hello!")
```

## 4. Run and connect

1. Run the flow in the Flyde editor (▶ button)
2. A connection command appears in the console (e.g. `/connect localhost:8080`)
3. Run that command in the Minecraft chat box
4. Once connected, the flow starts reacting to events in Minecraft

## 5. Common node combinations

| What you want to do | Nodes to use |
|---|---|
| Run a command when a player chats | `OnPlayerChat` → `RunCommand` |
| Get a player's position | `GetPlayerLocation` |
| Fill an area with a block | `FillBlocks` |
| Calculate distance or arithmetic between coordinates | `Vector3Op` / `Vector3Distance` |
| Extract a value from a snapshot received via an event | `GetFromEntity` / `GetFromPlayerSnapshot`, etc. |

You can check each node's input/output ports by selecting it in the Flyde editor.

## Troubleshooting

- **Node doesn't appear in the menu**: Make sure you opened the `flyde-minecraft-bedrock` folder itself as the VSCode workspace root (not a parent folder containing it), that you ran `npm install` inside it, and that `flyde-minecraft-bedrock/build/` contains the built JS file.
- **Can't connect**: Check that cheats (commands) are enabled in Minecraft and that the port number matches.
- **Flow doesn't react**: Event nodes (`On~`) only react to events that occur after connecting. Make sure you ran the flow before connecting to Minecraft.

## About the license

This package is provided under the [PolyForm Noncommercial License 1.0.0](LICENSE.md). It's free to use for non-commercial purposes (personal learning, hobby use, etc.). Use in for-profit educational businesses, such as programming schools, counts as commercial use, so please use the Full Edition (paid) for that.

The Full Edition, which includes commercial use rights and features like agent control and scoreboard, will be sold via ~~[Gumroad](#)~~ / ~~[BOOTH](#)~~ (coming soon).
