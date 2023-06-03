import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

import { UsersRepository } from "plugins/user/features/users/users.repository";
import { EnvironmentService } from "environment/environment.service";
import { User } from "plugins/user/schemas/user.schema";
import { CryptoService } from "features/crypto/crypto.service";
import { IAccessTokenDto } from "user-shared";

@Injectable()
export class UsersService {
  constructor(
    private readonly envService: EnvironmentService,
    private readonly cryptoService: CryptoService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async registerUser(email: string, password: string): Promise<IAccessTokenDto> {
    const hashedPassword = await this.cryptoService.hashPassword(password);
    const user = await this.usersRepository.registerUser(email, hashedPassword);

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  async loginUser(email: string, password: string): Promise<IAccessTokenDto | null> {
    const user = await this.usersRepository.getUserByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const pwCheck = await this.cryptoService.comparePasswords(password, user.hashedPassword);

    if (!pwCheck) {
      return null;
    }

    return {
      accessToken: this.generateAccessToken(user),
    };
  }

  async isValidUserPassowrd(userId: string, password: string) {
    const user = await this.usersRepository.getUserByIdWithPassword(userId);
    return await this.cryptoService.comparePasswords(password, user.hashedPassword);
  }

  async getUserById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  private generateAccessToken({ _id, email }: User) {
    return jwt.sign(
      { _id, email },
      this.envService.get().jwtSigningKey,
    );
  }
}
