import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from 'environment/environment.module';
import { EnvironmentService } from 'environment/environment.service';
import { CryptoModule } from 'features/crypto/crypto.module';

import { HealthModule } from 'features/health/health.module';
import { ProjectsModule } from 'features/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    EnvironmentModule,
    ProjectsModule,
    CryptoModule,
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
