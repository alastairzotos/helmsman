import { Body, Controller, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { DeployService } from "features/deploy/deploy.service";
import { IDeployDto } from "models";
import { AuthGuard } from "plugins/user/guards/auth.guard";

@Controller('deploy')
@UseGuards(AuthGuard)
export class DeployController {
  constructor(
    private readonly deployService: DeployService,
  ) {}

  @Post()
  async deploy(
    @Body() { projectId, connId }: IDeployDto
  ) {
    const result = await this.deployService.deployProject(projectId, connId);

    if (!result) {
      throw new NotFoundException();
    }
  }
}
