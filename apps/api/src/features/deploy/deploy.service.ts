import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { IDeployMessageDto } from "models";
import { WebSocketManager } from "utils/ws";

@Injectable()
export class DeployService {
  private wsManager = new WebSocketManager<IDeployMessageDto>(3004);

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly gitService: GitService,
  ) { }

  async deployProject(projectId: string, connId: string) {
    const conn = this.wsManager.getConnectionById(connId);
    const project = await this.projectsService.getById(projectId);

    if (!project) {
      return null;
    }

    this.wsManager.sendMessage(conn, {
      type: "phase",
      phase: "pulling-project-repo"
    })

    const projName = await this.gitService.clone(
      project.githubUrl,
      (phase, progress) => {
        if (isNaN(progress)) {
          this.wsManager.sendMessage(conn, {
            type: 'git',
            gitMessage: {
              phase
            }
          })
        } else {
          this.wsManager.sendMessage(conn, {
            type: 'git',
            gitMessage: {
              phase,
              progress
            }
          })
        }
      }
    );

    this.wsManager.sendMessage(conn, {
      type: "phase",
      phase: "cleaning-up"
    })

    await this.gitService.clearClonedDir(projName);

    this.wsManager.sendMessage(conn, {
      type: "phase",
      phase: "finished"
    })

    return true;
  }
}
