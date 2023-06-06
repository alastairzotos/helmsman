import { Module } from "@nestjs/common";
import { EnvironmentModule } from "environment/environment.module";
import { IdentityService } from "integrations/identity/identity.service";

@Module({
  imports: [
    EnvironmentModule,
  ],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule { }
