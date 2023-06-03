import { Body, Controller, ForbiddenException, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ConfigService } from "features/config/config.service";
import { IConfig, IGetConfigDto } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { AuthGuard } from "plugins/user/guards/auth.guard";
import { User } from "plugins/user/schemas/user.schema";

@Controller('config')
@UseGuards(AuthGuard)
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async get(
    @Principal() user: User,
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
    @Principal() user: User,
    @Body() config: IConfig,
  ) {
    await this.configService.update(user._id, config);
  }
}
