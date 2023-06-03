import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { ConfigService } from "features/config/config.service";
import { IConfig } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { AuthGuard } from "plugins/user/guards/auth.guard";
import { User } from "plugins/user/schemas/user.schema";

@Controller('config')
@UseGuards(AuthGuard)
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async get(
    @Principal() user: User,
  ) {
    return await this.configService.get(user._id);
  }

  @Patch()
  async update(
    @Principal() user: User,
    @Body() config: IConfig,
  ) {
    await this.configService.update(user._id, config);
  }
}
