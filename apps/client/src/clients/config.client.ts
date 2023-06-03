import { httpClient } from "@/clients/http.client"
import { IConfig, IGetConfigDto } from "models"

export const getConfig = async (password: string) => {
  const { data } = await httpClient.post<IGetConfigDto, { data: IConfig }>('/config', { password });

  return data;
}

export const updateConfig = async (config: IConfig) => {
  await httpClient.patch<IConfig>('/config', config);
}
