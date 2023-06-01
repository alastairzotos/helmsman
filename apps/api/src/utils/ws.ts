import { WebSocketServer, WebSocket } from 'ws';
import { uuid } from 'uuidv4';

interface ConnectionProps {
  id?: string;
  ws: WebSocket;
}

export class WebSocketManager<T extends Object> {
  private wss: WebSocketServer;
  private wsConnections: Record<string, ConnectionProps> = {};

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', conn => {
      const id = uuid();

      this.wsConnections[id] = {
        ws: conn
      };

      conn.on('message', (data) => {
        this.wsConnections[id].id = data.toString();
      })

      conn.on('close', () => {
        delete this.wsConnections[id];
      })
    });
  }

  sendMessage(conn: WebSocket, message: T) {
    conn.send(JSON.stringify(message));
  }

  getConnectionById(id: string) {
    return Object.entries(this.wsConnections).find(([, value]) => value.id === id)?.[1].ws;
  }
}