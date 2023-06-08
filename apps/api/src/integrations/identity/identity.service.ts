import { Injectable } from "@nestjs/common";
import { IdentityProvider } from "@bitmetro/auth-node";
import { EnvironmentService } from "environment/environment.service";

@Injectable()
export class IdentityService {
  private identityProvider: IdentityProvider;

  constructor(env: EnvironmentService) {
    this.identityProvider = new IdentityProvider({
      idServer: env.get().idServer,
      apiKey: "bmid_c6e75acc41f55837d20179188fee7fbc8fc964b8c16b08486c339c45824a939b",
    })
  }

  async verifyIdentity(accessToken: string) {
    return await this.identityProvider.verifyIdentity(accessToken);
  }

  async verifyPassword(identityId: string, password: string) {
    return await this.identityProvider.verifyPassword(identityId, password);
  }
}
