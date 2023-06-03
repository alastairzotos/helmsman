import { Injectable } from "@nestjs/common";
import { ConfigRepository } from "features/config/config.repository";
import { CryptoService } from "features/crypto/crypto.service";
import { IConfig } from "models";

@Injectable()
export class ConfigService {
  constructor(
    private readonly configRepo: ConfigRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async get(ownerId: string): Promise<IConfig> {
    const config = await this.configRepo.get(ownerId);

    const res = {
      ...config.toObject(),
      githubToken: this.cryptoService.decrypt(config.githubToken),
    }

    return res;
  }

  async update(ownerId: string, config: Partial<IConfig>) {
    await this.configRepo.update(ownerId, {
      ...config,
      githubToken: this.cryptoService.encrypt(config.githubToken),
    });
  }
}
