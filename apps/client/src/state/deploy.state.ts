import { deployProject } from "@/clients/deploy.client";
import { createQuery } from "@bitmetro/create-query";

export const useDeploy = createQuery(deployProject);
