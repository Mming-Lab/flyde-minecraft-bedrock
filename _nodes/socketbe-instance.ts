import { Server } from 'socket-be'

let _server: Server | null = null

// 同一プロセスで複数インスタンスが起動しないようにシングルトンで管理する
export function getServer(port: number = 8080): Server {
  if (!_server) {
    _server = new Server({ port })
    console.log(`[SocketBE] WebSocketサーバー起動: ws://localhost:${port}`)
    console.log(`[SocketBE] Minecraftで /connect localhost:${port} を実行してください`)
  }
  return _server
}
