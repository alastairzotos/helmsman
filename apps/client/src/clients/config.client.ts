import { httpClient } from "@/clients/http.client"
import { IConfig } from "models"

export const getConfig = async () => {
  const { data } = await httpClient.get<IConfig>('/config');

  return data;
}

export const updateConfig = async (config: IConfig) => {
  await httpClient.patch<IConfig>('/config', config);
}
