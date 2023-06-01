import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { IProject, deployMessage } from "models";
import { WebSocketHandler, WebSocketManager } from "utils/ws";

const { status, phase, text, progress } = deployMessage;

@Injectable()
export class DeployService {
  private wsManager = new WebSocketManager(3004);

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly gitService: GitService,
  ) { }

  async deployProject(projectId: string) {
    const ws = this.wsManager.getHandler(projectId);
    const project = await this.projectsService.getById(projectId);

    if (!project) {
      return false;
    }

    ws.sendMessage(status("started"));

    const projName = await this.pullProjectRepo(ws, project);
    await this.cleanup(ws, projName);

    ws.sendMessage(status("finished"));

    return true;
  }

  async pullProjectRepo(ws: WebSocketHandler, project: IProject) {
    ws.sendMessage(phase("pulling-project-repo"))

    let lastPhase = '';
    const projName = await this.gitService.clone(
      project.githubUrl,
      (phase, percent) => {
        if (percent !== undefined) {
          ws.sendMessage(progress(phase, percent, phase === lastPhase));
        } else {
          ws.sendMessage(text(phase, lastPhase === phase));
        }

        lastPhase = phase;
      },
    );

    return projName;
  }

  async cleanup(ws: WebSocketHandler, projName: string) {
    ws.sendMessage(phase("cleaning-up"));

    ws.sendMessage(text("Cleaning project repo"));
    await this.gitService.clearClonedDir(projName);
  }
}
