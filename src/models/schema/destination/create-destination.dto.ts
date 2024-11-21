import { z } from "zod";

export const createDestinationSchema = z.object({
  destination: z.string().min(1, "Destination name must be at least 1 character"),
  notes: z.string().min(1, "Notes must be at least 1 character"),
  image: z.string().min(1, "Image must be at least 1 character"),
  tripId: z.number().min(1, "Trip ID must be at least 1 character"),
});

export type CreateDestinationDTO = z.infer<typeof createDestinationSchema>;
