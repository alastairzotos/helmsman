import * as cp from 'child_process';
import { ConsoleLogger, Injectable } from "@nestjs/common";
import { EnvironmentService } from "environment/environment.service";

@Injectable()
export class StartupService {
  private logger = new ConsoleLogger('Startup');

  constructor(
    private readonly envService: EnvironmentService,
  ) {}

  async start() {
    this.logger.log('Running startup module...');

    await this.initDoctl();

    this.logger.log('Startup completed');
  }

  private async initDoctl() {
    return new Promise((resolve, reject) => {
      cp.exec(`doctl auth init -t ${this.envService.get().digitalOceanAccessToken}`, (err, stdout, stderr) => {
        if (err) {
          this.logger.error(stderr);
          return reject(err);
        }

        this.logger.log(stdout);
        resolve(stdout);
      })
    })
  }
}
