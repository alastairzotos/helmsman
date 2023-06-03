import { Body, Controller, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { DeployService } from "features/deploy/deploy.service";
import { IDeployDto } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { AuthGuard } from "plugins/user/guards/auth.guard";
import { User } from "plugins/user/schemas/user.schema";

@Controller('deploy')
@UseGuards(AuthGuard)
export class DeployController {
  constructor(
    private readonly deployService: DeployService,
  ) {}

  @Post()
  async deploy(
    @Principal() user: User,
    @Body() { projectId }: IDeployDto
  ) {
    const result = await this.deployService.deployProject(user._id, projectId);

    if (!result) {
      throw new NotFoundException();
    }
  }
}
