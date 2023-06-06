import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { IdentityService } from 'integrations/identity/identity.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableCors();

  console.log(await app.get<IdentityService>(IdentityService).getProperty());

  await app.listen(4001);
}

bootstrap();
