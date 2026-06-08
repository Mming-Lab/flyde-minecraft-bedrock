import { localizeNode } from './_factory'
import i18n from './_i18n/ja_JP.json'
import * as conn from './_core/connection'
import * as agents from './_core/agents'
import * as scoreboard from './_core/scoreboard'
import * as evPlayer from './_core/events/player'
import * as evBlock from './_core/events/block'
import * as evItem from './_core/events/item'
import * as evMob from './_core/events/mob'
import * as cmdGameplay from './_core/commands/gameplay'
import * as cmdPlayer from './_core/commands/player'
import * as info from './_core/utils/info'
import * as selectors from './_core/utils/selectors'
import * as converters from './_core/utils/converters'
import * as math from './_core/utils/math'

const j = i18n as Record<string, any>

// 接続系
export const Minecraft接続    = localizeNode(conn.MinecraftConnect,    j.MinecraftConnect)
export const Minecraft切断    = localizeNode(conn.MinecraftDisconnect,  j.MinecraftDisconnect)

// エージェント系
export const エージェント座標取得 = localizeNode(agents.GetAgentLocation, j.GetAgentLocation)

// スコアボード系
export const スコアボード目標一覧取得  = localizeNode(scoreboard.GetScoreboardObjectives,   j.GetScoreboardObjectives)
export const スコアボード目標取得      = localizeNode(scoreboard.GetScoreboardObjective,    j.GetScoreboardObjective)
export const スコアボード目標追加      = localizeNode(scoreboard.AddScoreboardObjective,    j.AddScoreboardObjective)
export const スコアボード目標削除      = localizeNode(scoreboard.RemoveScoreboardObjective, j.RemoveScoreboardObjective)
export const 全スコア取得             = localizeNode(scoreboard.GetScores,                 j.GetScores)
export const スコア取得               = localizeNode(scoreboard.GetScore,                  j.GetScore)
export const スコア演算               = localizeNode(scoreboard.ScoreOperation,             j.ScoreOperation)

// プレイヤーイベント系
export const チャット受信       = localizeNode(evPlayer.OnPlayerChat,       j.OnPlayerChat)
export const プレイヤー参加     = localizeNode(evPlayer.OnPlayerJoin,       j.OnPlayerJoin)
export const プレイヤー退出     = localizeNode(evPlayer.OnPlayerLeave,      j.OnPlayerLeave)
export const プレイヤーが移動   = localizeNode(evPlayer.OnPlayerTravelled,  j.OnPlayerTravelled)
export const テレポート完了     = localizeNode(evPlayer.OnPlayerTeleported, j.OnPlayerTeleported)
export const プレイヤータイトル = localizeNode(evPlayer.OnPlayerTitle,      j.OnPlayerTitle)
export const プレイヤーメッセージ = localizeNode(evPlayer.OnPlayerMessage,  j.OnPlayerMessage)
export const バウンス           = localizeNode(evPlayer.OnPlayerBounced,    j.OnPlayerBounced)

// ブロックイベント系
export const ブロック破壊         = localizeNode(evBlock.OnBlockBroken, j.OnBlockBroken)
export const ブロック設置イベント  = localizeNode(evBlock.OnBlockPlaced, j.OnBlockPlaced)

// アイテムイベント系
export const アイテムを使った  = localizeNode(evItem.OnItemInteracted, j.OnItemInteracted)
export const アイテム取得      = localizeNode(evItem.OnItemAcquired,   j.OnItemAcquired)
export const アイテムをクラフト = localizeNode(evItem.OnItemCrafted,   j.OnItemCrafted)
export const アイテムを装備    = localizeNode(evItem.OnItemEquipped,   j.OnItemEquipped)
export const アイテムを精錬    = localizeNode(evItem.OnItemSmelted,    j.OnItemSmelted)
export const アイテムを取引    = localizeNode(evItem.OnItemTraded,     j.OnItemTraded)

