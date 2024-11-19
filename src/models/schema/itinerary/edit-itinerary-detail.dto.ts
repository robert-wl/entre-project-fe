import { z } from "zod";

const compareTimes = (start: string, end: string): boolean => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  return startHour < endHour || (startHour === endHour && startMinute < endMinute);
};

export const editItineraryDetailSchema = z.object({
  id: z.number().min(1),
  itineraryDetails: z.array(
    z.object({
      id: z.number(),
      date: z.string().min(1),
      itineraryItems: z
        .array(
          z.object({
            id: z.number().nullable(),
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

export type EditItineraryDetailDTO = z.infer<typeof editItineraryDetailSchema>;
