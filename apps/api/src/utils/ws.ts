import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface IConnectionProps {
  id: string;
  conn: WebSocket;
}

export class WebSocketHandler {
  private connections: IConnectionProps[] = [];

  connect(id: string, conn: WebSocket) {
    this.connections.push({ id, conn });
  }

  disconnect(id: string) {
    this.connections = this.connections.filter(conn => conn.id !== id);

    return this.connections.length === 0;
  }

  sendMessage(message: Object) {
    this.connections.forEach(conn => conn.conn.send(JSON.stringify(message)));
  }
}

export class WebSocketManager {
  private wss: WebSocketServer;
  private wsConnections: Record<string, WebSocketHandler> = {};

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (conn, req) => {
      const params = new URLSearchParams(req.url.substring(2));
      const id = uuidv4();
      const handle = params.get('handle')

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
