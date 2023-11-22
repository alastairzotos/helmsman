import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'features/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.persona.authorize(request);

    if (!user) {
      return false;
    }

    request.principal = user;

    return true;
  }
}
