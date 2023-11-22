import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiKeysService } from "features/api-keys/api-keys.service";
import { ICreateApiKeyDto } from "models";
import { Principal } from "features/auth/principal.decorator";
import { AuthGuard } from "features/auth/auth.guard";
import { User } from "schemas/user.schema";

@Controller('api-keys')
@UseGuards(AuthGuard)
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
