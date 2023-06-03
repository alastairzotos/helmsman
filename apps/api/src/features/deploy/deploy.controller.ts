import { Body, Controller, NotFoundException, Post, UseGuards } from "@nestjs/common";
import { CustomAuthGuard } from "features/auth/custom-auth.guard";
import { DeployService } from "features/deploy/deploy.service";
import { IDeployDto } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { User } from "plugins/user/schemas/user.schema";

@Controller('deploy')
@UseGuards(CustomAuthGuard)
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
