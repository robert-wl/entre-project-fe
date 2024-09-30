import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phoneNumber: z.string().min(11),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type RegisterDTO = z.infer<typeof registerSchema>;
