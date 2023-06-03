import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EnvironmentService } from 'environment/environment.service';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'plugins/user/features/users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  private request: any;

  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
    private readonly envService: EnvironmentService,
  ) {}

  getRoles(context: ExecutionContext) {
    return this.reflector.get<string[]>('roles', context.getHandler());
  }

  getRequest() {
    return this.request;
  }

  getBearerToken(): string | null {
    const headers = this.request.headers;

    if (!headers) {
      return null;
    }

    const auth = headers.authentication || headers.authorization;
    if (!auth) {
      return null;
    }

    const [key, token] = auth.split(' ');

    if (key !== 'Bearer' || !token || token === 'null') {
      return null;
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.request = context.switchToHttp().getRequest();

    const roles = this.getRoles(context);
    if (roles && roles.includes('all')) {
      return true;
    }

    const token = this.getBearerToken();

    if (!token) {
      return false;
    }

    try {
      const payload = jwt.verify(
        token,
        this.envService.get().jwtSigningKey,
      ) as jwt.JwtPayload;

      if (!payload) {
        return false;
      }

      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) {
        return false;
      }
      
      this.request.principal = user;

      return true;
    } catch {
      return false;
    }
  }
}
