import { Module } from "@nestjs/common";
import { EnvironmentModule } from "environment/environment.module";
import { ApiKeysModule } from "features/api-keys/api-keys.module";
import { AuthModule } from "features/auth/auth.module";
import { ConfigModule } from "features/config/config.module";
import { CryptoModule } from "features/crypto/crypto.module";
import { DeployController } from "features/deploy/deploy.controller";
import { DeployService } from "features/deploy/deploy.service";
import { ProjectsModule } from "features/projects/projects.module";
import { GitModule } from "integrations/git/git.module";
import { HelmModule } from "integrations/helm/helm.module";

@Module({
  imports: [
    EnvironmentModule,
    AuthModule,
    CryptoModule,
    ProjectsModule,
    GitModule,
    HelmModule,
    ConfigModule,
    ApiKeysModule,
  ],
  controllers: [DeployController],
  exports: [DeployService],
  providers: [DeployService],
})
export class DeployModule { }
