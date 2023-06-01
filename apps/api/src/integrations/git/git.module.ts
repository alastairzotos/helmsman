import { Module } from "@nestjs/common";
import { GitService } from "integrations/git/git.service";

@Module({
  providers: [GitService],
  exports: [GitService],
})
export class GitModule { }
