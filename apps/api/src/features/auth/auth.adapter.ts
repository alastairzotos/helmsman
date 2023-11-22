import { Injectable } from "@nestjs/common";
import { PersonaAdapter, UserDetail, UserDetails } from "@bitmetro/persona-node";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "schemas/user.schema";

@Injectable()
export class PersonaAdapterService implements PersonaAdapter<User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user?.toObject();
  }

  async createUser(email: string, details: UserDetails): Promise<User> {
    const user = await this.userModel.create({ email, username: details.display_name });

    return user.toObject();
  }
  
  async createUserWithPasswordHash(email: string, details: UserDetails, passwordHash: string): Promise<User> {
    const user = await this.userModel.create({ email, username: details.display_name, hashedPassword: passwordHash });

    return user.toObject();
  }

  async exchangeJwtPayloadForUser(payload: User): Promise<User> {
    return (await this.userModel.findOne({ email: payload.email }))?.toObject()
  }

  async getUserPasswordHash(user: User): Promise<string> {
    const found = await this.userModel.findOne({ email: user.email }).select('+hashedPassword');

    return found.hashedPassword;
  }
}
