import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  private readonly env_vars = {
    nodeEnv: process.env.NODE_ENV as 'production' | undefined,
    home: process.env.HOME as string,
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    aesKey: process.env.AES_KEY as string,
    idServerApiKey: process.env.ID_SERVER_API_KEY as string,
  };

  get() {
    return this.env_vars;
  }
}
