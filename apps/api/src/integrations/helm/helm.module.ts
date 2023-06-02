import { Module } from "@nestjs/common";
import { GitModule } from "integrations/git/git.module";
import { HelmService } from "integrations/helm/helm.service";

@Module({
  imports: [
    GitModule
  ],
  providers: [HelmService],
  exports: [HelmService],
})
export class HelmModule { }
