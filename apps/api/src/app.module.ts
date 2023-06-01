import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from 'environment/environment.module';
import { EnvironmentService } from 'environment/environment.service';
import { CryptoModule } from 'features/crypto/crypto.module';
import { DeployModule } from 'features/deploy/deploy.module';

import { HealthModule } from 'features/health/health.module';
import { ProjectsModule } from 'features/projects/projects.module';
import { GitModule } from 'integrations/git/git.module';
import { UsersModule } from 'plugins/user/features/users/users.module';
import { AuthModule } from 'plugins/user/guards/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    EnvironmentModule,
    ProjectsModule,
    CryptoModule,
    UsersModule,
    AuthModule,
    DeployModule,
    GitModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: async (envService: EnvironmentService) => ({
        uri: envService.get().dbConnectionString,
      }),
    }),
  ],
})
export class AppModule { }
