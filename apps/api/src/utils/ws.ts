import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export class WebSocketChannel {
  private connections: Record<string, WebSocket> = {};

  addConnection(conn: WebSocket) {
    const connId = uuidv4();
    this.connections[connId] = conn;

    return connId;
  }

  removeConnection(connId: string) {
    delete this.connections[connId];

    return Object.keys(this.connections).length === 0;
  }

  sendMessage(message: Object) {
    Object.values(this.connections).forEach(conn => conn.send(JSON.stringify(message)));
  }
}

export class WebSocketManager {
  private channels: Record<string, WebSocketChannel> = {};

  constructor(port: number) {
    const wss = new WebSocketServer({ port });

    wss.on('connection', (conn, req) => {
      const handle = new URLSearchParams(req.url.substring(2)).get('handle')

      const channel = this.getChannel(handle);

      const connId = channel.addConnection(conn);

      conn.on('close', () => {
        if (channel.removeConnection(connId)) {
          delete this.channels[handle];
        }
      })
    });
  }

  getChannel(handle: string) {
    return this.channels[handle] = this.channels[handle] || new WebSocketChannel();
  }
}
