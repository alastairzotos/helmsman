import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, ForbiddenException } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { IGetSecretsDto, IProject, IUpdateSecretsDto, UpdateProps, WithId } from "models";
import { Principal } from "plugins/user/decorators/principal.decorator";
import { AuthGuard } from "plugins/user/guards/auth.guard";
import { User } from "plugins/user/schemas/user.schema";
import { IUser } from "user-shared";

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async create(
    @Principal() user: WithId<IUser>,
    @Body() project: IProject
  ) {
    return await this.projectsService.create(user, project);
  }

  @Get()
  async getAll(
    @Principal() user: WithId<IUser>,
  ) {
    return await this.projectsService.getAll(user);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string
  ) {
    return await this.projectsService.getById(id);
  }

  @Get('by-name/:name')
  async getByName(
    @Param('name') name: string
  ) {
    return await this.projectsService.getByName(name);
  }

  @Patch()
  async update(
    @Body() { id,  values }: UpdateProps<IProject>
  ) {
    await this.projectsService.update(id, values);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string
  ) {
    await this.projectsService.delete(id);
  }

  @Post('get-secrets')
  async getSecrets(
    @Principal() user: User,
    @Body() { id, password }: IGetSecretsDto
  ) {
    const secrets = await this.projectsService.getSecrets(user, id, password);

    if (!secrets) {
      throw new ForbiddenException();
    }

    return secrets;
  }

  @Patch('update-secrets')
  async updateSecrets(
    @Body() { id, values: { secrets }}: UpdateProps<IUpdateSecretsDto>
  ) {
    await this.projectsService.updateSecrets(id, secrets);
  }
}
