import { Injectable } from "@nestjs/common";
import { IdentityProvider } from "@bitmetro/auth-node";
import { EnvironmentService } from "environment/environment.service";
import fetch from "node-fetch";

@Injectable()
export class IdentityService {
  private identityProvider: IdentityProvider;

  constructor(
    private readonly env: EnvironmentService,
  ) {
    this.identityProvider = new IdentityProvider({
      idServer: env.get().idServer,
    })
  }

  async getProperty() {
    const res = await fetch(`${this.env.get().idServer}/api/v1/properties`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Mission Control",
        uniqueId: "bitmetro.mission-control",
        userDetails: [],
        defaultUserData: {
          role: "user",
        },
        loginModes: ["email_and_password"],
        forwardUrl: this.env.get().appUrl,
        logo: "https://i.imgur.com/QkVl0LB.png"
      })
    })

    return await res.json();
  }

  async verifyIdentity(accessToken: string) {
    return await this.identityProvider.verifyIdentity(accessToken);
  }

  async verifyPassword(identityId: string, password: string) {
    return await this.identityProvider.verifyPassword(identityId, password);
  }
}
