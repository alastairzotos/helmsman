import { Injectable } from "@nestjs/common";
import { CryptoService } from "features/crypto/crypto.service";
import { ProjectsRepository } from "features/projects/projects.repository";
import { IProject } from "models";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly projectsRepo: ProjectsRepository,
  ) {}

  async create(project: IProject) {
    return await this.projectsRepo.create(project);
  }

  async getAll() {
    return await this.projectsRepo.getAll();
  }

  async getById(id: string): Promise<IProject> {
    const project = await this.projectsRepo.getById(id);

    return {
      ...project.toObject(),
      secrets: this.modifySecrets(project.secrets, value => this.cryptoService.decrypt(value)),
    }
  }

  async getByName(name: string) {
    return await this.projectsRepo.getByName(name);
  }

  async update(id: string, project: Partial<IProject>) {
    await this.projectsRepo.update(id, {
      ...project,
      secrets: this.modifySecrets(project.secrets, value => this.cryptoService.encrypt(value)),
    });
  }

  async delete(id: string) {
    await this.projectsRepo.delete(id);
  }

  private modifySecrets(secrets: Record<string, string>, modifier: (value: string) => string): Record<string, string> {
    return Object.entries(secrets || {})
      .map(([key, value]) => ({
        key,
        value: modifier(value),
      }))
      .reduce((acc, { key, value }) => ({
        ...acc,
        [key]: value
      }), {} as Record<string, string>)
  }
}
