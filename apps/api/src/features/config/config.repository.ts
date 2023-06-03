import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IConfig } from "models";
import { Model } from "mongoose";
import { Config } from "schemas/config.schema";

@Injectable()
export class ConfigRepository {
  constructor(
    @InjectModel(Config.name) private readonly configModel: Model<Config>,
  ) {}

  async get(ownerId: string) {
    let config = await this.configModel.findOne({ ownerId });

    if (!config) {
      config = await this.configModel.create({ ownerId, githubUsername: '', githubToken: '' });
    }

    return config;
  }

  async update(ownerId: string, config: Partial<IConfig>) {
    await this.configModel.findOneAndUpdate({ ownerId }, config);
  }
}
