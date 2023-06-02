import { Injectable } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { GitService } from "integrations/git/git.service";
import { IProject, deployMessage } from "models";
import { WebSocketHandler, WebSocketManager } from "utils/ws";
import * as path from 'path';
import * as cp from 'child_process';

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

    const tag = await this.getTag(ws, project);
    const helmRepo = await this.pullHelmRepo(ws, project);

    await this.deploy(ws, project, helmRepo, tag);

    await this.cleanup(ws, helmRepo);

    ws.sendMessage(status("finished"));

    return true;
  }

  async deploy(ws: WebSocketHandler, project: IProject, helmRepo: string, tag: string) {
    return new Promise<void>((resolve) => {
      ws.sendMessage(phase("deploying"))
      const cmd = this.generateHelmCommand(project, helmRepo, tag);

      const proc = cp.spawn(cmd[0], cmd[1]);

      proc.stdout.on('data', data => ws.sendMessage(text(data.toString())));
      proc.stderr.on('data', data => ws.sendMessage(text(data.toString())));

      proc.on('close', () => {
        ws.sendMessage(text('Deployed'));
        resolve();
      });
    })
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

  private generateHelmCommand(project: IProject, helmRepo: string, tag: string): [string, string[]] {
    const rootPath = this.gitService.getRootPath();

    return [
      'helm',
      [
        'upgrade',
        project.helmRelease,
        path.resolve(rootPath, helmRepo, project.path),
        '--values', path.resolve(rootPath, helmRepo, project.valuesPath),
        '--install',
        '--namespace', project.namespace,
        '--create-namespace',
        '--set', `image.tag=${tag}`,
        ...this.generateHelmSecrets(project),
      ]
    ]
  }

  private generateHelmSecrets(project: IProject) {
    return Object.keys(project.secrets)
      .reduce<string[]>((acc, cur) => [
        ...acc,
        '--set',
        `env.${cur}="${project.secrets[cur]}"`
      ], [])
  }
}
