import { getConfig, updateConfig } from "@/clients/config.client";
import { createQuery } from "@bitmetro/create-query";

export const useGetConfig = createQuery(getConfig);
export const useUpdateConfig = createQuery(updateConfig);
