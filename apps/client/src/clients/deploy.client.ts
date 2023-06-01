import { httpClient } from "@/clients/http.client"
import { IDeployDto } from "models";

export const deployProject = async (projectId: string,) => {
  await httpClient.post<IDeployDto, unknown>('/deploy', { projectId });
}
