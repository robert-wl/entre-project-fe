import { z } from "zod";

export const editDestinationSchema = z.object({
  destination: z.string().min(1, "Destination name must be at least 1 character"),
  notes: z.string().min(1, "Notes must be at least 1 character"),
  image: z.string().min(1, "Image must be at least 1 character"),
  destinationId: z.number().min(1, "Destination ID must be at least 1 character"),
});

export type EditDestinationDTO = z.infer<typeof editDestinationSchema>;
