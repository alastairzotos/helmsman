import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "plugins/user/schemas/user.schema";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  async registerUser(email: string, hashedPassword: string) {
    return await this.usersModel.create({ email, hashedPassword });
  }

  async getUserById(id: string) {
    return await this.usersModel.findById(id);
  }

  async getUserByIdWithPassword(id: string) {
    return await this.usersModel.findById(id).select('+hashedPassword');
  }

  async getUserByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async getUserByEmailWithPassword(email: string) {
    return await this.usersModel.findOne({ email }).select('+hashedPassword');
  }
}