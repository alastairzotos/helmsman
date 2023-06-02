import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { HelmService } from "integrations/helm/helm.service";
import { IProject, deployMessage } from "models";
import { WebSocketHandler, WebSocketManager } from "utils/ws";

const { status, phase, text, progress } = deployMessage;

@Injectable()
export class DeployService {
  private wsManager = new WebSocketManager(3004);

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly gitService: GitService,
    private readonly helmService: HelmService,
  ) { }

  async deployProject(projectId: string) {
    const ws = this.wsManager.getHandler(projectId);
    const project = await this.projectsService.getById(projectId);

    if (!project) {
      return false;
    }

    ws.sendMessage(status("started"));

    let helmRepo: string;

    try {
      const tag = await this.getTag(ws, project);
      helmRepo = await this.pullHelmRepo(ws, project);

      await this.deploy(ws, project, helmRepo, tag);
    } catch {

      await this.cleanup(ws, helmRepo);
    }

    ws.sendMessage(status("finished"));

    return true;
  }

  async deploy(ws: WebSocketHandler, project: IProject, helmRepo: string, tag: string) {
    ws.sendMessage(phase("deploying"))
    await this.helmService.deploy(project, helmRepo, tag, message => ws.sendMessage(text(message)));
  }

  async getTag(ws: WebSocketHandler, project: IProject) {
    ws.sendMessage(phase("getting-tag"));

    const gitInfo = await this.gitService.getRemoteInfo(project.repoUrl);
    const tags = Object.keys(gitInfo.refs.tags);
    const latestTag = tags[tags.length - 1];

    ws.sendMessage(text(`Aquired tag ${latestTag}`));

    return latestTag;
  }

  async pullHelmRepo(ws: WebSocketHandler, project: IProject) {
    ws.sendMessage(phase("pulling-helm-repo"))

    let lastPhase = '';
    const projName = await this.gitService.clone(
      project.helmRepoUrl,
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

  async cleanup(ws: WebSocketHandler, helmRepo: string) {
    ws.sendMessage(phase("cleaning-up"));

    ws.sendMessage(text("Removing helm repository"));
    await this.gitService.clearClonedDir(helmRepo);
  }
}
