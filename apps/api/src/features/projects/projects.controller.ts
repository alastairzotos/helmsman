import { Controller, Post, Get, Patch, Delete, Param, Body } from "@nestjs/common";
import { ProjectsService } from "features/projects/projects.service";
import { IProject, UpdateProps } from "models";

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async create(
    @Body() project: IProject
  ) {
    return await this.projectsService.create(project);
  }

  @Get()
  async getAll() {
    return await this.projectsService.getAll();
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
}
