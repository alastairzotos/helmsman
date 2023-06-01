import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { WebSocketServer, WebSocket } from 'ws';
import { uuid } from 'uuidv4';
import { IDeployMessageDto } from "models";

interface ConnectionProps {
  id?: string;
  ws: WebSocket;
}

@Injectable()
export class DeployService {
  private wss: WebSocketServer;
  private wsConnections: Record<string, ConnectionProps> = {};

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly gitService: GitService,
  ) {
    this.wss = new WebSocketServer({ port: 3004 });

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

  async deployProject(projectId: string, connId: string) {
    const conn = this.getConnectionById(connId);
    const project = await this.projectsService.getById(projectId);

    if (!project) {
      return null;
    }

    this.sendMessage(conn, {
      type: "phase",
      phase: "pulling-project-repo"
    })

    const projName = await this.gitService.clone(
      project.githubUrl,
      (phase, progress) => {
        if (isNaN(progress)) {
          this.sendMessage(conn, {
            type: 'git',
            gitMessage: {
              phase
            }
          })
        } else {
          this.sendMessage(conn, {
            type: 'git',
            gitMessage: {
              phase,
              progress
            }
          })
        }
      }
    );

    this.sendMessage(conn, {
      type: "phase",
      phase: "cleaning-up"
    })

    await this.gitService.clearClonedDir(projName);

    this.sendMessage(conn, {
      type: "phase",
      phase: "finished"
    })

    return true;
  }

  private sendMessage(conn: WebSocket, message: IDeployMessageDto) {
    conn.send(JSON.stringify(message));
  }

  private getConnectionById(id: string) {
    return Object.entries(this.wsConnections).find(([, value]) => value.id === id)?.[1].ws;
  }
}
