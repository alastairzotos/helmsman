import { z } from 'zod';

export const ProjectSchema = z.object({
  ownerId: z.string().optional(),
  name: z.string().min(8),
  namespace: z.string().min(3),
  helmRelease: z.string().min(6),
  path: z.string().min(4),
  valuesPath: z.string().min(4),
  githubUrl: z.string().url(),
  secrets: z.record(z.string()).optional(),
})

export type IProject = z.infer<typeof ProjectSchema>;
