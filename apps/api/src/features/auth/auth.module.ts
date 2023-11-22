import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvironmentModule } from "environment/environment.module";
import { PersonaAdapterService } from "features/auth/auth.adapter";
import { AuthGuard } from "features/auth/auth.guard";
import { AuthService } from "features/auth/auth.service";
import { User, UserSchema } from "schemas/user.schema";


@Module({
  imports: [
    EnvironmentModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  exports: [AuthService, PersonaAdapterService, AuthGuard],
  providers: [AuthService, PersonaAdapterService, AuthGuard],
})
export class AuthModule {}
