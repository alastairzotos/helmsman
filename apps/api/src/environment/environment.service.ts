import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  private readonly env_vars = {
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    aesKey: process.env.AES_KEY as string,
    jwtSigningKey: process.env.JWT_SIGNING_SECRET as string,
    idServerApiKey: process.env.ID_SERVER_API_KEY as string,
    appUrl: process.env.APP_URL as string,
  };

  get() {
    return this.env_vars;
  }
}
