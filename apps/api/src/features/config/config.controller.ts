import { Body, Controller, ForbiddenException, Patch, Post, UseGuards } from "@nestjs/common";
import { CustomAuthGuard } from "features/auth/custom-auth.guard";
import { ConfigService } from "features/config/config.service";
import { IConfig, IGetConfigDto } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { User } from "plugins/user/schemas/user.schema";

@Controller('config')
@UseGuards(CustomAuthGuard)
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
