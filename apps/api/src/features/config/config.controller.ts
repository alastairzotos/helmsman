import { Body, Controller, ForbiddenException, Patch, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "features/config/config.service";
import { IConfig, IGetConfigDto } from "models";
import { Principal } from "features/auth/principal.decorator";
import { AuthGuard } from "features/auth/auth.guard";
import { IIdentity, WithId } from "@bitmetro/auth-node";

@Controller('config')
@UseGuards(AuthGuard)
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async get(
    @Principal() user: WithId<IIdentity>,
    @Body() { password }: IGetConfigDto
  ) {
    const config = await this.configService.get(user, password);

    if (!config) {
      throw new ForbiddenException();
    }

    return config;
  }

  @Patch()
  async update(
    @Principal() user: WithId<IIdentity>,
    @Body() config: IConfig,
  ) {
    await this.configService.update(user._id, config);
  }
}
