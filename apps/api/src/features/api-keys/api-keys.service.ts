import { Injectable } from "@nestjs/common";
import { ApiKeysRepository } from "features/api-keys/api-keys.repository";
import { CryptoService } from "features/crypto/crypto.service";
import { ICreatedApiKeyDto } from "models";
import { randomBytes } from "crypto";

@Injectable()
export class ApiKeysService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly apiKeysRepo: ApiKeysRepository,
  ) {}

  async getForOwner(ownerId: string) {
    return await this.apiKeysRepo.getForOwner(ownerId);
  }

  async getForOwnerWithHashedKey(ownerId: string) {
    return await this.apiKeysRepo.getForOwnerWithHashedKey(ownerId);
  }

  async create(ownerId: string, name: string): Promise<ICreatedApiKeyDto> {
    const key = `mc_${randomBytes(32).toString('hex')}`;
    const hashedKey = await this.cryptoService.hashPassword(key);

    const { _id } = await this.apiKeysRepo.create(ownerId, name, hashedKey);

    return {
      _id: _id.toString(),
      ownerId,
      name,
      key,
    }
  }

  async delete(id: string) {
    await this.apiKeysRepo.delete(id);
  }
}
