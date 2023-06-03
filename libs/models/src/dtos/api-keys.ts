import { WithId } from "../lib";
import { IApiKey } from "../schemas";

export interface ICreateApiKeyDto {
  name: string;
}

export type IApiKeyDto = WithId<Omit<IApiKey, "hashedKey">>;
export type ICreatedApiKeyDto = WithId<Omit<IApiKey, "hashedKey"> & { key: string }>;
