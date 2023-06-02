import { Module } from "@nestjs/common";
import { EnvironmentModule } from "environment/environment.module";
import { DeployController } from "features/deploy/deploy.controller";
import { DeployService } from "features/deploy/deploy.service";
import { ProjectsModule } from "features/projects/projects.module";
import { GitModule } from "integrations/git/git.module";
import { HelmModule } from "integrations/helm/helm.module";
import { UsersModule } from "plugins/user/features/users/users.module";

@Module({
  imports: [
    EnvironmentModule,
    ProjectsModule,
    UsersModule,
    GitModule,
    HelmModule,
  ],
  controllers: [DeployController],
  exports: [DeployService],
  providers: [DeployService],
})
export class DeployModule { }
