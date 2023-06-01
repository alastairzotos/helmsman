import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  private readonly env_vars = {
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    aesKey: process.env.AES_KEY as string,
    helmGithubRepo: process.env.HELM_GITHUB_REPO as string,
    jwtSigningKey: process.env.JWT_SIGNING_SECRET as string,
  };

  get() {
    return this.env_vars;
  }
}
