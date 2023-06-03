import { z } from 'zod';

export const ConfigSchema = z.object({
  ownerId: z.string().optional(),
  githubUsername: z.string().nonempty(),
  githubToken: z.string().nonempty(),
});

export type IConfig = z.infer<typeof ConfigSchema>;
