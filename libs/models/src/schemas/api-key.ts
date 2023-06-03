import { z } from "zod";

export const ApiKeySchema = z.object({
  ownerId: z.string(),
  name: z.string().nonempty(),
  hashedKey: z.string().nonempty().optional(),
});

export type IApiKey = z.infer<typeof ApiKeySchema>;
