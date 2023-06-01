import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
})

export type IUser = z.infer<typeof UserSchema>;
