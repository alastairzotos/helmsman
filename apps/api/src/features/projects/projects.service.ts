import { Injectable } from "@nestjs/common";
import { CryptoService } from "features/crypto/crypto.service";
import { ProjectsRepository } from "features/projects/projects.repository";
import { IProjectDto, IProject, WithId, IGetSecretsDto, ISecretsDto } from "models";
import { UsersService } from "plugins/user/features/users/users.service";
import { User } from "plugins/user/schemas/user.schema";
import { IUser } from "user-shared";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UsersService,
    private readonly projectsRepo: ProjectsRepository,
  ) {}

  async create(user: WithId<IUser>, project: IProject) {
    return await this.projectsRepo.create({
      ...project,
      ownerId: user._id,
    });
  }

  async getAll(user: WithId<IUser>) {
    return await this.projectsRepo.getAll(user._id);
  }

  async getById(id: string): Promise<IProjectDto> {
    return await this.projectsRepo.getById(id);
  }

  async getByIdWithSecrets(id: string): Promise<IProject> {
    return await this.projectsRepo.getByIdWithSecrets(id);
  }

  async getByName(name: string): Promise<IProjectDto> {
    return await this.projectsRepo.getByName(name);
  }

  async update(id: string, project: IProjectDto) {
    await this.projectsRepo.update(id, project);
  }

  async delete(id: string) {
    await this.projectsRepo.delete(id);
  }

  async getSecrets(owner: User, id: string, password: string): Promise<ISecretsDto | false> {
    const project = await this.projectsRepo.getByIdWithSecrets(id);

    if (!project || project.ownerId.toString() !== owner._id.toString()) {
      return false;
    }

    const pwdCheck = await this.userService.isValidUserPassowrd(owner._id, password);
    if (!pwdCheck) {
      return false;
    }

    return this.modifySecrets(project.secrets, secret => this.cryptoService.decrypt(secret));
  }

  async updateSecrets(id: string, secrets: ISecretsDto) {
    await this.projectsRepo.updateSecrets(id, this.modifySecrets(secrets, secret => this.cryptoService.encrypt(secret)));
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
