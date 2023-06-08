import { Injectable } from "@nestjs/common";
import { GitService } from "integrations/git/git.service";
import { IProject } from "models";
import * as path from 'path';
import * as cp from 'child_process';

@Injectable()
export class HelmService {
  constructor(
    private gitService: GitService,
  ) { }

  async deploy(project: IProject, secrets: IProject['secrets'], helmRepo: string, tag: string, onMessage: (message: string) => void) {
    return new Promise<void>((resolve, reject) => {
      const cmd = this.generateHelmCommand(project, helmRepo, tag, secrets);

      const proc = cp.spawn(cmd[0], cmd[1]);

      proc.stdout.on('data', data => onMessage(data.toString()));

      proc.stderr.on('data', data => {
        reject(data.toString());
      });

      proc.on('close', () => {
        onMessage('Deployed');
        resolve();
      });
    })
  }

  async uninstall(project: IProject) {
    return new Promise<void>((resolve, reject) => {
      const proc = cp.spawn("helm", ["uninstall", project.helmRelease, "-n", project.namespace]);

      proc.stderr.on('data', data => {
        reject(data.toString());
      });

      proc.on('close', () => {
        resolve();
      });
    })
  }

  generateHelmCommand(
    project: IProject,
    helmRepo: string,
    tag: string,
    secrets: IProject['secrets'],
  ): [string, string[]] {
    const rootPath = this.gitService.getRootPath();
    const repoPath = path.resolve(rootPath, helmRepo);

    return [
      'helm',
      this.generateHelmArgs(project, repoPath, tag, secrets).flat(1),
    ]
  }

  generateHelmArgs(
    project: IProject,
    repoPath: string,
    tag: string,
    secrets: IProject['secrets'],
  ): string[][] {
    return [
      ['upgrade', project.helmRelease],
      [path.join(repoPath, project.path)],
      ['--values', path.join(repoPath, project.valuesPath)],
      ['--install'],
      ['--namespace', project.namespace],
      ['--create-namespace'],
      ['--set', `image.tag=${tag}`],
      [...this.generateHelmSecrets(secrets).flat(1)],
    ]
  }

  private generateHelmSecrets(secrets: IProject['secrets']) {
    return Object.keys(secrets)
      .reduce<string[][]>((acc, cur) => [
        ...acc,
        ['--set', `env.${cur}=${secrets[cur]}`],
      ], [])
  }
}
