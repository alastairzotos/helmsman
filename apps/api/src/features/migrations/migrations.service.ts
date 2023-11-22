import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ApiKey } from "schemas/api-key.schema";
import { Config } from "schemas/config.schema";
import { Project } from "schemas/project.schema";

@Injectable()
export class MigrationsService {
  constructor(
    @InjectModel(Config.name) private readonly configModel: Model<Config>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel(ApiKey.name) private readonly apiKeyModel: Model<ApiKey>,
  ) {}
}
