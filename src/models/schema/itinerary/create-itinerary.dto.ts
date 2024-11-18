import { z } from "zod";

const compareTimes = (start: string, end: string): boolean => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  return startHour < endHour || (startHour === endHour && startMinute < endMinute);
};

export const createItinerarySchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  tripId: z.number().min(1),
  itineraryDetail: z.array(
    z.object({
      date: z.date(),
      itineraryItems: z
        .array(
          z.object({
            startHour: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
            endHour: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
            detailName: z.string().min(1),
          }),
        )
        .min(1)
        .refine((items) => items.every((item) => compareTimes(item.startHour, item.endHour))),
    }),
  ),
});

export type CreateItineraryDTO = z.infer<typeof createItinerarySchema>;
