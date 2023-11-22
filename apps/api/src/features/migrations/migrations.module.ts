import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MigrationsService } from "features/migrations/migrations.service";
import { ApiKey, ApiKeySchema } from "schemas/api-key.schema";
import { Config, ConfigSchema } from "schemas/config.schema";
import { Project, ProjectSchema } from "schemas/project.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: ApiKey.name, schema: ApiKeySchema },
      { name: Config.name, schema: ConfigSchema },
    ]),
  ],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class MigrationsModule {}
