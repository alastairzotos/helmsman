import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { EnvironmentModule } from "environment/environment.module";
import { CryptoModule } from "features/crypto/crypto.module";
import { UsersController } from "plugins/user/features/users/users.controller";
import { UsersRepository } from "plugins/user/features/users/users.repository";
import { UsersService } from "plugins/user/features/users/users.service";
import { User, UserSchema } from "plugins/user/schemas/user.schema";

@Module({
  imports: [
    EnvironmentModule,
    CryptoModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }
