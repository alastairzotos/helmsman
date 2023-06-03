import { Injectable } from "@nestjs/common";
import { ConfigRepository } from "features/config/config.repository";
import { CryptoService } from "features/crypto/crypto.service";
import { IConfig } from "models";
import { UsersService } from "plugins/user/features/users/users.service";
import { User } from "plugins/user/schemas/user.schema";

@Injectable()
export class ConfigService {
  constructor(
    private readonly configRepo: ConfigRepository,
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}

  async get(owner: User, password: string): Promise<IConfig | false> {
    const config = await this.configRepo.get(owner._id);

    if (!config || config.ownerId.toString() !== owner._id.toString()) {
      return false;
    }

    const pwdCheck = await this.usersService.isValidUserPassowrd(owner._id, password);

    if (!pwdCheck) {
      return false;
    }

    return this.decryptConfig(config.toObject());
  }

  async getInternal(ownerId: string): Promise<IConfig | false> {
    const config = await this.configRepo.get(ownerId);

    return this.decryptConfig(config.toObject());
  }

  async update(ownerId: string, config: Partial<IConfig>) {
    await this.configRepo.update(ownerId, {
      ...config,
      githubToken: this.cryptoService.encrypt(config.githubToken),
    });
  }

  private decryptConfig(config: IConfig) {
    return {
      ...config,
      githubToken: this.cryptoService.decrypt(config.githubToken),
    }
  }
}
