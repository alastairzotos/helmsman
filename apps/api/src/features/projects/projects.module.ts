import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from "environment/environment.module";
import { ApiKeysModule } from "features/api-keys/api-keys.module";
import { CustomAuthModule } from "features/auth/custom-auth.module";
import { CryptoModule } from "features/crypto/crypto.module";

import { ProjectsController } from "features/projects/projects.controller";
import { ProjectsRepository } from "features/projects/projects.repository";
import { ProjectsService } from "features/projects/projects.service";
import { UsersModule } from "plugins/user/features/users/users.module";
import { Project, ProjectSchema } from "schemas/project.schema";

@Module({
  imports: [
    EnvironmentModule,
    CryptoModule,
    UsersModule,
    CustomAuthModule,
    ApiKeysModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule { }
