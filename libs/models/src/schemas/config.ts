import { z } from 'zod';

export const ConfigSchema = z.object({
  ownerId: z.string().optional(),
  githubUsername: z.string().nonempty(),
  githubToken: z.string().nonempty(),
  k8sConfig: z.string().nonempty(),
  predeployScript: z.string(),
});

export type IConfig = z.infer<typeof ConfigSchema>;
