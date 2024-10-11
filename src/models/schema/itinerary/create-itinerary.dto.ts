import { z } from "zod";

export const createItinerarySchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  itineraryDetail: z.array(
    z.object({
      startHour: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
      endHour: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
      detailName: z.string().min(1),
    }),
  ),
});

export type CreateItineraryDTO = z.infer<typeof createItinerarySchema>;
