import { Injectable } from "@nestjs/common";
import { ConfigRepository } from "features/config/config.repository";
import { CryptoService } from "features/crypto/crypto.service";
import { IdentityService } from "integrations/identity/identity.service";
import { IConfig } from "models";

@Injectable()
export class ConfigService {
  constructor(
    private readonly configRepo: ConfigRepository,
    private readonly cryptoService: CryptoService,
    private readonly identityService: IdentityService,
  ) {}

  async get(owner: any, password: string): Promise<IConfig | false> {
    const config = await this.configRepo.get(owner._id);

    if (!config || config.ownerId.toString() !== owner._id.toString()) {
      return false;
    }

    const pwdCheck = await this.identityService.verifyPassword(owner._id, password);

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
      k8sConfig: this.cryptoService.encrypt(config.k8sConfig),
    });
  }

  private decryptConfig(config: IConfig): IConfig {
    return {
      ...config,
      githubToken: this.cryptoService.decrypt(config.githubToken),
      k8sConfig: this.cryptoService.decrypt(config.k8sConfig),
    }
  }
}
