import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProject, ISecretsDto } from "models";
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

  async getAll(ownerId: string) {
    return await this.projectsModel.find({ ownerId });
  }

  async getById(id: string) {
    return await this.projectsModel.findById(id);
  }

  async getByIdWithSecrets(id: string) {
    return await this.projectsModel.findById(id).select("+secrets");
  }

  async getByOwnerIdAndNameWithSecrets(ownerId: string, name: string) {
    return await this.projectsModel.findOne({ ownerId, name }).select("+secrets");
  }

  async getByName(name: string) {
    return await this.projectsModel.findOne({ name });
  }

  async update(id: string, project: Partial<IProject>) {
    await this.projectsModel.findOneAndUpdate({ _id: id }, project);
  }

  async updateSecrets(id: string, secrets: ISecretsDto) {
    await this.projectsModel.findOneAndUpdate({ _id: id }, { secrets });
  }

  async delete(id: string) {
    await this.projectsModel.findOneAndDelete({ _id: id });
  }
}
