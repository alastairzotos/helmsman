import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ApiKey } from "schemas/api-key.schema";

@Injectable()
export class ApiKeysRepository {
  constructor(
    @InjectModel(ApiKey.name) private readonly apiKeyModel: Model<ApiKey>,
  ) {}

  async getForOwner(ownerId: string) {
    return await this.apiKeyModel.find({ ownerId });
  }

  async getAllWithHashedKey() {
    return await this.apiKeyModel.find().select("+hashedKey");
  }

  async create(ownerId: string, name: string, hashedKey: string) {
    return await this.apiKeyModel.create({ ownerId, name, hashedKey });
  }

  async delete(id: string) {
    await this.apiKeyModel.findOneAndDelete({ _id: id });
  }
}
