import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Persona } from "@bitmetro/persona-node";
import { PersonaAdapterService } from "features/auth/auth.adapter";
import { EnvironmentService } from "environment/environment.service";

@Injectable()
export class AuthService {
  persona: Persona;

  constructor(
    envService: EnvironmentService,
    adapter: PersonaAdapterService,
  ) {
    this.persona = new Persona({
      jwtSigningKey: envService.get().jwtSecret,
      adapter,
      config: {
        emailPasswordConfig: {
          userDetails: ['display_name']
        },
        credentials: {}
      }
    })
  }
}
