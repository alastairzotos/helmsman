import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, ForbiddenException } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { IGetSecretsDto, IProject, IUpdateSecretsDto, UpdateProps } from "models";
import { Principal } from "features/auth/principal.decorator";
import { AuthGuard } from "features/auth/auth.guard";
import { User } from "schemas/user.schema";

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async create(
    @Principal() user: User,
    @Body() project: IProject
  ) {
    return await this.projectsService.create(user, project);
  }

  @Get()
  async getAll(
    @Principal() user: User,
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
