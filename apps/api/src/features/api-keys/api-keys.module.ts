import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvironmentModule } from "environment/environment.module";
import { ApiKeysController } from "features/api-keys/api-keys.controller";
import { ApiKeysRepository } from "features/api-keys/api-keys.repository";
import { ApiKeysService } from "features/api-keys/api-keys.service";
import { AuthModule } from "features/auth/auth.module";
import { CryptoModule } from "features/crypto/crypto.module";
import { ApiKey, ApiKeySchema } from "schemas/api-key.schema";

@Module({
  imports: [
    EnvironmentModule,
    AuthModule,
    CryptoModule,
    MongooseModule.forFeature([
      { name: ApiKey.name, schema: ApiKeySchema },
    ])
  ],
  controllers: [ApiKeysController],
  exports: [ApiKeysService],
  providers: [ApiKeysService, ApiKeysRepository],
})
export class ApiKeysModule { }
