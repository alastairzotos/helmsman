import { Injectable } from "@nestjs/common";
import { clone } from 'isomorphic-git';
import http from "isomorphic-git/http/node";
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { rimraf } from 'rimraf';

@Injectable()
export class GitService {
  async clone(url: string, onProgress: (phrase: string, progress: number) => void) {
    const projectName = uuid();

    await clone({
      fs,
      http,
      url,
      dir: path.resolve(this.getRootPath(), projectName),
      onProgress: (e) => onProgress(e.phase, (e.loaded / e.total) * 100),
    })

    return projectName;
  }

  async clearClonedDir(projectName: string) {
    await rimraf(path.resolve(this.getRootPath(), projectName));
  }

  private getRootPath() {
    const rootPath = path.resolve(path.dirname(require.main.filename), 'repos');
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }

    return rootPath;
  }
}
