import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from 'environment/environment.module';
import { EnvironmentService } from 'environment/environment.service';
import { ApiKeysModule } from 'features/api-keys/api-keys.module';
import { ConfigModule } from 'features/config/config.module';
import { CryptoModule } from 'features/crypto/crypto.module';
import { DeployModule } from 'features/deploy/deploy.module';

import { HealthModule } from 'features/health/health.module';
import { ProjectsModule } from 'features/projects/projects.module';
import { GitModule } from 'integrations/git/git.module';
import { HelmModule } from 'integrations/helm/helm.module';
import { IdentityModule } from 'integrations/identity/identity.module';
import { AuthModule } from 'features/auth/auth.module';

@Module({
  imports: [
    NestConfigModule.forRoot(),
    HealthModule,
    EnvironmentModule,
    ProjectsModule,
    CryptoModule,
    AuthModule,
    DeployModule,
    GitModule,
    HelmModule,
    ConfigModule,
    ApiKeysModule,
    IdentityModule,
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
