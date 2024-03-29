import { Controller, Delete, InternalServerErrorException, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { DeployService } from "features/deploy/deploy.service";
import { Principal } from "features/auth/principal.decorator";
import { AuthGuard } from "features/auth/auth.guard";
import { User } from "schemas/user.schema";

@Controller('deploy')
@UseGuards(AuthGuard)
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

    if (result === "not-found") {
      throw new NotFoundException();
    } else if (result === "error") {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async uninstall(
    @Principal() user: User,
    @Param('id') projectId: string,
  ) {
    const result = await this.deployService.uninstallProject(user._id, projectId);

    if (result === "not-found") {
      throw new NotFoundException();
    }
  }
}
