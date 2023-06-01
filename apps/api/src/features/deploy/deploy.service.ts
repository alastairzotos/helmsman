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
    const handler = this.wsManager.getHandler(projectId);
    const project = await this.projectsService.getById(projectId);

    if (!project) {
      return false;
    }

    handler.sendMessage(status("started"));

    const projName = await this.pullProjectRepo(handler, project);
    await this.cleanup(handler, projName);

    handler.sendMessage(status("finished"));

    return true;
  }

  async pullProjectRepo(handler: WebSocketHandler, project: IProject) {
    handler.sendMessage(phase("pulling-project-repo"))

    let lastPhase = '';
    const projName = await this.gitService.clone(
      project.githubUrl,
      (phase, percent) => {
        if (percent !== undefined) {
          handler.sendMessage(progress(phase, percent, phase === lastPhase));
        } else {
          handler.sendMessage(text(phase, lastPhase === phase));
        }

        lastPhase = phase;
      },
    );

    return projName;
  }

  async cleanup(handler: WebSocketHandler, projName: string) {
    handler.sendMessage(phase("cleaning-up"));

    handler.sendMessage(text("Cleaning project repo"));
    await this.gitService.clearClonedDir(projName);
  }
}
