import { z } from 'zod';

export const ConfigSchema = z.object({
  dbConnectionString: z.string(),
  aesKey: z.string(),
  helmGithubUrl: z.string(),
})

export type IConfig = z.infer<typeof ConfigSchema>;
