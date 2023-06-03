import { createApiKey, deleteApiKey, getApiKeys } from "@/clients/api-keys.client";
import { createQuery } from "@bitmetro/create-query";

export const useGetApiKeys = createQuery(getApiKeys);
export const useCreateApiKey = createQuery(createApiKey);
export const useDeleteApiKey = createQuery(deleteApiKey);
