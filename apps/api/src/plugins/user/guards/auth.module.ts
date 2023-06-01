import { Module } from '@nestjs/common';
import { EnvironmentModule } from 'environment/environment.module';
import { UsersModule } from 'plugins/user/features/users/users.module';

import { AuthGuard } from 'plugins/user/guards/auth.guard';

@Module({
  imports: [EnvironmentModule, UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
  controllers: [],
})
export class AuthModule {}
