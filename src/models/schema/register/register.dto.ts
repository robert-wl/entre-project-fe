import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name must be at least 1 character"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    phoneNumber: z.string().min(11, "Phone number must be at least 11 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type RegisterDTO = z.infer<typeof registerSchema>;
