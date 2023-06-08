import { deployProject, uninstallProject } from "@/clients/deploy.client";
import { createQuery } from "@bitmetro/create-query";

export const useDeploy = createQuery(deployProject);
export const useUninstall = createQuery(uninstallProject);
