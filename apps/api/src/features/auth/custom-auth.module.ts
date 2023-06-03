import { Module, forwardRef } from "@nestjs/common";
import { ApiKeysModule } from "features/api-keys/api-keys.module";
import { CustomAuthGuard } from "features/auth/custom-auth.guard";
import { CryptoModule } from "features/crypto/crypto.module";
import { UsersModule } from "plugins/user/features/users/users.module";

@Module({
  imports: [
    UsersModule,
    CryptoModule,
    forwardRef(() => ApiKeysModule),
  ],
  providers: [CustomAuthGuard],
  exports: [CustomAuthGuard, CryptoModule],
})
export class CustomAuthModule { }
