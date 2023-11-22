import { Injectable } from "@nestjs/common";
import { AuthService } from "features/auth/auth.service";
import { CryptoService } from "features/crypto/crypto.service";
import { ProjectsRepository } from "features/projects/projects.repository";
import { IProjectDto, IProject, WithId, ISecretsDto } from "models";
import { User } from "schemas/user.schema";
import { modifyRecord } from "utils";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly authService: AuthService,
    private readonly projectsRepo: ProjectsRepository,
  ) {}

  async create(user: User, project: IProject) {
    return await this.projectsRepo.create({
      ...project,
      ownerId: user._id ,
    });
  }

  async getAll(user: User) {
    return await this.projectsRepo.getAll(user._id);
  }

  async getById(id: string): Promise<IProjectDto> {
    return await this.projectsRepo.getById(id);
  }

  async getByIdAndOwner(id: string, ownerId: string) {
    return await this.projectsRepo.getByIdAndOwner(id, ownerId);
  }

  async getByOwnerIdAndNameWithSecrets(ownerId: string, name: string): Promise<IProject> {
    return await this.projectsRepo.getByOwnerIdAndNameWithSecrets(ownerId, name);
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

    const pwdCheck = await this.authService.persona.verifyPassword(password, owner.hashedPassword);
    if (!pwdCheck) {
      return false;
    }

    return modifyRecord(project.secrets, secret => this.cryptoService.decrypt(secret));
  }

  async updateSecrets(id: string, secrets: ISecretsDto) {
    await this.projectsRepo.updateSecrets(id, modifyRecord(secrets, secret => this.cryptoService.encrypt(secret)));
  }
}
