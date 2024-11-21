import { z } from "zod";

export const createTripSchema = z.object({
  name: z.string().min(1, "Trip name must be at least 1 character"),
  description: z.string().min(1, "Description must be at least 1 character"),
});

export type CreateTripDTO = z.infer<typeof createTripSchema>;
