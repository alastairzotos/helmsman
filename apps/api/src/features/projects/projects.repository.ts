import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProject } from "models";
import { Model } from "mongoose";
import { Project } from "schemas/project.schema";

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private readonly projectsModel: Model<Project>,
  ) {}

  async create(project: IProject) {
    return await this.projectsModel.create(project);
  }

  async getAll() {
    return await this.projectsModel.find();
  }

  async getById(id: string) {
    return await this.projectsModel.findById(id);
  }

  async getByName(name: string) {
    return await this.projectsModel.findOne({ name });
  }

  async update(id: string, project: Partial<IProject>) {
    await this.projectsModel.findOneAndUpdate({ _id: id }, project);
  }

  async delete(id: string) {
    await this.projectsModel.findOneAndDelete({ _id: id });
  }
}
