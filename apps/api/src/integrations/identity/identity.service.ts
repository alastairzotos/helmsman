import { Injectable } from "@nestjs/common";
import { IdentityProvider } from "@bitmetro/auth-node";
import { EnvironmentService } from "environment/environment.service";

@Injectable()
export class IdentityService {
  private identityProvider: IdentityProvider;

  constructor(env: EnvironmentService) {
    this.identityProvider = new IdentityProvider({
      apiKey: env.get().idServerApiKey,
    })
  }

  async verifyIdentity(headers: any) {
    return await this.identityProvider.verifyIdentityFromHeaders(headers);
  }

  async verifyPassword(identityId: string, password: string) {
    return await this.identityProvider.verifyPassword(identityId, password);
  }
}