// モブイベント系
export const モブと交流   = localizeNode(evMob.OnMobInteracted,  j.OnMobInteracted)
export const 的ブロック命中 = localizeNode(evMob.OnTargetBlockHit, j.OnTargetBlockHit)

// ゲームプレイ系
export const コマンド実行      = localizeNode(cmdGameplay.RunCommand,       j.RunCommand)
export const ゲーム内時刻取得  = localizeNode(cmdGameplay.GetGameTime,      j.GetGameTime)
export const 昼夜判定          = localizeNode(cmdGameplay.IsDaytime,        j.IsDaytime)
export const 天気を取得        = localizeNode(cmdGameplay.GetWeather,        j.GetWeather)
export const エリアを塗りつぶす = localizeNode(cmdGameplay.FillBlocks,      j.FillBlocks)
export const 地面の高さを取得  = localizeNode(cmdGameplay.GetTopSolidBlock, j.GetTopSolidBlock)
export const ワールドクエリ    = localizeNode(cmdGameplay.WorldQuery,        j.WorldQuery)

// プレイヤー操作系
export const プレイヤー座標取得      = localizeNode(cmdPlayer.GetPlayerLocation,    j.GetPlayerLocation)
export const プレイヤー向き取得      = localizeNode(cmdPlayer.GetPlayerOrientation, j.GetPlayerOrientation)
export const プレイヤータグ一覧取得  = localizeNode(cmdPlayer.GetPlayerTags,        j.GetPlayerTags)
export const プレイヤータグ判定      = localizeNode(cmdPlayer.PlayerHasTag,         j.PlayerHasTag)
export const プレイヤーレベル取得    = localizeNode(cmdPlayer.GetPlayerLevel,        j.GetPlayerLevel)
export const ゲームモード取得        = localizeNode(cmdPlayer.GetGameMode,           j.GetGameMode)
export const プレイヤーアビリティ取得 = localizeNode(cmdPlayer.GetPlayerAbilities,  j.GetPlayerAbilities)
export const プレイヤー一覧取得      = localizeNode(cmdPlayer.GetPlayers,            j.GetPlayers)
export const ローカルプレイヤー取得  = localizeNode(cmdPlayer.GetLocalPlayer,        j.GetLocalPlayer)

// 情報取得系
export const エンティティ情報取得         = localizeNode(info.GetFromEntity,              j.GetFromEntity)
export const プレイヤー情報取得           = localizeNode(info.GetFromPlayerSnapshot,       j.GetFromPlayerSnapshot)
export const アイテム種別情報取得         = localizeNode(info.GetFromItemType,             j.GetFromItemType)
export const 所持アイテム情報取得         = localizeNode(info.GetFromItemStack,            j.GetFromItemStack)
export const ブロック情報取得             = localizeNode(info.GetFromBlockType,            j.GetFromBlockType)
export const スコアボード目標情報取得      = localizeNode(info.GetFromScoreboardObjective, j.GetFromScoreboardObjective)
export const モブ情報取得                = localizeNode(info.GetFromMob,                  j.GetFromMob)
export const 村人情報取得                = localizeNode(info.GetFromVillager,              j.GetFromVillager)

// 選択・変換系
export const 選択       = localizeNode(selectors.Selector,      j.Selector)
export const 日本語変換 = localizeNode(converters.LocaleName,   j.ToJa)

// 座標・数値演算系
export const 座標演算          = localizeNode(math.Vector3Op,       j.Vector3Op)
export const 座標間の距離      = localizeNode(math.Vector3Distance,  j.Vector3Distance)
export const 座標を文字列に変換 = localizeNode(math.Vector3ToString,  j.Vector3ToString)
export const 座標を分解        = localizeNode(math.Vector3Split,      j.Vector3Split)
export const 数値を範囲に収める = localizeNode(math.ClampNumber,      j.ClampNumber)
export const エリアを作る      = localizeNode(math.AABBCreate,        j.AABBCreate)
export const エリア内判定      = localizeNode(math.AABBIsInside,      j.AABBIsInside)
