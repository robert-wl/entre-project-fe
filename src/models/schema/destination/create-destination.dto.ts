import { z } from "zod";

export const createDestinationSchema = z.object({
    destination: z.string().min(1),
    notes: z.string().min(1),
    image: z.any()
        .refine((file) => file !== null && file !== undefined)
        .refine((file) => file instanceof File)
        // .refine((file) => file?.size <= 5 * 1024 * 1024)
});

export type CreateDestinationDTO = z.infer<typeof createDestinationSchema>;
