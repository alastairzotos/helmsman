import { httpClient } from "@/clients/http.client"
import { IApiKeyDto, ICreateApiKeyDto, ICreatedApiKeyDto } from "models"

export const getApiKeys = async () => {
  const { data } = await httpClient.get<IApiKeyDto[]>('/api-keys');

  return data;
}

export const createApiKey = async (name: string) => {
  const { data } = await httpClient.post<ICreateApiKeyDto, { data: ICreatedApiKeyDto }>('/api-keys', { name });

  return data;
}

export const deleteApiKey = async (id: string) => {
  await httpClient.delete(`/api-keys/${id}`);
}
