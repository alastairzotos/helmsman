import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class WebSocketHandler {
  private connections: Record<string, WebSocket> = {};

  connect(id: string, conn: WebSocket) {
    this.connections[id] = conn;
  }

  disconnect(id: string) {
    delete this.connections[id];

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
      const id = uuidv4();
      const handle = new URLSearchParams(req.url.substring(2)).get('handle')

      const handler = this.getHandler(handle);

      handler.connect(id, conn);

      conn.on('close', () => {
        if (handler.disconnect(id)) {
          delete this.wsConnections[handle];
        }
      })
    });
  }

  getHandler(handle: string) {
    return this.wsConnections[handle] = this.wsConnections[handle] || new WebSocketHandler();
  }
}
