import { Module } from "@nestjs/common";
import { EnvironmentModule } from "environment/environment.module";
import { StartupService } from "features/startup/startup.service";

@Module({
  imports: [
    EnvironmentModule,
  ],
  providers: [StartupService],
  exports: [StartupService],
})
export class StartupModule { }
