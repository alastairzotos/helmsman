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

  async deploy(project: IProject, helmRepo: string, tag: string, onMessage: (message: string) => void) {
    return new Promise<void>((resolve) => {
      const cmd = this.generateHelmCommand(project, helmRepo, tag);

      const proc = cp.spawn(cmd[0], cmd[1]);

      proc.stdout.on('data', data => onMessage(data.toString()));
      proc.stderr.on('data', data => onMessage(data.toString()));

      proc.on('close', () => {
        onMessage('Deployed');
        resolve();
      });
    })
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