import { z } from 'zod';

export type UpdateProps<T extends Object> = { id: string, values: Partial<T> };

export type WithId<T extends Object> = { _id: string } & T;

export const ConfigSchema = z.object({
  dbConnectionString: z.string(),
  aesKey: z.string(),
  helmGithubUrl: z.string(),
})

export type IConfig = z.infer<typeof ConfigSchema>;

export const ProjectSchema = z.object({
  name: z.string().min(8),
  namespace: z.string().min(3),
  helmRelease: z.string().min(6),
  path: z.string().min(4),
  valuesPath: z.string().min(4),
  githubUrl: z.string().url(),
  secrets: z.record(z.string()).optional(),
})

export type IProject = z.infer<typeof ProjectSchema>;
