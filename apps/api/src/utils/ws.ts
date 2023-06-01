import { WebSocketServer, WebSocket } from 'ws';

export class WebSocketManager<T extends Object> {
  private wss: WebSocketServer;
  private wsConnections: Record<string, WebSocket> = {};

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (conn, req) => {
      const params = new URLSearchParams(req.url.substring(2));
      const id = params.get('id')

      this.wsConnections[id] = conn;

      conn.on('close', () => {
        delete this.wsConnections[id];
      })
    });
  }

  sendMessage(conn: WebSocket, message: T) {
    conn.send(JSON.stringify(message));
  }

  getConnectionById(id: string) {
    return this.wsConnections[id];
  }
}