import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ApiKeysService } from "features/api-keys/api-keys.service";
import { CryptoService } from "features/crypto/crypto.service";
import { UsersService } from "plugins/user/features/users/users.service";
import { AuthGuard } from "plugins/user/guards/auth.guard";

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(
    private readonly baseAuthGuard: AuthGuard,
    private readonly apiKeysService: ApiKeysService,
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseCanActivate = await this.baseAuthGuard.canActivate(context);

    if (baseCanActivate) {
      return true;
    }

    const token = this.baseAuthGuard.getBearerToken();

    const apiKeys = await this.apiKeysService.getAllWithHashedKey();

    for (const apiKey of apiKeys) {
      if (await this.cryptoService.comparePasswords(token, apiKey.hashedKey)) {
        const owner = await this.usersService.getUserById(apiKey.ownerId);
        this.baseAuthGuard.getRequest().principal = owner;
        
        return true;
      }
    }

    return false;
  }
}
