import { Module } from '@nestjs/common';
import { EnvironmentModule } from 'environment/environment.module';

import { AuthGuard } from 'features/auth/auth.guard';
import { IdentityModule } from 'integrations/identity/identity.module';

@Module({
  imports: [EnvironmentModule, IdentityModule],
  providers: [AuthGuard],
  exports: [IdentityModule, AuthGuard],
  controllers: [],
})
export class AuthModule {}
