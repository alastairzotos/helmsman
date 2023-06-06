import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvironmentModule } from "environment/environment.module";
import { ApiKeysModule } from "features/api-keys/api-keys.module";
import { AuthModule } from "features/auth/auth.module";
import { ConfigController } from "features/config/config.controller";
import { ConfigRepository } from "features/config/config.repository";
import { ConfigService } from "features/config/config.service";
import { CryptoModule } from "features/crypto/crypto.module";
import { IdentityModule } from "integrations/identity/identity.module";
import { Config, ConfigSchema } from "schemas/config.schema";

@Module({
  imports: [
    EnvironmentModule,
    AuthModule,
    CryptoModule,
    ApiKeysModule,
    MongooseModule.forFeature([
      { name: Config.name, schema: ConfigSchema },
    ]),
  ],
  controllers: [ConfigController],
  exports: [ConfigService],
  providers: [ConfigService, ConfigRepository],
})
export class ConfigModule { }
