import { Controller, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { CustomAuthGuard } from "features/auth/custom-auth.guard";
import { DeployService } from "features/deploy/deploy.service";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { User } from "plugins/user/schemas/user.schema";

@Controller('deploy')
@UseGuards(CustomAuthGuard)
export class DeployController {
  constructor(
    private readonly deployService: DeployService,
  ) {}

  @Post(':projectName')
  async deploy(
    @Principal() user: User,
    @Param('projectName') projectName: string,
  ) {
    const result = await this.deployService.deployProject(user._id, projectName);

    if (!result) {
      throw new NotFoundException();
    }
  }
}
