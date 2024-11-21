import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password must be at least 1 character"),
});

export type LoginDTO = z.infer<typeof loginSchema>;
