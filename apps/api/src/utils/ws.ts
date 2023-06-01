import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class WebSocketHandler {
  private connections: Record<string, WebSocket> = {};

  connect(conn: WebSocket) {
    const connId = uuidv4();
    this.connections[connId] = conn;

    return connId;
  }

  disconnect(connId: string) {
    delete this.connections[connId];

    return Object.keys(this.connections).length === 0;
  }

  sendMessage(message: Object) {
    Object.values(this.connections).forEach(conn => conn.send(JSON.stringify(message)));
  }
}

export class WebSocketManager {
  private wss: WebSocketServer;
  private wsConnections: Record<string, WebSocketHandler> = {};

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (conn, req) => {
      const handle = new URLSearchParams(req.url.substring(2)).get('handle')

      const handler = this.getHandler(handle);

      const connId = handler.connect(conn);

      conn.on('close', () => {
        if (handler.disconnect(connId)) {
          delete this.wsConnections[handle];
        }
      })
    });
  }

  getHandler(handle: string) {
    return this.wsConnections[handle] = this.wsConnections[handle] || new WebSocketHandler();
  }
}
