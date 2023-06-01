import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from "environment/environment.module";
import { CryptoModule } from "features/crypto/crypto.module";

import { ProjectsController } from "features/projects/projects.controller";
import { ProjectsRepository } from "features/projects/projects.repository";
import { ProjectsService } from "features/projects/projects.service";
import { Project, ProjectSchema } from "schemas/project.schema";

@Module({
  imports: [
    EnvironmentModule,
    CryptoModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule { }
