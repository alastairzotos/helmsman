import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { AuthService } from 'features/auth/auth.service';
import { MigrationsService } from 'features/migrations/migrations.service';
import { StartupService } from 'features/startup/startup.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableCors();

  app.get(AuthService).persona.setupExpress(app.getHttpAdapter().getInstance());

  await app.get(StartupService).start();

  await app.listen(4001);
}

bootstrap();
