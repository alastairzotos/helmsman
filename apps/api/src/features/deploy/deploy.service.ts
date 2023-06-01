import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { IDeployMessageDto, deployMessage } from "models";
import { WebSocketManager } from "utils/ws";

const { phase, git } = deployMessage;

@Injectable()
export class DeployService {
  private wsManager = new WebSocketManager<IDeployMessageDto>(3004);

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
    
    handler.sendMessage(phase("pulling-project-repo"))

    const projName = await this.gitService.clone(
      project.githubUrl,
      (phase, progress) => {
        handler.sendMessage(git(phase, isNaN(progress) ? undefined : progress));
      }
    );

    handler.sendMessage(phase("cleaning-up"));

    await this.gitService.clearClonedDir(projName);

    handler.sendMessage(phase("finished"));

    return true;
  }
}
