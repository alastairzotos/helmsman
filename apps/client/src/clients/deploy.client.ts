import { httpClient } from "@/clients/http.client"

export const deployProject = async (projectName: string) => {
  await httpClient.post(`/deploy/${projectName}`);
}

export const uninstallProject = async (projectId: string) => {
  await httpClient.delete(`/deploy/${projectId}`);
}
