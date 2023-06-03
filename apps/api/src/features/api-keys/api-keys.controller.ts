import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiKeysService } from "features/api-keys/api-keys.service";
import { CustomAuthGuard } from "features/auth/custom-auth.guard";
import { ICreateApiKeyDto } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { User } from "plugins/user/schemas/user.schema";

@Controller('api-keys')
@UseGuards(CustomAuthGuard)
export class ApiKeysController {
  constructor(
    private readonly apiKeysService: ApiKeysService,
  ) {}

  @Get()
  async getForOwner(
    @Principal() user: User
  ) {
    return await this.apiKeysService.getForOwner(user._id);
  }

  @Post()
  async create(
    @Principal() user: User,
    @Body() { name }: ICreateApiKeyDto,
  ) {
    return await this.apiKeysService.create(user._id, name);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    await this.apiKeysService.delete(id);
  }
}
