import { z } from "zod";

export const createDestinationSchema = z.object({
  destination: z.string().min(1),
  notes: z.string().min(1),
  image: z.string().min(1),
  tripId: z.number().min(1),
});

export type CreateDestinationDTO = z.infer<typeof createDestinationSchema>;
