import { httpClient } from "@/clients/http.client"

export const deployProject = async (projectName: string) => {
  await httpClient.post(`/deploy/${projectName}`);
}
