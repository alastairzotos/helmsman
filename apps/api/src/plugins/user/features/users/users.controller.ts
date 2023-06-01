import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "plugins/user/features/users/users.service";
import { ILoginDto, IRegisterDto } from "user-shared";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() { email, password }: IRegisterDto
  ) {
    return await this.usersService.registerUser(email, password);
  }

  @Post('login')
  async loginUser(
    @Body() { email, password }: ILoginDto
  ) {
    return await this.usersService.loginUser(email, password);
  }
}
