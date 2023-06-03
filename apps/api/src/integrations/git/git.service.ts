import { Injectable } from "@nestjs/common";
import * as git from 'isomorphic-git';
import http from "isomorphic-git/http/node";
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { rimraf } from 'rimraf';

@Injectable()
export class GitService {
  async getRemoteInfo(url: string) {
    return await git.getRemoteInfo({
      url,
      http
    })
  }

  async clone(repoUrl: string, username: string, token: string, onProgress: (phrase: string, progress: number) => void): Promise<string | null> {
    const url = new URL(repoUrl);
    url.username = username;
    url.password = token;

    const projectName = uuid();

    try {
      await git.clone({
        fs,
        http,
        url: url.toString(),
        dir: path.resolve(this.getRootPath(), projectName),
        onProgress: (e) => {
          const percent = (e.loaded / e.total) * 100;
          onProgress(e.phase, isNaN(percent) ? undefined : percent);
        }
      })
    } catch (e) {
      return null;
    }

    return projectName;
  }

  async clearClonedDir(projectName: string) {
    await rimraf(path.resolve(this.getRootPath(), projectName));
  }

  getRootPath() {
    const rootPath = path.resolve(path.dirname(require.main.filename), 'repos');
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }

    return rootPath;
  }
}
