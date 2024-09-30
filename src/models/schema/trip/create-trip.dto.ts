import { z } from "zod";

export const createTripSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  numberOfTravelers: z.number().min(1),
});

export type CreateTripDTO = z.infer<typeof createTripSchema>;
