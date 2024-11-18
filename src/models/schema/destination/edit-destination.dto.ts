import { z } from "zod";

export const editDestinationSchema = z.object({
  destination: z.string().min(1),
  notes: z.string().min(1),
  image: z.string().min(1),
  destinationId: z.number().min(1),
});

export type EditDestinationDTO = z.infer<typeof editDestinationSchema>;
