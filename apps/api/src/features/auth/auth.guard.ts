import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IdentityService } from 'integrations/identity/identity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly identityService: IdentityService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles && roles.includes('all')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (!headers) {
      return false;
    }

    const auth = headers.authentication || headers.authorization;
    if (!auth) {
      return false;
    }

    const [key, token] = auth.split(' ');

    if (key !== 'Bearer' || !token || token === 'null') {
      return false;
    }

    try {
      const identity = await this.identityService.verifyIdentity(token);

      if (!identity) {
        return false;
      }

      request.principal = identity;

      return true;
    } catch {
      return false;
    }

    /*
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
    */
  }
}
